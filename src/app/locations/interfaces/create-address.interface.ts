import { CountryCode } from "../enums/country-codes";

export interface CreateAddress {
  street:     string;
  streetNumber: string;
  postalCode: string;
  country:    CountryCode;
  subregion:  string;
  city:       number;
}