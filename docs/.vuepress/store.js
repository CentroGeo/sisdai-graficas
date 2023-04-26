import Vue from 'vue'
import Vuex from 'vuex'
import accesibilidad from './stores/accesibilidad'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    accesibilidad,
  },
})
