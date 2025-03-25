import { UserInfo } from "./UserInfo";

export interface HumanResourcesEmployee {
  Id: number;
  UserInfo: UserInfo;
  Address: string;
  WorkScheduleDetails: {
    Monday: string
    Tuesday: string
    Wednesday: string
    Thursday: string
    Friday: string
    Saturday: string
    Sunday: string
  }
  Notes: string | null;
  DeletionDate: string | null;
  ModifiedDate: string | null;
  CreationDate: string;
}
