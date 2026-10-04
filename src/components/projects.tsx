import { useEffect, useState } from "react"
import { ExternalLinkIcon, StarIcon } from "lucide-react"

import { GithubIcon } from "@/components/brand-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SectionHeading } from "@/components/section-heading"
import { basics, projects, type Project } from "@/data"
import { timeAgo } from "@/lib/format"

type Repo = {
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  topics: string[]
}

function useRepo(link: string) {
  const [repo, setRepo] = useState<Repo>()
  useEffect(() => {
    const repoPath = link.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)/)?.[1]
    if (!repoPath) return
    const ctrl = new AbortController()
    fetch(`https://api.github.com/repos/${repoPath}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
      .then(setRepo)
      .catch((e) => ctrl.signal.aborted || console.error(e))
    return () => ctrl.abort()
  }, [link])
  return repo
}

function ProjectCard({ project }: { project: Project }) {
  const repo = useRepo(project.link)
  const tags = repo?.topics.length ? repo.topics : []

  return (
    <Card className="reveal transition-transform duration-300 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          {repo?.name ?? project.name}
        </CardTitle>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`Open ${project.name}`}
            nativeButton={false}
            render={<a href={project.link} target="_blank" rel="noreferrer" />}
          >
            <ExternalLinkIcon />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-muted-foreground">
          {repo?.description || project.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Badge variant="outline">{repo?.language ?? project.language}</Badge>
          {repo && (
            <>
              <span className="flex items-center gap-1">
                <StarIcon className="size-3" /> {repo.stargazers_count}
              </span>
              <span className="ml-auto">
                Updated {timeAgo(repo.updated_at)}
              </span>
            </>
          )}
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 6).map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          nativeButton={false}
          render={<a href={project.link} target="_blank" rel="noreferrer" />}
        >
          View Project
        </Button>
      </CardFooter>
    </Card>
  )
}

export function Projects() {
  return (
    <section id="projects" className="flex flex-col gap-12">
      <SectionHeading
        title="Featured Projects"
        subtitle="A showcase of my recent work and contributions"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),24rem))] justify-center gap-6">
        {projects.map((p) => (
          <ProjectCard key={p.link} project={p} />
        ))}
      </div>
      <Card className="reveal mx-auto w-full max-w-xl text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Want to see more?
          </CardTitle>
          <CardDescription>
            Check out all my projects and contributions on GitHub
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button
            size="lg"
            nativeButton={false}
            render={<a href={basics.github} target="_blank" rel="noreferrer" />}
          >
            <GithubIcon data-icon="inline-start" />
            Visit GitHub Profile
          </Button>
        </CardFooter>
      </Card>
    </section>
  )
}
