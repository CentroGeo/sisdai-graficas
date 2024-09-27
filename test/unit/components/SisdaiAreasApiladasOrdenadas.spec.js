import { mount, shallowMount } from '@vue/test-utils'
import SisdaiGraficas from '../../../src/componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiAreasApiladasOrdenadas from '../../../src/componentes/sisdai-areas-apiladas-ordenadas/SisdaiAreasApiladasOrdenadas.vue'
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
describe('SisdaiGraficas con SisdaiAreasApiladasOrdenadas', () => {
  it('debe renderizar SisdaiAreasApiladasOrdenadas en el slot por defecto', () => {
    const wrapper = shallowMount(SisdaiGraficas, {
      props: { id: 'test-id' },
      slots: {
        default: SisdaiAreasApiladasOrdenadas,
      },
    })

    // Verifica que SisdaiAreasApiladasOrdenadas está en el DOM
    expect(wrapper.findComponent(SisdaiAreasApiladasOrdenadas).exists()).toBe(
      true
    )
  })

  describe('SisdaiGraficas con SisdaiAreasApiladasOrdenadas', () => {
    it('debe pasar props correctamente a SisdaiAreasApiladasOrdenadas', () => {
      const wrapper = mount(SisdaiGraficas, {
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiAreasApiladasOrdenadas, { datos, variables })
            },
          },
        },
      })

      // Verifica que el componente SisdaiAreasApiladasOrdenadas está montado
      const sisdaiAreasApiladasOrdenadas = wrapper.findComponent(
        SisdaiAreasApiladasOrdenadas
      )
      expect(sisdaiAreasApiladasOrdenadas.exists()).toBe(true)
      // Verifica las props de SisdaiAreasApiladasOrdenadas
      expect(sisdaiAreasApiladasOrdenadas.props('datos')).toEqual(datos)
      expect(sisdaiAreasApiladasOrdenadas.props('variables')).toEqual(variables)
    })
    it('Debe generar el mismo número de paths que de variables  y la misma cantidad de rectángulos que de variables * datos', async () => {
      const wrapper = mount(SisdaiGraficas, {
        props: { id: 'test-id-graficas-barras', ancho: 500 },
        attachTo: document.body.appendChild(document.createElement('div')),
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiAreasApiladasOrdenadas, { datos, variables })
            },
          },
        },
      })
      await wrapper.vm.$nextTick()
      const svg = wrapper.find('svg.svg-vis')
      svg.element.transform = { baseVal: [] }
      const paths = svg.findAll('path.area')
      const rectangulos = svg.findAll('rect.barra')

      expect(paths.length).toBe(variables.length)
      expect(rectangulos.length).toBe(variables.length * datos.length)
    })
  })
})
