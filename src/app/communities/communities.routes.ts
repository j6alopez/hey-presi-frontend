import { Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';

import { RegistrationCommunityPage } from '../registrations/pages/registration-community-page/registration-community-page.component';
import { CommunityPageComponent } from './pages/community-page/community-page.component';

export const COMMUNITIES_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: 'creation', component: RegistrationCommunityPage },
      { path: 'community', component: CommunityPageComponent },
      { path: '**', redirectTo: 'communities' },
    ]
  },
];
