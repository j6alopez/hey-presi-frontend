import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Community } from './interfaces/community.interface';
import { CreateCommunity } from './interfaces/create-community.interface';
import { environment } from '../../environments/environment.dev';
import { Results } from '@shared/interfaces/results.interface';
import { CommunityFilter } from './interfaces/community-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.base_url;
  private communities = signal<Community[]>([]);

  getCommunities(filter: CommunityFilter): Observable<Results<Community>> {
    const { page, size, sortBy, sortOrder, search } = filter;

    let params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

    if (search.length > 0) {
      params = params.set('search', search);
    }

    const url = `${this.baseUrl}/communities`;
    return this.http.get<Results<Community>>(url, { params });
  }

  getCommunityById(id: string): Observable<Community> {
    const url = `${this.baseUrl}/communities/${id}`
    return this.http.get<Community>(url);
  }

  createCommunity(community: CreateCommunity): Observable<Community | undefined> {
    const url = `${this.baseUrl}/communities`

    return this.http.post<Community>(url, community)
      .pipe(
        catchError(() => {
          return of(undefined);
        })
      );
  }

  updateCommunity(id: string, updateCommunity: CreateCommunity): Observable<boolean> {
    const url = `${this.baseUrl}/communities/${id}`;
    return this.http.patch<Community>(url, updateCommunity).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  deleteCommunity(id: string): Observable<boolean> {
    const url = `${this.baseUrl}/communities/${id}`;
    return this.http.delete<Community>(url).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  checkCommunityExistance(communityCode: string): Observable<boolean> {
    const url: string = `${this.baseUrl}/communities/${communityCode}/check-exists`;
    return this.http.head(url).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
