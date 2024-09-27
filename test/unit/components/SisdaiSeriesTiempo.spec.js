import { mount, shallowMount } from '@vue/test-utils'
import SisdaiGraficas from '../../../src/componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiSeriesTiempo from '../../../src/componentes/sisdai-series-tiempo/SisdaiSeriesTiempo.vue'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
const datos = [
  { fecha: '01-01-2021', ags: 100, bc: 100 },
  { fecha: '01-02-2021', ags: 80, bc: 50 },
  { fecha: '01-03-2021', ags: 20, bc: 90 },
  { fecha: '01-04-2021', ags: 20, bc: 15 },
]
const variables = [
  {
    id: 'ags',
    nombre: 'Aguascalientes',
    color: 'pink',
  },
  {
    id: 'bc',
    nombre: 'Baja California',
    color: 'orange',
  },
]
describe('SisdaiGraficas con SisdaiSeriesTiempo', () => {
  it('debe renderizar SisdaiSeriesTiempo en el slot por defecto', () => {
    const wrapper = shallowMount(SisdaiGraficas, {
      props: { id: 'test-id' },
      slots: {
        default: SisdaiSeriesTiempo,
      },
    })

    // Verifica que SisdaiSeriesTiempo está en el DOM
    expect(wrapper.findComponent(SisdaiSeriesTiempo).exists()).toBe(true)
  })

  describe('SisdaiGraficas con SisdaiSeriesTiempo', () => {
    it('debe pasar props correctamente a SisdaiSeriesTiempo', () => {
      const wrapper = mount(SisdaiGraficas, {
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiSeriesTiempo, { datos, variables })
            },
          },
        },
      })

      // Verifica que el componente SisdaiSeriesTiempo está montado
      const sisdaiSeriesTiempo = wrapper.findComponent(SisdaiSeriesTiempo)
      expect(sisdaiSeriesTiempo.exists()).toBe(true)
      // Verifica las props de SisdaiSeriesTiempo
      expect(sisdaiSeriesTiempo.props('datos')).toEqual(datos)
      expect(sisdaiSeriesTiempo.props('variables')).toEqual(variables)
    })
    it('Debe generar el mismo número de paths que de variables ', async () => {
      const wrapper = mount(SisdaiGraficas, {
        props: { id: 'test-id-graficas-barras', ancho: 500 },
        attachTo: document.body.appendChild(document.createElement('div')),
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiSeriesTiempo, { datos, variables })
            },
          },
        },
      })
      await wrapper.vm.$nextTick()
      const svg = wrapper.find('svg.svg-vis')
      svg.element.transform = { baseVal: [] }
      const paths = svg.findAll('path.linea')

      expect(paths.length).toBe(variables.length)
    })
  })
})
