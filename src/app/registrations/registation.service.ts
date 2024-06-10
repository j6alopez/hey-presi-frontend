import { Injectable, inject } from '@angular/core';

import { Observable, map, tap } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { CommunitiesService } from '../communities/communities.service';
import { Community } from '../communities/interfaces/community.interface';
import { CommunityRole } from '../communities/enums/community-role.enum';
import { CountryCode } from '../locations/enums/country-codes';
import { CreateCommunity } from '../communities/interfaces/create-community.interface';
import { CreateUser } from '../auth/interfaces/create-user';
import { Unit } from '../units/interfaces/unit.interface';
import { UnitRoles } from '../units/interfaces/unit-roles.interface';
import { UnitsService } from '../units/units.service';
import { User } from '../auth/interfaces/user';
import { UserRegistrationForm } from './interfaces/user-form.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private authService = inject(AuthService);
  private communityService = inject(CommunitiesService);
  private unitsService = inject(UnitsService);

  private registeredUser?: User;
  private registeredCommunity?: Community;
  private userForm?: UserRegistrationForm;

  public createCommunityRoles = [CommunityRole.PRESIDENT];

  public register(userForm: UserRegistrationForm): Observable<boolean> {
    this.cleanRegistration();
    this.userForm = userForm;

    return this.registerUser().pipe(
      map(createdUser => !!createdUser)
    );
  }

  public setUserForm(userForm: UserRegistrationForm): void {
    this.cleanRegistration();
    this.userForm = userForm;
  }

  private registerUser(): Observable<boolean> {
    const { communityCode, property, role, ...createUser } = this.userForm!;
    return this.authService.createUser(createUser as CreateUser)
      .pipe(
        tap(registeredUser => this.registeredUser = registeredUser),
        map(registeredUser => !!registeredUser)
      );
  }

  public registerUnit(): Observable<boolean> {
    const createUnit: Unit = {
      communityId: this.registeredCommunity!.id,
      name: this.userForm!.property,
      unitRoles: [this.buildUnitRole()],
    }

    return this.unitsService.createUnit(createUnit)
      .pipe(
        map(registeredUnit => !!registeredUnit)
      )
  }

  public cleanRegistration(): void {
    this.userForm = undefined;
    this.registeredUser = undefined;
    this.registeredCommunity = undefined;
  }

  public checkValidUser(email: string): Observable<boolean> {
    return this.authService.isEmailAvailable(email)
  }

  public checkCommunityCode(communityCode: string): Observable<boolean> {
    return this.communityService.communityExists(communityCode)
      .pipe(
        map(community => !!community),
      )
  }

  private buildUnitRole(): UnitRoles {
    return {
      role: this.userForm!.role,
      userId: this.registeredUser!.id
    }
  }
}
