import { PatientRepository } from "../repositories/PatientRepository";
import { Patient } from "../entities/Patient";
import { patientsTable } from "../../infrastructure/database/schemas/patientsTable";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";
import { PatientMapper } from "../../shared/utils/mapper/PatientMapper";

export class PatientRepositoryImplementation
  extends BaseRepositoryImplementation<Patient>
  implements PatientRepository
{
  constructor() {
    super(patientsTable, {
      fromEntityToDB: PatientMapper.fromPatientToDB,
      fromDBToEntity: PatientMapper.fromDBtoPatient,
    });
  }
}
