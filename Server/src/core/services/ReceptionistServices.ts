import { ReceptionistRepository } from "../repositories/ReceptionistRepository";
import { Receptionist } from "../entities/Receptionist";

export class ReceptionistService {
  constructor(private receptionistRepository: ReceptionistRepository) {}

  async getAllReceptionists(): Promise<Receptionist[]> {
    return this.receptionistRepository.getAll();
  }

  async createReceptionist(receptionist: Receptionist): Promise<Receptionist> {
    return this.receptionistRepository.create(receptionist);
  }

  async getReceptionistById(id: number): Promise<Receptionist | null> {
    return this.receptionistRepository.getById(id);
  }

  async updateReceptionist(receptionist: Receptionist): Promise<Receptionist> {
    return this.receptionistRepository.update(receptionist);
  }

  async deleteReceptionist(id: number): Promise<void> {
    return this.receptionistRepository.delete(id);
  }
}
