import {
  SisdaiBarras,
  SisdaiCajasBigotes,
  SisdaiChecks,
  SisdaiGraficas,
  SisdaiNomenclatura,
} from './componentes'

const plugin = {
  install: function (Vue) {
    //UI base
    Vue.use(SisdaiGraficas)
    Vue.use(SisdaiBarras)
    Vue.use(SisdaiCajasBigotes)
    Vue.use(SisdaiChecks)
    Vue.use(SisdaiNomenclatura)
  },
}

export {
  SisdaiBarras,
  SisdaiCajasBigotes,
  SisdaiChecks,
  SisdaiGraficas,
  SisdaiNomenclatura,
}

export default plugin
