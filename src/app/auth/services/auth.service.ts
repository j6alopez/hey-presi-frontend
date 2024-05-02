import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../../environments/environment';
import { LoginResponseDto } from '../interfaces/user-response.dto';
import { CreateUser } from '../interfaces/create-user';
import { CreateUserResponseDto } from '../interfaces/create-user-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  private baseUrl: string = environment.backend_base_url;
  private user?: User;
  private registeredUser?: User;


  get currentUser(): User | undefined {
    if (!this.user) {
      return undefined;
    }
    return structuredClone(this.user);
  }

  public createUser(user: CreateUser): Observable<User | undefined> {
    const url: string = `${this.baseUrl}/auth/register`;
    return this.http.post<CreateUserResponseDto>(url, user)
      .pipe(
        map(({ id }) => ({ id } as User)),
        catchError(() => {
          return of(undefined);
        })
      );
  }

  public login(email: string, password: string): Observable<boolean> {
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

  logout() {
    this.user = undefined;
  }

}
