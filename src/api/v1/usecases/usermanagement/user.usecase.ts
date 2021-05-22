/**
 * @fileOverview user Usecases.
 * @file   user.usecase.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import { IDBUser } from "../../models/mongoose/usermanagement/user.model";
import { UserEntity } from "../../models/entities/usermanagement/user-entities.model";
import { DBUserRepository } from "../../../../api/v1/repositories/usermanagement/db.userrepository";

/**
  * A class for managing UserUseCase.
  * @class
*/
export class UserUseCase {

  private dbUserRepository: DBUserRepository;

  /**
    * @constructor
    * @property {Instance} representing instances of the class FormUseCase.
  */
  constructor({ dbUserRepository = new DBUserRepository() } = {}) {
    this.dbUserRepository = dbUserRepository;
  }
  // create a new user
  public async saveUser(userModel: IDBUser): Promise<IDBUser> {
    const user: IDBUser = await this.dbUserRepository.saveUser(userModel);
    if (user) {
      return user;
    } else {
      console.log("Not found");
    }
  }
  public async updateUser(userModel: IDBUser): Promise<UserEntity> {
    const user: IDBUser = await this.dbUserRepository.updateUser(userModel);
    if (user) {
    }
    console.info("user Updated Successfully");
    return user;
  }
  public async deleteUser(userModel: IDBUser): Promise<IDBUser> {
    const deleteResponse: IDBUser = await this.dbUserRepository.deleteUser(userModel);
    if (deleteResponse) {
      console.info("user Deleted Successfully");
      return deleteResponse;
    }
  }
  public async searchUser(userModel: IDBUser): Promise<IDBUser> {
    const user: IDBUser = await this.dbUserRepository.searchUser(userModel);
    return user;
  }

  public async userLogin(userModel: IDBUser): Promise<IDBUser> {
    let fetchUser = await this.dbUserRepository.userLogin(userModel);
    if (!fetchUser) { throw new Error("username and password invalid"); }
    const user: IDBUser = await this.dbUserRepository.checkUserPermission(userModel);
    return user;
  }

}
