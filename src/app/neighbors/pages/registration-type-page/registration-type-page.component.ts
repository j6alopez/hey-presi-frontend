import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'registration-type-selection-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './registration-type-page.component.html',
  styleUrl: './registration-type-page.component.scss'
})
export class RegistrationTypePage {
}
