import {
  SisdaiAlluvial,
  SisdaiAreasApiladas,
  SisdaiBarras,
  SisdaiCajasBigotes,
  SisdaiChecks,
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
    Vue.use(SisdaiNomenclatura)
    Vue.use(SisdaiSeriesTiempo)
    Vue.use(SisdaiAreasApiladas)
    Vue.use(SisdaiViolines)
    Vue.use(SisdaiAlluvial)
  },
}

export {
  SisdaiAlluvial,
  SisdaiAreasApiladas,
  SisdaiBarras,
  SisdaiCajasBigotes,
  SisdaiChecks,
  SisdaiGraficas,
  SisdaiNomenclatura,
  SisdaiSeriesTiempo,
  SisdaiViolines,
}

export default plugin
