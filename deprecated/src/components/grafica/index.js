import SisdaiBarrasPrueba from './SisdaiBarrasPrueba.vue'
import SisdaiGraficas from './SisdaiGraficas.vue'

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  function agregarComponente(componente) {
    Vue.component(componente.__name, componente)
  }

  agregarComponente(SisdaiBarrasPrueba)
  agregarComponente(SisdaiGraficas)
}

export { plugin as install }
