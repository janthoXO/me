import { useStateContext } from '../data/state';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { useEffect } from 'react';
import type { ProjectEntry } from '../domain/project.model';
import { fetchRepoData, transformGithubDataToProjectEntry } from '../service/github';

function formatDate(date: Date | null): string {
  if (date === null) return 'Present';
  if (date instanceof Date) {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  }
  return String(date);
}

export function Projects() {
  const { projectEntries, setProject } = useStateContext();

  useEffect(() => {
    projectEntries.forEach(async (project) => {
      if (!project.link || project.link.hostname !== 'github.com') {
        return;
      }

      const match = project.link.href.match(/github\.com\/([^/]+)\/([^/]+)/);
      if (!match) return;

      const [, owner, repo] = match;
      try {
        const repoData = await fetchRepoData(owner, repo);
        const newProject = transformGithubDataToProjectEntry(repoData, project);
        setProject(newProject);
      } catch (err) {
        console.error('Error fetching github project data:', err);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="projects" className="container mx-auto py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Featured Projects
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A showcase of my recent work and contributions to the developer community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projectEntries.map((project: ProjectEntry) => (
          <Card
            key={project.id}
            className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col h-full"
          >
            <CardHeader className="flex-1">
              <div className="flex items-start justify-between mb-4 gap-4">
                <CardTitle className="text-xl font-bold text-foreground">
                  {project.name}
                </CardTitle>
                {project.link && (
                  <a
                    href={project.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              <CardDescription className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {project.shortDescription}
              </CardDescription>

              <div className="text-xs text-muted-foreground mb-4">
                {formatDate(project.startDate)} - {formatDate(project.endDate)}
              </div>
            </CardHeader>

            {project.description && (
              <CardContent className="border-t border-border pt-4">
                <div
                  className="project-description-content"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </CardContent>
            )}

            <CardFooter className="mt-auto">
              <div className="w-full">
                {project.link && (
                  <Button className="w-full" asChild>
                    <a href={project.link.href} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Add Project CTA */}
      <div className="text-center mt-16">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-4">
              <span className="text-4xl">🚀</span>
              <span className="text-2xl font-bold text-foreground">Want to see more?</span>
              <span className="text-4xl">🚀</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Check out all my projects and contributions on GitHub
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <a
                href="https://github.com/janthoXO"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center gap-2"
              >
                <IconBrandGithub className="w-4 h-4" />
                Visit GitHub Profile
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}