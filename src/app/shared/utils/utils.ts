import { Address } from "@locations/interfaces/address.interface";

export function formatAddress(address: Address) : string {
  return `${address.street}, ${address.streetNumber}, ${address.postalCode} ${address.city.name}, ${address.region.name}`;
}