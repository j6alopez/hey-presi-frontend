import { Role } from "../enums/role.enum";

export interface User {
    id?: string;
    email?: string;
    firstname?: string;
    surnames?: string;
    phoneNumber?: string;
    isActive: boolean;
    role: Role;
}
