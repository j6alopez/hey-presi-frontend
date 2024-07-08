import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildingUnitsService {

  private http = inject(HttpClient);
  private baseUrl = environment.backend_base_url;
  private unitSignal = signal<BuildingUnit[]>([]);

  getBuildingUnits(): Observable<BuildingUnit[]> {
    const url = `${this.baseUrl}/building-units`
    return this.http.get<BuildingUnit[]>(url);
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
