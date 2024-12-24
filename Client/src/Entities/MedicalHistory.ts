export interface MedicalHistory {
  Id: number; //Id
  PatientId: number; //Id do paciente
  Condition: string; //Condição médica
  DiagnosisDate: string; //Data de diagnóstico
  Notes?: string; //Observações
}
