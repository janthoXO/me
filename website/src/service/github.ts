import type { ProjectEntry } from '../domain/project.model';

export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

export async function fetchRepoData(owner: string, repo: string): Promise<GitHubRepo> {
  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  const res = await fetch(apiUrl);
  if (!res.ok) {
    throw new Error('Failed to fetch github data');
  }
  return res.json();
}

function getLanguageColorClass(language: string): string {
  const colorClasses: Record<string, string> = {
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

function formatStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

function getRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return '1 day ago';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

function generateGitHubProjectHTML(repoData: GitHubRepo): string {
  const languageColorClass = getLanguageColorClass(repoData.language);
  const formattedStars = formatStars(repoData.stargazers_count);
  const relativeTime = getRelativeTime(repoData.updated_at);

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

export function transformGithubDataToProjectEntry(repoData: GitHubRepo, project: ProjectEntry): ProjectEntry {
  const htmlDescription = generateGitHubProjectHTML(repoData);
  
  return {
    id: project.id,
    name: repoData.name,
    shortDescription: project.shortDescription,
    description: htmlDescription,
    startDate: project.startDate,
    endDate: project.endDate,
    link: new URL(repoData.html_url),
  };
}