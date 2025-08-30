import { Component, ElementRef, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '../../data/state';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrl: './work.component.css'
})
export class WorkComponent {
  private scrollY = signal(0);
  
  constructor(private state: State, private elementRef: ElementRef) {}
  
  get workEntries() {
    return this.state.workEntries();
  }
  
  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollY.set(window.scrollY);
  }
  
  isEntryVisible(index: number): boolean {
    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const triggerPoint = windowHeight * 0.7;
    const entryOffset = (index + 1) * 200;
    
    return rect.top < triggerPoint - entryOffset;
  }
  
  formatDate(date: Date | string | null): string {
    if (date === 'PRESENT') return 'Present';
    if (date === null) return 'Unknown';
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    }
    return String(date);
  }
  
  getEntryAnimationClass(index: number): string {
    return this.isEntryVisible(index) ? 'animate-slide-in-right' : 'opacity-0 translate-x-8';
  }
  
  getCompanyIcon(company: string): string {
    // Simple company icon mapping
    if (company.toLowerCase().includes('siticom')) return '🏢';
    if (company.toLowerCase().includes('unity')) return '🎮';
    return '💼';
  }
  
  isCurrentPosition(endDate: Date | null): boolean {
    if (endDate === null) return true;
    if (endDate instanceof Date) {
      return endDate > new Date();
    }
    return false;
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
        result += `, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
      }
      return result;
    }
  }
}
