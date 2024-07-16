import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'building-unit-action',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './building-actions-table.html',
  styleUrl: './building-actions-table.scss'
})
export class BuildingUnitActionComponent {
  buildingUnitId = input.required<string | undefined>();
}
