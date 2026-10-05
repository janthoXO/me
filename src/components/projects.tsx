import { useEffect, useState } from "react"
import { ArrowRightIcon, ArrowUpRightIcon, StarIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  const tags = repo?.topics.slice(0, 6) ?? []

  return (
    <Card className="reveal relative transition-transform duration-300 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-lg font-semibold luminous">
          {/* Stretched link: the whole panel opens the project */}
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="flex items-start justify-between gap-2 after:absolute after:inset-0"
          >
            {repo?.name ?? project.name}
            <ArrowUpRightIcon className="mt-1 size-4 shrink-0 luminous-icon" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="text-muted-foreground">
          {repo?.description || project.description}
        </p>
        <div className="mt-auto flex flex-col gap-1 text-xs text-muted-foreground">
          <p>
            lang:{" "}
            <span className="luminous">
              {repo?.language ?? project.language}
            </span>
            {repo && (
              <>
                {"  "}
                <StarIcon className="inline size-3.5 luminous-icon align-[-2px]" />{" "}
                {repo.stargazers_count} · updated: {timeAgo(repo.updated_at)}
              </>
            )}
          </p>
          {tags.length > 0 && (
            <p>
              tags {"{ "}
              <span className="luminous">{tags.join(", ")}</span>
              {" }"}
            </p>
          )}
        </div>
      </CardContent>
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
        <a
          href={basics.github}
          target="_blank"
          rel="noreferrer"
          className="reveal relative flex min-h-40 items-center justify-center gap-2 text-lg font-semibold transition-opacity hover:opacity-70"
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-4xl border-2 border-dashed border-current chalk"
          />
          more on GitHub
          <ArrowRightIcon />
        </a>
      </div>
    </section>
  )
}
