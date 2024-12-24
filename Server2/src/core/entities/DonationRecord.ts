import { BaseEntity } from "./BaseEntity";

export class DonationRecord extends BaseEntity{
  constructor(
    public Id: number,
    public DonorId: number,
    public DonationDate: string,
    public QuantityDonated: number,
    public DonationLocation: string,
    public Notes: string | null,
    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.DonorId = DonorId;
    this.DonationDate = DonationDate;
    this.QuantityDonated = QuantityDonated;
    this.DonationLocation = DonationLocation;
    this.Notes = Notes;
  }
}
