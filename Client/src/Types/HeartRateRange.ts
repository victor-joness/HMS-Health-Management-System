import { Gender } from "../Utils/Enum";

export interface HeartRateRange {
  Min: number;
  Max: number;
  Color: string;
  Gender?: Gender;
}
