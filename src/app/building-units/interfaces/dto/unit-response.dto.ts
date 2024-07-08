export interface UnitResponseDto {
  id:          string;
  name:        string;
  communityId: string;
  unitRoles:   UnitRole[];
}

export interface UnitRole {
  id:   string;
  role: string;
}
