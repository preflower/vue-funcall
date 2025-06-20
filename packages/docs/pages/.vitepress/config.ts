import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vue Funcall',
  description: 'A method that create component with function call',
  head: [['link', { rel: 'icon', href: '/vue-funcall/logo.svg' }]],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Example', link: '/example' }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/preflower/vue-funcall' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present Ted Lin'
    }
  },
  base: '/vue-funcall'
})
