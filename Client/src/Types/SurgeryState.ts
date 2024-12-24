import { StatusState } from "../Utils/Enum";
import { Surgery } from "../Entities/Surgery";

export interface SurgeryState {
  surgerys: Surgery[];
  status: StatusState | null;
  createStatus: StatusState | null;
  deleteStatus: StatusState | null;
  updateStatus: StatusState | null;
}
