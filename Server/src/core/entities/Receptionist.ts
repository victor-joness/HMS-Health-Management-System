import { BaseEntity } from "./BaseEntity";

export class Receptionist extends BaseEntity {
  constructor(
    public Id: number, // Identificador único do recepcionista
    public FullName: string, // Nome completo do recepcionista
    public Email: string, // Endereço de e-mail do recepcionista
    public PhoneNumber: string, // Número de telefone do recepcionista
    public Address: string, // Endereço do recepcionista
    public City: string, // Cidade onde o recepcionista reside
    public State: string, // Estado onde o recepcionista reside
    public ZipCode: string, // CEP do endereço do recepcionista
    public Gender: string, // Gênero do recepcionista
    public Birthday: string, // Data de nascimento do recepcionista
    public IdentificationNumber: string, // Documento de identificação oficial
    public JobTitle: string, // Cargo do recepcionista
    public Department: string, // Departamento onde o recepcionista trabalha
    public WorkingHours: string, // Horário de trabalho do recepcionista
    public IsActive: boolean, // Indica se o recepcionista está ativo
    public Notes: string | null, // Observações opcionais sobre o recepcionista

    DeletionDate: string | null, // Data de exclusão do registro, se aplicável
    ModifiedDate: string | null, // Data da última modificação
    CreationDate: string
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
    this.Gender = Gender;
    this.Birthday = Birthday;
    this.IdentificationNumber = IdentificationNumber;
    this.JobTitle = JobTitle;
    this.Department = Department;
    this.WorkingHours = WorkingHours;
    this.IsActive = IsActive;
    this.Notes = Notes;
  }
}
