/**
* @fileOverview User entity model.
* @file User-entities.model.ts
* @author test1
* @since 1.0.0
* @version 1.0.0
*/
import { Property } from "@tsed/common";
import { Model } from "@tsed/mongoose";

@Model()
export class UserDataEntity {

  @Property()
  FirstName?: string;

  @Property()
  LastName?: string;

  @Property()
  ProfilePicture?: string;

  @Property()
  UserType?: string;

  @Property()
  email?: string;

  @Property()
  password?: string;

  @Property()
  pageno?: number;

  @Property()
  limit?: number;

}
