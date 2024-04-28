import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-side-bar',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  public menuItems: MenuItem[] = [
    { name: 'Comunidad', route: '' },
    { name: 'Cuentas', route: '#' },
    { name: 'Incidencias', route: '/tasks' },
    { name: 'Servicios', route: '#' },
  ];

}

