import {
  SisdaiBarras,
  SisdaiCajasBigotes,
  SisdaiChecks,
  SisdaiGraficas,
} from './componentes'

const plugin = {
  install: function (Vue) {
    //UI base
    Vue.use(SisdaiGraficas)
    Vue.use(SisdaiBarras)
    Vue.use(SisdaiCajasBigotes)
    Vue.use(SisdaiChecks)
  },
}

export { SisdaiBarras, SisdaiCajasBigotes, SisdaiChecks, SisdaiGraficas }

export default plugin
