import { SisdaiBarras, SisdaiCajasBigotes, SisdaiGraficas } from './componentes'

const plugin = {
  install: function (Vue) {
    //UI base
    Vue.use(SisdaiGraficas)
    Vue.use(SisdaiBarras)
    Vue.use(SisdaiCajasBigotes)
  },
}

export { SisdaiBarras, SisdaiCajasBigotes, SisdaiGraficas }

export default plugin
