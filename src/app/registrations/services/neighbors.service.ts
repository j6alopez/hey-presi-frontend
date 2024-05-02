import { HttpClient } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Neighbor } from '../interfaces/neighbor.interface';

@Injectable({
  providedIn: 'root'
})
export class NeighborsService {

  private http = inject(HttpClient);
  private baseUrl = environment.backend_base_url;
  private neighborSignal = signal<Neighbor[]>([]);

  getNeighbors(): Observable<Neighbor[]> {
    const url = `${this.baseUrl}/neighbors`
    return this.http.get<Neighbor[]>(url);
  }

  getNeighbor(id: string): Observable<Neighbor> {
    const url = `${this.baseUrl}/neighbors/${id}`
    return this.http.get<Neighbor>(url);
  }

  createNeighbor(neighbor: Neighbor): Observable<Neighbor> {
    const url = `${this.baseUrl}/neighbors`
    return this.http.post<Neighbor>(url, neighbor)
      .pipe(
        tap(neighbor => {
          this.neighborSignal.update(neighbors => [...neighbors, neighbor]);
        })
      );
  }

  updateNeighbor(neighbor: Neighbor): Observable<Neighbor> {
    const { id, ...updateneighbor } = neighbor;
    const url = `${this.baseUrl}/neighbors/${id}`
    return this.http.patch<Neighbor>(url, updateneighbor).pipe(
      tap(neighbor => {
        this.neighborSignal.update(neighbors =>
          neighbors.map(element =>
            element.id === neighbor.id ? neighbor : element)
        );
      }),
    );
  }

  deleteNeighbor(id: string): Observable<Neighbor> {
    const url = `${this.baseUrl}/neighbors/${id}`
    return this.http.delete<Neighbor>(url)
      .pipe(
        tap(() => {
          this.neighborSignal.update(neighbors =>
            neighbors.filter(element => element.id !== id));
        })
      )
      ;
  }

  get neighbors(): Signal<Neighbor[]> {
    return this.neighborSignal.asReadonly();
  }

}