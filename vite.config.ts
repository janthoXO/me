import { resolve } from "node:path"
import yaml from "@rollup/plugin-yaml"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { createServer, defineConfig, type Plugin } from "vite"

// Injects the generated head tags into index.html and, on build, the
// prerendered app markup so crawlers that don't run JS see the full CV.
function prerender(): Plugin {
  let base = "/"
  return {
    name: "prerender",
    configResolved(config) {
      base = config.base
    },
    async transformIndexHtml(html, { server }) {
      const vite =
        server ??
        (await createServer({
          base,
          appType: "custom",
          server: { middlewareMode: true, hmr: false },
        }))
      try {
        const { head, render } = await vite.ssrLoadModule(
          "/src/entry-server.tsx"
        )
        html = html.replace("<!--head-->", head())
        return server
          ? html
          : html.replace(
              '<div id="root"></div>',
              `<div id="root">${render()}</div>`
            )
      } finally {
        if (!server) await vite.close()
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), yaml(), prerender()],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "./src"),
    },
  },
})
