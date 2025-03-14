import { HttpError } from "./HttpError";

export class BadRequestError extends HttpError {
  constructor(message: string = "Requisição inválida.") {
    super(message, 400);
  }
}
