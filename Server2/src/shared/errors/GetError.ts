export class GetError extends Error {
  constructor(message: string = "Erro ao buscar o recurso.") {
    super(message);
    this.name = "GetError";
    Object.setPrototypeOf(this, GetError.prototype);
  }
}
