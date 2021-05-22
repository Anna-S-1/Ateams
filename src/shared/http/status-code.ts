/* eslint-disable @typescript-eslint/no-magic-numbers */
export enum StatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  RequestTimeout = 408,
  Conflict = 409,
  MissingField = 422,
  ServerError = 500,
}
/* eslint-enable @typescript-eslint/no-magic-numbers */
