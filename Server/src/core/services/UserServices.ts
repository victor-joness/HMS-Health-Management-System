import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";
import { CreateError } from "../../shared/errors/CreateError";
import { NotFoundError } from "../../shared/errors/NotFoundError";
import { UpdateUserDTO } from "../../shared/utils/dtos/UpdateUserDTO";
import { isNullOrEmpty } from "../../shared/utils/functions/IsNullOrEmpty";
import { PgTransaction } from "drizzle-orm/pg-core";

export class UserServices {
  constructor(private userRepository: UserRepository) {}

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async createUser(user: User, tx: PgTransaction<any, any, any>): Promise<User> {
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
    
    return this.userRepository.create(user, tx);
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
    console.log(id);
    return this.userRepository.getById(id);
  }

  /* async getUserById(id: number): Promise<User | null> {
    // Tenta buscar do cache
    const cacheKey = `${this.USER_CACHE_KEY}:${id}`;
    const cachedUser = await this.cacheService.get<User>(cacheKey);
    
    if (cachedUser) {
      return cachedUser;
    }

    // Se não estiver em cache, busca do banco
    const user = await this.userRepository.getById(id);
    
    if (user) {
      // Salva no cache
      await this.cacheService.set(cacheKey, user, this.CACHE_TTL);
    }

    return user;
  }

  async updateUserStats(userId: number): Promise<void> {
    const statsKey = `${this.USER_CACHE_KEY}:${userId}:stats`;
    await this.cacheService.increment(statsKey);
    await this.cacheService.expire(statsKey, 86400); // 24 horas
  }

  async getUserPreferences(userId: number): Promise<Record<string, any>> {
    const prefsKey = `${this.USER_CACHE_KEY}:${userId}:preferences`;
    return await this.cacheService.getAllHash(prefsKey);
  } */
}
