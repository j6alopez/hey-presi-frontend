import { Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistrationPresidentPage } from './pages/registration-president-page/registration-president-page.component';
import { RegistrationNeighborPage } from './pages/registration-neighbor-page/registration-neighbor-page.component';
import { RegistrationTypePage } from './pages/registration-type-page/registration-type-page.component';
import { RegistrationSuccessfulPage as RegistrationSuccessfulPage } from './pages/registration-completed/registration-completed.component';

export const NEIGHBOR_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'registration',
        children: [
          { path: 'type', component: RegistrationTypePage },
          { path: 'neighbor', component: RegistrationNeighborPage },
          { path: 'president', component: RegistrationPresidentPage },
          { path: 'successful', component: RegistrationSuccessfulPage },
          { path: '', redirectTo: 'type', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
    ]
  },
];