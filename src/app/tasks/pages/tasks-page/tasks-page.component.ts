import { AfterViewInit, Component, OnInit, Signal, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'tasks-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss'
})
export class TasksPageComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
  }

  public tasks!: Signal<Task[]>;

  private readonly tasksService = inject(TasksService);

  ngOnInit(): void {
    this.tasks = computed(() => {
      return this.tasksService.tasks();
    });
  }

  onDelete(id: string | undefined) {
    if (!id) return;
    this.tasksService.deleteTask(id).subscribe();
  }

}
