import { UserType } from "../enums/role.enum";

export interface User {
    id: string;
    email: string;
    firstname: string;
    surnames: string;
    password: string;
    phoneNumber: string;
    isActive: boolean;
    roles: UserType[];
}
