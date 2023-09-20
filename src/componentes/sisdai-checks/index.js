import SisdaiChecks from './SisdaiChecks.vue'

const plugin = {
  install: function (Vue) {
    Vue.component('SisdaiChecks', SisdaiChecks)
  },
}

export default plugin
