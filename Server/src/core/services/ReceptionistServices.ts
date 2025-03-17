import { ReceptionistRepository } from "../repositories/ReceptionistRepository";
import { Receptionist } from "../entities/Receptionist";
import { CacheInterface } from "../../infrastructure/cache/CacheInterface/CacheInterface";
import { UserRepository } from "../repositories/UserRepository";

export class ReceptionistService {
  constructor(
    private receptionistRepository: ReceptionistRepository,
    private UserRepository: UserRepository,
    private CacheService: CacheInterface
  ) {}

  async getAllReceptionists(): Promise<Receptionist[]> {
    const cacheKey = "getAllReceptionists";
    const cachedReceptionists = await this.CacheService.get(cacheKey);

    if (cachedReceptionists) {
      try {
        const parsedData = JSON.parse(cachedReceptionists.toString());
        if (Array.isArray(parsedData)) {
          return parsedData as Receptionist[];
        }
      } catch (error) {
        console.error("Erro ao parsear o cache:", error);
      }
    } 
    
    const receptionists = await this.receptionistRepository.getAll();

    const receptionistsWithUserInfo = await Promise.all(
      receptionists.map(async (receptionist) => {
        const userInfo = await this.UserRepository.getById(receptionist.UserId);
        if (userInfo) {
          const { Password, ...userWithoutPassword } = userInfo;
          return { ...receptionist, UserInfo: userWithoutPassword };
        }
        return receptionist;
      })
    );
  
    await this.CacheService.set(cacheKey, JSON.stringify(receptionistsWithUserInfo));
    
    return receptionistsWithUserInfo;
  }

  async createReceptionist(receptionist: Receptionist, tx?: any): Promise<Receptionist> {
    const createdReceptionist = await this.receptionistRepository.create(receptionist, tx);
    await this.CacheService.delete("getAllReceptionists");
    return createdReceptionist;
  }

  async getReceptionistById(id: number): Promise<Receptionist | null> {
    return this.receptionistRepository.getById(id);
  }

  async updateReceptionist(receptionist: Receptionist): Promise<Receptionist> {
    const updatedReceptionist = await this.receptionistRepository.update(receptionist);
    await this.CacheService.delete("getAllReceptionists");
    return updatedReceptionist;
  }

  async deleteReceptionist(id: number): Promise<void> {
    await this.receptionistRepository.delete(id);
    await this.CacheService.delete("getAllReceptionists");
  }

  async getByEmail(email: string): Promise<Receptionist | null>{
    return await this.receptionistRepository.getByEmail(email);
  }
}
