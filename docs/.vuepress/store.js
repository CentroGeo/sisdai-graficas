import Vue from 'vue'
import Vuex from 'vuex'
import { accesibilidad } from 'sisdai-componentes/src/stores'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    accesibilidad,
  },
})
