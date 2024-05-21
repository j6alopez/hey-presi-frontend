import { CommunityRole } from "../../communities/enums/community-role.enum";

export interface UserRegistrationForm {
  communityCode: string;
  role: CommunityRole;
  property: string;
  firstname: string;
  surnames: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
}
