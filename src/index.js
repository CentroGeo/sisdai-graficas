import {
    DadsigBarras,
    DadsigDonas,
    DadsigLineas,
    DadsigCajasBigotes,
    DadsigDiagramaProcesos,
    DadsigAreasApiladas,
    DadsigLineaTiempo
} from "./components"

import "./scss/estilogeneral.scss"

export default function plugin(Vue) {
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(DadsigBarras)
    Vue.use(DadsigDonas)
    Vue.use(DadsigLineas)
    Vue.use(DadsigCajasBigotes)
    Vue.use(DadsigDiagramaProcesos)
    Vue.use(DadsigAreasApiladas)
    Vue.use(DadsigLineaTiempo)
}

export {
    plugin as install,
    DadsigBarras,
    DadsigDonas,
    DadsigLineas,
    DadsigCajasBigotes,
    DadsigDiagramaProcesos,
    DadsigAreasApiladas,
    DadsigLineaTiempo
}