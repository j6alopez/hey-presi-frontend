import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { City } from './interfaces/city.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private http = inject(HttpClient);
  private baseUrl = environment.backend_base_url;
  private citiesSignal = signal<City[]>([]);

  getCitiesBySubregionCode(isocode: string): Observable<City[]> {
    const url = `${this.baseUrl}/locations/${isocode}/cities`;
    return this.http.get<City[]>(url).pipe(
      tap((cities) => this.citiesSignal.set(cities))
    )
  }

  get cities(): Signal<City[]> {
    return this.citiesSignal.asReadonly();
  }
}
