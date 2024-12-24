import { BloodType, PatientStatus, SurgeryStatus } from "../Utils/Enum";

export interface Surgery {
  Id: number; // ID único da cirurgia
  PatientId: number; // ID do paciente
  DoctorId: number; // ID do médico responsável
  BedId: number; // ID da cama/hospitalização associada
  PrimaryAssistantId: number; // ID do assistente principal
  SecondaryAssistantId?: number; // ID do assistente secundário (opcional)
  AnesthetistId?: number; // ID do anestesista responsável (opcional)
  NurseIds?: number[]; // IDs dos enfermeiros envolvidos (array para múltiplos)
  BloodType: BloodType; // Tipo sanguíneo do paciente
  SurgeryType: string; // Tipo de cirurgia (ex.: cardíaca, ortopédica, etc.)
  SurgeryDetails: string; // Detalhes sobre a cirurgia
  SurgeryStatus: SurgeryStatus; // Status atual da cirurgia (planejada, em andamento, concluída, cancelada)
  PatientStatus: PatientStatus; // Status do paciente após a cirurgia
  InstrumentsUsed?: string[]; // Lista de instrumentos utilizados
  MedicationsAdministered?: string[]; // Lista de medicamentos administrados
  Complications?: string; // Detalhes sobre complicações ocorridas
  EstimatedDuration?: number; // Duração estimada da cirurgia (em minutos)
  ActualDuration?: number; // Duração real da cirurgia (em minutos)
  OperatingRoomId: number; // ID da sala de cirurgia
  PreOperativeDiagnosis: string; // Diagnóstico pré-operatório
  PostOperativeDiagnosis?: string; // Diagnóstico pós-operatório
  Notes?: string; // Notas adicionais (campo opcional para livre preenchimento)
  DateOfSurgery: Date; // Data prevista/início da cirurgia
  EndDate?: Date; // Data de término da cirurgia (opcional)
  CreatedAt: Date; // Data de criação do registro
  UpdatedAt?: Date; // Data da última atualização do registro (opcional)
  DeletionDate?: Date; // Data de exclusão do registro (opcional)
}
