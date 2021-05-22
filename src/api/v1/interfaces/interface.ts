/* eslint-disable camelcase */
/**
 * @fileOverview Interfaces.
 * @file   interface.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */
import * as mongoose from "mongoose";
import { DBConnection } from "../../../config/database";
// import { integer } from "aws-sdk/clients/cloudfront";

export interface IUserResponse {
   FirstName?: string;
   LastName?: string;
   ProfilePicture?: string;
   UserType?: string;
   email?: string;
   password?: string;
   pageno?: number;
   limit?: number;
}
export interface IVegetablesResponse {
   _id?: string;
   color?: string;
   price?: number;
   name?: string;
}

export type DBConnectionSettings = {
   dbConfig?: object;
   mongooseInstance?: mongoose;
};

export interface IDBClientSettings {
   dbConnection?: DBConnection;
   product?: mongoose.model;
   configurator?: mongoose.model;
   customer?: mongoose.model;
   user?: mongoose.model;
   vegetables?: mongoose.model;
};

export interface ICustomAuthOptions {
   role?: string;
   action?: string;
};

export type configuratorParams = { adminToken?: string };
export type queryParamForm = { _id?: string };
