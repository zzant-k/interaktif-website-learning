import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { handleAuthApi } from './src/server/supabaseApi'

function supabaseAuthPlugin(): Plugin {
  return {
    name: 'supabase-auth-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (
          req.url &&
          (req.url.startsWith('/api/auth') ||
            req.url.startsWith('/api/leaderboard'))
        ) {
          handleAuthApi(req, res).catch(next)
        } else {
          next()
        }
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (
          req.url &&
          (req.url.startsWith('/api/auth') ||
            req.url.startsWith('/api/leaderboard'))
        ) {
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


