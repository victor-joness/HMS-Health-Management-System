import { User } from "../entities/User";
import { UpdateUserDTO } from "../../shared/utils/dtos/UpdateUserDTO";
import { BaseRepository } from "./BaseRepository"; // Assumindo que o BaseRepository está no mesmo diretório

export interface UserRepository extends BaseRepository<User> {
  getByEmail(email: string): Promise<User | null>;
  updateUser(userDTO: UpdateUserDTO): Promise<User>;
}
