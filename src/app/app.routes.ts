import { Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'community',
    loadChildren: () => import('./communities/communities.routes').then(r => r.COMMUNITIES_ROUTES)
  },
  {
    path: 'registrations',
    loadChildren: () => import('./registrations/registration.routes').then(r => r.REGISTRATION_ROUTES)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/task.routes').then(r => r.TASK_ROUTES)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
