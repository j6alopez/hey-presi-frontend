import { Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistrationUserPage } from './pages/registration-user-page/registration-user-page.component';
import { RegistrationSuccessfulPage as RegistrationSuccessfulPage } from './pages/registration-user-completed/registration-completed.component';
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
          { path: 'user', component: RegistrationUserPage },
          { path: 'community', component: RegistrationCommunityPage },
          { path: 'completed', component: RegistrationSuccessfulPage },
        ]
      },
      { path: '', redirectTo: 'registrations', pathMatch: 'full' },
    ]
  },
];
