import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '../../data/state';
import { HlmCardImports } from '../../../../libs/ui/ui-card-helm/src';
import { HlmBadgeImports } from '../../../../libs/ui/ui-badge-helm/src';
import { Mail } from 'lucide-angular';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, ...HlmCardImports, ...HlmBadgeImports],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent {
  readonly mailIcon = Mail;

  private scrollY = signal(0);

  constructor(private state: State, private elementRef: ElementRef) {}

  get experienceEntries() {
    return this.state.experienceEntries();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollY.set(window.scrollY);
  }

  isEntryVisible(index: number): boolean {
    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate if this entry should be visible based on scroll position
    const triggerPoint = windowHeight * 0.7;
    const entryOffset = (index + 1) * 200; // Stagger the animations

    return rect.top < triggerPoint - entryOffset;
  }

  formatDate(date: Date | null): string {
    if (date === null) return 'Present';
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      });
    }
    return String(date);
  }

  getEntryAnimationClass(index: number): string {
    return this.isEntryVisible(index)
      ? 'animate-slide-in-left'
      : 'opacity-0 translate-x-8';
  }

  isCurrentPosition(endDate: Date | null): boolean {
    return endDate === null
  }

  calculateDuration(startDate: Date, endDate: Date | null): string {
    const start = new Date(startDate);
    const end = endDate === null ? new Date() : new Date(endDate);

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));

    if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(diffMonths / 12);
      const remainingMonths = diffMonths % 12;
      let result = `${years} year${years !== 1 ? 's' : ''}`;
      if (remainingMonths > 0) {
        result += `, ${remainingMonths} month${
          remainingMonths !== 1 ? 's' : ''
        }`;
      }
      return result;
    }
  }
}
