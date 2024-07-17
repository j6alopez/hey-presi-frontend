import { Component } from '@angular/core';

@Component({
  selector: 'shared-spinner',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex justify-content-center align-self-center ">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
}
