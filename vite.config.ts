import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { handleAuthApi } from './src/server/supabaseApi'

function isApiRoute(url?: string): boolean {
  return Boolean(
    url &&
      (url.startsWith('/api/auth') ||
        url.startsWith('/api/leaderboard') ||
        url.startsWith('/api/keepalive'))
  )
}

function supabaseAuthPlugin(): Plugin {
  return {
    name: 'supabase-auth-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (isApiRoute(req.url)) {
          handleAuthApi(req, res).catch(next)
        } else {
          next()
        }
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (isApiRoute(req.url)) {
          handleAuthApi(req, res).catch(next)
        } else {
          next()
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), supabaseAuthPlugin()],
})


