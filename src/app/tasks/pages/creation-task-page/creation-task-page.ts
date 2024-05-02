import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { filter } from 'rxjs';
import { TaskType } from '../../enums/task-type.enum';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../interfaces/task.interface';

@Component({
  selector: 'tasks-creation-task-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule
  ],
  templateUrl: './creation-task-page.html',
  styleUrl: './creation-task-page.scss'
})
export class CreationTaskPage {
  public taskForm: FormGroup;
  public taskTypes = Object.values(TaskType);

  private readonly tasksService = inject(TasksService);
  private readonly router = inject(Router);
  private community = '8359da96-2cef-4c92-a92c-fe1eda83d971';

  constructor(private formBuilder: FormBuilder) {
    this.taskForm = this.formBuilder.group({
      type: [
        TaskType.ACCESS_ISSUE,
        [
          Validators.required,
        ]
      ],
      title: [
        'Titulo de prueba',
        [
          Validators.required,
        ]
      ],
      description: [
        'Descripcion de prueba con 20 caracteres',
        [
          Validators.required,
          Validators.minLength(20)
        ]
      ],
    },
    );
  }

  isNotValidField(field: string): boolean {
    const control = this.taskForm.get(field);
    if (!control) return false;
    return control.touched && control.invalid;
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const task: Task = {
      ...this.taskForm.value,
      community: this.community
    };
    this.tasksService.createTask(task).pipe(
      filter((response) => !!response)
    ).subscribe(() => {
      this.router.navigate(['/tasks']);
    });  
  }

}
