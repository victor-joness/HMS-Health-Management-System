import { User } from "../../core/entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { CreateError } from "../../shared/errors/CreateError";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { UpdateUserDTO } from "../../shared/utils/dtos/UpdateUserDTO";
import { isNullOrEmpty } from "../../shared/utils/functions/IsNullOrEmpty";

export class UserServices {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async createUser(user: User): Promise<User> {
    console.log(user);
    if (
      isNullOrEmpty(user.Name) ||
      isNullOrEmpty(user.Email) ||
      isNullOrEmpty(user.Password) ||
      isNullOrEmpty(user.Role.toString())
    )
      throw new CreateError("Todos os campos devem ser preenchidos");

    const existingUser = await this.userRepository.getByEmail(user.Email);
    if (existingUser) {
      throw new CreateError("Usuário com este e-mail já existe.");
    }
    
    return this.userRepository.create(user);
  }

  async deleteUser(id: number): Promise<any> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new NotFoundError();
    }

    return this.userRepository.delete(id);
  }

  async updateUser(UserDTO: UpdateUserDTO): Promise<any> {
    if (!UserDTO.Id || !UserDTO.Name) {
      throw new Error("ID e Nome são obrigatórios para atualização.");
    }

    const user = await this.userRepository.getById(UserDTO.Id);
    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return await this.userRepository.updateUser(UserDTO);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getByEmail(email);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.getById(id);
  }
}
