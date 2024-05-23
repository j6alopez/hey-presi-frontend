import { Component, OnInit, inject } from '@angular/core';
import { MenuItem } from '../../../interfaces/menu-item.interface';
import { AuthService } from '../../../../auth/services/auth.service';
import { Role } from '../../../../auth/enums/role.enum';

@Component({
  selector: 'shared-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
})
export class MenuComponent implements OnInit {
  private authService = inject(AuthService);

  private backOfficeAdminItems: MenuItem[] = [
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

  private endUserItems: MenuItem[] = [
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

  public menuItems: MenuItem[] = [];

  ngOnInit(): void {
    const userRole = this.authService.currentRole;
    this.menuItems = userRole === Role.BACK_OFFICE_ADMIN 
      ? this.backOfficeAdminItems 
      : this.endUserItems;
  }

}
