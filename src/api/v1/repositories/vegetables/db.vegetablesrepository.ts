/**
 * @fileOverview DB Repository.
 * @file   db.repository.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import { NotFound } from "ts-httpexceptions";
import { DBVegetablesClient } from "../../clients/vegetables/dbVegetablesClient";
import { ErrorCode } from "../../../../shared";
import { IDBVegetables } from "../../models/mongoose/vegetables/vegetables.model";
/**
  * A class for group DBRepository.
  * @class
*/
export class DBVegetablesRepository {

  private dbVegetablesClient: DBVegetablesClient;
  /**
    * @constructor
    * @property {Instance} representing instances of the class DBRepository.
  */
  constructor({ vegetables = new DBVegetablesClient() } = {}) {
    this.dbVegetablesClient = vegetables;
  }
  // fetch all vegetables
  public async fullfetchVegetables(): Promise<IDBVegetables> {
    const vegetables: IDBVegetables = await this.dbVegetablesClient.fullfetchVegetables();
    if (vegetables) {
      return vegetables;
    } else {
      throw new NotFound(ErrorCode.NotFoundError);
    }
  }
  // fetch vegetables by Id
  public async fetchVegetablesById(vegetablesModel: IDBVegetables): Promise<IDBVegetables> {
    const vegetables: IDBVegetables = await this.dbVegetablesClient.fetchVegetablesById(vegetablesModel._id);
    if (vegetables) {
      return vegetables;
    } else {
      throw new NotFound(ErrorCode.NotFoundError);
    }
  }
  public async deleteVegetablesById(vegetablesModel: IDBVegetables): Promise<IDBVegetables> {
    const deleteResponse: IDBVegetables = await this.dbVegetablesClient.deleteVegetablesById(vegetablesModel._id);
    if (deleteResponse) {
      return deleteResponse;
    } else {
      throw new NotFound(ErrorCode.NotFoundError);
    }
  }
  // create or update vegetables
  public async createOrUpdateVegetables(vegetablesModel: IDBVegetables): Promise<IDBVegetables> {
    const vegetables: IDBVegetables = await this.dbVegetablesClient.createOrUpdateVegetables(vegetablesModel);
    return vegetables;
  }

}
