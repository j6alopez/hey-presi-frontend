import { UserType } from "../enums/role.enum";

export interface LoginResponseDto {
  isActive: boolean;
  roles: UserType[];
}
