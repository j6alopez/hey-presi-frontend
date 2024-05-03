import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { PatternUtils } from '../../../shared/validators/pattern-utils';
import { ValidatorService } from '../../../shared/validators/validator.service';
import { SpanishSubRegions } from '../../../locations/enums/spanish-regions';

@Component({
  selector: 'registration-community-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './registration-community-page.component.html',
  styleUrl: './registration-community-page.component.scss'
})
export class RegistrationCommunityPage {

  private readonly router = inject(Router);
  private readonly validatorService = inject(ValidatorService);
  private readonly authService = inject(AuthService);


  public communityForm: FormGroup;

  public subregions = Object.values(SpanishSubRegions);

  constructor(private formBuilder: FormBuilder) {
    this.communityForm = this.formBuilder.group({

      street: [
        '1bed3f1f-6792-4362-9cb4-d22a3429f326',
        [
          Validators.required,
          Validators.pattern(PatternUtils.uuidV4)
        ]
      ],
      postalCode: [
        "",
        [
          Validators.required,
        ]
      ],
      region: [
        'Primero primera',
        [
          Validators.required,
        ]
      ],
      subregion: [
        'Super Antonio',
        [
          Validators.required
        ]
      ],
      city: [
        'Super Antonio',
        [
          Validators.required
        ]
      ],
    });
  }

  onSubmit() {
    if (this.communityForm.invalid) {
      this.communityForm.markAllAsTouched();
      return;
    }

  }



  isNotValidField(field: string): boolean {
    const control = this.communityForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }

}

