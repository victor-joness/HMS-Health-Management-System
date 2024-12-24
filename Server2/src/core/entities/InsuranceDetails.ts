import { BaseEntity } from "./BaseEntity";

export class InsuranceDetails extends BaseEntity {
    constructor(

        public Id: number,
        public PacientId: number,
        public InsuranceType: string, //virar enum dps
        public ProviderName: string,
        public PolicyNumber: string,
        public ExpirationDate: string,
        
        deletionDate: string | null,
        modifiedDate: string | null,
        creationDate: string,
    ){
        super(deletionDate, modifiedDate, creationDate);

        this.Id = Id;
        this.PacientId = PacientId;
        this.InsuranceType = InsuranceType;
        this.ProviderName = ProviderName;
        this.PolicyNumber = PolicyNumber;
        this.ExpirationDate = ExpirationDate;
    }
}