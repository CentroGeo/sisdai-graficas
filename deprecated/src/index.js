//import {
//  SisdaiBarras,
//  SisdaiDonas,
//  SisdaiLineas,
//  SisdaiCajasBigotes,
//  SisdaiDiagramaProcesos,
//  SisdaiAreasApiladas,
//  SisdaiLineaTiempo,
//  //SisdaiBarrasPrueba
//} from './components'

import SisdaiBarrasPrueba from './components/grafica/SisdaiBarrasPrueba.vue'

console.log(SisdaiBarrasPrueba)

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  //Vue.use(SisdaiBarras)
  //Vue.use(SisdaiDonas)
  //Vue.use(SisdaiLineas)
  //Vue.use(SisdaiCajasBigotes)
  //Vue.use(SisdaiDiagramaProcesos)
  //Vue.use(SisdaiAreasApiladas)
  //Vue.use(SisdaiLineaTiempo)
  //Vue.use(SisdaiBarrasPrueba)
  Vue.component(SisdaiBarrasPrueba.__name, SisdaiBarrasPrueba)
}

export { plugin as install }
