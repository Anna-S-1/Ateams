/**
 * @fileOverview Auth Usecases.
 * @file   auth.usecase.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import { IDBConfigurator } from "../models/mongoose/configurator.model";
import { ConfiguratorUseCase } from "../usecases/configurator.usecase";
import { DBRepository } from "../repositories/db.repository";

/**
  * A class for managing AuthUseCase.
  * @class
*/
export class AuthUseCase {

  private configuratorUseCase: ConfiguratorUseCase;
  private dbRepository: DBRepository;

  /**
    * @constructor
    * @property {Instance} representing instances of the class AuthUseCase.
  */
  constructor({ configuratorUseCase = new ConfiguratorUseCase(),
    dbRepository = new DBRepository() } = {}) {
    this.configuratorUseCase = configuratorUseCase;
    this.dbRepository = dbRepository;
  }

  /**
    * @function
    * @param {Object} representing header authcode and URL type.
    * @returns {IDBConfigurator} representing the configurator model class instance
  */
  public async fetchConfiguratorByToken(token: string): Promise<IDBConfigurator> {
    const configurator: IDBConfigurator = await this.configuratorUseCase.fetchConfiguratorByToken(token);
    return configurator;
  }

  /**
    * @function
    * @param {string} representing formId
    * @returns {IDBConfigurator} representing the configurator model class instance
  */
  public async getTokenPermission(formId: string): Promise<Record<string, any>> {
    return {};
  }

}
