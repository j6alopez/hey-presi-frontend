import { Role } from "../enums/role.enum";

export interface LoginResponseDto {
  email:    string;
  fullname: string;
  isActive: boolean;
  roles:    Role[];
}