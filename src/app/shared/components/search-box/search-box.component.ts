import { Component, input, OnDestroy, OnInit, output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, distinctUntilKeyChanged, filter, Subscription, tap } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  placeholder = input<string>('Buscar...');
  onValue = output<string>();
  searchControl = new FormControl();
  
  private subscription?: Subscription;
  private valueChanges$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    tap(value => console.log(value)),
    distinctUntilKeyChanged('value'),
    filter(value =>  value.length === 0 || value.length > 2)
  )

  ngOnInit(): void {
    this.subscription = this.valueChanges$.subscribe(
      value => this.onValue.emit(value)
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
