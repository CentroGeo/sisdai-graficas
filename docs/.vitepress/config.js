import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pkg = require('../../package.json')

// https://vitepress.dev/reference/site-config
export default {
  lang: 'es-mx',
  title: 'SISDAI-COMPONENTES',
  description: pkg.description,

  // appearance: false,
  lastUpdated: true,

  // head: [
  //   [
  //     'link',
  //     {
  //       rel: 'stylesheet',
  //       href: 'https://file.myfontastic.com/JS4TgqY9L4s8WsKQDkt5qA/icons.css',
  //     },
  //   ],
  // ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: {
      '/': sidebarDocumentacion('documentacion'),
      '/documentacion/': sidebarDocumentacion('documentacion'),
    },

    socialLinks: [
      {
        icon: 'github',
        link: pkg.repository.url || '',
        ariaLabel: 'github',
      },
    ],

    lastUpdated: {
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
        timeZone: 'America/Mexico_City',
      },
      text: 'Última actualización',
    },
  },
}

function nav() {
  return [
    {
      text: 'Documentación',
      link: '/',
      activeMatch: '/',
    },
    {
      text: `v${pkg.version}`,
      link: pkg.repository.url,
      rel: 'noopener noreferrer',
      target: '_blank',
      img: 'https://cdn.conahcyt.mx/sisdai-archivos/gitlab-logo-500.png',
    },
  ]
}

function sidebarDocumentacion(path) {
  // Agrega aquí las rutas de los nuevos componentes
  return [
    {
      text: 'Graficas',
      link: `/${path}/graficas/`,
    },
    {
      text: 'Alluvial',
      link: `/${path}/alluvial/`,
    },
    {
      text: 'Áreas apiladas',
      link: `/${path}/areas-apiladas/`,
    },
    {
      text: 'Áreas apiladas ordenadas',
      link: `/${path}/areas-apiladas-ordenadas/`,
    },
    {
      text: 'Barras',
      link: `/${path}/barras/`,
    },
    {
      text: 'Cajas y bigotes',
      link: `/${path}/cajas-bigotes/`,
    },
    {
      text: 'Dona',
      link: `/${path}/dona/`,
    },
    {
      text: 'Series de tiempo',
      link: `/${path}/series-tiempo/`,
    },
    {
      text: 'Violines',
      link: `/${path}/violines/`,
    },
    {
      text: 'Opciones avanzadas',
      link: `/${path}/opciones-avanzadas/`,
    },
  ]
}
