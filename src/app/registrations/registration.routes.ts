import { Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistrationNeighborPage } from './pages/registration-user-page/registration-user-page.component';
import { RegistrationSuccessfulPage as RegistrationSuccessfulPage } from './pages/registration-completed/registration-completed.component';
import { RegistrationCommunityPage } from './pages/registration-community-page/registration-community-page.component';

export const REGISTRATION_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: 'user', pathMatch: 'full' },
          { path: 'user', component: RegistrationNeighborPage },
          { path: 'community', component: RegistrationCommunityPage },
          { path: 'successful', component: RegistrationSuccessfulPage },
        ]
      },
      { path: '', redirectTo: 'registrations', pathMatch: 'full' },
    ]
  },
];
