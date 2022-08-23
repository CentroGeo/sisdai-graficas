/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

//import "dai-maps/dist/dai-maps.css"

//import "../../src/styles/main.scss"

//import DaiMaps from "dai-maps"
//import  DaiMaps from "../../src/index.js"


import { DadsigBarras, DadsigDonas, DadsigLineas, DadsigCajasBigotes, DadsigDiagramaProcesos, DadsigAreasApiladas, SelectorVariantes, SelectorEstados} from "../../src/index.js"
import "./styles/index.scss"

/*export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(DaiMaps)
  // ...apply enhancements for the site.
}
*/

import Vuex from 'vuex';

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.use(DadsigBarras)
  Vue.use(DadsigCajasBigotes)
  Vue.use(DadsigDonas)
  Vue.use(DadsigLineas)
  Vue.use(DadsigDiagramaProcesos)
  Vue.use(DadsigAreasApiladas)
  // ...apply enhancements for the site.
  
  Vue.use(SelectorVariantes)
  Vue.use(SelectorEstados)

  Vue.use(Vuex);

  const state = {
    variante_seleccionada: 'VTODAS',
    estado_seleccionado: '00',
    variantes_con_conteo_oms_cero: [],
    fecha_actualizacion: '13/ago/2022',
  }

  const getters = {
    // selectores de variables
    varianteSeleccionada(state) {
      return state.variante_seleccionada;
    },
    variantesConConteoOmsCero(state) {
      return state.variantes_con_conteo_oms_cero;
    },
    fechaActualizacion(state) {
      return state.fecha_actualizacion;
    },
    estadoSeleccionado(state) {
      return state.estado_seleccionado;
    },
  }

  const modules = {
  }

  const mutations = {
    // selectores de variables, nueva seleccion
    seleccionarVariante(state, value) {
      state.variante_seleccionada = value;
    },
    seleccionarEstado(state, value) {
      state.estado_seleccionado = value;
    },
  }

  const actions = {
  }

  const store = new Vuex.Store({
    state,
    modules,
    mutations,
    actions,
    getters
  })
  Vue.mixin({store: store})
}