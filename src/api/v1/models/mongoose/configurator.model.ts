/**
 * @fileOverview Configurator model.
 * @file   configurator.model.ts
 * @author test1
 * @since  1.0.0
 * @version 1.0.0
 */

import * as mongoose from "mongoose";
import { Guid } from "guid-typescript";

export interface IDBConfigurator extends mongoose.Document {
  _id?: string;
  service: string;
  adminToken?: Guid;
}

const ConfiguratorSchema: mongoose.Schema = new mongoose.Schema({
  service: { type: String, required: false, unique: false },
  adminToken: { type: String, required: true }
});

let configuratorSchema = null;
try {
  configuratorSchema = mongoose.model<IDBConfigurator>("Configurator", ConfiguratorSchema);
} catch (e) {
  configuratorSchema = mongoose.model<IDBConfigurator>("Configurator");
}

export default configuratorSchema;
