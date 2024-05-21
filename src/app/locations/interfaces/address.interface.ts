import { CountryCode } from "../enums/country-codes";
import { Location } from "./location.interface";

export interface Address {
  street:     string;
  streetNumber: string;
  postalCode: string;
  country:    CountryCode;
  region:     Location;
  subregion:  Location;
  city:       Location;
}
