import { CommunityRole } from "../../registrations/enums/community-role.enum";

export interface UnitRoles {
  id?: string;
  role: CommunityRole;
  userId: string;
}
