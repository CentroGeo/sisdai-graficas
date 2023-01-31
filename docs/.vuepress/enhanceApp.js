/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */


import {
    SisdaiBarras,
    SisdaiDonas,
    SisdaiLineas,
    SisdaiCajasBigotes,
    SisdaiDiagramaProcesos,
    SisdaiAreasApiladas,
    SisdaiLineaTiempo,
    SisdaiBarrasPrueba
} from "../../src/index.js"
import "./styles/index.scss"

export default ({
                    Vue, // the version of Vue being used in the VuePress app
                    options, // the options for the root Vue instance
                    router, // the router instance for the app
                    siteData // site metadata
                }) => {
    Vue.use(SisdaiBarras)
    Vue.use(SisdaiCajasBigotes)
    Vue.use(SisdaiDonas)
    Vue.use(SisdaiLineas)
    Vue.use(SisdaiDiagramaProcesos)
    Vue.use(SisdaiAreasApiladas)
    Vue.use(SisdaiLineaTiempo)
    Vue.use(SisdaiBarrasPrueba)

    // ...apply enhancements for the site.



}