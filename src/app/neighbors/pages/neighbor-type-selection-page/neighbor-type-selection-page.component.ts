import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'neighbor-type-selection-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './neighbor-type-selection-page.component.html',
  styleUrl: './neighbor-type-selection-page.component.scss'
})
export class NeighborTypeSelectionPage {
}
