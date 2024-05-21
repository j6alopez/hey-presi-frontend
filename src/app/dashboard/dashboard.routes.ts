import { Routes } from "@angular/router";

import { loginGuard } from "../auth/guards/login.guard";
import { Role } from "../auth/enums/role.enum";
import { LayoutPageComponent } from "./pages/layout-page/layout-page.component";
import { AdminDashBoardPageComponent } from "./pages/admin-dashboard-page/admin-dashboard-page.component";

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: '',
        component: AdminDashBoardPageComponent,
        canActivate: [],
        data: {
          permission: Role.BACK_OFFICE_ADMIN
        }
      },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
]