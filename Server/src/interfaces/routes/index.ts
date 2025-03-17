import { Router } from "express";
import userRoutes from "./UserRoutes";
import patientsRoutes from "./PatientsRoutes";
import doctorsRoutes from "./DoctorsRoutes";
import pharmaciesRoutes from "./PharmaciesRoutes";
import nursesRoutes from "./NursesRoutes";
import donorsRoutes from "./DonorsRoutes";
import surgerysRoutes from "./surgerysRoutes";
import utilitiesRoutes from "./UtilitiesRoutes";
import medicinesRoutes from "./MedicinesRoutes";
import authRoutes from "./AuthRoutes";
import bedRoutes from "./BedRoutes";
import receptionistsRoutes from "./ReceptionistRoutes";
import humanResourcesEmployees from "./HumanResourcesEmployeeRoutes";

const router = Router();

//feitos
router.use("/users", userRoutes);
router.use("/patients", patientsRoutes);
router.use("/doctors", doctorsRoutes);
router.use("/nurses", nursesRoutes);
router.use("/medicines", medicinesRoutes);
router.use("/donors", donorsRoutes);
router.use("/surgerys", surgerysRoutes);
router.use("/auth", authRoutes);
router.use("/bed", bedRoutes);
router.use("/pharmacies", pharmaciesRoutes);
router.use("/utilities", utilitiesRoutes);
router.use("/receptionists", receptionistsRoutes);
router.use("/humanResourcesEmployees", humanResourcesEmployees);

/* 
router.use("/appointments", appointmentsRoutes);
router.use("/labs", labsRoutes);
router.use("/reports", reportsRoutes);
router.use("/billing", billingRoutes);
router.use("/settings", settingsRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/notifications", notificationsRoutes);
router.use("/security", securityRoutes);
router.use("/statistics", statisticsRoutes);

//outros
/telemedicine -> telemedicina
/audit -> registrar acesso
/rh -> rh
/discharges -> alta
/admissions -> internamento
/schedules -> turnos
/emergency
/ambulance
/ehr -> prontuário eletrônico
*/

export default router;
