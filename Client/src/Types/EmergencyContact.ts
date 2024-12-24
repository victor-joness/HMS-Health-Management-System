export interface EmergencyContact {
  Name: string; // Nome do contato de emergência
  Relationship: string; // Relação com o paciente (ex.: pai, mãe, amigo)
  PhoneNumber: string; // Número de telefone do contato
  Email?: string; // E-mail do contato (opcional)
}
