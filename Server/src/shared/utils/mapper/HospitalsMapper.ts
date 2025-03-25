import { Hospitals } from "../../../core/entities/Hospitals";

export class HospitalsMapper {
  public static fromHospitalsToDB(hospital: Hospitals): Hospitals {
    return hospital;
  }

  public static fromDBtoHospitals(hospital: any): Hospitals {
    return new Hospitals(
      hospital.Id,
      hospital.Name,
      hospital.Address,
      hospital.City,
      hospital.State,
      hospital.PostalCode,
      hospital.Country,
      hospital.PhoneNumber,
      hospital.Email,
      hospital.Website,
      hospital.IsActive,
      hospital.DeletionDate,
      hospital.ModifiedDate,
      hospital.CreationDate
    );
  }
}
