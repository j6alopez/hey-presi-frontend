import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

import { Community } from './interfaces/community.interface';
import { CreateCommunity } from './interfaces/create-community.interface';
import { environment } from '../../environments/environment';
import { Results } from '../shared/interfaces/results.interface';
import { CommunitiesFilter } from './interfaces/communities-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.backend_base_url;

  getCommunities(filter: CommunitiesFilter): Observable<Results<Community>> {
    const { page, size, sortBy, sortOrder } = filter;
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder);

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

  checkBookExistance(bookCode: string): Observable<boolean> {
    const url: string = `${this.baseUrl}/books/${bookCode}/check-exists`;
    return this.http.head(url).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
