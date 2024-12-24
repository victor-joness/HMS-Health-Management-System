export enum UserRole {
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

export enum PatientFlow {
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
  ESTAVEL = "Estavel",
  CRITICO = "Critico",
  FALECIDO = "Falecido",
  RECUPERADO = "Recuperado",
  TRANSFERIDO = "Transferido",
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