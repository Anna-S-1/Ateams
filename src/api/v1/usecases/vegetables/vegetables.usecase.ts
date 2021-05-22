/**
 * @fileOverview vegetables Usecases.
 * @file   vegetables.usecase.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import { DBVegetablesRepository } from "../../../../api/v1/repositories/vegetables/db.vegetablesrepository";
import { IDBVegetables } from "../../models/mongoose/vegetables/vegetables.model";

import * as bcrypt from "bcryptjs";

/**
  * A class for managing VegetablesUseCase.
  * @class
*/
export class VegetablesUseCase {

  private dbVegetablesRepository: DBVegetablesRepository;

  /**
    * @constructor
    * @property {Instance} representing instances of the class FormUseCase.
  */
  constructor({ dbVegetablesRepository = new DBVegetablesRepository() } = {}) {
    this.dbVegetablesRepository = dbVegetablesRepository;
  }
  // fetch all vegetables
  public async fullfetchVegetables(): Promise<IDBVegetables> {
    const vegetables: IDBVegetables = await this.dbVegetablesRepository.fullfetchVegetables();
    return vegetables;
  }
  // fetch vegetables by Id
  public async fetchVegetablesById(vegetablesModel: IDBVegetables): Promise<IDBVegetables> {
    const vegetables: IDBVegetables = await this.dbVegetablesRepository.fetchVegetablesById(vegetablesModel);
    return vegetables;
  }
  public async deleteVegetablesById(vegetablesModel: IDBVegetables): Promise<IDBVegetables> {
    const deleteResponse: IDBVegetables = await this.dbVegetablesRepository.deleteVegetablesById(vegetablesModel);
    console.info("Vegetable Deleted Successfully");
    return deleteResponse;
  }
  // create or update the vegetables
  public async createOrUpdateVegetables(vegetablesModel: IDBVegetables): Promise<IDBVegetables> {
    const vegetables: IDBVegetables = await this.dbVegetablesRepository.createOrUpdateVegetables(vegetablesModel);
    if (vegetables) {
      return vegetables;
    } else {
      console.log("Not found");
    }
    return vegetables;
  }
  public async decryptPassword(plainpassword: string, hashpassword: string): Promise<string | boolean> {
    try {
      let password: string | boolean = await bcrypt.compare(plainpassword, hashpassword);
      return password;
    } catch (e) {
      throw Error(e);
    }
  }

}
