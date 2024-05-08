import { CommunityRole } from "../enums/community-role.enum";

export interface CommunityRegistrationForm {
  street: string;
  streetNumber: CommunityRole;
  postalCode: string;
  subregion: string;
  city: number;
}
