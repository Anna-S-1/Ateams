/* eslint-disable @typescript-eslint/no-unused-vars */
/**
* @fileOverview DBUserclient.
* @file dbUserClient.ts
* @author test1
* @since 1.0.0
* @version 1.0.0
*/
import {
  BadRequest, Conflict, InternalServerError, NotFound, Unauthorized
} from "ts-httpexceptions";
import User, { IDBUser } from "../../models/mongoose/usermanagement/user.model";
import { DBConnection } from "../../../../config";
import { ErrorCode } from "../../../../shared";
import * as mongoose from "mongoose";
import { IDBClientSettings } from "../../interfaces/interface";

/**
  * A class for managing DBUserClient.
  * @class
  */
export class DBUserClient {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;

  private dbConnection: DBConnection;
  private User: mongoose.model;
  private Weblayout: mongoose.model;

  /**
* @constructor
* @property {Instance} representing instances of the class DBClient.
*/
  // eslint-disable-next-line max-len
  constructor({ dbConnection = DBConnection.getInstance(), user = User }: IDBClientSettings = {}) {
    this.dbConnection = dbConnection;
    this.User = user;
    // this.Questionlist = Questionlist;
  }
  // save users
  public async saveUser(user: IDBUser): Promise<IDBUser> {
    try {
      const record = await this.User({
        FirstName: user.FirstName,
        LastName: user.LastName,
        ProfilePicture: user.ProfilePicture,
        UserType: user.UserType,
        email: user.email,
        password: user.password
      }).save();
      console.log("rcord =" + JSON.stringify(record));
      return record;
    } catch (err) {
      console.error("save user - Error -", err);
      let errMessage: string = err.name;
      switch (errMessage) {
      case ErrorCode.CastError: {
        throw new BadRequest(ErrorCode.CastError);
      }
      case ErrorCode.MongoError: {
        throw new Conflict(ErrorCode.MongoError);
      }
      case ErrorCode.Unauthorized: {
        throw new Unauthorized(ErrorCode.Unauthorized);
      }
      case ErrorCode.ValidationError: {
        throw new BadRequest(ErrorCode.ValidationError);
      }
      default: {
        throw new InternalServerError(errMessage);
      }
      }
    }
  }
  public async updateUser(user: IDBUser): Promise<IDBUser> {
    try {
      const record: IDBUser = await this.User.findOneAndUpdate({ "_id": user._id },
        {
          $set: {
            "FirstName": user.FirstName,
            "LastName": user.LastName,
            "ProfilePicture": user.ProfilePicture,
            "UserType": user.UserType,
            "email": user.email,
            "password": user.password
          } }
      );
      return record;
    } catch (err) {
      console.error("updateUser - Error -", err);
      let errMessage: string = err.name;
      switch (errMessage) {
      case ErrorCode.CastError: {
        throw new NotFound(ErrorCode.NotFoundError);
      }
      case ErrorCode.MongoError: {
        throw new Conflict(ErrorCode.BadMapping);
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
  public async deleteUser(userModel: IDBUser): Promise<IDBUser> {
    try {
      let deleteResponse: IDBUser;
      deleteResponse = await this.User.deleteOne({ _id: userModel._id });
      return deleteResponse;
    } catch (err) {
      console.error("deleteUser - Error -", err);
      let errMessage: string = err.name;
      switch (errMessage) {
      case ErrorCode.CastError: {
        throw new NotFound(ErrorCode.NotFoundError);
      }
      case ErrorCode.MongoError: {
        throw new Conflict(ErrorCode.BadMapping);
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

  public async searchUser(userModel: IDBUser): Promise<IDBUser> {
    try {
      let one: number = 1;
      let skipData = (userModel.pageno - one) * userModel.limit;
      var query = {};
      var queryFirstName = {};
      var queryLastName = {};
      var queryUserType = {};
      var queryemail = {};
      if (userModel.FirstName) {
        queryFirstName["FirstName"] = userModel.FirstName;
      } if (userModel.LastName) {
        queryLastName["LastName"] = userModel.LastName;
      } if (userModel.email) {
        queryemail["email"] = userModel.email;
      } if (userModel.UserType) {
        queryUserType["UserType"] = userModel.UserType;
      }
      query["$and"] = [queryFirstName, queryLastName, queryUserType, queryemail];
      const record = await this.User.aggregate([
        { "$match": query },
        { "$sort": { "FirstName": -1 } },
        { "$sort": { "LastName": -1 } },
        { "$sort": { "UserType": -1 } },
        {
          "$facet": {
            metadata: [{ $count: "totalRecords" }, { $addFields: { pageno: userModel.pageno } }],
            data: [{ $skip: skipData }, { $limit: userModel.limit }]
          }
        }
      ]);
      return record;
    } catch (err) {
      console.error("users - Error -", err);
      let errMessage: string = err.name;
      switch (errMessage) {
      case ErrorCode.CastError: {
        throw new BadRequest(ErrorCode.CastError);
      }
      case ErrorCode.MongoError: {
        throw new Conflict(ErrorCode.MongoError);
      }
      case ErrorCode.Unauthorized: {
        throw new Unauthorized(ErrorCode.Unauthorized);
      }
      case ErrorCode.ValidationError: {
        throw new BadRequest(ErrorCode.ValidationError);
      }
      default: {
        throw new InternalServerError(errMessage);
      }
      }
    }
  }

  public async userLogin(userModel: IDBUser): Promise<IDBUser> {
    try {
      var data = {
        Username: userModel.FirstName
      };
      const record = await this.User.findOne(data);
      return record;
    } catch (err) {
      console.error("User signin - Error -", err);
      let errMessage: string = err.name;
      switch (errMessage) {
      case ErrorCode.CastError: {
        throw new BadRequest(ErrorCode.CastError);
      }
      case ErrorCode.MongoError: {
        throw new Conflict(ErrorCode.MongoError);
      }
      case ErrorCode.Unauthorized: {
        throw new Unauthorized(ErrorCode.Unauthorized);
      }
      case ErrorCode.ValidationError: {
        throw new BadRequest(ErrorCode.ValidationError);
      }
      default: {
        throw new InternalServerError(errMessage);
      }
      }
    }
  }
  public async checkUserPermission(userModel: IDBUser): Promise<IDBUser> {
    try {
      var data = {
        FirstName: userModel.FirstName,
        "roles.UserType": userModel.UserType,
        "roles.permission.permissionType.permStatus": true
      };
      const record = await this.User.findOne(data, { "roles.permission.$": 1 });
      return record;
    } catch (err) {
      console.error("user signin - Error -", err);
      let errMessage: string = err.name;
      switch (errMessage) {
      case ErrorCode.CastError: {
        throw new BadRequest(ErrorCode.CastError);
      }
      case ErrorCode.MongoError: {
        throw new Conflict(ErrorCode.MongoError);
      }
      case ErrorCode.Unauthorized: {
        throw new Unauthorized(ErrorCode.Unauthorized);
      }
      case ErrorCode.ValidationError: {
        throw new BadRequest(ErrorCode.ValidationError);
      }
      default: {
        throw new InternalServerError(errMessage);
      }
      }
    }
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
