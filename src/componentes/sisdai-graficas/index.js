import SisdaiGraficas from './SisdaiGraficas.vue'

const plugin = {
  install: function (Vue) {
    Vue.component('SisdaiGraficas', SisdaiGraficas)
  },
}

export default plugin
