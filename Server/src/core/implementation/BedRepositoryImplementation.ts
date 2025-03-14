import { bedsTable } from "../../infrastructure/database/schemas/bedsTable";
import { BedMapper } from "../../shared/utils/mapper/BedMapper";
import { Bed } from "../entities/Bed";
import { BedRepository } from "../repositories/BedRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";


export class BedRepositoryImplementation extends BaseRepositoryImplementation<Bed> implements BedRepository {
    constructor() {
        super(bedsTable, {
            fromEntityToDB: BedMapper.fromBedToDB,
            fromDBToEntity: BedMapper.fromDBToBed
        });
    }
}