import { z } from 'zod';
import { CertificationEnum, SpecialtyEnum } from "../../../utils/Enum";
import { DepartmentEnum } from "../../../utils/Enum";

const doctorStatusSchema = z.union([
  z.literal('active'),
  z.literal('inactive'),
  z.literal('invited'),
  z.literal('suspended'),
]);
export type DoctorStatus = z.infer<typeof doctorStatusSchema>;

const doctorRoleSchema = z.union([
  z.literal('superadmin'),
  z.literal('admin'),
  z.literal('cashier'),
  z.literal('manager'),
]);
export type DoctorRole = z.infer<typeof doctorRoleSchema>;

const doctorSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  status: doctorStatusSchema,
  role: doctorRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  specialty: z.nativeEnum(SpecialtyEnum),
  medicalLicenseNumber: z.string(),
  yearsOfExperience: z.number(),
  department: z.nativeEnum(DepartmentEnum),
  patientsAssigned: z.array(z.object({
    patientId: z.string(),
    patientName: z.string(),
    patientEmail: z.string(),
  })),
  workScheduleDetails: z.object({
    startTime: z.string(),
    endTime: z.string(),
    days: z.array(z.nativeEnum(DepartmentEnum)),
  }),
  certifications: z.array(z.nativeEnum(CertificationEnum)),
  researchPublications: z.array(z.object({
    title: z.string(),
    publicationDate: z.string(),
    journalName: z.string(),
  })),
  supervisingNurses: z.array(z.string()),
  emergencyAvailability: z.boolean(),
  notes: z.string().nullable(),
  deletionDate: z.string().nullable(),
  modifiedDate: z.string().nullable(),
  creationDate: z.string(),
});
export type Doctor = z.infer<typeof doctorSchema>;

export const doctorListSchema = z.array(doctorSchema);
