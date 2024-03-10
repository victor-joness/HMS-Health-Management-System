/**
 * Tipo Sanguineo do paciente
 */
export const TipoSanguineo = {
    A_POSITIVO: 1,
    A_NEGATIVO: 2,
    B_POSITIVO: 3,
    B_NEGATIVO: 4,
    O_POSITIVO: 5,
    O_NEGATIVO: 6,
    AB_POSITIVO: 7,
    AB_NEGATIVO: 8
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