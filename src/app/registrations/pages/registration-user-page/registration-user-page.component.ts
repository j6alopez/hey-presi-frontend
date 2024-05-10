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

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      communityCode: [
        '',
        [
          Validators.required,
          Validators.pattern(PatternUtils.uuidV4)
        ]
      ],
      role: [
        '',
        [
          Validators.required,
        ]
      ],
      property: [
        '',
        [
          Validators.required,
          this.validatorService.noWhitespaceValidator
        ]
      ],
      firstname: [
        '',
        [
          Validators.required,
          this.validatorService.noWhitespaceValidator
        ]
      ],
      surnames: [
        '',
        [
          Validators.required,
          this.validatorService.noWhitespaceValidator
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(PatternUtils.email)
        ]
      ],
      phoneNumber: [
        '',
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

    const userForm = this.userForm.value as UserRegistrationForm;

    this.registrationWithCommunityCode(userForm);
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
      this.registrationService.registerWithCommunityCode(userForm).pipe(
        // filter(isOk => isOk),
      ).subscribe(() => {
        this.router.navigate(['/registrations', 'completed']);
      });
    })
  }

  isNotValidField(field: string): boolean {
    const control = this.userForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }

}
