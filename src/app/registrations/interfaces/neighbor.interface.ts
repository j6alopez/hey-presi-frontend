import { CommunityRole } from "../enums/community-role.enum";

export interface Neighbor {
  id?: string;
  community: string;
  firstname: string;
  surnames: string;
  email: string;
  phoneNumber: string;
  user: string;
  roles: CommunityRole[];
}
