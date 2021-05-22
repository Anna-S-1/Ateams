/**
 * @fileOverview Database connection.
 * @file   database.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import * as mongoose from "mongoose";
import { config } from "./index";
import { DBConnectionSettings } from "../api/v1/interfaces/interface";

/**
  * Singleton class for managing database connection.
  * @class
*/
export class DBConnection {

  /**
    * @description Class members
  */
  private static instance: DBConnection;
  private mongooseInstance: mongoose;
  private dbConfig;

  /**
    * @constructor
    * @property {Instance} representing instances of the class DBConnection.
  */
  private constructor({ dbConfig = config.db, mongooseInstance = mongoose }: DBConnectionSettings = {}) {
    this.dbConfig = dbConfig;
    this.mongooseInstance = mongooseInstance;
    this.connect();
  };

  /**
    * @description getInstance
    * @returns {object} Returns the singleton instance of the class
  */
  static getInstance(): DBConnection {
    if (!DBConnection.instance) {
      DBConnection.instance = new DBConnection();
    }
    return DBConnection.instance;
  }

  /**
    * @description connect
  */
  private async connect(): Promise<void> {
    try {
      await this.mongooseInstance
        .connect(
          this.dbConfig.url,
          { useNewUrlParser: true, useCreateIndex: true }
        );
    } catch (err) {
      console.error(`Error while connecting to database with error : ${err}`);
      throw new Error(err);
    }
  }

  /**
    * @description disconnect
  */
  public async disconnect(): Promise<void> {
    try {
      await this.mongooseInstance.connection.close();
    } catch (err) {
      throw new Error(err);
    }
  }

}
