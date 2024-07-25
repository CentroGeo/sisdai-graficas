// import pageComponents from '@internal/page-components'

import 'sisdai-css'

import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/vars.css'

import './estilo/codigo.css'
import './estilo/index.scss'

// https://vitepress.dev/guide/custom-theme
import { createPinia } from 'pinia'

import Layout from './Layout.vue'

export default {
  Layout,
  async enhanceApp({ app }) {
    // Pinia
    const pinia = createPinia()
    app.use(pinia)

    if (!import.meta.env.SSR) {
      // Store
      const store = await import('../store')
      app.mixin({ store: store })
      // Componentes
      const SisdaiComponentes = await import('./../../../src/index.js')
      app.use(SisdaiComponentes.default)
    }

    // register your custom global components
    // for (const [name, component] of Object.entries(pageComponents)) {
    //   app.component(name, component)
    // }
  },
}
