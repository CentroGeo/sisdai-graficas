import SisdaiSeriesTiempo from './SisdaiSeriesTiempo.vue'

const plugin = {
  install: function (Vue) {
    Vue.component('SisdaiSeriesTiempo', SisdaiSeriesTiempo)
  },
}

export default plugin
