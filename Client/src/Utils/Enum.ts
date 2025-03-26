export enum UserRoleEnum {
  ADMIN = 0,
  DOUTOR = 1,
  ENFERMEIRA = 2,
  PACIENTE = 3,
  VIEWER = 4,
  RH = 5,
  FINANCEIRO = 6,
  FARMACIA = 7,
  LABORATORIO = 8,
  RECEPCIONISTA = 9,
}

export enum Gender {
  MASCULINO = "MASCULINO",
  FEMININO = "FEMININO",
  OUTRO = "OUTRO",
}

export enum PatientAtendimentStatus {
  NENHUM = "NENHUM",
  LEVE = "LEVE",
  NORMAL = "NORMAL",
  ALTA = "ALTA",
  CRITICA = "CRITICA",
}

export enum BloodType {
  A_POSITIVO = 1,
  A_NEGATIVO = 2,
  B_POSITIVO = 3,
  B_NEGATIVO = 4,
  O_POSITIVO = 5,
  O_NEGATIVO = 6,
  AB_POSITIVO = 7,
  AB_NEGATIVO = 8,
}

export enum PatientFluxo {
  EM_ESPERA = 1,
  EM_ATENDIMENTO = 2,
  EM_COLETA = 3,
  INTERNADO = 4,
  EM_ANALISE = 5,
  CONCLUIDO = 6,
  NAO_CONCLUIDO = 7,
}

export enum StatusState {
  PENDENTE = "Pendente",
  SUCCESSO = "Sucesso",
  REJEITADA = "Rejeitada",
}

export enum SurgeryStatus {
  PLANEJADA = "Planejada",
  EM_ANDAMENTO = "Em andamento",
  CONCLUIDA = "Concluida",
  CANCELADA = "Cancelada",
  OUTRO = "Outro",
}

export enum PatientStatus {
  NENHUM = "Nenhum",
  ESTAVEL = "Estavel",
  NORMAL = "Normal",
  CRITICO = "Critico",
  FALECIDO = "Falecido",
  RECUPERADO = "Recuperado",
  TRANSFERIDO = "Transferido",
  ALTA= "Alta",
  OUTRO = "Outro",
};

export enum MaritalStatus {
  SOLTEIRO = "Solteiro",
  CASADO = "Casado",
  DIVORCIADO = "Divorciado",
  SEPARADO = "Separado",
  VIUVO = "Viuvo",
  OUTRO = "Outro",
}

export enum TypeFile 
{
  URL = "URL",
  FILE = "FileName",
  INVALID = "Invalid"
}

export enum DepartmentEnum {
  Pediatrics = "Pediatrics",
  Emergency = "Emergency",
  Oncology = "Oncology",
  Surgery = "Surgery",
  ICU = "ICU",
  Cardiology = "Cardiology",
}

export enum SpecialtyEnum {
  NEUROLOGY = "Neurology",
  CARDIOLOGY = "Cardiology",
  DERMATOLOGY = "Dermatology",
  PEDIATRICS = "Pediatrics",
}

export enum CertificationEnum {
  MD = "MD",
  FACS = "FACS",
  PhD = "PhD",
  MBBS = "MBBS",
}

export enum MedicinesTypeEnum{
  TABLET = 1,
  CAPSULE = 2,
  LIQUID = 3,
  INJECTION = 4,
  SYRUP = 5,
  OTHER = 6,
}

export enum PatientAtendimentTypeEnum {
  CONSULTA = 1,
  EXAME = 2,
  CIRURGIA = 3,
  OUTRO = 4,
}

export enum IdentificationType {
  RG = "RG",
  CPF = "CPF",
  PASSAPORTE = "PASSAPORTE",
  CNH = "CNH",
  OUTRO = "OUTRO",  
}

export enum TransactionTypeEnum {
  INCOME = 1,
  EXPENSE = 2
}

export enum TransactionStatusEnum {
  PENDING = 1,
  COMPLETED = 2,
  CANCELED = 3,
  REFUNDED = 4
}

export enum PaymentMethodEnum {
  CREDIT_CARD = 1,
  DEBIT_CARD = 2,
  BANK_TRANSFER = 3,
  PAYPAL = 4,
  CASH = 5,
  PIX = 6,
  BOLETO = 7,
  CRIPTO = 8,
  OTHER = 9,
}
