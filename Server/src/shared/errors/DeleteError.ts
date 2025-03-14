export class DeleteError extends Error {
  constructor(message: string = "Erro ao excluir o recurso.") {
    super(message);
    this.name = "DeleteError";
    Object.setPrototypeOf(this, DeleteError.prototype);
  }
}
