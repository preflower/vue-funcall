import { type AppContext, type App } from 'vue'

export const plugin = {
  install (app: App) {
    plugin._context = app._context
  },
  _context: null as AppContext | null
}
