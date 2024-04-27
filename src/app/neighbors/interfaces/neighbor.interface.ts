import { Role } from "../enums/roles.enum";

export interface Neighbor {
  id?:string;
  community: string;
  firstname: string;
  surnames: string;
  email: string;
  phoneNumber: string;
  user: string;
  roles: Role[];
}
