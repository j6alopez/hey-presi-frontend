import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { Community } from './communities/interfaces/community.interface';
import { CreateCommunity } from './communities/interfaces/create-community.interface';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {

  private http = inject(HttpClient);
  private baseUrl = environment.backend_base_url;
  private communitiesSignal = signal<Community[]>([]);


  getCommunity(id: string): Observable<Community> {
    const url = `${this.baseUrl}/communities/${id}`
    return this.http.get<Community>(url);
  }

  createCommunity(address: CreateCommunity): Observable<Community | undefined> {
    const url = `${this.baseUrl}/communities`
    console.log(address);
    return this.http.post<Community>(url, address)
      .pipe(
        catchError(() => {
          return of(undefined);
        })
      );
  }

  updateCommunity(community: Community): Observable<Community> {
    const { id, ...updateCommunity } = community;
    const url = `${this.baseUrl}/communities/${id}`;
    return this.http.patch<Community>(url, updateCommunity).pipe(
      tap(community => {
        this.communitiesSignal.update(communities =>
          communities.map(element =>
            element.id === community.id ? community : element)
        );
      }),
    );
  }

  deleteCommunity(id: string): Observable<Community> {
    const url = `${this.baseUrl}/communities/${id}`;
    return this.http.delete<Community>(url)
      .pipe(
        tap(() => {
          this.communitiesSignal.update(communities =>
            communities.filter(element => element.id !== id));
        })
      );
  }

  get communities(): Signal<Community[]> {
    return this.communitiesSignal.asReadonly();
  }

}
