import { mount, shallowMount } from '@vue/test-utils'
import SisdaiGraficas from '../../../src/componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiBarras from '../../../src/componentes/sisdai-barras/SisdaiBarras.vue'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
const datos = [
  { categoria: 'A', valor_1: 10, valor_2: 10 },
  { categoria: 'B', valor_1: 10, valor_2: 10 },
]
const variables = [
  { id: 'valor_1', nombre: 'Valor 1', color: 'red' },
  { id: 'valor_2', nombre: 'Valor 2', color: 'blue' },
]
describe('SisdaiGraficas con SisdaiBarras', () => {
  it('debe renderizar SisdaiBarras en el slot por defecto', () => {
    const wrapper = shallowMount(SisdaiGraficas, {
      props: { id: 'test-id' },
      slots: {
        default: SisdaiBarras,
      },
    })

    // Verifica que SisdaiBarras está en el DOM
    expect(wrapper.findComponent(SisdaiBarras).exists()).toBe(true)
  })

  describe('SisdaiGraficas con SisdaiBarras', () => {
    it('debe pasar props correctamente a SisdaiBarras', () => {
      const wrapper = mount(SisdaiGraficas, {
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiBarras, { datos, variables })
            },
          },
        },
      })

      // Verifica que el componente SisdaiBarras está montado
      const sisdaiBarras = wrapper.findComponent(SisdaiBarras)
      expect(sisdaiBarras.exists()).toBe(true)
      // Verifica las props de SisdaiBarras
      expect(sisdaiBarras.props('datos')).toEqual(datos)
      expect(sisdaiBarras.props('variables')).toEqual(variables)
    })
    it('Debe generar el mismo número de rectángulos de datos * variables', async () => {
      const wrapper = mount(SisdaiGraficas, {
        props: { id: 'test-id-graficas-barras', ancho: 500 },
        attachTo: document.body.appendChild(document.createElement('div')),
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiBarras, { datos, variables })
            },
          },
        },
      })
      await wrapper.vm.$nextTick()
      const svg = wrapper.find('svg.svg-vis')
      svg.element.transform = { baseVal: [] }

      const barras = svg.findAll('rect')

      expect(barras.length).toBe(datos.length * variables.length)
    })
  })
})
