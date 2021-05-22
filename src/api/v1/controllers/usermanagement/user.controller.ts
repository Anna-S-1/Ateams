
/**
* @fileOverview File has defined various functions which are exposed as API end points.
* @link /api/usermanagement
* @file user.controller.ts
* @see /api/usermanagement
* @author test1
* @since 1.0.0
* @version 1.0.0
*/
import {
  Controller,
  Res,
  Post,
  BodyParams,
  Status,
  Required,
  Req,
  Put,
  PathParams,
  Delete
} from "@tsed/common";
import { Docs, Name, Description, Returns, Summary } from "@tsed/swagger";
import * as Express from "express";
import {
  BadRequest, NotFound, InternalServerError,
  Conflict, Unauthorized, RequestTimeout
} from "ts-httpexceptions";
import { ErrorCode, StatusCode } from "../../../../shared";
import { IDBUser } from "../../models/mongoose/usermanagement/user.model";
import { UserEntity } from "../../models/entities/usermanagement/user-entities.model";
import { UserUseCase } from "../../usecases/usermanagement/user.usecase";
// import { IFUserResponse } from "../../interfaces/interface";
@Controller("/user")
// @AuthorizationCheck()
@Docs("api/v1")
@Name("User")
@Description("All API definitions required for User-Section")
/**
* A class for creating user routes.
* @class
*/
export class UserController {

  private userUseCase: UserUseCase;
  /**
  * @constructor
  * @property {Instance} representing instances of the class FormController.
  */
  constructor({ userUseCase = new UserUseCase() } = {}) {
    this.userUseCase = userUseCase;
  }
  // create a new user
  @Post("/CreateNewUser")
  @Summary("New User Creation")
  @Description("Create New User")
  @Status(StatusCode.Created, { description: "Created", type: UserEntity })
  @Returns(StatusCode.BadRequest, { description: "Bad Input" })

  /**
  * @description saveUser
  * @param {object} BodyParams User data received from client
  * @returns {object} Returns the response object
  */

  public async saveUser(
    @Required() @BodyParams() @Description("Request body") userInput: UserEntity,
    @Required() @Req() @Description("Request Header Auth token") request: Req,
    @Res() res: Express.Response,
  ): Promise<UserEntity> {
    try {
      let userModel: IDBUser = userInput as IDBUser;
      const user: UserEntity = await this.userUseCase.saveUser(userModel);
      res.status(StatusCode.Created);
      return user;
    } catch (err) {
      console.error("saveuser - controller error: ", err);
      const errStatus: number = err.status;
      switch (errStatus) {
      case StatusCode.BadRequest: {
        throw new BadRequest(err.message);
      }
      case StatusCode.MissingField: {
        throw new BadRequest(err.message);
      }
      case StatusCode.Unauthorized: {
        throw new Unauthorized(err.message);
      }
      case StatusCode.Conflict: {
        throw new Conflict(err.message);
      }
      case StatusCode.NotFound: {
        throw new NotFound(err.message);
      }
      case StatusCode.RequestTimeout: {
        throw new RequestTimeout(err.message);
      }
      default: {
        throw new InternalServerError(err.message);
      }
      }
    }
  }
  // Update a user
  @Put("/UpdateUser/:userId")
  @Summary("Edit user details")
  @Description("Modify the user stored in the database")
  @Status(StatusCode.Ok, { description: "Modified", type: UserEntity })
  @Returns(StatusCode.BadRequest, { description: "Bad Input" })
  @Returns(StatusCode.NotFound, { description: "NotFound" })
  @Returns(StatusCode.Unauthorized, { description: "Unauthorized" })
  /**
   * @description updateUser
   * @param {string} userId Database id which is stored against the user
   * @param {object} BodyParams Form data received from client
   * @returns {object} Returns the response object
  */
  public async updateUser(
    @Required() @BodyParams() @Description("Request body") userInput: UserEntity,
    @Required() @Description("groupId previously created") @PathParams("userId") userId: string,
    @Required() @Req() @Description("Request Header Auth token") request: Req,
    @Res() res: Express.Response
  ): Promise<UserEntity> {
    try {
      const userModel: IDBUser = userInput as IDBUser;
      userModel._id = userId;
      const user: IDBUser = await this.userUseCase.updateUser(userModel);
      res.status(StatusCode.Ok);
      return user;
    } catch (err) {
      console.error("updateUser - controller error: ", err);
      const errStatus: number = err.status;
      switch (errStatus) {
      case StatusCode.BadRequest: {
        throw new BadRequest(err.message);
      }
      case StatusCode.MissingField: {
        throw new BadRequest(err.message);
      }
      case StatusCode.Unauthorized: {
        throw new Unauthorized(err.message);
      }
      case StatusCode.Conflict: {
        throw new Conflict(err.message);
      }
      case StatusCode.NotFound: {
        throw new NotFound(err.message);
      }
      case StatusCode.RequestTimeout: {
        throw new RequestTimeout(err.message);
      }
      default: {
        throw new InternalServerError(err.message);
      }
      }
    }
  }

