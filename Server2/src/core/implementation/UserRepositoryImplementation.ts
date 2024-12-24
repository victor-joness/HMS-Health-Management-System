import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { usersTable } from "../../infrastructure/database/schemas/usersTable";
import { db } from "../../infrastructure/database/db";
import { sql } from "drizzle-orm";
import { UserMapper } from "../../shared/utils/mapper/UserMapper";
import { UpdateUserDTO } from "../../shared/utils/dtos/UpdateUserDTO";
import { BaseRepositoryImplementation } from "./BaseRepositoryImplementation";

export class UserRepositoryImplementation
  extends BaseRepositoryImplementation<User>
  implements UserRepository
{
  constructor() {
    super(usersTable, {
      fromEntityToDB: UserMapper.fromUserToDB,
      fromDBToEntity: UserMapper.fromDBtoUser,
    });

    this.table = usersTable;
    this.mapper = {
      fromEntityToDB: UserMapper.fromUserToDB,
      fromDBToEntity: UserMapper.fromDBtoUser,
    };
  }

  async updateUser(UserDTO: UpdateUserDTO): Promise<User> {
    const [result] = await db
      .update(usersTable)
      .set({
        Name: UserDTO.Name,
        Email: UserDTO.Email,
        Role: UserDTO.Role,
        Img: UserDTO.Img,
        Age: UserDTO.Age,
        PhoneNumber: UserDTO.PhoneNumber,
        PhoneEmergency: UserDTO.PhoneEmergency,
        ModifiedDate: sql`CURRENT_TIMESTAMP`,
      })
      .where(sql`Id = ${UserDTO.Id}`)
      .returning();

    return UserMapper.fromDBtoUser(result);
  }

  async getByEmail(email: string): Promise<User | null> {
    const result = await db
      .select()
      .from(usersTable)
      .where(sql`email = ${email} AND deletion_date IS NULL`)
      .limit(1);

    return result.length > 0 ? UserMapper.fromDBtoUser(result[0]) : null;
  }
}

