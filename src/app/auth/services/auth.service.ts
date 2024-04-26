import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { AuthResponseDTO } from '../interfaces/auth-response-dto';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from '../../../environments/environment';

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

  public createUser( email: string, password: string): Observable<boolean> {
    const url: string = `${this.baseUrl}/users`;
    return this.http.post<AuthResponseDTO>( url, { email, password })
      .pipe(
        map( user => !!user),
        catchError( () => of(false))
      );
  }

  public login( email: string, password: string ): Observable<boolean> {
    const url: string = `${this.baseUrl}/login`;
    return this.http.post<AuthResponseDTO>( url, { email, password })
      .pipe(
          map( ({ user }) => ({ email: user.email } as User )),
          tap( user => this.user = user ),
          map( user => !!user),
          catchError( () => {
            return of(false);
          })
      );
  }

  logout() {
      this.user = undefined;
  }

}
