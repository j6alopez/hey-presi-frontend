import { Component } from '@angular/core';

@Component({
  selector: 'shared-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  ranges: number[] = [5, 10, 25, 100];
  onRangeChanged($event: Event) {
    throw new Error('Method not implemented.');
  }
}
