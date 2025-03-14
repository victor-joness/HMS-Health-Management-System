import { BaseEntity } from "./BaseEntity";
import { WorkScheduleDetails } from "./commonTypes/WorkScheduleDetails";
import { PatientsAssigned } from "./commonTypes/PatientsAssigned";
import { SurgeryTypeEnum } from "../../shared/utils/enum/SurgeryTypeEnum ";
import { SurgeryStatusEnum } from "../../shared/utils/enum/SurgeryStatusEnum";
import { Medicines } from "./Medicines";

export class Surgery extends BaseEntity {
  constructor(
    public Id: number,
    public PatientId: number,
    public SurgeryType: SurgeryTypeEnum,
    public SurgeryDate: string, // Data da cirurgia
    public DoctorId: number,
    public DoctorAuxId: number, // Id do médico auxiliar
    public NurseId: number, // Id do enfermeiro
    public NurseAuxId: number, // Id do enfermeiro auxiliar
    public AnesthesiologistId: number, // Id do anestesista
    public AnesthesiologistAuxId: number, // Id do anestesista auxiliar
    public SurgeryStatus: SurgeryStatusEnum,
    public SurgeryDescription: string | null, // Descrição opcional da cirurgia
    public AnesthesiaType: string, // Tipo de anestesia utilizada
    public SurgeryDuration: number, // Duração da cirurgia em minutos
    public Complications: string | null, // Complicações durante a cirurgia, se houver
    public FollowUpCare: string | null, // Cuidados pós-operatórios
    public PreSurgeryTests: string[], // Testes realizados antes da cirurgia
    public Notes: string | null, // Observações adicionais
    public PatientsAssigned: PatientsAssigned, // Pacientes alocados relacionados a essa cirurgia
    public ScheduleSurgery: WorkScheduleDetails | null, // Detalhes do início da cirurgia
    public ScheduleAnesthesia: WorkScheduleDetails | null, // Detalhes do início da anestesia
    public Medicines: Medicines[], // Medicamentos utilizados durante a cirurgia
    public Procedure: string, // Procedimento cirúrgico
    public SurgeryRoomId: number, // Sala de cirurgia    

    DeletionDate: string | null,
    ModifiedDate: string | null,
    CreationDate: string
  ) {
    super(DeletionDate, ModifiedDate, CreationDate);

    this.Id = Id;
    this.PatientId = PatientId;
    this.SurgeryType = SurgeryType;
    this.SurgeryDate = SurgeryDate;
    this.DoctorId = DoctorId;
    this.DoctorAuxId = DoctorAuxId;
    this.NurseId = NurseId;
    this.NurseAuxId = NurseAuxId;
    this.AnesthesiologistId = AnesthesiologistId;
    this.AnesthesiologistAuxId = AnesthesiologistAuxId;
    this.SurgeryStatus = SurgeryStatus;
    this.SurgeryDescription = SurgeryDescription;
    this.AnesthesiaType = AnesthesiaType;
    this.SurgeryDuration = SurgeryDuration;
    this.Complications = Complications;
    this.FollowUpCare = FollowUpCare;
    this.PreSurgeryTests = PreSurgeryTests;
    this.Notes = Notes;
    this.PatientsAssigned = PatientsAssigned;
  }
}
