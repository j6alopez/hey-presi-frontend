import { HttpHeaderResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const reqWithCredentials = req.clone({
    withCredentials: true
  });

  return next(reqWithCredentials).pipe(
    catchError((error: HttpHeaderResponse) => {
      if (error.status === 401) {
        authService.logoutOnExpire(); 
      }
      return throwError(() => error);
    })
  )
};
