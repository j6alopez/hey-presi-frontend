import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { Community } from './interfaces/community.interface';
import { CreateCommunity } from './interfaces/create-community.interface';
import { environment } from '../../environments/environment';
import { MetaData, Results } from '../shared/interfaces/results.interface';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.backend_base_url;
  private readonly communitiesSignal = signal<Community[]>([]);


  findCommunities(): Observable<MetaData> {
    const url = `${this.baseUrl}/communities`;
    return this.http.get<Results<Community>>(url).pipe(
      tap(({ data }) => {
        this.communitiesSignal.update(() => data);
      }),
      map(({ metadata }) => metadata)
    );
  }

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

  communityExists(communityCode: string): Observable<boolean> {
    const url: string = `${this.baseUrl}/communities/${communityCode}/check-exists`;
    return this.http.head(url)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  get communities(): Signal<Community[]> {
    return this.communitiesSignal.asReadonly();
  }

}
