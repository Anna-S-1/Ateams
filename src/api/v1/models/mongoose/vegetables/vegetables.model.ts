/**
* @fileOverview User model.
* @file user.model.ts
* @author test1
* @since 1.0.0
* @version 1.0.0
*/
import { ObjectID } from "@tsed/mongoose";
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface IDBVegetables extends mongoose.Document {

  _id?: string;
  color?: string;
  price?: number;
  name?: string;

}

const VegetablesSchema: mongoose.Schema = new mongoose.Schema({
  _id: { type: ObjectID },
  color: { type: String },
  price: { type: Number },
  name: { type: String }

});
let vegetablesSchema = null;
try {
  vegetablesSchema = mongoose.model<IDBVegetables>("Vegetables", VegetablesSchema);
} catch (e) {
  vegetablesSchema = mongoose.model<IDBVegetables>("Vegetables");
}

export default vegetablesSchema;
