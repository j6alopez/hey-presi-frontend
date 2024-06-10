import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'shared-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() pageSizeRanges: number[] = [5, 10, 25, 100];
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;

  @Output() 
  pageChanged = new EventEmitter<number>();
  @Output() 
  pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();

  indicator: string = '';


  ngOnInit(): void {
    this.updateIndicatorText();
  }


  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.pageChanged.emit(pageNumber);
    this.updateIndicatorText();
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
      this.updateIndicatorText();
    }
  }

  onNextPage() {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < pageCount) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
      this.updateIndicatorText();
    }
  }

  updateIndicatorText() {
    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(startItem + this.itemsPerPage - 1, this.totalItems);
    const totalItems = this.totalItems;
    this.indicator = `${startItem} – ${endItem} de ${totalItems}`;
  }

  onPageSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.itemsPerPage = Number(target.value);
    this.currentPage = 1;
    this.pageSizeChanged.emit(this.itemsPerPage);
    this.updateIndicatorText();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }
}
