import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { CommunityRole } from '../../enums/community-role.enum';
import { PatternUtils } from '../../../shared/validators/pattern-utils';
import { RegistrationService } from '../../registation.service';
import { UserRegistrationForm } from '../../interfaces/user-form.interface';
import { ValidatorService } from '../../../shared/validators/validator.service';

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
export class RegistrationUserPage {

  private readonly router = inject(Router);
  private readonly validatorService = inject(ValidatorService);
  private readonly registrationService = inject(RegistrationService);

  private showCommunityToRoles = [CommunityRole.PROPERTY_OWNER, CommunityRole.TENANT];

  public userForm: FormGroup;
  public communityRoles = Object.values(CommunityRole).sort();


  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({

      communityCode: [
        '1bed3f1f-6792-4362-9cb4-d22a3429f326',
        [
          Validators.required,
          Validators.pattern(PatternUtils.uuidV4)
        ]
      ],
      role: [
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
      confirmPassword: [
        'J6alopez@gmail.com',
        [
          Validators.required
        ]
      ],
    },
      {
        validators: this.validatorService.fieldsAreEqual('password', 'confirmPassword')
      }
    );
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userRegistration = this.userForm.value as UserRegistrationForm;
    this.registrationService.registerUser(userRegistration)
      .subscribe(() => {
        if (userRegistration.role === CommunityRole.PRESIDENT) {
          this.router.navigate(['/registrations', 'community']);
        }
        this.router.navigate(['/registrations', 'successful'], { queryParams: { community: userRegistration.communityCode } });
      });
  }

  isNotValidField(field: string): boolean {
    const control = this.userForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }

  showCommunity(): boolean {
    return this.showCommunityToRoles.includes(this.userForm.get('role')?.value);
  }

}

