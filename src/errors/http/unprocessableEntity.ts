import {HttpError} from "typescript-rest";

export class UnprocessableEntityError extends HttpError {
    static unprocessableEntityStatusCode: number = 422;
  constructor(message?: string) {
        super("UnprocessableEntityError", UnprocessableEntityError.unprocessableEntityStatusCode, message);
    }
}