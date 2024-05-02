import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { PatternUtils } from '../../../shared/validators/pattern-utils';
import { ValidatorService } from '../../../shared/validators/validator.service';
import { NeighborsService } from '../../services/neighbors.service';
import { CommunityRole } from '../../enums/community-role.enum';
import { Neighbor } from '../../interfaces/neighbor.interface';
import { CreateUser } from '../../../auth/interfaces/create-user';
import { filter, switchMap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'registration-user-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './registration-user-page.component.html',
  styleUrl: './registration-user-page.component.scss'
})
export class RegistrationNeighborPage {

  private readonly router = inject(Router);
  private readonly validatorService = inject(ValidatorService);
  private readonly neighborsService = inject(NeighborsService);
  private readonly authService = inject(AuthService);


  public neighborForm: FormGroup;
  public communityRoles = Object.values(CommunityRole).sort();

  private showCommunityToRoles = [CommunityRole.PROPERTY_OWNER, CommunityRole.TENANT];

  constructor(private formBuilder: FormBuilder) {
    this.neighborForm = this.formBuilder.group({

      communityCode: [
        '8359da96-2cef-4c92-a92c-fe1eda83d971',
        [
          Validators.required,
          Validators.pattern(PatternUtils.uuidV4)
        ]
      ],
      type: [
        "",
        [
          Validators.required,
        ]
      ],
      property: [
        'Primero primera',
        [
          Validators.required,
        ]
      ],
      firstname: [
        'Super Antonio',
        [
          Validators.required
        ]
      ],
      surnames: [
        'López Gómez',
        [
          Validators.required
        ]
      ],
      email: [
        'j6alopezz@gmail.com',
        [
          Validators.required,
          Validators.pattern(PatternUtils.email)
        ]
      ],
      phoneNumber: [
        '644903956',
        [
          Validators.required,
          Validators.pattern(PatternUtils.spanishPhone)
        ]
      ],
      password: [
        '644903956Ab',
        [
          Validators.required,
          Validators.pattern(PatternUtils.password)
        ]
      ],
      passwordConfirm: [
        '644903956Ab',
        [
          Validators.required
        ]
      ],
    },
      {
        validators: this.validatorService.fieldsAreEqual('password', 'passwordConfirm')
      }
    );
  }

  onSubmit() {
    if (this.neighborForm.invalid) {
      this.neighborForm.markAllAsTouched();
      return;
    }

    this.router.navigate(['/neighbors', 'registration', 'successful'], { queryParams: { community: '8359da96-2cef-4c92-a92c-fe1eda83d971' } });

    const { community, email, password, firstname, surnames, phoneNumber } = this.neighborForm.value;
    const user: CreateUser = {
      email,
      password,
      fullname: `${firstname} ${surnames}`,
    }

    this.authService.createUser(user).pipe(
      filter((user) => !!user),
      switchMap((user) => {
        const neighbor: Neighbor = {
          community,
          firstname,
          surnames,
          email,
          phoneNumber,
          roles: [CommunityRole.PROPERTY_OWNER],
          user: user!.id
        };

        return this.neighborsService.createNeighbor(neighbor);
      })
    ).subscribe(
      ({ community }) => {
        this.router.navigate(['/neighbors', 'registration', 'successful'], { queryParams: { community } });

      }
    );
  }

  isNotValidField(field: string): boolean {
    const control = this.neighborForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }

  showCommunity(): boolean  {
    return this.showCommunityToRoles.includes(this.neighborForm.get('type')?.value);
  }
}
