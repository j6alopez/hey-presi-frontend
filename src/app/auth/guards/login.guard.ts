import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.currentUser()) {
    console.log('User is not logged in')
    router.navigate(['/auth/login']);
  }
  return true;
};
