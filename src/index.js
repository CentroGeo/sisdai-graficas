import {
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
  },
}

export {
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
