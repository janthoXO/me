export const contact = {
  name: "Dennis Jandow",
  title: "Full-Stack Developer & Game Engineer",
  github: "https://github.com/janthoXO",
  linkedin: "https://www.linkedin.com/in/dennisjandow/",
}

export const skills = [
  {
    name: "Full-Stack Development",
    description: "Building complete web and mobile applications",
  },
  {
    name: "Software Planning and Engineering",
    description: "Expert in software design and architecture",
  },
  {
    name: "DevOps",
    description:
      "Deployment & CI/CD with Docker, Traefik, and automated deployment pipelines",
  },
]

export type Experience = {
  title: string
  subtitle: string
  description?: string
  tags: string[]
  start: Date
  end: Date | null // null = ongoing
}

export const experience: Experience[] = [
  {
    title: "Bachelors Informatics: Games Engineering",
    subtitle: "Technical University of Munich",
    tags: ["Computer Science", "Game Development"],
    start: new Date("2021-10-01"),
    end: new Date("2024-11-30"),
  },
  {
    title: "Working student position",
    subtitle: "Siticom GmbH",
    description: "Software Developer for optical fiber planning",
    tags: ["Software Development", "Problem Solving"],
    start: new Date("2022-12-01"),
    end: new Date("2025-06-30"),
  },
  {
    title: "Freelancer",
    subtitle: "Unity Production Foundation",
    description: "Consultant for Game Development and Design",
    tags: ["Game Development", "Consulting", "Design"],
    start: new Date("2024-07-01"),
    end: new Date("2025-08-31"),
  },
  {
    title: "Masters Informatics",
    subtitle: "Technical University of Munich",
    tags: ["Software Engineering", "Formal Methods"],
    start: new Date("2024-12-01"),
    end: null,
  },
]

export type Project = {
  name: string
  description: string
  tags: string[]
  link: string
  start: Date
  end: Date | null
}

export const projects: Project[] = [
  {
    name: "HackaTUM 24: CHECK24 Challenge",
    description:
      "A collaborative hackathon project developed in 48 hours with a team of 4 for the CHECK24 challenge.",
    tags: ["Vue.js", "TypeScript", "Node.js", "Express"],
    link: "https://github.com/CheckRepublic/checkrepublic",
    start: new Date("2024-11-22"),
    end: new Date("2024-11-24"),
  },
]
