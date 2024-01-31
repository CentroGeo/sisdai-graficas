/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

import SisdaiBarrasPrueba from '../../src/components/grafica/index'
import SisdaiGraficas from '../../src/components/grafica/index'
import './styles/index.scss'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  Vue.use(SisdaiBarrasPrueba)
  Vue.use(SisdaiGraficas)
}