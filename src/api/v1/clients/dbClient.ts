/**
 * @fileOverview DB client.
 * @file   dbClient.ts
 * @author test1.com
 * @since  1.0.0
 * @version 1.0.0
 */
import { IDBClientSettings } from "../interfaces/interface";
import { DBConnection } from "../../../config";

/**
  * A class for managing DBClient.
  * @class
*/
export class DBClient {

  private dbConnection: DBConnection;

  /**
    * @constructor
    * @property {Instance} representing instances of the class DBClient.
  */
  constructor({ dbConnection = DBConnection.getInstance() }: IDBClientSettings = {}) {
    this.dbConnection = dbConnection;
  }

  /**
  * @function close DB Connection
  */
  public async dbClose(): Promise<void> {
    try {
      DBConnection.getInstance().disconnect();
    } catch (err) {
      console.error(`Error while closing the connection : ${err}`);
      throw new Error(err.name);
    }
  }

}
