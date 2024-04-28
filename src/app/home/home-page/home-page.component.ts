import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { SideBarComponent } from '../../shared/components/side-bar/side-bar.component';


@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
    SideBarComponent,
    TopBarComponent,
    RouterModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
}
