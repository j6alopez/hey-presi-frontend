import { Routes } from "@angular/router";
import { LayoutPageComponent } from "../dashboard/pages/admin/layout-page/layout-page.component";

export const ADMINISTRATOR_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('../dashboard/pages/admin/admin-dashboard-page/admin-dashboard-page.component').then(m => m.AdminDashBoardPageComponent)
      },
      { path: '**', redirectTo: 'administrator', pathMatch: 'full' }
    ]
  }
];
