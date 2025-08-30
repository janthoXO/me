import { inject, Injectable } from '@angular/core';
import { GithubApi, GitHubRepo } from './github.api';
import { State } from '../data/state';
import { ProjectEntry } from '../domain/project.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  api = inject(GithubApi)
  state = inject(State)

  public loadGithubProjects(){
    this.state.projectEntries().forEach((project) => {
      if(!project.link || project.link.hostname !== 'github.com'){
        return;
      }

          // Extract owner and repo from GitHub URL
    const match = project.link.href.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      return;
    }

    const [, owner, repo] = match;
      // query github data
      this.api.fetchRepoData(owner, repo).subscribe({
        next: (repoData) => {
          // transform github data to domain object
          console.log(repoData);
          const projectEntry = this.transformGithubDataToProjectEntry(repoData, project);
          this.state.setProject(projectEntry);
        },
        error: (error) => {
          console.error('Error fetching GitHub repo data:', error);
        }
      })
    })
  }

  private transformGithubDataToProjectEntry(repoData: GitHubRepo, project: ProjectEntry): ProjectEntry {
    // Create HTML description with GitHub repository information
    const htmlDescription = this.generateGitHubProjectHTML(repoData);
    
    return {
      id: project.id,
      name: repoData.name, // use github repo name
      shortDescription: project.shortDescription,
      description: htmlDescription, // use github specific rendered description
      startDate: project.startDate,
      endDate: project.endDate,
      link: new URL(repoData.html_url),
    };
  }

  private generateGitHubProjectHTML(repoData: GitHubRepo): string {
    const languageColorClass = this.getLanguageColorClass(repoData.language);
    const formattedStars = this.formatStars(repoData.stargazers_count);
    const relativeTime = this.getRelativeTime(repoData.updated_at);

    return `
      <div class="github-project-content">
        <!-- GitHub Stats -->
        <div class="flex items-center gap-4 mb-3 text-xs">
          ${repoData.language ? `
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 rounded-full ${languageColorClass}"></div>
              <span class="text-muted-foreground">${repoData.language}</span>
            </div>
          ` : ''}
          
          <span class="text-muted-foreground">⭐ ${formattedStars}</span>
          
          <span class="grow text-right text-muted-foreground">
            Updated ${relativeTime}
          </span>
        </div>
        
        <!-- Repository Description -->
        ${repoData.description ? `
          <p class="text-sm text-muted-foreground mb-3 italic">
            "${repoData.description}"
          </p>
        ` : ''}
        
        <!-- Topics/Tags -->
        ${repoData.topics && repoData.topics.length > 0 ? `
          <div class="flex flex-wrap gap-1 mb-3">
            ${repoData.topics.slice(0, 6).map((topic: string) => `
              <span class="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                ${topic}
              </span>
            `).join('')}
            ${repoData.topics.length > 6 ? `
              <span class="px-2 py-1 bg-muted text-muted-foreground rounded text-xs">
                +${repoData.topics.length - 6}
              </span>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  private getLanguageColorClass(language: string): string {
    const colorClasses: { [key: string]: string } = {
      'TypeScript': 'bg-blue-600',
      'JavaScript': 'bg-yellow-400',
      'Python': 'bg-blue-500',
      'Java': 'bg-orange-600',
      'C#': 'bg-green-600',
      'C++': 'bg-pink-500',
      'HTML': 'bg-orange-500',
      'CSS': 'bg-blue-600',
      'Vue': 'bg-green-400',
      'React': 'bg-cyan-400',
      'Angular': 'bg-red-600',
      'Rust': 'bg-orange-700',
      'Go': 'bg-cyan-500',
      'PHP': 'bg-indigo-500',
      'Swift': 'bg-orange-500',
      'Kotlin': 'bg-purple-500',
      'Dart': 'bg-blue-400',
      'Shell': 'bg-gray-600',
      'Dockerfile': 'bg-blue-500'
    };
    return colorClasses[language] || 'bg-gray-400';
  }

  private formatStars(count: number): string {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  }

  private getRelativeTime(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  }

}
