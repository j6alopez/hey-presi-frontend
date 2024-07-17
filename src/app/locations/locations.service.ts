import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { environment } from '../../environments/environment.dev';
import { Location } from './interfaces/location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.base_url;

  getCitiesBySubregionCode(isocode: string): Observable<Location[]> {
    if (!isocode || isocode === '') {
      return of([]);
    }
    const url = `${this.baseUrl}/locations/subregions/${isocode}/cities`;
    return this.http.get<Location[]>(url).pipe();
  }

}
