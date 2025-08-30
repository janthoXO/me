import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '../../data/state';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.css'
})
export class EducationComponent {
  private scrollY = signal(0);
  
  constructor(private state: State, private elementRef: ElementRef) {}
  
  get educationEntries() {
    return this.state.educationEntries();
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
        month: 'short' 
      });
    }
    return String(date);
  }
  
  getEntryAnimationClass(index: number): string {
    return this.isEntryVisible(index) ? 'animate-slide-in-left' : 'opacity-0 translate-x-8';
  }
}
