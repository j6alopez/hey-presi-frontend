import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { PatternUtils } from '../../../shared/validators/pattern-utils';
import { ValidatorService } from '../../../shared/validators/validator.service';
import { NeighborsService } from '../../services/neighbors.service';
import { Role } from '../../enums/roles.enum';
import { Neighbor } from '../../interfaces/neighbor.interface';
import { CreateUser } from '../../../auth/interfaces/create-user';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'registration-neighbor-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './registration-neighbor-page.component.html',
  styleUrl: './registration-neighbor-page.component.scss'
})
export class RegistrationNeighborPage {

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly validatorService = inject(ValidatorService);
  private readonly neighborsService = inject(NeighborsService);
  private readonly authService = inject(AuthService);


  public neighborForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.neighborForm = this.formBuilder.group({
      community: [
        '8359da96-2cef-4c92-a92c-fe1eda83d971',
        [
          Validators.required,
          Validators.pattern(PatternUtils.uuidV4)
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
          roles: [Role.RESIDENT],
          user: user!.id
        };
        return this.neighborsService.createNeighbor(neighbor);
      })
    ).subscribe();

    // const email: string = this.loginForm.controls['email'].value!;
    // const password: string = this.loginForm.controls['password'].value!;
    // this.authService.login(email, password).subscribe(
    //   (loginSuccess) => {
    //     console.log('loginSuccess', loginSuccess)
    //     if (loginSuccess) {
    //       const url = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
    //       this.router.navigateByUrl(url);
    //     }
    //     this.loginForm.setErrors({ 'customError': 'Invalid credentials' });
    //     this.loginForm.markAsPending();
    //   });

  }

  isLoginFailed(): string | null {
    return this.neighborForm.getError('customError');
  }

  isNotValidField(field: string): boolean {
    const control = this.neighborForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }
}
