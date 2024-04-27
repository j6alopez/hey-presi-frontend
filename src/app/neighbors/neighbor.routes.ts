import { Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegistrationPresidentPage } from './pages/register-president-page/registration-president-page.component';
import { RegistrationNeighborPage } from './pages/register-neighbor-page/registration-neighbor-page.component';
import { NeighborTypeSelectionPage } from './pages/neighbor-type-selection-page/neighbor-type-selection-page.component';

export const NEIGHBOR_ROUTES: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'registration',
        children: [
          { path: 'type', component: NeighborTypeSelectionPage },
          { path: 'neighbor', component: RegistrationNeighborPage },
          { path: 'president', component: RegistrationPresidentPage },
          { path: '', redirectTo: 'type', pathMatch: 'full' },
        ]
      },
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
    ]
  },
];
