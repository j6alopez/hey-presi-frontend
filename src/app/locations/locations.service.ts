import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

import { City } from './interfaces/city.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.backend_base_url;
  private readonly citiesSignal = signal<City[]>([]);

  getCitiesBySubregionCode(isocode: string): Observable<City[]> {
    if(!isocode || isocode === '') {
      this.emptyCities();
      return of([]);
    }
    const url = `${this.baseUrl}/locations/subregions/${isocode}/cities`;
    return this.http.get<City[]>(url).pipe(
      tap((cities) => this.citiesSignal.set(cities))
    )
  }

  get cities(): Signal<City[]> {
    return this.citiesSignal.asReadonly();
  }

  private emptyCities(): void {
    this.citiesSignal.set([]);
  }

}
