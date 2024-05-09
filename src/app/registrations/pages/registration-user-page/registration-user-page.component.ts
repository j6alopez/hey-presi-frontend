import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { CommunityRole } from '../../enums/community-role.enum';
import { PatternUtils } from '../../../shared/validators/pattern-utils';
import { RegistrationService } from '../../registation.service';
import { UserRegistrationForm } from '../../interfaces/user-form.interface';
import { ValidatorService } from '../../../shared/validators/validator.service';
import { CommonModule } from '@angular/common';
import { filter, switchMap, tap } from 'rxjs';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'registration-user-page',
  standalone: true,
  imports: [
    CommonModule,
    ErrorMessageComponent,
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
  public showCommunityCode: boolean = false;


  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      communityCode: [
        null,
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
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      return;
    }

    const userForm = this.userForm.value as UserRegistrationForm;

    this.showCommunityCode
      ? this.registrationWithCommunityCode(userForm)
      : this.registrationWithoutCommunityCode(userForm);
  }

  private registrationWithoutCommunityCode(userForm: UserRegistrationForm): void {
    this.registrationService.checkValidUser(userForm.email)
      .subscribe(isValid => {
        if (!isValid) {
          this.userForm.get('email')?.setErrors({ invalidUser: true });
          return;
        }
        this.registrationService.setUserForm(userForm);
        this.router.navigate(['/registrations', 'community']);
      });
  }

  private registrationWithCommunityCode(userForm: UserRegistrationForm): void {
    //UserEmail
    this.registrationService.checkValidUser(userForm.email).pipe(
      tap((isOk) => {
        if (!isOk) {
          this.userForm.get('email')?.setErrors({ invalidUser: true });
        }
      }),
      filter(isOk => isOk),

      switchMap(() => this.registrationService.checkCommunityCode(userForm.communityCode)),
      tap((codeExists) => {
        if (!codeExists) {
          this.userForm.get('communityCode')?.setErrors({ invalidCommunityCode: true });
        }
      }),
      filter(codeExists => codeExists),
    ).subscribe(() => {
      this.registrationService.registerWithCommunityCode(userForm);
      this.router.navigate(['/registrations', 'successful']);

    });
  }

  isNotValidField(field: string): boolean {
    const control = this.userForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }

  onChangeRole(): void {
    this.showCommunityCode = this.showCommunityToRoles.includes(this.userForm.get('role')?.value);
    const communityCodeField = this.userForm.get('communityCode');

    if (!communityCodeField) return;

    this.showCommunityCode
      ? this.validatorService.setFieldAsRequired(communityCodeField, [Validators.pattern(PatternUtils.uuidV4)])
      : this.validatorService.setFieldAsOptional(communityCodeField);
  }
}
