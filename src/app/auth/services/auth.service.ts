import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../../environments/environment';
import { LoginResponseDto } from '../interfaces/user-response.dto';
import { CreateUser } from '../interfaces/create-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = environment.backend_base_url;
  private user?: User;


  get currentUser(): User | undefined {
    if (!this.user) {
      return undefined;
    }
    return structuredClone(this.user);
  }

  createUser(user: CreateUser): Observable<User | undefined> {
    const url: string = `${this.baseUrl}/auth/register`;

    return this.isEmailAvailable(user.email).pipe(
      switchMap(isAvailable => {
        if (!isAvailable) {
          return of(undefined);
        }
        return this.http.post<User>(url, user).pipe(
          catchError(() => {
            return of(undefined);
          })
        );
      })
    );
  }

  login(email: string, password: string): Observable<boolean> {
    const url: string = `${this.baseUrl}/auth/login`;
    return this.http.post<LoginResponseDto>(url, { email, password })
      .pipe(
        map(() => ({ email } as User)),
        tap(user => this.user = user),
        map(user => !!user),
        catchError(() => {
          return of(false);
        })
      );
  }

  isEmailAvailable(email: string): Observable<boolean> {
    const url: string = `${this.baseUrl}/auth/check-exists/${email}`;
    return this.http.head(url)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  logout() {
    this.user = undefined;
  }

}
