import { Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistrationCommunityPage } from '../registrations/pages/registration-community-page/registration-community-page.component';

export const COMMUNITIES_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: RegistrationCommunityPage },
      { path: '**', redirectTo: 'communities' },
    ]
  },
];
