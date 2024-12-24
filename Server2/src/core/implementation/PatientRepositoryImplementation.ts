import { PatientRepository } from "../repositories/PatientRepository";
import { Patient } from "../entities/Patient";
import { pacientsTable } from "../../infrastructure/database/schemas/pacientsTable";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";
import { PatientMapper } from "../../shared/utils/mapper/PatientMapper";

export class PatientRepositoryImplementation
  extends BaseRepositoryImplementation<Patient>
  implements PatientRepository
{
  constructor() {
    super(pacientsTable, {
      fromEntityToDB: PatientMapper.fromPatientToDB,
      fromDBToEntity: PatientMapper.fromDBtoPatient,
    });
  }
}
