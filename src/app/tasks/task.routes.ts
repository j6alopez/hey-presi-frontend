import { Routes } from "@angular/router";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { TasksPageComponent as TasksPage } from "./pages/tasks-page/tasks-page.component";
import { CreationTaskPage } from "./pages/creation-task-page/creation-task-page";

export const TASK_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: TasksPage },
      { path: 'creation', component: CreationTaskPage }
    ]
  },
  {
    path: '', redirectTo: 'tasks', pathMatch: 'full',
  },
]