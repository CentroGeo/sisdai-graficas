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
  SisdaiAlluvial,
  SisdaiAreasApiladas,
  SisdaiAreasApiladasOrdenadas,
  SisdaiBarras,
  SisdaiCajasBigotes,
  SisdaiChecks,
  SisdaiDona,
  SisdaiGraficas,
  SisdaiNomenclatura,
  SisdaiSeriesTiempo,
  SisdaiViolines,
} from './componentes'

const plugin = {
  install: function (Vue) {
    //UI base
    Vue.use(SisdaiGraficas)
    Vue.use(SisdaiBarras)
    Vue.use(SisdaiCajasBigotes)
    Vue.use(SisdaiChecks)
    Vue.use(SisdaiDona)
    Vue.use(SisdaiNomenclatura)
    Vue.use(SisdaiSeriesTiempo)
    Vue.use(SisdaiAreasApiladas)
    Vue.use(SisdaiAreasApiladasOrdenadas)
    Vue.use(SisdaiViolines)
    Vue.use(SisdaiAlluvial)
  },
}

export {
  SisdaiAlluvial,
  SisdaiAreasApiladas,
  SisdaiAreasApiladasOrdenadas,
  SisdaiBarras,
  SisdaiCajasBigotes,
  SisdaiChecks,
  SisdaiDona,
  SisdaiGraficas,
  SisdaiNomenclatura,
  SisdaiSeriesTiempo,
  SisdaiViolines,
}

export default plugin
