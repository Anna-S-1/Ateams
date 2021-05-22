import { ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware } from "@tsed/common";
import { config } from "./config";

import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as methodOverride from "method-override";
const session = require("express-session");

const rootDir = __dirname;
const port = config.project.port;
const env = config.project.environment;

@ServerSettings({
  acceptMimes: ["application/json"],
  env,
  mount: {
    "/api/v1/": [
      `${rootDir}/api/v1/controllers/**/*.controller.ts`
    ]
  },
  componentsScan: [
    `${rootDir}/api/v1/middlewares/**/**.ts`
  ],
  port,
  rootDir,
  swagger: [{
    doc: "api-v1",
    path: "/api/v1/docs",
    showExplorer: true
  }]
})

export class Server extends ServerLoader {

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
  */
  public $onMountingMiddlewares(): void {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }))
      .use(session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
      }))
      .use("/", (Req, Res, Next) => {
        Req.session.ip = Req.ip;
        console.log(Req.session); ;
        Next();
      });
  }

  /**
   * This method will be invoke onServerInitError.
  */
  public $onServerInitError(err): void {
    console.error("onServerInitError - ", err);
  }

}
