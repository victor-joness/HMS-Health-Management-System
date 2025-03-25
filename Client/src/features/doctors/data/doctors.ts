import { faker } from '@faker-js/faker';
import { CertificationEnum, SpecialtyEnum } from "../../../utils/Enum";
import { DepartmentEnum } from "../../../utils/Enum";

export const doctors = Array.from({ length: 20 }, () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const specialty = faker.helpers.arrayElement(Object.values(SpecialtyEnum)); // Random specialty
  const department = faker.helpers.arrayElement(Object.values(DepartmentEnum)); // Random department

  return {
    id: faker.string.uuid(),
    firstName,
    lastName,
    username: faker.internet
      .username({ firstName, lastName })
      .toLocaleLowerCase(),
    email: faker.internet.email({ firstName }).toLocaleLowerCase(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    status: faker.helpers.arrayElement([
      'active',
      'inactive',
      'invited',
      'suspended',
    ]),
    role: faker.helpers.arrayElement([
      'superadmin',
      'admin',
      'cashier',
      'manager',
    ]),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    specialty,
    medicalLicenseNumber: faker.string.uuid(), // Gerar um UUID como string para o número da licença médica
    yearsOfExperience: faker.number.int({ min: 1, max: 40 }), // Random years of experience between 1 and 40
    department,
    patientsAssigned: Array.from({ length: 3 }, () => ({
      patientId: faker.string.uuid(),
      patientName: faker.person.fullName(),
      patientEmail: faker.internet.email(),
    })),
    workScheduleDetails: {
      startTime: faker.date.past().toISOString(),
      endTime: faker.date.recent().toISOString(),
      days: [faker.helpers.arrayElement(Object.values(DepartmentEnum))], // Random day(s) of the week
    },
    certifications: [faker.helpers.arrayElement(Object.values(CertificationEnum))],
    researchPublications: Array.from({ length: 2 }, () => ({
      title: faker.lorem.sentence(),
      publicationDate: faker.date.past().toISOString(),
      journalName: faker.company.name(),
    })),
    supervisingNurses: [faker.person.firstName()],
    emergencyAvailability: faker.datatype.boolean(),
    notes: faker.lorem.sentence(), // Optional note
    deletionDate: null, // Null by default
    modifiedDate: null, // Null by default
    creationDate: faker.date.recent().toISOString(),
  };
});
