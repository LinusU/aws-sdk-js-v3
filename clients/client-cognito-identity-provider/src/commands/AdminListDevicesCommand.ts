// smithy-typescript generated code
import { getEndpointPlugin } from "@smithy/middleware-endpoint";
import { getSerdePlugin } from "@smithy/middleware-serde";
import { Command as $Command } from "@smithy/smithy-client";
import { MetadataBearer as __MetadataBearer } from "@smithy/types";

import {
  CognitoIdentityProviderClientResolvedConfig,
  ServiceInputTypes,
  ServiceOutputTypes,
} from "../CognitoIdentityProviderClient";
import { commonParams } from "../endpoint/EndpointParameters";
import {
  AdminListDevicesRequest,
  AdminListDevicesRequestFilterSensitiveLog,
  AdminListDevicesResponse,
  AdminListDevicesResponseFilterSensitiveLog,
} from "../models/models_0";
import { de_AdminListDevicesCommand, se_AdminListDevicesCommand } from "../protocols/Aws_json1_1";

/**
 * @public
 */
export { __MetadataBearer, $Command };
/**
 * @public
 *
 * The input for {@link AdminListDevicesCommand}.
 */
export interface AdminListDevicesCommandInput extends AdminListDevicesRequest {}
/**
 * @public
 *
 * The output of {@link AdminListDevicesCommand}.
 */
export interface AdminListDevicesCommandOutput extends AdminListDevicesResponse, __MetadataBearer {}

/**
 * @public
 * <p>Lists devices, as an administrator.</p>
 *          <note>
 *             <p>Amazon Cognito evaluates Identity and Access Management (IAM) policies in requests for this API operation. For
 *     this operation, you must use IAM credentials to authorize requests, and you must
 *     grant yourself the corresponding IAM permission in a policy.</p>
 *             <p class="title">
 *                <b>Learn more</b>
 *             </p>
 *             <ul>
 *                <li>
 *                   <p>
 *                      <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html">Signing Amazon Web Services API Requests</a>
 *                   </p>
 *                </li>
 *                <li>
 *                   <p>
 *                      <a href="https://docs.aws.amazon.com/cognito/latest/developerguide/user-pools-API-operations.html">Using the Amazon Cognito user pools API and user pool endpoints</a>
 *                   </p>
 *                </li>
 *             </ul>
 *          </note>
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CognitoIdentityProviderClient, AdminListDevicesCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
 * // const { CognitoIdentityProviderClient, AdminListDevicesCommand } = require("@aws-sdk/client-cognito-identity-provider"); // CommonJS import
 * const client = new CognitoIdentityProviderClient(config);
 * const input = { // AdminListDevicesRequest
 *   UserPoolId: "STRING_VALUE", // required
 *   Username: "STRING_VALUE", // required
 *   Limit: Number("int"),
 *   PaginationToken: "STRING_VALUE",
 * };
 * const command = new AdminListDevicesCommand(input);
 * const response = await client.send(command);
 * // { // AdminListDevicesResponse
 * //   Devices: [ // DeviceListType
 * //     { // DeviceType
 * //       DeviceKey: "STRING_VALUE",
 * //       DeviceAttributes: [ // AttributeListType
 * //         { // AttributeType
 * //           Name: "STRING_VALUE", // required
 * //           Value: "STRING_VALUE",
 * //         },
 * //       ],
 * //       DeviceCreateDate: new Date("TIMESTAMP"),
 * //       DeviceLastModifiedDate: new Date("TIMESTAMP"),
 * //       DeviceLastAuthenticatedDate: new Date("TIMESTAMP"),
 * //     },
 * //   ],
 * //   PaginationToken: "STRING_VALUE",
 * // };
 *
 * ```
 *
 * @param AdminListDevicesCommandInput - {@link AdminListDevicesCommandInput}
 * @returns {@link AdminListDevicesCommandOutput}
 * @see {@link AdminListDevicesCommandInput} for command's `input` shape.
 * @see {@link AdminListDevicesCommandOutput} for command's `response` shape.
 * @see {@link CognitoIdentityProviderClientResolvedConfig | config} for CognitoIdentityProviderClient's `config` shape.
 *
 * @throws {@link InternalErrorException} (server fault)
 *  <p>This exception is thrown when Amazon Cognito encounters an internal error.</p>
 *
 * @throws {@link InvalidParameterException} (client fault)
 *  <p>This exception is thrown when the Amazon Cognito service encounters an invalid
 *             parameter.</p>
 *
 * @throws {@link InvalidUserPoolConfigurationException} (client fault)
 *  <p>This exception is thrown when the user pool configuration is not valid.</p>
 *
 * @throws {@link NotAuthorizedException} (client fault)
 *  <p>This exception is thrown when a user isn't authorized.</p>
 *
 * @throws {@link ResourceNotFoundException} (client fault)
 *  <p>This exception is thrown when the Amazon Cognito service can't find the requested
 *             resource.</p>
 *
 * @throws {@link TooManyRequestsException} (client fault)
 *  <p>This exception is thrown when the user has made too many requests for a given
 *             operation.</p>
 *
 * @throws {@link CognitoIdentityProviderServiceException}
 * <p>Base exception class for all service exceptions from CognitoIdentityProvider service.</p>
 *
 */
export class AdminListDevicesCommand extends $Command
  .classBuilder<
    AdminListDevicesCommandInput,
    AdminListDevicesCommandOutput,
    CognitoIdentityProviderClientResolvedConfig,
    ServiceInputTypes,
    ServiceOutputTypes
  >()
  .ep({
    ...commonParams,
  })
  .m(function (this: any, Command: any, cs: any, config: CognitoIdentityProviderClientResolvedConfig, o: any) {
    return [
      getSerdePlugin(config, this.serialize, this.deserialize),
      getEndpointPlugin(config, Command.getEndpointParameterInstructions()),
    ];
  })
  .s("AWSCognitoIdentityProviderService", "AdminListDevices", {})
  .n("CognitoIdentityProviderClient", "AdminListDevicesCommand")
  .f(AdminListDevicesRequestFilterSensitiveLog, AdminListDevicesResponseFilterSensitiveLog)
  .ser(se_AdminListDevicesCommand)
  .de(de_AdminListDevicesCommand)
  .build() {}
