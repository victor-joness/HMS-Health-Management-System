import { WorkScheduleDetails } from "./commonTypes/WorkScheduleDetails";
import { CertificationNurseEnum } from "../../shared/utils/enum/NurseEnums";
import { DepartmentEnum } from "../../shared/utils/enum/DepartmentEnum";
import { PatientsAssigned } from "./commonTypes/PatientsAssigned";
import { BaseEntity } from "./BaseEntity";

export class Nurse extends BaseEntity {
  constructor(
    public Id: number,
    public UserId: number,
    public Qualifications: string[],
    public YearsOfExperience: number,
    public Department: DepartmentEnum,
    public WorkScheduleDetails: WorkScheduleDetails,
    public PatientsAssigned: PatientsAssigned,
    public Certifications: CertificationNurseEnum[],
    public Supervisor: string | null,
    public EmergencyResponseTraining: boolean,
    public Notes: string | null,

    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.UserId = UserId;
    this.Qualifications = Qualifications;
    this.YearsOfExperience = YearsOfExperience;
    this.Department = Department;
    this.WorkScheduleDetails = WorkScheduleDetails;
    this.PatientsAssigned = PatientsAssigned;
    this.Certifications = Certifications;
    this.Supervisor = Supervisor;
    this.EmergencyResponseTraining = EmergencyResponseTraining;
    this.Notes = Notes;
  }
}
