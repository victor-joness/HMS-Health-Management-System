import { DepartmentEnum } from "../../shared/utils/enum/DepartmentEnum";
import { BaseEntity } from "./BaseEntity";

export class HumanResourcesEmployee extends BaseEntity {
  constructor(
    public Id: number, // Identificador único do funcionário de RH
    public FullName: string, // Nome completo do funcionário
    public Email: string, // E-mail do funcionário
    public PhoneNumber: string, // Número de telefone do funcionário
    public Address: string, // Endereço do funcionário
    public City: string, // Cidade onde o funcionário reside
    public State: string, // Estado onde o funcionário reside
    public ZipCode: string, // CEP do endereço do funcionário
    public Gender: string, // Gênero do funcionário
    public Birthday: string, // Data de nascimento do funcionário
    public JobTitle: string, // Cargo do funcionário dentro do RH
    public Department: DepartmentEnum, // Departamento no qual o funcionário de RH trabalha
    public WorkSchedule: string, // Horário de trabalho do funcionário de RH
    public IsActive: boolean, // Indica se o funcionário está ativo
    public Notes: string | null, // Observações adicionais sobre o funcionário

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
    this.JobTitle = JobTitle;
    this.Department = Department;
    this.WorkSchedule = WorkSchedule;
    this.IsActive = IsActive;
    this.Notes = Notes;
  }
}
