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
    const languageColor = this.getLanguageColor(repoData.language);
    const formattedStars = this.formatStars(repoData.stargazers_count);
    const relativeTime = this.getRelativeTime(repoData.updated_at);

    return `
      <div class="github-project-content">
        <!-- GitHub Stats -->
        <div class="flex items-center gap-4 mb-3 text-xs">
          ${repoData.language ? `
            <div class="flex items-center gap-1">
              <div class="w-3 h-3 rounded-full" style="background-color: ${languageColor}"></div>
              <span class="text-muted-foreground">${repoData.language}</span>
            </div>
          ` : ''}
          
          <div class="flex items-center gap-1 text-muted-foreground">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span>${formattedStars}</span>
          </div>
          
          <span class="text-muted-foreground">
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
        
        <!-- Repository Link -->
        <div class="mt-4">
          <a href="${repoData.html_url}" target="_blank" 
             class="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    `;
  }

  private getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      'TypeScript': '#3178c6',
      'JavaScript': '#f1e05a',
      'Python': '#3572A5',
      'Java': '#b07219',
      'C#': '#239120',
      'C++': '#f34b7d',
      'HTML': '#e34c26',
      'CSS': '#1572B6',
      'Vue': '#4FC08D',
      'React': '#61DAFB',
      'Angular': '#DD0031'
    };
    return colors[language] || '#6b7280';
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
