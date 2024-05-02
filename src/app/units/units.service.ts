import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { Unit } from './interfaces/unit.interface';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  private http = inject(HttpClient);
  private baseUrl = environment.backend_base_url;
  private unitSignal = signal<Unit[]>([]);

  getUnits(): Observable<Unit[]> {
    const url = `${this.baseUrl}/units`
    return this.http.get<Unit[]>(url);
  }

  getUnit(id: string): Observable<Unit> {
    const url = `${this.baseUrl}/units/${id}`
    return this.http.get<Unit>(url);
  }

  createUnit(unit: Unit): Observable<Unit> {
    const url = `${this.baseUrl}/units`
    return this.http.post<Unit>(url, unit)
      .pipe(
        tap(unit => {
          this.unitSignal.update(units => [...units, unit]);
        })
      );
  }

  updateUnit(unit: Unit): Observable<Unit> {
    const { id, ...updateUnit } = unit;
    const url = `${this.baseUrl}/units/${id}`
    return this.http.patch<Unit>(url, updateUnit).pipe(
      tap(unit => {
        this.unitSignal.update(units =>
          units.map(element =>
            element.id === unit.id ? unit : element)
        );
      }),
    );
  }

  deleteUnit(id: string): Observable<Unit> {
    const url = `${this.baseUrl}/units/${id}`
    return this.http.delete<Unit>(url)
      .pipe(
        tap(() => {
          this.unitSignal.update(units =>
            units.filter(element => element.id !== id));
        })
      )
      ;
  }

  get units(): Signal<Unit[]> {
    return this.unitSignal.asReadonly();
  }
}
