import { mount, shallowMount } from '@vue/test-utils'
import SisdaiGraficas from '../../../src/componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiAreasApiladas from '../../../src/componentes/sisdai-areas-apiladas/SisdaiAreasApiladas.vue'
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
describe('SisdaiGraficas con SisdaiAreasApiladas', () => {
  it('debe renderizar SisdaiAreasApiladas en el slot por defecto', () => {
    const wrapper = shallowMount(SisdaiGraficas, {
      props: { id: 'test-id' },
      slots: {
        default: SisdaiAreasApiladas,
      },
    })

    // Verifica que SisdaiAreasApiladas está en el DOM
    expect(wrapper.findComponent(SisdaiAreasApiladas).exists()).toBe(true)
  })

  describe('SisdaiGraficas con SisdaiAreasApiladas', () => {
    it('debe pasar props correctamente a SisdaiAreasApiladas', () => {
      const wrapper = mount(SisdaiGraficas, {
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiAreasApiladas, { datos, variables })
            },
          },
        },
      })

      // Verifica que el componente SisdaiAreasApiladas está montado
      const sisdaiAreasApiladas = wrapper.findComponent(SisdaiAreasApiladas)
      expect(sisdaiAreasApiladas.exists()).toBe(true)
      // Verifica las props de SisdaiAreasApiladas
      expect(sisdaiAreasApiladas.props('datos')).toEqual(datos)
      expect(sisdaiAreasApiladas.props('variables')).toEqual(variables)
    })
    it('Debe generar el mismo número de paths que de variables ', async () => {
      const wrapper = mount(SisdaiGraficas, {
        props: { id: 'test-id-graficas-barras', ancho: 500 },
        attachTo: document.body.appendChild(document.createElement('div')),
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiAreasApiladas, { datos, variables })
            },
          },
        },
      })
      await wrapper.vm.$nextTick()
      const svg = wrapper.find('svg.svg-vis')
      svg.element.transform = { baseVal: [] }
      const paths = svg.findAll('path.area')

      expect(paths.length).toBe(variables.length)
    })
  })
})
