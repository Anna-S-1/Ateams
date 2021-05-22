/**
 * @fileOverview DB Configurator client.
 * @file   dbConfiguratorClient.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import * as mongoose from "mongoose";
import { InternalServerError, NotFound } from "ts-httpexceptions";
import { IDBClientSettings, configuratorParams } from "../interfaces/interface";
import Configurator, { IDBConfigurator } from "../models/mongoose/configurator.model";
import { DBConnection } from "../../../config";
import { ErrorCode } from "../../../shared";

/**
  * A class for managing DBClient.
  * @class
*/
export class DBConfiguratorClient {

  private dbConnection: DBConnection;
  private Configurator: mongoose.model;

  /**
    * @constructor
    * @property {Instance} representing instances of the class DBClient.
  */
  constructor({ dbConnection = DBConnection.getInstance(),
    configurator = Configurator }: IDBClientSettings = {}) {
    this.dbConnection = dbConnection;
    this.Configurator = configurator;
  }

  public async fetchConfiguratorByToken(token: string): Promise<IDBConfigurator> {
    try {
      const options: configuratorParams = { adminToken: token };
      const record: IDBConfigurator = await this.Configurator.find(options).exec();
      return record;
    } catch (err) {
      console.error("fetchConfiguratorByToken - Error -", err);
      let errMessage: string = err.name;
      switch (errMessage) {
      case ErrorCode.CastError: {
        throw new NotFound(ErrorCode.NotFoundError);
      }
      case ErrorCode.ValidationError: {
        throw new NotFound(ErrorCode.NotFoundError);
      }
      default: {
        throw new InternalServerError(errMessage);
      }
      }
    }
  }

}
