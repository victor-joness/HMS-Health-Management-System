import { MedicalHistory } from "./commonTypes/MedicalHistory";
import { Report } from "./commonTypes/Report";
import { BaseEntity } from "./BaseEntity";
import { IdentificationType, PatientAtendimentTypeEnum } from "../../shared/utils/enum/PatientEnums";

export class Patient extends BaseEntity {
  constructor(
    public Id: number,
    public UserId: number,
    public Medications: string[],
    public EmergencyContact: string,
    public InsuranceDetailsId: number,
    public MedicalHistory: MedicalHistory[],
    public PreferredDoctorId: number,
    public LastVisitDate: string | null,
    public CovidVaccinationStatus: boolean,
    public Disabilities: string[],
    public OrganDonor: boolean,
    public AdditionalNotes: string | null,
    public WorkInfo: string,
    public Report: Report,
    public IdentificationNumber: string,
    public IdentificationType: IdentificationType,
    public PatientAtendimentType: PatientAtendimentTypeEnum,
    public Address: string,
    public DeletionDate: string | null,
    public ModifiedDate: string | null,
    public CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.UserId = UserId;
    this.Medications = Medications;
    this.EmergencyContact = EmergencyContact;
    this.InsuranceDetailsId = InsuranceDetailsId;
    this.MedicalHistory = MedicalHistory;
    this.PreferredDoctorId = PreferredDoctorId;
    this.LastVisitDate = LastVisitDate;
    this.CovidVaccinationStatus = CovidVaccinationStatus;
    this.Disabilities = Disabilities;
    this.OrganDonor = OrganDonor;
    this.AdditionalNotes = AdditionalNotes;
    this.WorkInfo = WorkInfo;
    this.Report = Report;
    this.IdentificationNumber = IdentificationNumber;
    this.IdentificationType = IdentificationType;
    this.PatientAtendimentType = PatientAtendimentType;
    this.Address = Address;
  }
}