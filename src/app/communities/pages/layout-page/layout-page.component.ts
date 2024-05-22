import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';
import { MenuItem } from '../../../shared/interfaces/menu-item.interface';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    SideBarComponent,
    TopBarComponent
  ],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {
  public menuItems: MenuItem[] = [
    { name: 'Comunidades', route: '/community/main' },
    { name: 'Cuentas', route: '#' },
    { name: 'Incidencias', route: '/tasks' },
    { name: 'Servicios', route: '#' },
  ];

}
