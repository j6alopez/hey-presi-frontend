import { Role } from "../enums/role.enum";

export interface LoginResponseDto {
  isActive: boolean;
  role: Role;
}
