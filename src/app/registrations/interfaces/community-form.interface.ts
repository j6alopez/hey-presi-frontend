import { CommunityRole } from "../../communities/enums/community-role.enum";

export interface CommunityRegistrationForm {
  street: string;
  streetNumber: CommunityRole;
  postalCode: string;
  subregion: string;
  city: number;
}
