import { Routes } from '@angular/router';
import { LayoutPageComponent } from '../dashboard/layout-page/layout-page.component';

export const NEIGHBOR_ROUTES: Routes = [
  {
    path:'',
    component: LayoutPageComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../dashboard/admin-dashboard-page/admin-dashboard-page.component').then(m => m.AdminDashBoardPageComponent)
      }
    ]
  }
]