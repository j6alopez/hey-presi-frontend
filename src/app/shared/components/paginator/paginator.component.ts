import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'shared-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  @Input() 
  totalItems: number = 0;
  @Input() 
  itemsPerPage: number = 10;
  @Input() 
  pageSizeRanges: number[] = [5, 10, 25, 100];
  @Output() 
  pageChanged = new EventEmitter<number>();
  @Output() 
  pageSizeChanged: EventEmitter<number> = new EventEmitter<number>();

  indicator: string = '';
  currentPage: number = 1;

  ngOnChanges(changes: SimpleChanges) {

  }

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.pageChanged.emit(pageNumber);
    this.updateIndicatorText();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }

  nextPage() {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    if (this.currentPage < pageCount) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  updateIndicatorText() {
    const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    const endItem = Math.min(startItem + this.itemsPerPage - 1, this.totalItems);
    const totalItems = this.totalItems;
    this.indicator = `Items por página: ${startItem} – ${endItem} de ${totalItems}`;
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
