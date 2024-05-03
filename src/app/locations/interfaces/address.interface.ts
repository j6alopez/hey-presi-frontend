import { CountryCode } from "../enums/country-codes";

export interface Address {
  street:     string;
  postalCode: string;
  country:    CountryCode;
  region:     string;
  subregion:  string;
  city:       string;
}
