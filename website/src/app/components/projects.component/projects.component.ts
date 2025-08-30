import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '../../data/state';
import { GithubService } from '../../service/github.service';
import { HlmCardImports } from '../../../../libs/ui/ui-card-helm/src';
import { HlmButton } from '../../../../libs/ui/ui-button-helm/src';
import { LucideAngularModule, ExternalLink, Github } from 'lucide-angular';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ...HlmCardImports, HlmButton, LucideAngularModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  // Icons
  readonly externalLinkIcon = ExternalLink;
  readonly githubIcon = Github;
  
  state = inject(State);
  githubService = inject(GithubService);

  get projects() {
    return this.state.projectEntries();
  }

  ngOnInit() {
    this.githubService.loadGithubProjects();
  }

  formatDate(date: Date | string | null): string {
    if (date === null) return 'Present';
    if (date === 'PRESENT') return 'Present';
    if (date instanceof Date) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      });
    }
    return String(date);
  }
}
