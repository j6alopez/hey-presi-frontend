import { Routes } from "@angular/router";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { TasksPageComponent } from "./pages/tasks-page/tasks-page.component";

export const TASK_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children:
    [
      {
        path: '',
        component: TasksPageComponent,
      },
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
    ]
  },
];