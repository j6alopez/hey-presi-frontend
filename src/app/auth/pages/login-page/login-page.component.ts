import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { PatternUtils } from '../../../shared/validators/pattern-utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
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
    email: new FormControl('', [Validators.required, Validators.pattern(PatternUtils.email)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.controls['email'].value!;
    const password = this.loginForm.controls['password'].value!;

    this.authService.login(email, password).subscribe((loginSuccess) => {
      if (loginSuccess) {
        const url = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/home';
        this.router.navigateByUrl(url);
      }
      this.loginForm.setErrors({ 'customError': 'Invalid credentials' });
    });
  }

  onLogin() {
    console.log(this.loginForm)
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
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
