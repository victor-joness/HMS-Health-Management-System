export interface EmergencyContact {
  Id: number; //ID
  PatientId: number; //ID do Paciente
  Name: string; //Nome
  Relationship: string; //Relação
  PhoneNumber: string; //Telefone
  Email?: string; //Email
}
