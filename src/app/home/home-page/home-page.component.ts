import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';


@Component({
  selector: 'home-page',
  standalone: true,
  imports: [
    RouterModule,
    TopBarComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
