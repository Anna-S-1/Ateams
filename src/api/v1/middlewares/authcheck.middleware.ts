/**
 * @fileOverview Authcheck middleware.
 * @file   authentication.middleware.spec.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import { Middleware, IMiddleware, Req, Status, EndpointInfo } from "@tsed/common";
import { StatusCode, Const, ErrorCode } from "../../../shared";
import { Unauthorized, NotFound } from "ts-httpexceptions";
import { AuthUseCase } from "../usecases/auth.usecase";
import { IDBConfigurator } from "../models/mongoose/configurator.model";

@Middleware()
export class AuthCheckMiddleware implements IMiddleware {

  private authUseCase: AuthUseCase;
  private MSG_NO_PERMISSION = "Auth token does not have permission";
  private MSG_TOKEN_MISSING = "Authorization token missing in the request";
  private MSG_WRONG_TOKEN = "Authorization token is wrong";

  constructor({ authUseCase = new AuthUseCase() } = {}) {
    this.authUseCase = authUseCase;
  }

  /**
   * This code snippet will be executed for each request. Check the token permission aginst the stored value
    * @param request
    */
  async use(@Req() request: Req, @EndpointInfo() endpoint: EndpointInfo): Promise<void> {
    let authHeader: string = request.headers.authorization;
    const options = endpoint.get(AuthCheckMiddleware) || {};
    const actionType: string = options.action;
    let authCode: string;
    let configurator: IDBConfigurator;
    try {
      if (typeof authHeader === "undefined") {
        Status(StatusCode.Unauthorized);
        throw new Unauthorized(this.MSG_TOKEN_MISSING);
      } else {
        // received a valid token
        authCode = authHeader.split(" ")[Const.One];
        configurator = await this.checkValidToken(authCode);

        switch (actionType) {
        case "create": {
          // check whether the token is admin token or not
          if (String(configurator.adminToken) !== authCode) {
            Status(StatusCode.Unauthorized);
            throw new Unauthorized(this.MSG_NO_PERMISSION);
          }
          break;
        }
        case "submit": {
          await this.checkSubmissionPermission(authCode);
          break;
        }
        default: {
          await this.checkAdminPermission(authCode);
          break;
        }
        }
      }
    } catch (err) {
      console.error("AuthCheckMiddleware -  error: ", err);
      switch (err.status) {
      case StatusCode.NotFound: {
        Status(StatusCode.NotFound);
        throw new NotFound("Unauthorized");
      }
      case StatusCode.Unauthorized: {
        Status(StatusCode.Unauthorized);
        throw new Unauthorized(err.message);
      }
      case ErrorCode.ValidationError: {
        throw new NotFound("Unauthorized");
      }
      default: {
        throw new Unauthorized(err.message);
      }
      }
    }
  }

  /**
    * @function
    * @param {string} representing  authcode
    * @returns {IDBConfigurator} representing the configurator model class instance
  */

  private async checkValidToken(authCode: string): Promise<IDBConfigurator> {
    try {
      const configurator: IDBConfigurator = await this.authUseCase.fetchConfiguratorByToken(authCode);
      return configurator;
    } catch (err) {
      Status(StatusCode.Unauthorized);
      throw new Unauthorized(this.MSG_WRONG_TOKEN);
    }
  }

  /**
    * @function
    * @param {string} representing  authcode
  */
  private async checkSubmissionPermission(authCode: string): Promise<void> {
    try {

    } catch (err) {

    }
  }

  /**
    * @function
    * @param {string} representing  authcode
  */
  private async checkAdminPermission(authCode: string): Promise<void> {
    try {

    } catch (err) {

    }
  }

}
