import cv from "../cv.yaml"

export type Entry = {
  title: string
  organization?: string
  location?: string
  start: string // "YYYY-MM"
  end?: string
  highlights?: { name: string; description: string }[]
}

export type Project = {
  name: string
  description: string
  language: string
  link: string
}

type Cv = {
  basics: {
    name: string
    title: string
    summary: string
    email: string
    phone: string
    url: string
    image: string
    github: string
    linkedin: string
  }
  education: Entry[]
  work: Entry[]
  projects: Project[]
  skills: { name: string; items: string[] }[]
  accomplishments: Entry[]
  languages: { name: string; fluency: string; level?: string }[]
}

export const {
  basics,
  education,
  work,
  projects,
  skills,
  accomplishments,
  languages,
} = cv as Cv

// Newest first: ongoing entries on top, then by end and start date.
export const experience = [...education, ...work].sort(
  (a, b) =>
    (b.end ?? "9999").localeCompare(a.end ?? "9999") ||
    b.start.localeCompare(a.start)
)
