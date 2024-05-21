import { CommunityRole } from "../../communities/enums/community-role.enum";

export interface UnitRoles {
  id?: string;
  role: CommunityRole;
  userId?: string;
}
