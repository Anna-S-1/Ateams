/**
 * @fileOverview Configurator use case class.
 * @file   configurator.usecase.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import { Unauthorized, InternalServerError } from "ts-httpexceptions";
import { IDBConfigurator } from "../models/mongoose/configurator.model";
import { StatusCode, ErrorCode } from "../../../shared";
import { DBRepository } from "../repositories/db.repository";

/**
  * A class for managing ConfiguratorUseCase.
  * @class
*/
export class ConfiguratorUseCase {

  private dbRepository: DBRepository;

  /**
    * @constructor
    * @property {Instance} representing instances of the class ConfiguratorUseCase.
  */
  constructor({ dbRepository = new DBRepository() } = {}) {
    this.dbRepository = dbRepository;
  }

  /**
    * @function
    * @param {Object} representing  authcode and URL type.
    * @returns {IDBConfigurator} representing the configurator model class instance
  */
  public async fetchConfiguratorByAdminToken(adminToken: string): Promise<Record<string, any>> {
    return {};
  }

  /**
    * @function
    * @param {Object} representing  authcode and URL type.
    * @returns {IDBConfigurator} representing the configurator model class instance
  */
  public async fetchConfiguratorByToken(token: string): Promise<IDBConfigurator> {
    try {
      const configurator: IDBConfigurator = await this.dbRepository.fetchConfiguratorByToken(token);
      return configurator;
    } catch (err) {
      switch (err.status) {
      /* -- Configurator NotFound means Unauthorized -- */
      case StatusCode.NotFound: {
        throw new Unauthorized(ErrorCode.Unauthorized);
      }
      case StatusCode.Unauthorized: {
        throw new Unauthorized(ErrorCode.Unauthorized);
      }
      default: {
        throw new InternalServerError(err.message);
      }
      }
    }
  }

  /**
    * @function
    * @param {Object} representing  authcode and URL type.
    * @returns {IDBConfigurator} representing the configurator model class instance
  */
  public async fetchConfiguratorById(configuratorId: string): Promise<Record<string, any>> {
    return {};
  }

}
