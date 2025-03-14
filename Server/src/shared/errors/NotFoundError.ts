import { HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
  constructor(message: string = "Recurso não encontrado.") {
    super(message, 404);
  }
}
