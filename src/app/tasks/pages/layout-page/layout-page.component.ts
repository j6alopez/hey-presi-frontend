import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../../../shared/components/navigation/top-bar/top-bar.component';

@Component({
  standalone: true,
  imports: [
    TopBarComponent,
    RouterOutlet
  ],
  templateUrl: './layout-page.component.html',
  styleUrl: './layout-page.component.scss'
})
export class LayoutPageComponent {

}
