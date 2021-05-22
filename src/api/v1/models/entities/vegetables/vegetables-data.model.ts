/**
* @fileOverview Vegetables entity model.
* @file Vegetables-entities.model.ts
* @author test1
* @since 1.0.0
* @version 1.0.0
*/
import { Property } from "@tsed/common";
import { Model } from "@tsed/mongoose";

@Model()
export class VegetablesDataEntity {

  @Property()
  color?: string;

  @Property()
  price?: number;

  @Property()
  name?: string;

}
