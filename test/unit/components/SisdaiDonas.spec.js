import { mount, shallowMount } from '@vue/test-utils'
import SisdaiGraficas from '../../../src/componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiDona from '../../../src/componentes/sisdai-dona/SisdaiDona.vue'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
const datos = [
  { categoria: 'fut', cantidad: 93 },
  { categoria: 'natacion', cantidad: 52 },
  { categoria: 'basquet', cantidad: 31 },
  { categoria: 'ciclismo', cantidad: 24 },
  { categoria: 'box', cantidad: 12 },
]
const variables = [
  { id: 'fut', nombre: 'Futbol', color: '#fb4c56' },
  { id: 'natacion', nombre: 'Natación', color: '#023b88' },
  { id: 'basquet', nombre: 'Básquetbol', color: '#19a7ac' },
  { id: 'ciclismo', nombre: 'Ciclismo', color: '#046b4f' },
  { id: 'box', nombre: 'Boxeo', color: '#f9af05' },
]
describe('SisdaiGraficas con SisdaiDona', () => {
  it('debe renderizar SisdaiDona en el slot por defecto', () => {
    const wrapper = shallowMount(SisdaiGraficas, {
      props: { id: 'test-id' },
      slots: {
        default: SisdaiDona,
      },
    })

    // Verifica que SisdaiDona está en el DOM
    expect(wrapper.findComponent(SisdaiDona).exists()).toBe(true)
  })

  describe('SisdaiGraficas con SisdaiDona', () => {
    it('debe pasar props correctamente a SisdaiDona', () => {
      const wrapper = mount(SisdaiGraficas, {
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiDona, { datos, variables })
            },
          },
        },
      })

      // Verifica que el componente SisdaiDona está montado
      const sisdaiDona = wrapper.findComponent(SisdaiDona)
      expect(sisdaiDona.exists()).toBe(true)
      // Verifica las props de SisdaiDona
      expect(sisdaiDona.props('datos')).toEqual(datos)
      expect(sisdaiDona.props('variables')).toEqual(variables)
    })
    it('Debe generar el mismo número de segmentos de dona que de variables', async () => {
      const wrapper = mount(SisdaiGraficas, {
        props: { id: 'test-id-graficas-barras', ancho: 500 },
        attachTo: document.body.appendChild(document.createElement('div')),
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiDona, { datos, variables })
            },
          },
        },
      })
      await wrapper.vm.$nextTick()
      const svg = wrapper.find('svg.svg-vis')
      svg.element.transform = { baseVal: [] }

      const segementos = svg.findAll('path.path-segmento')

      expect(segementos.length).toBe(variables.length)
    })
  })
})
