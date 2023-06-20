import { SisdaiGraficas, SisdaiBarras } from './componentes'

const plugin = {
  install: function (Vue) {
    //UI base
    Vue.use(SisdaiGraficas)
    Vue.use(SisdaiBarras)
  },
}

export { SisdaiGraficas, SisdaiBarras }

export default plugin
