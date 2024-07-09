import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'community-action',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './community-action-component.html',
  styleUrl: './community-action-component.scss'
})
export class CommunityActionComponent {
  communityId = input.required<string>();
}
