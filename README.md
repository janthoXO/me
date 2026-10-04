# me

Personal website and CV. React + Vite + shadcn/ui (Base UI).

```sh
pnpm install
pnpm dev            # http://localhost:5173
pnpm run lint
pnpm run format
pnpm run build
```

Run the production image locally:

```sh
docker build -t website .
docker run --rm -p 8080:8080 website
```

Pushes to `main` cut a patch release (GHCR image + GitHub release) and deploy to GitHub Pages. Push a `v*` tag to release a specific version.

## Content

Edit `cv.yaml` (repo root). It is the single source of truth for the site and the (future) Typst CV (`yaml("cv.yaml")`).
Dates are `YYYY-MM` strings; omit `end` for ongoing. `basics.url` is the canonical URL for SEO tags. Project GitHub data is fetched live; YAML fields are fallbacks.

The build prerenders the page (`vite.config.ts`, `src/entry-server.tsx`), so render output must be deterministic.
