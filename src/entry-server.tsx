import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import App from "@/App"
import { accomplishments, basics, education, languages, skills } from "@/data"

export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )

const attr = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;")

// SEO/GEO head tags, generated from cv.yaml so they always match the page.
export function head() {
  const title = `${basics.name} – ${basics.title}`
  const image = new URL(basics.image, basics.url).href
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      "@id": `${basics.url}#person`,
      name: basics.name,
      jobTitle: basics.title,
      description: basics.summary,
      url: basics.url,
      image,
      sameAs: [basics.github, basics.linkedin],
      knowsAbout: skills.flatMap((s) => s.items),
      knowsLanguage: languages.map((l) => l.name),
      award: accomplishments.map((a) => a.title),
      alumniOf: [...new Set(education.map((e) => e.organization))].map(
        (name) => ({ "@type": "CollegeOrUniversity", name })
      ),
    },
  }
  const meta = (key: "name" | "property", entries: Record<string, string>) =>
    Object.entries(entries).map(
      ([k, v]) => `<meta ${key}="${k}" content="${attr(v)}" />`
    )
  return [
    `<title>${attr(title)}</title>`,
    `<link rel="canonical" href="${attr(basics.url)}" />`,
    ...meta("name", {
      description: basics.summary,
      author: basics.name,
      "twitter:card": "summary_large_image",
    }),
    ...meta("property", {
      "og:type": "profile",
      "og:title": title,
      "og:description": basics.summary,
      "og:url": basics.url,
      "og:image": image,
      "og:image:alt": basics.name,
    }),
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replaceAll("<", "\\u003c")}</script>`,
  ].join("\n    ")
}
