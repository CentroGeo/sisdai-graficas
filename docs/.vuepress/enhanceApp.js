import pageComponents from '@internal/page-components'
import SisdaiComponentes from 'sisdai-componentes'
import Vuex from 'vuex'
import SisdaiGraficas from './../../src'
import store from './store'

export default ({
  Vue,
  // options, // the options for the root Vue instance
  // router, // the router instance for the app
  // siteData // site metadata
}) => {
  // ...apply enhancements to the app
  // import styles
  require('./theme/styles/index.css')
  require('../../node_modules/sisdai-css/dist/sisdai.min.css')

  Vue.use(Vuex)
  Vue.mixin({ store: store })
  console.log(SisdaiComponentes)
  Vue.use(SisdaiComponentes)

  Vue.use(SisdaiGraficas)

  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
