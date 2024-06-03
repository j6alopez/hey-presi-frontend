import { CommonModule } from '@angular/common';
import { Component, Signal, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { PatternUtils } from '../../../shared/validators/pattern-utils';
import { User } from '../../interfaces/user';

@Component({
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

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private currentUser!: Signal<User | undefined>;


  public loginForm = new FormGroup({
    email: new FormControl('j6a@gmail.com', [
      Validators.required,
      Validators.pattern(PatternUtils.email)
    ]),
    password: new FormControl('Hcoach!10', [
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
        if (loginSuccess) {
          this.redirectToHome();
          return;
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

  public invalidCredentials(): boolean {
    return this.loginForm.getError('customError') !== null;
  }

  private redirectToHome() {
    if (!this.currentUser()) {
      return;
    }
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    this.currentUser = computed(() => {
      return this.authService.currentUser();
    });

  }

}