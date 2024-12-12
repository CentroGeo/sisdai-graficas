import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const pkg = require('../../package.json')
// https://vitepress.dev/reference/site-config
export default {
  lang: 'es-mx',
  title: 'sisdai-graficas',
  description: pkg.description,

  // appearance: false,
  lastUpdated: true,

  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://file.myfontastic.com/JS4TgqY9L4s8WsKQDkt5qA/icons.css',
      },
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    ],
    [
      'link',
      {
        href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Montserrat:wght@300;400;500;600&display=swap',
        rel: 'stylesheet',
      },
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: nav(),

    sidebar: {
      '/': sidebarGraficas(''),
      '/comienza/': sidebarComienza('comienza'),

      '/graficas/': sidebarGraficas('graficas'),
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
      text: 'Inicio',
      link: '/',
      activeMatch: '',
    },
    {
      text: 'Comienza',
      link: '/comienza/',
      activeMatch: 'comienza',
    },
    {
      text: 'Gráficas',
      link: '/graficas/personalizacion/',
      activeMatch: 'graficas',
    },
    // {
    //   text: `v${pkg.version}`,
    //   link: pkg.repository.url,
    //   rel: 'noopener noreferrer',
    //   target: '_blank',
    //   img: 'https://cdn.conahcyt.mx/sisdai-archivos/gitlab-logo-500.png',
    // },
  ]
}

function sidebarGraficas(path) {
  // Agrega aquí las rutas de los nuevos componentes
  return [
    {
      text: 'Personalización',
      link: `/${path}/personalizacion/`,
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
  ]
}
function sidebarComienza(path) {
  return [
    {
      text: 'Comienza',
      link: `/${path}/`,
    },
    {
      text: 'Instalación',
      link: `/${path}/instalacion/`,
    },
  ]
}
