import { CommunityRole } from "@communities/enums/community-role.enum";

export interface BuildingUnitRole {
  id?: string;
  role: CommunityRole;
  userId?: string;
}
