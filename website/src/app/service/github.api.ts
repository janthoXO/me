import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GithubApi {

  httpClient = inject(HttpClient);

  fetchRepoData(owner: string, repo: string): Observable<GitHubRepo> {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
    return this.httpClient.get<GitHubRepo>(apiUrl);
  }

}
