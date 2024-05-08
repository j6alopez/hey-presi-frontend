import { Injectable, inject } from '@angular/core';

import { Address } from '../locations/interfaces/address.interface';
import { AuthService } from '../auth/services/auth.service';
import { CommunitiesService } from '../communities.service';
import { Community } from '../communities/interfaces/community.interface';
import { CreateUser } from '../auth/interfaces/create-user';
import { Observable, map, tap } from 'rxjs';
import { Unit } from '../units/interfaces/unit.interface';
import { UnitsService } from '../units/units.service';
import { User } from '../auth/interfaces/user';
import { CommunityRole } from './enums/community-role.enum';
import { UserRegistrationForm } from './interfaces/registration-form.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistationsService {
  private authService = inject(AuthService);
  private communitiesService = inject(CommunitiesService);
  private unitsService = inject(UnitsService);

  private registeredUser?: User;
  private registeredCommunity?: Community;
  private registeredUnit?: Unit;

  private userForm?: UserRegistrationForm;

  public createCommunityRoles = [CommunityRole.PRESIDENT];

  public registerUser(userForm: UserRegistrationForm): Observable<boolean> {
    this.userForm = userForm;
    const { communityCode, property, role, ...createUser } = userForm;
    
    return this.authService.createUser(createUser as CreateUser).pipe(
      tap(registeredUser => this.registeredUser = registeredUser),
      map(registeredUser => !!registeredUser)
    )
  }

  public registerCommunity(address: Address): Observable<boolean> {
    return this.communitiesService.createCommunity(address).pipe(
      tap(registeredCommunity => this.registeredCommunity = registeredCommunity),
      map(registeredCommunity => !!registeredCommunity)
    )
  }
}
