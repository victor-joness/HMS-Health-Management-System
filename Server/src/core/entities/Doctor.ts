import { WorkScheduleDetails } from "./commonTypes/WorkScheduleDetails";
import {
  CertificationEnum,
  SpecialtyEnum,
} from "../../shared/utils/enum/DoctorEnums";
import { DepartmentEnum } from "../../shared/utils/enum/DepartmentEnum";
import { PatientsAssigned } from "./commonTypes/PatientsAssigned";
import { BaseEntity } from "./BaseEntity";

export class Doctor extends BaseEntity {
  constructor(
    public Id: number,
    public UserId: number,
    public Speciality: SpecialtyEnum,
    public MedicalLicenseNumber: string,
    public YearsOfExperience: number,
    public Department: DepartmentEnum,
    public PatientsAssigned: PatientsAssigned[],
    public WorkScheduleDetails: WorkScheduleDetails,
    public Certifications: CertificationEnum[],
    public ResearchPublications: {
      Title: string;
      PublicationDate: string;
      JournalName: string;
    }[],
    public SupervisingNurses: string[],
    public EmergencyAvailability: boolean,
    public Notes: string | null,
    public Address: string,

    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.UserId = UserId;
    this.Speciality = Speciality;
    this.MedicalLicenseNumber = MedicalLicenseNumber;
    this.YearsOfExperience = YearsOfExperience;
    this.Department = Department;
    this.PatientsAssigned = PatientsAssigned;
    this.WorkScheduleDetails = WorkScheduleDetails;
    this.Certifications = Certifications;
    this.ResearchPublications = ResearchPublications;
    this.SupervisingNurses = SupervisingNurses;
    this.EmergencyAvailability = EmergencyAvailability;
    this.Notes = Notes;
    this.Address = Address
  }
}
