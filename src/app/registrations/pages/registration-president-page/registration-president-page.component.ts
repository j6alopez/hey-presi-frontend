import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PatternUtils } from '../../../shared/validators/pattern-utils';
import { ValidatorService } from '../../../shared/validators/validator.service';
import { NeighborsService } from '../../services/neighbors.service';
import { Neighbor } from '../../interfaces/neighbor.interface';
import { CommunityRole } from '../../enums/community-role.enum';

@Component({
  selector: 'register-president-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './registration-president-page.component.html',
  styleUrl: './registration-president-page.component.scss'
})
export class RegistrationPresidentPage {
  private readonly router = inject(Router);
  private readonly validatorService = inject(ValidatorService);
  private readonly neighborsService = inject(NeighborsService);


  public neighborForm = new FormGroup({
    firstname: new FormControl('Super Antonio', [
      Validators.required,
    ]),
    surnames: new FormControl('López Gómez', [
      Validators.required,
    ]),
    email: new FormControl('j6alopezz@gmail.com', [
      Validators.required,
      Validators.pattern(PatternUtils.email)
    ]),
    phoneNumber: new FormControl('644903956', [
      Validators.required,
      Validators.pattern(PatternUtils.spanishPhone)
    ]),
  });

  onSubmit() {
    if (this.neighborForm.invalid) {
      this.neighborForm.markAllAsTouched();
      return;
    }
    const neighbor = this.neighborForm.value as Neighbor;
    neighbor.roles = [CommunityRole.PRESIDENT];

    this.neighborsService.createNeighbor(neighbor).subscribe(
      (neighbor) => {
        console.log('neighbor', neighbor)
      });

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
    this.router.navigateByUrl('/home');

  }

  isLoginFailed(): string | null {
    return this.neighborForm.getError('customError');
  }

  isNotValidField(field: string): boolean {
    return this.validatorService.isNotValidField(this.neighborForm, field);
  }
}
