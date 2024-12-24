import { BaseEntity } from "./BaseEntity";
import { DonationRecord } from "./DonationRecord";

export class Donor extends BaseEntity {
  constructor(
    public Id: number, // Identificador único do doador
    public FullName: string, // Nome completo do doador
    public Email: string, // Endereço de e-mail do doador
    public PhoneNumber: string, // Número de telefone do doador
    public Address: string, // Endereço do doador
    public City: string, // Cidade onde o doador reside
    public State: string, // Estado onde o doador reside
    public ZipCode: string, // CEP do endereço do doador
    public BloodType: string, // Tipo sanguíneo do doador
    public Gender: string, // Gênero do doador
    public Birthday: string, // Data de nascimento do doador
    public IdentificationNumber: string, // Documento de identificação oficial
    public Details: string | null, // Detalhes adicionais ou observações sobre o doador
    public DonationCount: number, // Total de doações realizadas pelo doador
    public DonationHistory: DonationRecord[], // Histórico detalhado de doações
    public LastDonationDate: string | null, // Data da última doação realizada
    public IsActiveDonor: boolean, // Indica se o doador está ativo
    public Notes: string | null, // Observações opcionais sobre o doador

    // Herança de BaseEntity
    DeletionDate: string | null, // Data de exclusão do registro, se aplicável
    ModifiedDate: string | null, // Data da última modificação
    CreationDate: string // Data de criação do registro
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);
    this.Id = Id;
    this.FullName = FullName;
    this.Email = Email;
    this.PhoneNumber = PhoneNumber;
    this.Address = Address;
    this.City = City;
    this.State = State;
    this.ZipCode = ZipCode;
    this.BloodType = BloodType;
    this.Gender = Gender;
    this.Birthday = Birthday;
    this.IdentificationNumber = IdentificationNumber;
    this.Details = Details;
    this.DonationCount = DonationCount;
    this.DonationHistory = DonationHistory;
    this.LastDonationDate = LastDonationDate;
    this.IsActiveDonor = IsActiveDonor;
    this.Notes = Notes;
  }
}