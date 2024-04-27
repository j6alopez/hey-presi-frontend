import { Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page/home-page.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then( r => r.AUTH_ROUTES)
  },
  {
    path: 'neighbors',
    loadChildren: () => import('./neighbors/neighbor.routes').then( r => r.NEIGHBOR_ROUTES)
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
