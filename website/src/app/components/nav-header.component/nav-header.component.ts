import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '../../data/state';

@Component({
  selector: 'nav-header-app',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-header.component.html',
  styleUrl: './nav-header.component.css',
})
export class NavHeaderComponent {
  private state = inject(State);

  get contact() {
    return this.state.contact();
  }
}
