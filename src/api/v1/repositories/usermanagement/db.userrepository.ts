/**
 * @fileOverview DB Repository.
 * @file   db.repository.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import { NotFound } from "ts-httpexceptions";
import { DBUserClient } from "../../clients/usermanagement/dbUserClient";
import { IDBUser } from "../../models/mongoose/usermanagement/user.model";
import { ErrorCode } from "../../../../shared";
/**
  * A class for group DBRepository.
  * @class
*/
export class DBUserRepository {

  private dbUserClient: DBUserClient;
  /**
    * @constructor
    * @property {Instance} representing instances of the class DBRepository.
  */
  constructor({ user = new DBUserClient() } = {}) {
    this.dbUserClient = user;
  }
  // create a new user
  public async saveUser(userModel: IDBUser): Promise<IDBUser> {
    const user: IDBUser = await this.dbUserClient.saveUser(userModel);
    if (user) {
      return user;
    } else {
      throw new NotFound(ErrorCode.NotFoundError);
    }
  }
  public async updateUser(userModel: IDBUser): Promise<IDBUser> {
    const user: IDBUser = await this.dbUserClient.updateUser(userModel);
    if (user) {
      return user;
    } else {
      throw new NotFound(ErrorCode.NotFoundError);
    }
  }
  public async deleteUser(userModel: IDBUser): Promise<IDBUser> {
    const deleteResponse: IDBUser = await this.dbUserClient.deleteUser(userModel);
    if (deleteResponse) {
      return deleteResponse;
    } else {
      throw new NotFound(ErrorCode.NotFoundError);
    }
  }
  public async searchUser(userModel: IDBUser): Promise<IDBUser> {
    const user: IDBUser = await this.dbUserClient.searchUser(userModel);
    if (user) {
      return user;
    } else {
      throw new NotFound(ErrorCode.NotFoundError);
    }
  }

  public async userLogin(userModel: IDBUser): Promise<object> {
    const user: IDBUser = await this.dbUserClient.userLogin(userModel);
    return user;
  }
  public async checkUserPermission(userModel: IDBUser): Promise<IDBUser> {
    const user: IDBUser = await this.dbUserClient.checkUserPermission(userModel);
    return user;
  }

}