  // Delete a user
  @Delete("/DeleteUser/:userId")
  @Summary("Delete a Single user")
  @Description("Delete Single user by Id from database")
  @Status(StatusCode.NoContent, { description: "Deleted" })
  @Returns(StatusCode.NotFound, { description: "NotFound" })
  @Returns(StatusCode.Unauthorized, { description: "Unauthorized" })
  /**
   * @description deleteUser
   * @param {string} userId Database id which is stored against the user
   * @returns {object} Returns the response object
  */
  public async deleteUser(
    @Required() @Description("userId previously created") @PathParams("userId") userId: string,
    @Required() @Req() @Description("Request Header Auth token") request: Req,
    @Res() res: Express.Response
  ): Promise<void> {
    try {
      const userModel: IDBUser = { _id: userId };
      await this.userUseCase.deleteUser(userModel);
      res.status(StatusCode.NoContent);
    } catch (err) {
      console.error("deleteUser - controller error: ", err);
      const errStatus: number = err.status;
      switch (errStatus) {
      case StatusCode.BadRequest: {
        throw new BadRequest(err.message);
      }
      case StatusCode.MissingField: {
        throw new BadRequest(err.message);
      }
      case StatusCode.Unauthorized: {
        throw new Unauthorized(err.message);
      }
      case StatusCode.Conflict: {
        throw new Conflict(err.message);
      }
      case StatusCode.NotFound: {
        throw new NotFound(err.message);
      }
      case StatusCode.RequestTimeout: {
        throw new RequestTimeout(err.message);
      }
      default: {
        throw new InternalServerError(err.message);
      }
      }
    }
  }

  @Post("/searchUsers")
  @Summary("List User with filter and pagination")
  @Description("Body (Pagination (page: page No)Filter")
  @Status(StatusCode.Ok, { description: "Ok", type: UserEntity })
  @Returns(StatusCode.NotFound, { description: "Not found" })

  /**
  * @description Search user
  * @param {object} BodyParams eyeTestBookingHistory data received from client
  * @returns {object} Returns the response object
  */
  public async searchUser(
    @Required() @BodyParams() @Description("Request body") userInput: UserEntity,
    @Required() @Req() @Description("Request Header Auth token") request: Req,
    @Res() res: Express.Response): Promise<UserEntity> {
    try {
      let userModel: IDBUser = userInput as IDBUser;
      const eyeTestBooking: IDBUser = await this.userUseCase.searchUser(userModel);
      res.status(StatusCode.Ok);
      return eyeTestBooking;
    } catch (err) {
      let errMessage: string = err.message;
      switch (errMessage) {
      case ErrorCode.CastError: {
        throw new BadRequest(ErrorCode.CastError);
      }
      case ErrorCode.MongoError: {
        throw new Conflict(ErrorCode.MongoError);
      }
      case ErrorCode.NotFoundError: {
        throw new NotFound(ErrorCode.NotFoundError);
      }
      case ErrorCode.Unauthorized: {
        throw new Unauthorized(ErrorCode.Unauthorized);
      }
      case ErrorCode.ValidationError: {
        throw new BadRequest(ErrorCode.ValidationError);
      }
      default: {
        throw new InternalServerError(err.message);
      }
      }
    }
  }

  @Post("/signin/User")
  @Summary("User login")
  @Description("User login to dashboard")
  @Status(StatusCode.Created, { description: "Created", type: UserEntity })
  @Returns(StatusCode.BadRequest, { description: "Bad Input" })
  public async userLogin(
    @Required() @BodyParams() @Description("Request body") userInput: UserEntity,
    @Required() @Req() @Description("Request Header Auth token") request: Req,
    @Res() res: Express.Response
  ): Promise< IDBUser> {
    try {
      let userModel: IDBUser = userInput as IDBUser;
      const user: IDBUser = await this.userUseCase.userLogin(userModel);
      res.status(StatusCode.Created);
      return user;
    } catch (err) {
      let errMessage: string = err.message;
      switch (errMessage) {
      case ErrorCode.CastError: {
        throw new BadRequest(ErrorCode.CastError);
      }
      case ErrorCode.MongoError: {
        throw new Conflict(ErrorCode.MongoError);
      }
      case ErrorCode.NotFoundError: {
        throw new NotFound(ErrorCode.NotFoundError);
      }
      case ErrorCode.Unauthorized: {
        throw new Unauthorized(ErrorCode.Unauthorized);
      }
      case ErrorCode.ValidationError: {
        throw new BadRequest(ErrorCode.ValidationError);
      }
      default: {
        throw new InternalServerError(err.message);
      }
      }
    }
  }

}
