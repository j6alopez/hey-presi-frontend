import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {
  @Input() totalItems: number = 0;
  @Input() currentPage: number = 1;
  
  ranges: number[] = [5, 10, 25, 100];
  onRangeChanged($event: Event) {
    throw new Error('Method not implemented.');
  }
}
