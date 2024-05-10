import { Routes } from '@angular/router';
import { RegistrationUserPage } from './registrations/pages/registration-user-page/registration-user-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.AUTH_ROUTES)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registrations/registration.routes').then(r => r.REGISTRATION_ROUTES)
  },
  {
    path: 'management',
    loadChildren: () => import('./routes/management.routes').then(r => r.MANAGEMENT_ROUTES)
  },
  {
    path: 'neighbor',
    loadChildren: () => import('./routes/neighbor.routes').then(r => r.NEIGHBOR_ROUTES)
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
