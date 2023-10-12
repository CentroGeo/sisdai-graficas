import {
  SisdaiBarras,
  SisdaiCajasBigotes,
  SisdaiChecks,
  SisdaiGraficas,
  SisdaiNomenclatura,
  SisdaiSeriesTiempo,
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
  },
}

export {
  SisdaiBarras,
  SisdaiCajasBigotes,
  SisdaiChecks,
  SisdaiGraficas,
  SisdaiNomenclatura,
  SisdaiSeriesTiempo,
}

export default plugin
