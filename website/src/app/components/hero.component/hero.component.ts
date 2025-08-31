import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '../../data/state';
import { LucideAngularModule, Github, Linkedin, ChevronDown } from 'lucide-angular';
import { HlmButton } from '../../../../libs/ui/ui-button-helm/src';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, LucideAngularModule, HlmButton],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  // Icons
  readonly githubIcon = Github;
  readonly linkedinIcon = Linkedin;

  // State injection
  private state = inject(State);

  get contact() {
    return this.state.contact();
  }
}
