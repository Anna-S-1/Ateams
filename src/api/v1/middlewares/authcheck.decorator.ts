import { UseAuth } from "@tsed/common";
import { applyDecorators } from "@tsed/core";
import { Operation, Responses, Security } from "@tsed/swagger";
import { AuthCheckMiddleware } from "./authcheck.middleware";
import { StatusCode } from "../../../shared";
import { ICustomAuthOptions } from "../interfaces/interface";

export function AuthorizationCheck(options: ICustomAuthOptions = {}): Function {
  return applyDecorators(
    UseAuth(AuthCheckMiddleware, options),
    Security("oauth", ...(options.action || "")),
    Operation({
      "parameters": [
        {
          "in": "header",
          "name": "Authorization",
          "type": "string",
          "required": true
        }
      ]
    }),
    Responses(StatusCode.Unauthorized, { description: "Unauthorized" })
  );
}
