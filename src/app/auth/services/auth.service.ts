import { ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';

import { CreateUser } from '../interfaces/create-user';
import { environment } from '../../../environments/environment';
import { LoginResponseDto } from '../interfaces/user-response.dto';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { Role } from '../enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = environment.backend_base_url;
  private readonly user = signal<User | undefined>(undefined);

  private readonly USER_ID = "USER_ID";

  get currentUser(): Signal<User | undefined> {
    if (!this.user) {
      return this.user;
    }
    return this.user.asReadonly();
  }

  get currentRole(): Role | undefined {
    if (!this.user) {
      return this.user;
    }
    return this.currentUser()?.role;
  }

  hasPermission(route: ActivatedRouteSnapshot): boolean {
    if (!this.currentUser() || !this.currentUser()?.role) {
      return false;
    }
    const userType = route.data['permission'] as Role;
    return this.currentUser()!.role.includes(userType);
  }

  createUser(user: CreateUser): Observable<User | undefined> {
    const url: string = `${this.baseUrl}/auth/register`;
    return this.http.post<User>(url, user);
  }

  login(email: string, password: string): Observable<boolean> {
    const url: string = `${this.baseUrl}/auth/login`;
    return this.http.post<LoginResponseDto>(url, { email, password })
      .pipe(
        tap(user => this.user.set(user)),
        tap(() => this.persistUserOnLocalStorage()),
        map(user => !!user),
        catchError(() => {
          return of(false);
        })
      );
  }

  isEmailAvailable(email: string): Observable<boolean> {
    const url: string = `${this.baseUrl}/auth/${email}/check-exists`;
    return this.http.head(url)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  public persistUserOnLocalStorage() {
    if (!this.user()) {
      return;
    }
    localStorage.setItem(this.USER_ID, this.user()?.id ?? '');
  }

  logout(): void {
    const url: string = `${this.baseUrl}/auth/logout`;
    this.http.post(url, null).subscribe(() => {
      this.user.set(undefined);
      localStorage.removeItem(this.USER_ID);
    });
  }
}
