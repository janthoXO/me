import { Injectable, signal } from '@angular/core';
import { Contact } from '../domain/contact.model';
import { EducationEntry } from '../domain/education.model';
import { ProjectEntry } from '../domain/project.model';
import { SkillEntry } from '../domain/skill.model';
import { WorkEntry } from '../domain/work.model';
import { LanguageEntry } from '../domain/languages.model';

@Injectable({
  providedIn: 'root',
})
export class State {
  // Signals for state management
  private readonly _educationEntries = signal<EducationEntry[]>([
    {
      id: 1,
      name: 'Bachelors Informatics: Games Engineering',
      shortDescription: 'Technical University of Munich',
      description: '',
      startDate: new Date('2021-10-01'),
      endDate: new Date('2024-11-30'),
    },
    {
      id: 2,
      name: 'Masters Informatics',
      shortDescription: 'Technical University of Munich',
      description: '',
      startDate: new Date('2024-12-01'),
      endDate: 'PRESENT',
    },
  ]);
  private readonly _projectEntries = signal<ProjectEntry[]>([
    {
      id: 1,
      name: 'HackaTUM 24: CHECK24 Challenge',
      shortDescription: '',
      description: '',
      startDate: new Date('2024-11-21'),
      endDate: new Date('2024-11-23'),
      link: new URL('https://github.com/CheckRepublic/checkrepublic'),
    },
  ]);
  private readonly _skillEntries = signal<SkillEntry[]>([
    {
      id: 1,
      name: 'Full-Stack Development',
      shortDescription: '',
      description: '',
    },
    {
      id: 2,
      name: 'Software Planning and Engineering',
      shortDescription: '',
      description: '',
    },
    {
      id: 3,
      name: 'DevOps',
      shortDescription: '',
      description: '',
    },
  ]);
  private readonly _workEntries = signal<WorkEntry[]>([
    {
      id: 1,
      company: 'Siticom GmbH',
      position: 'Working student position',
      shortDescription: 'Software Developer for optical fiber planning',
      description: '',
      startDate: new Date('2022-12-01'),
      endDate: new Date('2025-06-30'),
    },
    {
      id: 2,
      company: 'Unity Production Foundation',
      position: 'Freelancer',
      shortDescription: 'Consultant for Game Development and Design',
      description: '',
      startDate: new Date('2024-07-01'),
      endDate: new Date('2025-08-31'),
    }
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
  readonly educationEntries = this._educationEntries.asReadonly();
  readonly projectEntries = this._projectEntries.asReadonly();
  readonly skillEntries = this._skillEntries.asReadonly();
  readonly workEntries = this._workEntries.asReadonly();
  readonly languageEntries = this._languageEntries.asReadonly();

  readonly contact = this._contact.asReadonly();
}
