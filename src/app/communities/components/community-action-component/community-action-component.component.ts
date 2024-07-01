import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'community-action',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './community-action-component.component.html',
  styleUrl: './community-action-component.component.scss'
})
export class CommunityActionComponentComponent {
  communityId = input.required<string>();
}
