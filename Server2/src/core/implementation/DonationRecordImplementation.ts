import { donationRecordsTable } from "../../infrastructure/database/schemas/donationRecordTable";
import { DonationRecordMapper } from "../../shared/utils/mapper/DonationRecordMapper";
import { DonationRecord } from "../entities/DonationRecord";
import { DonationRecordRepository } from "../repositories/DonationRecordRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";


export class DonationRecordImplementation extends BaseRepositoryImplementation<DonationRecord> implements DonationRecordRepository{

    constructor() {
        super(donationRecordsTable, {
            fromEntityToDB: DonationRecordMapper.fromDonationRecordToDB,
            fromDBToEntity: DonationRecordMapper.fromDBtoDonationRecord,
        });
    }
}