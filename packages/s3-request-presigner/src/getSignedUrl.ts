import { formatUrl } from "@aws-sdk/util-format-url";
import { EndpointParameterInstructionsSupplier, getEndpointFromInstructions } from "@smithy/middleware-endpoint";
import { HttpRequest } from "@smithy/protocol-http";
import { Client, Command } from "@smithy/smithy-client";
import {
  BuildMiddleware,
  EndpointV2,
  HttpRequest as IHttpRequest,
  MetadataBearer,
  RequestPresigningArguments,
} from "@smithy/types";

import { S3RequestPresigner } from "./presigner";

/**
 * @public
 */
export const getSignedUrl = async <
  InputTypesUnion extends object,
  InputType extends InputTypesUnion,
  OutputType extends MetadataBearer = MetadataBearer
>(
  client: Client<any, InputTypesUnion, MetadataBearer, any>,
  command: Command<InputType, OutputType, any, InputTypesUnion, MetadataBearer>,
  options: RequestPresigningArguments = {}
): Promise<string> => {
  let s3Presigner: S3RequestPresigner;

  let region: string | undefined;
  if (typeof client.config.endpointProvider === "function") {
    const endpointV2: EndpointV2 = await getEndpointFromInstructions(
      command.input as Record<string, unknown>,
      command.constructor as EndpointParameterInstructionsSupplier,
      client.config
    );
    const authScheme = endpointV2.properties?.authSchemes?.[0];
    if (authScheme?.name === "sigv4a") {
      region = authScheme?.signingRegionSet?.join(",");
    } else {
      region = authScheme?.signingRegion;
    }
    s3Presigner = new S3RequestPresigner({
      ...client.config,
      signingName: authScheme?.signingName,
      region: async () => region,
    });
  } else {
    s3Presigner = new S3RequestPresigner(client.config);
  }

  const presignInterceptMiddleware: BuildMiddleware<InputTypesUnion, MetadataBearer> =
    (next, context) => async (args) => {
      const { request } = args;
      if (!HttpRequest.isInstance(request)) {
        throw new Error("Request to be presigned is not an valid HTTP request.");
      }
      // Retry information headers are not meaningful in presigned URLs
      delete request.headers["amz-sdk-invocation-id"];
      delete request.headers["amz-sdk-request"];
      // User agent header would leak sensitive information
      delete request.headers["x-amz-user-agent"];

      let presigned: IHttpRequest;
      const presignerOptions = {
        ...options,
        signingRegion: options.signingRegion ?? context["signing_region"] ?? region,
        signingService: options.signingService ?? context["signing_service"],
      };

      if (context.s3ExpressIdentity) {
        presigned = await s3Presigner.presignWithCredentials(request, context.s3ExpressIdentity, presignerOptions);
      } else {
        presigned = await s3Presigner.presign(request, presignerOptions);
      }

      return {
        // Intercept the middleware stack by returning fake response
        response: {},
        output: {
          $metadata: { httpStatusCode: 200 },
          presigned,
        },
      } as any;
    };
  const middlewareName = "presignInterceptMiddleware";
  const clientStack = client.middlewareStack.clone();
  clientStack.addRelativeTo(presignInterceptMiddleware, {
    name: middlewareName,
    relation: "before",
    toMiddleware: "awsAuthMiddleware",
    override: true,
  });

  const handler = command.resolveMiddleware(clientStack, client.config, {});
  const { output } = await handler({ input: command.input });
  //@ts-ignore the output is faked, so it's not actually OutputType
  const { presigned } = output;

  return formatUrl(presigned);
};
