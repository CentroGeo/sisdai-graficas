import SisdaiBarrasPrueba from './SisdaiBarrasPrueba.vue'

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  function agregarComponente(componente) {
    Vue.component(componente.__name, componente)
  }

  agregarComponente(SisdaiBarrasPrueba)
}

export { plugin as install }
