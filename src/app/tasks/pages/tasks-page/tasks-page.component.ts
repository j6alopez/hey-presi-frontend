import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tasks-page',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.scss'
})
export class TasksPageComponent {

}
