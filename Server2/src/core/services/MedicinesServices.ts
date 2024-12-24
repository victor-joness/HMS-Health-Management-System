import { MedicinesRepository } from "../repositories/MedicinesRepository";


export class MedicinesServices {
    constructor(private medicinesRepository: MedicinesRepository) {}

    async getAllMedicines() {
        return await this.medicinesRepository.getAll();
    }

    async createMedicine(medicine: any) {
        return await this.medicinesRepository.create(medicine);
    }

    async deleteMedicine(id: number) {
        return await this.medicinesRepository.delete(id);
    }

    async updateMedicine(medicine: any) {
        return await this.medicinesRepository.update(medicine);
    }

    async getMedicineById(id: number) {
        return await this.medicinesRepository.getById(id);
    }
}