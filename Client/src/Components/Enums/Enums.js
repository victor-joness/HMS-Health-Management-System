/**
 * Tipo Sanguineo do paciente
 */
export const TipoSanguineo = {
    A_POSITIVO: "A_POSITIVO",
    A_NEGATIVO: "A_NEGATIVO",
    B_POSITIVO: "B_POSITIVO",
    B_NEGATIVO: "B_NEGATIVO",
    O_POSITIVO: "O_POSITIVO",
    O_NEGATIVO: "O_NEGATIVO",
    AB_POSITIVO: "AB_POSITIVO",
    AB_NEGATIVO: "AB_NEGATIVO"
}

/**
 * Gênero do paciente
 */
export const Genero = {
    MASCULINO: "MASCULINO",
    FEMININO: "FEMININO",
    OUTRO: "OUTRO"
}

/**
 * Status do paciente
 */
export const PacienteStatus = {
    NENHUM: "NENHUM",
    LEVE: "LEVE",
    NORMAL: "NORMAL",
    ALTA: "ALTA",
    CRITICA: "CRITICA"
}

/**
 * Fluxo de paciente
 */
export const PacienteFluxo = {
    EM_ESPERA: 1,
    EM_ATENDIMENTO: 2,
    EM_COLETA: 3,
    INTERNADO: 4,
    EM_ANALISE: 5,
    CONCLUIDO: 6,
    NAO_CONCLUIDO: 7
}