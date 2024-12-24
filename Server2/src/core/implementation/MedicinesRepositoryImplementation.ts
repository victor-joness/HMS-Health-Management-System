import { medicinesTable } from "../../infrastructure/database/schemas/medicinesTable";
import { MedicinesMapper } from "../../shared/utils/mapper/MedicinesMapper";
import { Medicines } from "../entities/Medicines";
import { MedicinesRepository } from "../repositories/MedicinesRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class MedicinesRepositoryImplementation
  extends BaseRepositoryImplementation<Medicines>
  implements MedicinesRepository
{
  constructor() {
    super(medicinesTable, {
      fromEntityToDB: MedicinesMapper.fromMedicinesToDB,
      fromDBToEntity: MedicinesMapper.fromDBtoMedicines,
    });
  }
}
