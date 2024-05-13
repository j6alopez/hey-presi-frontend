import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';


@Component({
  standalone: true,
  imports: [
    RouterModule,
    TopBarComponent,
  ],
  templateUrl: './admin-dashboard-page.component.html',
  styleUrl: './admin-dashboard-page.component.scss'
})
export class AdminDashBoardPageComponent {

}
