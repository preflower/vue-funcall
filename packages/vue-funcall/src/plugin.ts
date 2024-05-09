import { type AppContext, type App } from 'vue'

export const VueFuncallPlugin = {
  install (app: App) {
    VueFuncallPlugin._context = app._context
  },
  _context: null as AppContext | null
}
