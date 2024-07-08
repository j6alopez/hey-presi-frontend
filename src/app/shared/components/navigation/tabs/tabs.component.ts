import { CommonModule } from '@angular/common';
import { Component, input, model } from '@angular/core';

@Component({
  selector: 'shared-tabs',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  tabs = input.required<string[]>();
  activatedTab = model<number>(0);

  setActivatedTab(index: number) {
    this.activatedTab.set(index);
  }
}
