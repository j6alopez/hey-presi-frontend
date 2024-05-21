import { Component, Input, inject } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  @Input({ required: true })
  public menuItems: MenuItem[] = [];

}

