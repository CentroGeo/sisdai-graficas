// This file is part of sisdai-graficas.
//
//   sisdai-graficas is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Lesser General Public License as published by the
//   Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   sisdai-graficas is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
//   Public License for more details.
//
//   You should have received a copy of the GNU Lesser General Public License along
//   with sisdai-graficas. If not, see <https://www.gnu.org/licenses/>.

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