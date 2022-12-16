import {
    SisdaiBarras,
    SisdaiDonas,
    SisdaiLineas,
    SisdaiCajasBigotes,
    SisdaiDiagramaProcesos,
    SisdaiAreasApiladas,
    SisdaiLineaTiempo
} from "./components"

import "./scss/estilogeneral.scss"

export default function plugin(Vue) {
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(SisdaiBarras)
    Vue.use(SisdaiDonas)
    Vue.use(SisdaiLineas)
    Vue.use(SisdaiCajasBigotes)
    Vue.use(SisdaiDiagramaProcesos)
    Vue.use(SisdaiAreasApiladas)
    Vue.use(SisdaiLineaTiempo)
}

export {
    plugin as install,
    SisdaiBarras,
    SisdaiDonas,
    SisdaiLineas,
    SisdaiCajasBigotes,
    SisdaiDiagramaProcesos,
    SisdaiAreasApiladas,
    SisdaiLineaTiempo
}