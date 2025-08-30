import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from '../../data/state';
import { GithubService } from '../../service/github.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  state = inject(State);
  githubService = inject(GithubService);

  get projects() {
    return this.state.projectEntries();
  }

  ngOnInit() {
    this.githubService.loadGithubProjects();
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
}
