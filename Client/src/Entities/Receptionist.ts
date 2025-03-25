import { UserInfo } from "./UserInfo";

export interface Receptionist {
  Id: number | null;
  UserInfo: UserInfo;
  Address: string;
  JobTitle: string;
  EmergencyAvailability: boolean;
  Notes: string;
  DeletionDate: string | null;
  ModifiedDate: string | null;
  CreationDate: string;
}
