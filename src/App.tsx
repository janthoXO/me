import { CheckIcon, MailIcon } from "lucide-react"
import { cn } from "cn"

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons"
import { ChalkArrow, ChalkFilter } from "@/components/chalk"
import { Projects } from "@/components/projects"
import { SectionHeading } from "@/components/section-heading"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  accomplishments,
  basics,
  experience,
  languages,
  skills,
  type Entry,
} from "@/data"
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
    <section className="flex flex-col items-center gap-8 pt-32 text-center">
      <h1 className="animate-in text-5xl font-semibold tracking-tight luminous duration-700 fade-in slide-in-from-bottom-6 sm:text-6xl md:text-8xl">
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
          className="glow"
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
          variant="outline"
          className="glass glow"
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

// Grid placement around the avatar, in order: top-left, top-right,
// bottom-left, bottom-right. Arrows point at the avatar (up on mobile).
const mapSlots = [
  { box: "md:col-start-1 md:row-start-1 md:flex-row", arrow: "md:rotate-15" },
  {
    box: "md:col-start-3 md:row-start-1 md:flex-row-reverse",
    arrow: "md:rotate-165",
  },
  { box: "md:col-start-1 md:row-start-2 md:flex-row", arrow: "md:-rotate-15" },
  {
    box: "md:col-start-3 md:row-start-2 md:flex-row-reverse",
    arrow: "md:rotate-195",
  },
]

function Skills() {
  const groups = [
    ...skills,
    {
      name: "Spoken",
      items: languages.map((l) => `${l.name} (${l.level ?? l.fluency})`),
    },
  ]
  return (
    <section id="skills" className="flex flex-col gap-12">
      <SectionHeading
        title="Skills"
        subtitle="The building blocks I work with"
      />
      <div className="reveal mx-auto grid w-full max-w-5xl justify-items-center gap-4 md:grid-cols-[1fr_auto_1fr] md:grid-rows-2 md:items-center md:gap-y-16">
        <div className="glass glow flex flex-col items-center gap-2 rounded-4xl bg-card p-5 md:col-start-2 md:row-span-2 md:row-start-1">
          <Avatar className="size-28 ring-2 ring-white/20">
            <AvatarImage
              src={`${import.meta.env.BASE_URL}${basics.image}`}
              alt={basics.name}
            />
            <AvatarFallback className="text-2xl">DJ</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">me</span>
        </div>
        {groups.map((g, i) => (
          <div
            key={g.name}
            className={cn(
              "flex w-full max-w-sm flex-col items-center gap-2 md:max-w-none md:gap-0",
              mapSlots[i % mapSlots.length].box
            )}
          >
            <ChalkArrow
              className={cn(
                "w-16 shrink-0 -rotate-90 md:order-last md:w-20",
                mapSlots[i % mapSlots.length].arrow
              )}
            />
            <div className="relative w-full flex-1 p-4">
              <span
                aria-hidden
                className="absolute inset-0 rounded-lg border-2 border-current chalk"
              />
              <h3 className="mb-2 font-semibold">{g.name}</h3>
              <p className="text-muted-foreground">{g.items.join(" · ")}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Grouped by end year, matching the newest-first sort of `experience`.
const timeline = experience.reduce<[string, Entry[]][]>((groups, e) => {
  const year = e.end?.slice(0, 4) ?? "now"
  const last = groups.at(-1)
  if (last?.[0] === year) last[1].push(e)
  else groups.push([year, [e]])
  return groups
}, [])

function Experience() {
  return (
    <section id="experience" className="flex flex-col gap-12">
      <SectionHeading
        title="Experience"
        subtitle="My professional journey in software development"
      />
      <ol className="relative mx-auto flex w-full max-w-3xl flex-col gap-10 pl-16 sm:pl-24">
        <span
          aria-hidden
          className="absolute inset-y-0 left-4 w-0.75 rounded-full bg-current chalk sm:left-8"
        />
        {timeline.map(([year, entries]) => (
          <li key={year}>
            <ol className="flex flex-col gap-10">
              {entries.map((e, i) => (
                <li key={e.title + e.start} className="reveal relative">
                  {/* Only the first entry of an end year gets the marker */}
                  {i === 0 && (
                    <div className="absolute top-9 -left-12 w-11 sm:-left-16 sm:w-15">
                      <span className="absolute -top-6 left-1 chalk text-lg">
                        {year === "now" ? (
                          "now"
                        ) : (
                          <time dateTime={year}>{year}</time>
                        )}
                      </span>
                      <ChalkArrow className="w-full" />
                    </div>
                  )}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold luminous">
                        {e.title}
                      </CardTitle>
                      {e.organization && (
                        <CardDescription className="text-base">
                          {e.organization}
                        </CardDescription>
                      )}
                      <p className="text-sm text-muted-foreground">
                        <time dateTime={e.start}>{formatMonth(e.start)}</time> –{" "}
                        {e.end ? (
                          <time dateTime={e.end}>{formatMonth(e.end)}</time>
                        ) : (
                          formatMonth()
                        )}
                      </p>
                    </CardHeader>
                    {e.highlights && (
                      <CardContent>
                        <ul className="flex list-disc flex-col gap-2 pl-5 text-muted-foreground">
                          {e.highlights.map((h) => (
                            <li key={h.name}>
                              <strong className="luminous">{h.name}:</strong>{" "}
                              {h.description}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    )}
                    <CardFooter className="justify-end gap-1.5 text-xs text-muted-foreground">
                      {e.end ? (
                        formatDuration(e.start, e.end)
                      ) : (
                        <>
                          <span className="size-2 animate-pulse rounded-full bg-luminous shadow-[0_0_8px_var(--glow)]" />
                          Currently active
                        </>
                      )}
                    </CardFooter>
                  </Card>
                </li>
              ))}
            </ol>
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
      <Card className="reveal mx-auto w-full max-w-2xl">
        <CardContent>
          <ul className="flex flex-col gap-6">
            {accomplishments.map((a) => (
              <li key={a.title + a.start} className="flex gap-3">
                <CheckIcon className="mt-0.5 size-5 shrink-0 luminous-icon" />
                <div>
                  <h3 className="font-semibold luminous">{a.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {[a.organization, a.location].filter(Boolean).join(" · ")} ·{" "}
                    <time dateTime={a.start}>{formatMonth(a.start)}</time>
                    {a.end && (
                      <>
                        {" → "}
                        <time dateTime={a.end}>{formatMonth(a.end)}</time>
                      </>
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
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
      <ChalkFilter />
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
