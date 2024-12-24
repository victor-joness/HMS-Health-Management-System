import { BaseEntity } from "./BaseEntity";

export class pharmacies extends BaseEntity {
  constructor(
    deletionDate: string | null,
    modifiedDate: string | null,
    creationDate: string
  ) {
    super(deletionDate, modifiedDate, creationDate);
  }
}
