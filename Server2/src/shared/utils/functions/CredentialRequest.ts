import dotenv from "dotenv";

dotenv.config();

export const CredentialRequest = {
  ADMIN: {
    username: process.env.ADMINCREDENCIAL_NAME as string,
    password: process.env.ADMINCREDENCIAL_PASSWORD as string,
  },
  DOUTOR: {
    username: process.env.DOCTORCREDENCIAL_NAME as string,
    password: process.env.DOCTORCREDENCIAL_PASSWORD as string,
  },
  ENFERMEIRA: {
    username: process.env.NURSECREDENCIAL_NAME as string,
    password: process.env.NURSECREDENCIAL_PASSWORD as string,
  },
  PACIENTE: {
    username: process.env.PATIENTCREDENCIAL_NAME as string,
    password: process.env.PATIENTCREDENCIAL_PASSWORD as string,
  },
  VIEWER: {
    username: process.env.VIEWERCREDENCIAL_NAME as string,
    password: process.env.VIEWERCREDENCIAL_PASSWORD as string,
  },
  RH: {
    username: process.env.RHCREDENCIAL_NAME as string,
    password: process.env.RHCREDENCIAL_PASSWORD as string,
  },
  FINANCEIRO: {
    username: process.env.FINANCIALCREDENCIAL_NAME as string,
    password: process.env.FINANCIALCREDENCIAL_PASSWORD as string,
  },
  FARMACIA: {
    username: process.env.PHARMACIESCREDENCIAL_NAME as string,
    password: process.env.PHARMACIESCREDENCIAL_PASSWORD as string,
  },
  LABORATORIO: {
    username: process.env.LABORATORYCREDENCIAL_NAME as string,
    password: process.env.LABORATORYCREDENCIAL_PASSWORD as string,
  },
  RECEPCIONISTA: {
    username: process.env.RECEPTIONISTCREDENCIAL_NAME as string,
    password: process.env.RECEPTIONISTCREDENCIAL_PASSWORD as string,
  },
};