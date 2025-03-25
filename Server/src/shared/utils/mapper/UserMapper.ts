import { User } from "../../../core/entities/User";

export class UserMapper {
  public static fromUserToDB(user: User): User {
    return user;
  }

  public static fromDBtoUser(user: any): User {
    return new User(
      user.Id,
      user.Name,
      user.Email,
      user.Password,
      user.Role,
      user.HospitalId,
      user.Img,
      user.Gender,
      user.Age,
      user.PhoneNumber,
      user.PhoneEmergency,
      user.DeletionDate,
      user.ModifiedDate,
      user.CreationDate
    );
  }
}
