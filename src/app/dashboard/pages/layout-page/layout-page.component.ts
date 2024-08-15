import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from '@shared/interfaces/menu-item.interface';
import { SideBarComponent } from '@shared/components/navigation/side-bar/side-bar.component';
import { TopBarComponent } from '@shared/components/navigation/top-bar/top-bar.component';


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
    {
      title: 'Comunidades',
      icon: 'bi bi bi-building',
      route: '/community/main'
    },
    {
      title: 'Cuentas',
      icon: 'bi bi-bank',
      route: '#'
    },
    {
      title: 'Incidencias',
      icon: 'bi bi-building-exclamation',
      route: '/tasks'
    },
    {
      title: 'Servicios',
      icon: 'bi bi-building-gear',
      route: '#'
    },
  ];
}
