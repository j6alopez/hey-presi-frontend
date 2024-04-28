import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, Signal, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TasksService implements OnInit {

  private http = inject(HttpClient);
  private baseUrl = environment.backend_base_url;
  private tasksSignal = signal<Task[]>([]);

  constructor() {
    this.ngOnInit();
  }

  getTasks(): Observable<Task[]> {
    const url = `${this.baseUrl}/tasks`
    return this.http.get<Task[]>(url);
  }

  getTask(id: string): Observable<Task> {
    const url = `${this.baseUrl}/tasks/${id}`
    return this.http.get<Task>(url);
  }

  createTask(task: Task): Observable<Task> {
    const url = `${this.baseUrl}/tasks`
    return this.http.post<Task>(url, task)
      .pipe(
        tap(task => {
          this.tasksSignal.update(tasks => [...tasks, task]);
        })
      );
  }

  updateTask(task: Task): Observable<Task> {
    const { id, ...updateTask } = task;
    const url = `${this.baseUrl}/tasks/${id}`
    return this.http.patch<Task>(url, updateTask).pipe(
      tap(task => {
        this.tasksSignal.update(tasks =>
          tasks.map(element =>
            element.id === task.id ? task : element)
        );
      }),
    );
  }

  deleteTask(id: string): Observable<Task> {
    const url = `${this.baseUrl}/tasks/${id}`
    return this.http.delete<Task>(url)
      .pipe(
        tap(() => {
          this.tasksSignal.update(tasks =>
            tasks.filter(element => element.id !== id));
        })
      )
      ;
  }

  get tasks(): Signal<Task[]> {
    return this.tasksSignal.asReadonly();
  }

  ngOnInit(): void {
    this.getTasks()
      .subscribe(tasks => {
        this.tasksSignal.set(tasks);
      })
  }

}
