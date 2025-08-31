import {
  Component,
  computed,
  ElementRef,
  HostListener,
  OnInit,
  signal,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '../../data/state';
import { SkillEntry } from '../../domain/skill.model';
import { HlmAvatarImports } from '../../../../libs/ui/ui-avatar-helm/src';
import { ChevronDown, LucideAngularModule } from 'lucide-angular';

interface SkillPosition {
  x: number;
  y: number;
  distance: number;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule, LucideAngularModule, ...HlmAvatarImports],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements OnInit {
  readonly chevronDownIcon = ChevronDown;

  @ViewChild('profilePicture', { static: false })
  profilePicture?: ElementRef<HTMLElement>;

  private scrollY = signal(0);
  private isProfileHovered = signal(false);
  showSkills = computed(() => this.scrollY() > 100 || this.isProfileHovered());

  private skillPositions = signal<Map<number, SkillPosition>>(new Map());

  // State injection
  private state = inject(State);

  ngOnInit(): void {
    this.calculateSkillPositions();
  }

  get skills() {
    return this.state.skillEntries();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollY.set(window.scrollY);
  }

  onProfileHover(hovered: boolean) {
    this.isProfileHovered.set(hovered);
  }

  private calculateSkillPositions() {
    const skills = this.skills;
    const positions = new Map<number, SkillPosition>();

    skills.forEach((skill: SkillEntry, index: number) => {
      // Distribute evenly around the circle
      const angleStep = (2 * Math.PI) / skills.length;
      const angle = index * angleStep;

      // Add some randomness to the distance (between 100px and 160px)
      const baseDistance = 130;
      const randomOffset = (Math.random() - 0.5) * 60; // ±30px variation
      const distance = baseDistance + randomOffset;

      // Calculate x, y coordinates
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      positions.set(skill.id, { x, y, distance });
    });

    this.skillPositions.set(positions);
  }

  getSkillPosition(skillId: number): SkillPosition {
    return this.skillPositions().get(skillId) || { x: 0, y: 0, distance: 0 };
  }

  getSkillBubbleStyle(skill: SkillEntry) {
    return {
      transform: `translate(${this.getSkillPosition(skill.id).x || 0}px, ${
        this.getSkillPosition(skill.id).y || 0
      }px)`,
      backgroundColor: '#6366f1',
      opacity: this.showSkills() ? 1 : 0,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  }

  getConnectionLineStyle(skill: SkillEntry) {
    const x = this.getSkillPosition(skill.id).x || 0;
    const y = this.getSkillPosition(skill.id).y || 0;
    const length = Math.sqrt(x * x + y * y);
    const angle = Math.atan2(y, x) * (180 / Math.PI);

    return {
      width: `${length}px`,
      transform: `rotate(${angle}deg)`,
      transformOrigin: '0 50%',
      opacity: this.showSkills() ? 0.6 : 0,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  }
}
