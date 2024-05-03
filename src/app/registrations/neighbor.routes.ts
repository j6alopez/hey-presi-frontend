import { Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistrationNeighborPage } from './pages/registration-user-page/registration-user-page.component';
import { RegistrationSuccessfulPage as RegistrationSuccessfulPage } from './pages/registration-completed/registration-completed.component';

export const NEIGHBOR_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'registration',
        children: [
          { path: '', component: RegistrationNeighborPage },
          { path: 'successful', component: RegistrationSuccessfulPage },
          { path: '', redirectTo: 'registration', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
    ]
  },
];
