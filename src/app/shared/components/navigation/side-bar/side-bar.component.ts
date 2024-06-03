import { Component, Input, inject } from '@angular/core';
import { MenuItem } from '../../../interfaces/menu-item.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../auth/services/auth.service';
import { Role } from '../../../../auth/enums/role.enum';

@Component({
  selector: 'shared-side-bar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  private authService = inject(AuthService);
  private backOfficeAdminItems: MenuItem[] = [
    {
      title: 'Communities',
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
