import SisdaiBarrasPrueba from './componentes/grafica/SisdaiBarrasPrueba.vue'

console.log(SisdaiBarrasPrueba)

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true
  Vue.component(SisdaiBarrasPrueba.__name, SisdaiBarrasPrueba)
}

export { plugin as install }
