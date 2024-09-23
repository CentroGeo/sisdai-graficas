import SisdaiNomenclatura from './SisdaiNomenclatura.vue'

const plugin = {
  install: function (Vue) {
    Vue.component('SisdaiNomenclatura', SisdaiNomenclatura)
  },
}

export default plugin
