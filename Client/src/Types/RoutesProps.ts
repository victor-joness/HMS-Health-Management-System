import { UserRole } from "./Auth";

export interface RoutesProps {
    auth: {
      role: UserRole;
    };
    isOpen: boolean;
  }