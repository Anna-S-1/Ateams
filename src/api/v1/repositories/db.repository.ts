/**
 * @fileOverview DB Repository.
 * @file   db.repository.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import { NotFound } from "ts-httpexceptions";
import { IDBConfigurator } from "../models/mongoose/configurator.model";

import { DBConfiguratorClient } from "../clients/dbConfiguratorClient";
import { ErrorCode, Const } from "./../../../shared";
import { DBClient } from "../clients/dbClient";

/**
  * A class for product DBRepository.
  * @class
*/
export class DBRepository {

  private dbClient: DBClient;
  private dbConfiguratorClient: DBConfiguratorClient;
  /**
    * @constructor
    * @property {Instance} representing instances of the class DBRepository.
  */
  constructor({ dbClient = new DBClient(), dbConfiguratorClient = new DBConfiguratorClient() } = {}) {
    this.dbClient = dbClient;
    this.dbConfiguratorClient = dbConfiguratorClient;
  }
  public async fetchConfiguratorByToken(token: string): Promise<IDBConfigurator> {
    const configurator: IDBConfigurator = await this.dbConfiguratorClient.fetchConfiguratorByToken(token);
    if (Object.keys(configurator).length > Const.Zero) {
      return configurator;
    } else {
      throw new NotFound(ErrorCode.NotFoundError);
    }
  }

  /**
    * @function close DB Connection
  */
  public async dbClose(): Promise<void> {
    await this.dbClient.dbClose();
  }

}
