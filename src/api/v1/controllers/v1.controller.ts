import { Controller, Get, Status } from "@tsed/common";
import { Docs, Summary, Description, Returns, Name } from "@tsed/swagger";
import { StatusCode } from "../../../shared/http/status-code";

@Controller("/")
@Docs("api-v1")
@Name("Base v1")
export class V1Controller {

  @Get("/health")
  @Status(StatusCode.Ok)
  @Summary("Health check endpoint")
  @Description("It is used to check if the API is up and running.")
  @Returns(StatusCode.Ok, { description: "OK" })
  public async health(): Promise<Object> {
    let response =  {'status': 'Ok'}
    return response;
  }

}
