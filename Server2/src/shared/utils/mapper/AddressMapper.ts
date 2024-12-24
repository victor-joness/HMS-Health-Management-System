import { Address } from "../../../core/entities/Address";

export class AddressMapper {
  public static fromAddressToDB(address: Address): Address {
    return address;
  }

  public static fromDBtoAddress(address: any): Address {
    return new Address(
      address.id,
      address.address,
      address.city,
      address.state,
      address.country,
      address.zip_code
    );
  }
}
