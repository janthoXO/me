import { Injectable, signal } from '@angular/core';
import { Contact } from '../domain/contact.model';
import { ProjectEntry } from '../domain/project.model';
import { SkillEntry } from '../domain/skill.model';
import { ExperienceEntry } from '../domain/experience.model';
import { LanguageEntry } from '../domain/languages.model';

@Injectable({
  providedIn: 'root',
})
export class State {
  // Signals for state management
  private readonly _projectEntries = signal<ProjectEntry[]>([
    {
      id: 1,
      name: 'HackaTUM 24: CHECK24 Challenge',
      shortDescription: 'Hackathon project for CHECK24 challenge',
      description: `
        <div class="project-description">
          <p class="text-sm text-muted-foreground mb-3">
            A collaborative hackathon project developed during HackaTUM 2024 for the CHECK24 challenge.
          </p>
          <h4 class="font-semibold text-foreground mb-2">Technologies Used</h4>
          <div class="flex flex-wrap gap-1 mb-3">
            <span class="px-2 py-1 bg-primary/10 text-primary rounded text-xs">Vue.js</span>
            <span class="px-2 py-1 bg-primary/10 text-primary rounded text-xs">TypeScript</span>
            <span class="px-2 py-1 bg-primary/10 text-primary rounded text-xs">Node.js</span>
            <span class="px-2 py-1 bg-primary/10 text-primary rounded text-xs">Express</span>
          </div>
          <h4 class="font-semibold text-foreground mb-2">Key Features</h4>
          <ul class="list-disc pl-5 text-sm text-muted-foreground mb-3">
            <li>Innovative solution for price comparison</li>
            <li>Real-time data processing</li>
            <li>Responsive user interface</li>
            <li>RESTful API integration</li>
          </ul>
          <p class="text-xs text-muted-foreground">
            This project was developed in 48 hours with a team of 4 developers.
          </p>
        </div>
      `,
      startDate: new Date('2024-11-22'),
      endDate: new Date('2024-11-24'),
      link: new URL('https://github.com/CheckRepublic/checkrepublic'),
    },
  ]);
  private readonly _skillEntries = signal<SkillEntry[]>([
    {
      id: 1,
      name: 'Full-Stack Development',
      shortDescription: 'Building complete web and mobile applications',
      description: 'Proficient in both frontend and backend technologies',
    },
    {
      id: 2,
      name: 'Software Planning and Engineering',
      shortDescription: 'Expert in software design and architecture',
      description:
        'Skilled in creating efficient and distributed software solutions and managing projects',
    },
    {
      id: 3,
      name: 'DevOps',
      shortDescription: 'Deployment & CI/CD',
      description: 'Docker, Traefik, and automated deployment pipelines',
    },
  ]);
  private readonly _experienceEntries = signal<ExperienceEntry[]>([
    {
      id: 1,
      title: 'Bachelors Informatics: Games Engineering',
      subtitle: 'Technical University of Munich',
      description: '',
      tags: ['Computer Science', 'Game Development'],
      startDate: new Date('2021-10-01'),
      endDate: new Date('2024-11-30'),
    },
    {
      id: 2,
      title: 'Working student position',
      subtitle: 'Siticom GmbH',
      description: 'Software Developer for optical fiber planning',
      tags: ['Software Development', 'Problem Solving'],
      startDate: new Date('2022-12-01'),
      endDate: new Date('2025-06-30'),
    },
    {
      id: 3,
      title: 'Freelancer',
      subtitle: 'Unity Production Foundation',
      description: 'Consultant for Game Development and Design',
      tags: ['Game Development', 'Consulting', 'Design'],
      startDate: new Date('2024-07-01'),
      endDate: new Date('2025-08-31'),
    },
    {
      id: 4,
      title: 'Masters Informatics',
      subtitle: 'Technical University of Munich',
      description: '',
      tags: ['Software Engineering', 'Formal Methods'],
      startDate: new Date('2024-12-01'),
      endDate: null,
    },
  ]);
  private readonly _languageEntries = signal<LanguageEntry[]>([
    {
      id: 1,
      name: 'German',
      level: 'Native Speaker',
      description: 'Mother tongue',
    },
    {
      id: 2,
      name: 'English',
      level: 'C1',
      description: 'Fluent in spoken and written English',
    },
    {
      id: 3,
      name: 'French',
      level: 'B1+',
      description: 'Good school knowledge',
    },
  ]);

  private readonly _contact = signal<Contact>({
    name: 'Dennis Jandow',
    githubUrl: new URL('https://github.com/janthoXO'),
    linkedinUrl: new URL('https://www.linkedin.com/in/dennisjandow/'),
  });

  // Read-only computed signals
  readonly experienceEntries = this._experienceEntries.asReadonly();
  readonly projectEntries = this._projectEntries.asReadonly();
  readonly skillEntries = this._skillEntries.asReadonly();
  readonly workEntries = this._experienceEntries.asReadonly();
  readonly languageEntries = this._languageEntries.asReadonly();

  readonly contact = this._contact.asReadonly();

  public setProject(project: ProjectEntry) {
    const currentProjects = this._projectEntries();
    const existingProjectIndex = currentProjects.findIndex(
      (p) => p.id === project.id
    );

    if (existingProjectIndex !== -1) {
      // Overwrite existing project
      const updatedProjects = [...currentProjects];
      updatedProjects[existingProjectIndex] = project;
      this._projectEntries.set(updatedProjects);
    } else {
      // Add new project
      this._projectEntries.set([...currentProjects, project]);
    }
  }
}
