import { Address } from "../entities/Address";
import { AddressRepository } from "../repositories/AddressRepository";


export class AddressServices {
    constructor(private AddressRepository: AddressRepository) {}

    async createAddress(address: Address): Promise<Address> {
        return this.AddressRepository.create(address);
    }

    async getAllAddresses(): Promise<Address[]> {
        return this.AddressRepository.getAll();
    }

    async getAddressById(id: number): Promise<Address | null> {
        return this.AddressRepository.getById(id);
    }

    async updateAddress(address: Address): Promise<Address> {
        return this.AddressRepository.update(address);
    }

    async deleteAddress(id: number): Promise<void> {
        return this.AddressRepository.delete(id);
    }
}