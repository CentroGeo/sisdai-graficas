import { SisdaiGraficas } from './componentes'

const plugin = {
  install: function (Vue) {
    //UI base
    Vue.use(SisdaiGraficas)
  },
}

export { SisdaiGraficas }

export default plugin
