import { Component, input, OnDestroy, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  placeholder = input<string>('Buscar...');
  onValueChanged = output<string>();

  searchForm = new FormControl();

  private subscription?: Subscription;
  private valueChanges$ = this.searchForm.valueChanges.pipe(
    debounceTime(300),
    map(value => value.trim()),
    distinctUntilChanged(),
    map(value => value.length === 0 ? '' : value),
    filter(value => value === '' || value.length > 2),
  )

  ngOnInit(): void {
    this.subscription = this.valueChanges$.subscribe(
      value => this.onValueChanged.emit(value)
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
