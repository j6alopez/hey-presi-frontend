import { Address } from "@locations/interfaces/address.interface";

export interface Community {
  id: string;
  createdAt?: Date;
  address: Address;
}