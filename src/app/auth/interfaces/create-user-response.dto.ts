import { Role } from '../enums/role.enum';

export interface CreateUserResponseDto {
  id: string;
  firstname: string;
  surnames: string;
  email: string;
  isActive: boolean;
  fullname: string;
  roles: Role[];
}