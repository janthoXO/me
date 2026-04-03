import { useState, createContext, use } from 'react';
import type { Contact } from '../domain/contact.model';
import type { ProjectEntry } from '../domain/project.model';
import type { SkillEntry } from '../domain/skill.model';
import type { ExperienceEntry } from '../domain/experience.model';
import type { LanguageEntry } from '../domain/languages.model';

export interface StateContextType {
  projectEntries: ProjectEntry[];
  skillEntries: SkillEntry[];
  experienceEntries: ExperienceEntry[];
  languageEntries: LanguageEntry[];
  contact: Contact;
  setProject: (project: ProjectEntry) => void;
}

export const StateContext = createContext<StateContextType | undefined>(undefined);

export function useStateContext() {
  const context = use(StateContext);
  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider');
  }
  return context;
}

const initialProjects: ProjectEntry[] = [
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
];

const initialSkills: SkillEntry[] = [
  {
    id: 1,
    name: 'Full-Stack Development',
    description: 'Building complete web and mobile applications',
  },
  {
    id: 2,
    name: 'Software Planning and Engineering',
    description: 'Expert in software design and architecture',
  },
  {
    id: 3,
    name: 'DevOps',
    description: 'Deployment & CI/CD with Docker, Traefik, and automated deployment pipelines',
  },
];

const initialExperience: ExperienceEntry[] = [
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
];

const initialLanguages: LanguageEntry[] = [
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
];

const contactData: Contact = {
  name: 'Dennis Jandow',
  githubUrl: new URL('https://github.com/janthoXO'),
  linkedinUrl: new URL('https://www.linkedin.com/in/dennisjandow/'),
};

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [projectEntries, setProjectEntries] = useState<ProjectEntry[]>(initialProjects);

  const setProject = (project: ProjectEntry) => {
    setProjectEntries((prev) => {
      const existingProjectIndex = prev.findIndex((p) => p.id === project.id);
      if (existingProjectIndex !== -1) {
        const updatedProjects = [...prev];
        updatedProjects[existingProjectIndex] = project;
        return updatedProjects;
      }
      return [...prev, project];
    });
  };

  const value = {
    projectEntries,
    skillEntries: initialSkills,
    experienceEntries: initialExperience,
    languageEntries: initialLanguages,
    contact: contactData,
    setProject,
  };

  return <StateContext value={value}>{children}</StateContext>;
}
