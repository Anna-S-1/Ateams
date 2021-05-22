
/**
* @fileOverview File has defined various functions which are exposed as API end points.
* @link /api/vegetables
* @file vegetables.controller.ts
* @see /api/vegetables
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
  PathParams,
  Delete,
  Get,
  Session
} from "@tsed/common";
import { Docs, Name, Description, Returns, Summary } from "@tsed/swagger";
import * as Express from "express";
import {
  BadRequest, NotFound, InternalServerError,
  Conflict, Unauthorized, RequestTimeout
} from "ts-httpexceptions";
import { ErrorCode, StatusCode } from "../../../../shared";
import { IDBVegetables } from "../../models/mongoose/vegetables/vegetables.model";
import { VegetablesEntity } from "../../models/entities/vegetables/vegetables-entities.model";
import { VegetablesUseCase } from "../../usecases/vegetables/vegetables.usecase";
import { IVegetablesResponse } from "../../interfaces/interface";
// import { IFUserResponse } from "../../interfaces/interface";
@Controller("/vegetables")
// @AuthorizationCheck()
@Docs("api/v1")
@Name("Vegetables")
@Description("All API definitions required for Vegetables-Section")
/**
* A class for creating vegetable routes.
* @class
*/
export class VegetablesController {

  private vegetablesUseCase: VegetablesUseCase;
  /**
  * @constructor
  * @property {Instance} representing instances of the class FormController.
  */
  constructor({ vegetablesUseCase = new VegetablesUseCase() } = {}) {
    this.vegetablesUseCase = vegetablesUseCase;
  }
  // list all the vegetables
  @Get("/FullFetch")
  @Status(StatusCode.Ok, { description: "Ok", type: VegetablesEntity })
  @Summary("Retrieve the complete vegetables")
  @Description("List the vegetables details from database")
  @Returns(StatusCode.NotFound, { description: "Not found" })
  /**
  * @param {string} vegetableId Database id which is stored against the vegetable configuration
  * @returns {object} Returns the form configurations
  * @throws {NotFound} Form does not exists in the database
*/
  public async fullfetchVegetables(
    @Required() @Description("Request body")
    @Required() @Req() @Description("Request Header Auth token") request: Req,
    @Session() session,
    @Res() res: Express.Response,
      // @EndpointInfo() endpointInfo: EndpointInfo
  ): Promise<IVegetablesResponse> {
    try {
      const vegetables: IDBVegetables = await this.vegetablesUseCase.fullfetchVegetables();
      res.status(StatusCode.Ok);
      return vegetables;
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
  // fetch a vegetable by Id
  @Get("/fetchVegetableById/:vegetableId")
  @Status(StatusCode.Ok, { description: "Ok", type: VegetablesEntity })
  @Summary("Retrieve the given Vegetables by Id")
  @Description("Fetch the vegetables details from database, vegetableId used here is mongoid(_id)")
  @Returns(StatusCode.NotFound, { description: "Not found" })
  /**
  * @param {string} vegetableId Database id which is stored against the vegetable configuration
  * @returns {object} Returns the form configurations
  * @throws {NotFound} Form does not exists in the database
*/
  public async fetchVegetablesById(
    // eslint-disable-next-line max-len
    @Required() @Description("Request body") @PathParams("vegetableId") vegetableId: string,
    @Required() @Req() @Description("Request Header Auth token") request: Req,
    @Session() session,
    @Res() res: Express.Response,
      // @EndpointInfo() endpointInfo: EndpointInfo
  ): Promise<IVegetablesResponse> {
    try {
      const vegetablesModel: IDBVegetables = { _id: vegetableId };
      const vegetables: IDBVegetables = await this.vegetablesUseCase.fetchVegetablesById(vegetablesModel);
      res.status(StatusCode.Ok);
      return vegetables;
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
  // Delete a vegetable by Id
  @Delete("/DeleteVegetables/:vegetableId")
  @Summary("Delete a Single vegetable")
  @Description("Delete Single vegetable by Id from database")
  @Status(StatusCode.NoContent, { description: "Deleted" })
  @Returns(StatusCode.NotFound, { description: "NotFound" })
  @Returns(StatusCode.Unauthorized, { description: "Unauthorized" })
  /**
   * @description deleteUser
   * @param {string} vegetableId Database id which is stored against the vegetable
   * @returns {object} Returns the response object
  */
  public async deleteVegetablesById(
    @Required() @Description("vegetableId previously created") @PathParams("vegetableId") vegetableId: string,
    @Required() @Req() @Description("Request Header Auth token") request: Req,
    @Res() res: Express.Response
  ): Promise<void> {
    try {
      const vegetablesModel: IDBVegetables = { _id: vegetableId };
      await this.vegetablesUseCase.deleteVegetablesById(vegetablesModel);
      res.status(StatusCode.NoContent);
    } catch (err) {
      console.error("deleteVegetablesById - controller error: ", err);
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

  // Create or update vegetables
  @Post("/createorupdateVegetables")
  @Summary("Create or Update Vegetables")
  @Description("Create or Update Vegetables")
  @Status(StatusCode.Created, { description: "Created", type: VegetablesEntity })
  @Returns(StatusCode.BadRequest, { description: "Bad Input" })

  /**
   * @description createVegetables
   * @param {object} BodyParams Vegetables data received from client
   * @returns {object} Returns the response object
  */
  public async createOrUpdateVegetables(
    @Required() @BodyParams() @Description("Request body") vegetablesInput: VegetablesEntity,
    @Required() @Req() @Description("Request Header Auth token") request: Req,
    @Res() res: Express.Response,
  ): Promise<VegetablesEntity> {
    try {
      let vegetablesModel: IDBVegetables = vegetablesInput as IDBVegetables;
      // eslint-disable-next-line max-len
      const vegetables: VegetablesEntity = await this.vegetablesUseCase.createOrUpdateVegetables(vegetablesModel);
      res.status(StatusCode.Created);
      return vegetables;
    } catch (err) {
      console.error("createVegetables - controller error: ", err);
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

}
