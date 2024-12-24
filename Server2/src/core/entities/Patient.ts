import { EmergencyContacts } from "./commonTypes/EmergencyContacts";
import { MedicalHistory } from "./commonTypes/MedicalHistory";
import { WorkInfo } from "./commonTypes/WorkInfo";
import { Report } from "./commonTypes/Report";
import { BaseEntity } from "./BaseEntity";

export class Patient extends BaseEntity {
  constructor(
    public Id: number,
    public UserId: number,
    public AddressId: number,
    public Medications: string[],
    public EmergencyContacts: EmergencyContacts[],
    public InsuranceDetailsId: number,
    public MedicalHistory: MedicalHistory[],
    public PreferredDoctorId: number,
    public LastVisitDate: string | null,
    public CovidVaccinationStatus: boolean,
    public Disabilities: string[],
    public OrganDonor: boolean,
    public AdditionalNotes: string | null,
    public WorkInfo: WorkInfo | null,
    public Report: Report,
    public Identification: null,

    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.UserId = UserId;
    this.AddressId = AddressId;
    this.Medications = Medications;
    this.EmergencyContacts = EmergencyContacts;
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
    this.Identification = Identification;
  }
}