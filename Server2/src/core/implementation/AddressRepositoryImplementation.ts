import { addressTable } from "../../infrastructure/database/schemas/addressTable";
import { AddressMapper } from "../../shared/utils/mapper/AddressMapper";
import { Address } from "../entities/Address";
import { AddressRepository } from "../repositories/AddressRepository";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class AddressRepositoryImplementation
  extends BaseRepositoryImplementation<Address>
  implements AddressRepository
{
  constructor() {
    super(addressTable, {
      fromEntityToDB: AddressMapper.fromAddressToDB,
      fromDBToEntity: AddressMapper.fromDBtoAddress,
    });
  }
}
