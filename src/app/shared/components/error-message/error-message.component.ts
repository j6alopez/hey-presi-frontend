import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-error',
  standalone: true,
  imports: [],
  templateUrl: './error-message.component.html',
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent {
  @Input() 
  public message: string = '';
}
