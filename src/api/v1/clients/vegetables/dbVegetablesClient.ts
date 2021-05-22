/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
* @fileOverview DBVegetablesclient.
* @file dbVegetablesClient.ts
* @author test1
* @since 1.0.0
* @version 1.0.0
*/
import {
  BadRequest, Conflict, InternalServerError, NotFound, Unauthorized
} from "ts-httpexceptions";
import Vegetables, { IDBVegetables } from "../../models/mongoose/vegetables/vegetables.model";
import { DBConnection } from "../../../../config";
import { ErrorCode } from "../../../../shared";
import * as mongoose from "mongoose";
import { IDBClientSettings } from "../../interfaces/interface";

/**
  * A class for managing DBVegetablesClient.
  * @class
  */
export class DBVegetablesClient {

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[x: string]: any;

	private dbConnection: DBConnection;
	private Vegetables: mongoose.model;
	private Weblayout: mongoose.model;

	/**
  * @constructor
  * @property {Instance} representing instances of the class DBClient.
  */
	// eslint-disable-next-line max-len
	constructor({ dbConnection = DBConnection.getInstance(), vegetables = Vegetables }: IDBClientSettings = {}) {
	  this.dbConnection = dbConnection;
	  this.Vegetables = vegetables;
	}
	// list all vegetables
	public async fullfetchVegetables(): Promise<IDBVegetables> {
	  try {
	    const record = await this.Vegetables.find();
	    return record;
	  } catch (err) {
	    console.error(" fullfetchVegetables - Error -", err);
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
	//  fetch a vegetable by Id
	public async fetchVegetablesById(ObjectId: string): Promise<IDBVegetables> {
	  try {
	    const record = await this.Vegetables.find({
	      _id: mongoose.Types.ObjectId(ObjectId)

	    });
	    return record;
	  } catch (err) {
	    console.error("fetchVegetablesById - Error -", err);
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
	public async deleteVegetablesById(objectId: string): Promise<IDBVegetables> {
	  try {
	    let deleteResponse: IDBVegetables;
	    deleteResponse = await this.Vegetables.deleteOne({ _id: objectId });
	    return deleteResponse;
	  } catch (err) {
	    console.error("deleteVegetables - Error -", err);
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
	public async createOrUpdateVegetables(vegetablesmodel: IDBVegetables): Promise<IDBVegetables> {
	  try {
	    let query = { _id: mongoose.Types.ObjectId(vegetablesmodel._id) };
	    let values = {
	      color: vegetablesmodel.color,
	      price: vegetablesmodel.price,
	      name: vegetablesmodel.name
		  };
	    const record = await this.Vegetables.findOneAndUpdate(query,
	      { $set: values }, { new: true, upsert: true });
	    return record;
	  } catch (err) {
	    console.error("createorupdateVegetables - Error -", err);
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
