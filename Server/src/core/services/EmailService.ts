import { EmailClient } from "../../infrastructure/external-services/EmailClient";

export interface EmailData {
  to: string;
  subject: string;
  body: string;
}

export class EmailService {
  private readonly emailClient: EmailClient;

  constructor(emailClient: EmailClient) {
    this.emailClient = emailClient;
  }

  async send(data: EmailData): Promise<void> {
    if (!data.to || !data.subject || !data.body) {
      throw new Error("Todos os campos do e-mail são obrigatórios.");
    }

    await this.emailClient.send({
      to: data.to,
      subject: data.subject,
      body: data.body,
    });
  }
}
