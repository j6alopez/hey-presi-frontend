import { Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { CommunityPageComponent } from './pages/community-page/community-page.component';

export const COMMUNITIES_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', component: CommunityPageComponent },
      { path: '**', redirectTo: 'community' },
    ]
  },
];
