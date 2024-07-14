import { Pagination } from "@shared/interfaces/pagintation.interface";
import { Sorting } from "@shared/interfaces/sorting.interface";
import { Community } from "./community.interface";
import { Address } from "@locations/interfaces/address.interface";


type AddressFields = Omit<Address, 'postalCode' | 'streetNumber'>;
type CommunityFields = Pick<Community, 'createdAt'>;
export type SortingComunityColumns = CommunityFields & AddressFields;
export interface CommunitiesFilter extends Pagination, Sorting<SortingComunityColumns> {
}