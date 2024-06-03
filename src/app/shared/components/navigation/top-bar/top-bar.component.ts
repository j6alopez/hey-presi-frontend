import { Component } from '@angular/core';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { ProfileOptionsComponent } from '../profile-options/profile-options.component';

@Component({
  selector: 'shared-top-bar',
  standalone: true,
  imports: [
    SideBarComponent,
    ProfileOptionsComponent
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {

}
