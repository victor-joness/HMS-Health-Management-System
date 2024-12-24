import { BloodTypeEnum } from "../../../shared/utils/enum/BloodTypeEnum";
import { PatientFlow } from "../../../shared/utils/enum/PatientFlow";
import { PatientStatus } from "../../../shared/utils/enum/PatientStatus";

export type Report = {
  Gender: string;
  Weight: number;
  Height: number;
  BloodPressure: string;
  GlucoseLevel: number;
  BloodType: BloodTypeEnum;
  Allergies: string[];
  ChronicDiseases: string[];
  HeartRate: number;
  PatientStatus: PatientStatus;
  PatientFluxo: PatientFlow;
};
