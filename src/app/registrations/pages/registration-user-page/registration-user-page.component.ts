import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { PatternUtils } from '../../../shared/validators/pattern-utils';
import { ValidatorService } from '../../../shared/validators/validator.service';
import { CommunityRole } from '../../enums/community-role.enum';
import { CreateUser } from '../../../auth/interfaces/create-user';
import { filter, switchMap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { UnitsService } from '../../../units/units.service';
import { Unit } from '../../../units/interfaces/unit.interface';

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
  private readonly unitsService = inject(UnitsService);
  private readonly authService = inject(AuthService);


  public userForm: FormGroup;
  public communityRoles = Object.values(CommunityRole).sort();

  private showCommunityToRoles = [CommunityRole.PROPERTY_OWNER, CommunityRole.TENANT];

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({

      communityCode: [
        '1bed3f1f-6792-4362-9cb4-d22a3429f326',
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
        'J6alopez@gmail.com',
        [
          Validators.required,
          Validators.pattern(PatternUtils.password)
        ]
      ],
      passwordConfirm: [
        'J6alopez@gmail.com',
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
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const { communityCode, email, password, firstname, surnames, phoneNumber, property } = this.userForm.value;
    const user: CreateUser = {
      email,
      password,
      firstname,
      surnames,
      phoneNumber,
    };

    this.authService.createUser(user).pipe(
      filter((createdUser) => !!createdUser),
      switchMap((createdUser) => {
        const unit: Unit = {
          communityId: communityCode,
          name: property,
          unitRoles: [
            {
              role: this.userForm.get('type')!.value as CommunityRole
            }
          ]
        };
        return this.unitsService.createUnit(unit);
      }),
      filter((createdUnit) => !!createdUnit)
    ).subscribe(() => 
      this.router.navigate(['/neighbors', 'registration', 'successful'], { queryParams: { community: '8359da96-2cef-4c92-a92c-fe1eda83d971' } })
    );
  }



  isNotValidField(field: string): boolean {
    const control = this.userForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }

  showCommunity(): boolean {
    return this.showCommunityToRoles.includes(this.userForm.get('type')?.value);
  }
}
