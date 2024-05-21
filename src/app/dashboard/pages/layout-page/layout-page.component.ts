import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from '../../../shared/interfaces/menu-item.interface';
import { SideBarComponent } from '../../../shared/components/side-bar/side-bar.component';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';


@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    SideBarComponent,
    TopBarComponent,
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
