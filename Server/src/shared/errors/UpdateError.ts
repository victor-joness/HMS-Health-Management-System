export class UpdateError extends Error {
  constructor(message: string = "Erro ao atualizar o recurso.") {
    super(message);
    this.name = "UpdateError";
    Object.setPrototypeOf(this, UpdateError.prototype);
  }
}
