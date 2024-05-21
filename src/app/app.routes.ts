import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registrations/registration.routes')
      .then(r => r.REGISTRATION_ROUTES),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes')
      .then(r => r.DASHBOARD_ROUTES),

  },
  {
    path: 'communities',
    loadChildren: () => import('./communities/communities.routes')
      .then(r => r.COMMUNITIES_ROUTES)
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
