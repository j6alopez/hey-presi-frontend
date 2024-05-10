import { Component } from '@angular/core';
import { TopBarComponent } from '../../../shared/components/top-bar/top-bar.component';

@Component({
  selector: 'app-community-page',
  standalone: true,
  imports: [
    TopBarComponent
  ],
  templateUrl: './community-page.component.html',
  styleUrl: './community-page.component.scss'
})
export class CommunityPageComponent {

}
