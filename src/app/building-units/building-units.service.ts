import { Results } from './../shared/interfaces/results.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';

import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.dev';

import { BuildingUnit } from './interfaces/building-unit.interface';
import { UpsertBuildingUnitsBulk } from './interfaces/bulk-upsert-building-units.interface';
import { BuildingUnitsFilter } from './interfaces/building-units-filter.interface';

@Injectable({
  providedIn: 'root'
})
export class BuildingUnitsService {

  private http = inject(HttpClient);
  private baseUrl = environment.base_url;
  private unitSignal = signal<BuildingUnit[]>([]);

  getBuildingUnits(filter: BuildingUnitsFilter): Observable<Results<BuildingUnit>> {
    const { page, size, sortBy, sortOrder, communityId } = filter;
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder)
      .set('communityId', communityId || '');

    const url = `${this.baseUrl}/building-units`
    return this.http.get<Results<BuildingUnit>>(url, { params });
  }

  getBuildingUnit(id: string): Observable<BuildingUnit> {
    const url = `${this.baseUrl}/building-units/${id}`
    return this.http.get<BuildingUnit>(url);
  }

  createBuildingUnit(unit: BuildingUnit): Observable<BuildingUnit> {
    const url = `${this.baseUrl}/building-units`
    return this.http.post<BuildingUnit>(url, unit)
      .pipe(
        tap(unit => {
          this.unitSignal.update(units => [...units, unit]);
        })
      );
  }

  bulkUpsertBuildingUnits(units: BuildingUnit[]): Observable<boolean> {
    const bulkUpsert: UpsertBuildingUnitsBulk = {
      buildingUnits: units
    }
    const url = `${this.baseUrl}/building-units/bulk-upsert`
    return this.http.post<BuildingUnit[]>(url, bulkUpsert)
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  updateBuildingUnit(unit: BuildingUnit): Observable<BuildingUnit> {
    const { id, ...updateUnit } = unit;
    const url = `${this.baseUrl}/building-units/${id}`
    return this.http.patch<BuildingUnit>(url, updateUnit).pipe(
      tap(unit => {
        this.unitSignal.update(units =>
          units.map(element =>
            element.id === unit.id ? unit : element)
        );
      }),
    );
  }

  deleteBuildingUnit(id: string): Observable<BuildingUnit> {
    const url = `${this.baseUrl}/building-units/${id}`
    return this.http.delete<BuildingUnit>(url)
      .pipe(
        tap(() => {
          this.unitSignal.update(units =>
            units.filter(element => element.id !== id));
        })
      )
      ;
  }
}
