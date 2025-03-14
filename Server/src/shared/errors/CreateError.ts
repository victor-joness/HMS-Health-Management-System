export class CreateError extends Error {
  constructor(message: string = "Erro ao criar o recurso.") {
    super(message);
    this.name = "CreateError";
    Object.setPrototypeOf(this, CreateError.prototype);
  }
}
