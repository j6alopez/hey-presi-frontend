import { UserType } from '../enums/role.enum';

export interface CreateUserResponseDto {
  id: string;
  email: string;
  password: string;
  fullname: string;
  roles: UserType[];
}