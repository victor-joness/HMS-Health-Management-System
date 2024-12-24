import { BloodType, Gender, MaritalStatus } from "../Utils/Enum";
import { EmergencyContact } from "./EmergencyContact";
import { MedicalHistory } from "./MedicalHistory";

export interface Paciente {
  // Identificação e informações básicas
  Id: number; // ID único do paciente
  Name: string; // Nome completo
  Email: string; // E-mail do paciente
  PhoneNumber: string; // Número de telefone
  Gender: Gender; // Gênero do paciente (ver enum Gender abaixo)
  DocumentNumber: string; // Número do documento (ex.: RG, CPF)
  BloodType: BloodType; // Tipo sanguíneo
  BirthDate: Date; // Data de nascimento

  // Endereço e localização
  Address: string; // Endereço completo
  City: string; // Cidade
  State: string; // Estado
  Country: string; // País
  ZipCode: string; // CEP ou código postal

  // Informações adicionais
  MaritalStatus?: MaritalStatus; // Estado civil (opcional)
  Occupation?: string; // Ocupação ou profissão (opcional)
  EmergencyContact?: EmergencyContact; // Contato de emergência (estrutura detalhada abaixo)
  MedicalHistory?: MedicalHistory[]; // Histórico médico (ver estrutura abaixo)
  Allergies?: string[]; // Lista de alergias do paciente
  ChronicDiseases?: string[]; // Doenças crônicas
  Medications?: string[]; // Medicamentos em uso
  InsuranceProvider?: string; // Nome do plano de saúde ou seguradora
  PolicyNumber?: string; // Número da apólice ou do plano de saúde

  // Dados para acompanhamento
  ProfilePicture?: string | null; // URL ou caminho para a foto de perfil
  Weight?: number; // Peso do paciente (em kg)
  Height?: number; // Altura do paciente (em cm)
  BMI?: number; // Índice de Massa Corporal (calculado ou registrado)
  Notes?: string; // Notas adicionais

  // Controle de auditoria
  CreatedAt: Date; // Data de criação do registro
  UpdatedAt?: Date; // Data da última atualização (opcional)

  // Controle de exclusão
  DeletionDate?: Date; // Data de exclusão (opcional)
}
