/**
* @fileOverview User model.
* @file user.model.ts
* @author test1
* @since 1.0.0
* @version 1.0.0
*/
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
export interface IDBUser extends mongoose.Document {

  _id?: string;
  FirstName?: string;
  LastName?: string;
  ProfilePicture?: string;
  UserType?: string;
  email?: string;
  password?: string;
  pageno?: number;
  limit?: number;

}

const UserSchema: mongoose.Schema = new mongoose.Schema({
  FirstName: { type: String },
  LastName: { type: String },
  ProfilePicture: { type: String },
  UserType: { type: String },
  email: { type: String },
  password: { type: String },
  pageno: { type: Number },
  limit: { type: Number }

});
let userSchema = null;
try {
  userSchema = mongoose.model<IDBUser>("User", UserSchema);
} catch (e) {
  userSchema = mongoose.model<IDBUser>("User");
}

export default userSchema;
