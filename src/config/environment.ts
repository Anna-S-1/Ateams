/**
* @document
* This file must use es5 syntax due to limitations of Sequelize.
* So, you must keep using `module.exports` and imports as `require("module")`
*/

import * as DotEnv from "dotenv";
import * as GetEnv from "getenv";

DotEnv.config();

export const config = {

  db: {
    url: GetEnv.string("DB_URL")
  },
  project: {
    environment: GetEnv.string("ENVIRONMENT"),
    name: GetEnv.string("PROJECT_NAME"),
    port: GetEnv.int("PORT")
  }
};
