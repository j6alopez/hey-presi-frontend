import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { PatternUtils } from '../../../shared/validators/pattern-utils';

@Component({
  selector: 'auth-login-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {

  private authService = inject(AuthService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);


  public loginForm = new FormGroup({
    email: new FormControl('j6alopez@gmail.com', [
      Validators.required,
      Validators.pattern(PatternUtils.email)
    ]),
    password: new FormControl('J6alopez@gmail.com', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(PatternUtils.password),
    ]),
  });

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const email: string = this.loginForm.controls['email'].value!;
    const password: string = this.loginForm.controls['password'].value!;
    this.authService.login(email, password).subscribe(
      (loginSuccess) => {
        console.log('loginSuccess', loginSuccess)
        if (loginSuccess) {
          const url = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(url);
        }
        this.loginForm.setErrors({ 'customError': 'Invalid credentials' });
        this.loginForm.markAsPending();
      });

  }

  isLoginFailed(): string | null {
    return this.loginForm.getError('customError');
  }

  isNotValidField(field: string): boolean {
    const control = this.loginForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }

}
