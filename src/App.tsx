import { ChevronDownIcon, MailIcon } from "lucide-react"

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { Projects } from "@/components/projects"
import { SectionHeading } from "@/components/section-heading"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { accomplishments, basics, experience, languages, skills } from "@/data"
import { formatDuration, formatMonth } from "@/lib/format"

const links = ["Skills", "Experience", "Projects", "Accomplishments", "Contact"]

function Nav() {
  return (
    <nav className="glass fixed inset-x-0 top-0 z-50 border-b bg-background/60">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-center px-4 sm:justify-between sm:px-6">
        <a href="#" className="font-semibold max-sm:hidden">
          {basics.name}
        </a>
        <div className="flex gap-3 text-xs sm:gap-6 sm:text-sm">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="flex flex-col items-center gap-8 pt-24 text-center">
      <h1 className="animate-in text-5xl font-bold tracking-tight duration-700 fade-in slide-in-from-bottom-6 sm:text-6xl md:text-8xl">
        {basics.name}
      </h1>
      <p className="animate-in text-xl text-muted-foreground delay-200 duration-700 fill-mode-both fade-in slide-in-from-bottom-6 md:text-2xl">
        {basics.title}
      </p>
      <p className="max-w-2xl animate-in text-muted-foreground delay-300 duration-700 fill-mode-both fade-in slide-in-from-bottom-6">
        {basics.summary}
      </p>
      <div className="flex animate-in gap-4 delay-400 duration-700 fill-mode-both fade-in slide-in-from-bottom-6">
        <Button
          size="lg"
          nativeButton={false}
          render={
            <a href={basics.github} target="_blank" rel="me noreferrer" />
          }
        >
          <GithubIcon data-icon="inline-start" />
          GitHub
        </Button>
        <Button
          size="lg"
          variant="secondary"
          nativeButton={false}
          render={
            <a href={basics.linkedin} target="_blank" rel="me noreferrer" />
          }
        >
          <LinkedinIcon data-icon="inline-start" />
          LinkedIn
        </Button>
      </div>
    </section>
  )
}

const ORBIT_RADIUS = 125

function Skills() {
  return (
    <section
      id="skills"
      className="reveal flex flex-col items-center gap-10 py-12"
    >
      <div className="relative flex size-80 items-center justify-center">
        <div className="absolute inset-8 rounded-full border border-dashed border-primary/30" />
        <Avatar className="size-32 shadow-2xl ring-4 shadow-primary/30 ring-primary">
          <AvatarImage
            src={`${import.meta.env.BASE_URL}${basics.image}`}
            alt={basics.name}
          />
          <AvatarFallback className="text-2xl">DJ</AvatarFallback>
        </Avatar>
        {skills.map((skill, i) => {
          const angle = (i / skills.length) * 2 * Math.PI - Math.PI / 2
          const x = Math.cos(angle) * ORBIT_RADIUS
          const y = Math.sin(angle) * ORBIT_RADIUS
          return (
            <div
              key={skill.name}
              className="glass absolute top-1/2 left-1/2 flex size-24 -translate-1/2 items-center justify-center rounded-full border bg-card px-2 text-xs leading-tight font-medium shadow-lg transition-[scale] hover:scale-110"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {skill.name}
            </div>
          )
        })}
      </div>
      <div className="grid w-full max-w-4xl gap-6 md:grid-cols-4">
        {skills.map((g) => (
          <div key={g.name} className="flex flex-col items-center gap-2">
            <h3 className="font-semibold">{g.name}</h3>
            <ul className="flex flex-wrap justify-center gap-1.5">
              {g.items.map((item) => (
                <li key={item}>
                  <Badge variant="secondary">{item}</Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="flex flex-col items-center gap-2">
          <h3 className="font-semibold">Languages</h3>
          <ul className="flex flex-wrap justify-center gap-1.5">
            {languages.map((l) => (
              <li key={l.name}>
                <Badge variant="secondary">
                  {l.name} · {l.fluency}
                  {l.level && ` (${l.level})`}
                </Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ChevronDownIcon className="animate-bounce text-muted-foreground" />
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="flex flex-col gap-12">
      <SectionHeading
        title="Experience"
        subtitle="My professional journey in software development"
      />
      <ol className="relative mx-auto flex w-full max-w-3xl flex-col gap-8 border-l border-primary/30 pl-8">
        {experience.map((e) => (
          <li key={e.title + e.start} className="reveal relative">
            <span className="absolute top-8 -left-10 size-4 rounded-full bg-primary ring-4 ring-background" />
            <Card>
              <CardHeader>
                <Badge className="mb-2">
                  <time dateTime={e.start}>{formatMonth(e.start)}</time> –{" "}
                  {e.end ? (
                    <time dateTime={e.end}>{formatMonth(e.end)}</time>
                  ) : (
                    formatMonth()
                  )}
                </Badge>
                <CardTitle className="text-lg font-semibold">
                  {e.title}
                </CardTitle>
                {e.organization && (
                  <CardDescription className="text-base">
                    {e.organization}
                  </CardDescription>
                )}
              </CardHeader>
              {e.highlights && (
                <CardContent>
                  <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
                    {e.highlights.map((h) => (
                      <li key={h.name}>
                        <strong>{h.name}:</strong> {h.description}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
              <CardFooter className="justify-end">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  {e.end ? (
                    formatDuration(e.start, e.end)
                  ) : (
                    <>
                      <span className="size-2 animate-pulse rounded-full bg-primary" />
                      Currently active
                    </>
                  )}
                </span>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  )
}

function Accomplishments() {
  return (
    <section id="accomplishments" className="flex flex-col gap-12">
      <SectionHeading
        title="Accomplishments"
        subtitle="Awards, scholarships and exhibitions"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,16rem),20rem))] justify-center gap-6">
        {accomplishments.map((a) => (
          <Card key={a.title + a.start} className="reveal">
            <CardHeader>
              <Badge className="mb-2">
                <time dateTime={a.start}>{formatMonth(a.start)}</time>
                {a.end && (
                  <>
                    {" – "}
                    <time dateTime={a.end}>{formatMonth(a.end)}</time>
                  </>
                )}
              </Badge>
              <CardTitle className="font-semibold">{a.title}</CardTitle>
              <CardDescription>
                {[a.organization, a.location].filter(Boolean).join(" · ")}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      id="contact"
      className="glass flex flex-col items-center gap-6 border-t bg-card py-12 text-center"
    >
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="GitHub"
          nativeButton={false}
          render={
            <a href={basics.github} target="_blank" rel="me noreferrer" />
          }
        >
          <GithubIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="LinkedIn"
          nativeButton={false}
          render={
            <a href={basics.linkedin} target="_blank" rel="me noreferrer" />
          }
        >
          <LinkedinIcon />
        </Button>
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="Email"
          nativeButton={false}
          render={<a href={`mailto:${basics.email}`} />}
        >
          <MailIcon />
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} {basics.name}. Built with React and
        shadcn/ui.
      </p>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex max-w-6xl flex-col gap-32 px-4 pb-32 sm:px-6">
        <Hero />
        <Skills />
        <Experience />
        <Projects />
        <Accomplishments />
      </main>
      <Footer />
    </>
  )
}
