import { UserType } from "../enums/role.enum";

export interface CreateUser {
  email: string;
  firstname: string;
  surnames: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  roles?: UserType[];
}
