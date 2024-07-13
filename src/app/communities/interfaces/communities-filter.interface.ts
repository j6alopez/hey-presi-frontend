import { Pagination } from "@shared/interfaces/pagintation.interface";
import { Sorting } from "@shared/interfaces/sorting.interface";
import { Community } from "./community.interface";

export interface CommunitiesFilter extends Pagination, Sorting<Community> {
}