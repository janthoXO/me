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
