export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export class EmailClient {
  async send(data: EmailData): Promise<void> {
    if (!data.to || !data.subject || !data.body) {
      throw new Error("Todos os campos do e-mail são obrigatórios.");
    }

    // Service de email
    console.log(`Enviando e-mail para ${data.to}: ${data.subject}`);
  }
}
