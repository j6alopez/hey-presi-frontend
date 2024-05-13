import { Routes } from "@angular/router";

export const ADMINISTRATOR_ROUTES: Routes = [
  {
    path: 'communities',
    loadChildren: () => import('../communities/communities.routes').then(r => r.COMMUNITIES_ROUTES)
  }
]