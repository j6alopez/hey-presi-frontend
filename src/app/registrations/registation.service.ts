import { Injectable, inject } from '@angular/core';

import { Observable, catchError, filter, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { CommunitiesService } from '../communities.service';
import { Community } from '../communities/interfaces/community.interface';
import { CommunityRegistrationForm } from './interfaces/community-form.interface';
import { CommunityRole } from './enums/community-role.enum';
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

  public checkUserRegistration(userForm: UserRegistrationForm): Observable<boolean> {
    this.cleanRegistration();
    this.userForm = userForm;
    return this.registerUser();
  }

  public registerWithCommunityCode(userForm: UserRegistrationForm): Observable<boolean> {
    this.cleanRegistration();
    this.userForm = userForm;

    return this.checkCommunityCode(this.userForm.communityCode).pipe(
      catchError(() => of(false)),
      switchMap(communityExists => {
        if (communityExists) {
          this.registerUser().pipe(
            switchMap(() => this.registerUnit())
          )
        }

      }));
  }

  private registerUser(): Observable<boolean> {
    const { communityCode, property, role, ...createUser } = this.userForm!;
    return this.authService.createUser(createUser as CreateUser)
      .pipe(
        tap(registeredUser => this.registeredUser = registeredUser),
        map(registeredUser => !!registeredUser)
      )
  }

  public get communityCode(): string {
    return this.userForm!.communityCode;
  }

  public registerCommunity(communityForm: CommunityRegistrationForm): Observable<boolean> {
    communityForm.city = Number(communityForm.city);

    const createAddress = this.buildAddress(communityForm);

    return this.communityService.createCommunity(createAddress)
      .pipe(
        tap(registeredCommunity => this.registeredCommunity = registeredCommunity),
        map(registeredCommunity => !!registeredCommunity)
      )
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
    return this.authService.g(communityCode)
      .pipe(
        map(community => !!community),
      )
  }

  public checkCommunityCode(communityCode: string): Observable<boolean> {
    return this.communityService.getCommunity(communityCode)
      .pipe(
        map(community => !!community),
      )
  }

  private buildAddress(communityForm: CommunityRegistrationForm): CreateCommunity {
    const createCommunity: CreateCommunity = {
      address: {
        ...communityForm,
        country: CountryCode.ES
      }
    }
    return createCommunity;
  }

  private buildUnitRole(): UnitRoles {
    return {
      role: this.userForm!.role,
      userId: this.registeredUser!.id
    }
  }
}
