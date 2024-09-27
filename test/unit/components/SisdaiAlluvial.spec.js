import { mount, shallowMount } from '@vue/test-utils'
import SisdaiGraficas from '../../../src/componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiAlluvial from '../../../src/componentes/sisdai-alluvial/SisdaiAlluvial.vue'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
const datos = {
  nodos: [
    { name: 'Nodo 0', id: 'nodo0' },
    { name: 'Nodo 1', id: 'nodo1' },
    { name: 'Nodo 2', id: 'nodo2' },
  ],
  enlaces: [
    { source: 'Nodo 0', target: 'Nodo 2', value: 1 },
    { source: 'Nodo 1', target: 'Nodo 2', value: 1 },
  ],
}
const variables = [
  { id: 'nodo0', color: '#2c7fb8' },
  { id: 'nodo1', color: '#2c7fb8' },
  { id: 'nodo2', color: '#2c7fb8' },
  {
    id: 'enlaces',
    color: '#2c7fb8',
  },
]
describe('SisdaiGraficas con SisdaiAlluvial', () => {
  it('debe renderizar SisdaiAlluvial en el slot por defecto', () => {
    const wrapper = shallowMount(SisdaiGraficas, {
      props: { id: 'test-id' },
      slots: {
        default: SisdaiAlluvial,
      },
    })

    // Verifica que SisdaiAlluvial está en el DOM
    expect(wrapper.findComponent(SisdaiAlluvial).exists()).toBe(true)
  })

  describe('SisdaiGraficas con SisdaiAlluvial', () => {
    it('debe pasar props correctamente a SisdaiAlluvial', () => {
      const wrapper = mount(SisdaiGraficas, {
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiAlluvial, { datos, variables })
            },
          },
        },
      })

      // Verifica que el componente SisdaiAlluvial está montado
      const sisdaiAlluvial = wrapper.findComponent(SisdaiAlluvial)
      expect(sisdaiAlluvial.exists()).toBe(true)
      // Verifica las props de SisdaiAlluvial
      expect(sisdaiAlluvial.props('datos')).toEqual(datos)
      expect(sisdaiAlluvial.props('variables')).toEqual(variables)
    })
    it('Debe generar el mismo número de rectángulos que nodos y path  que enlaces', async () => {
      const wrapper = mount(SisdaiGraficas, {
        props: { id: 'test-id-graficas-alluvial', ancho: 500 },
        attachTo: document.body.appendChild(document.createElement('div')),
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiAlluvial, { datos, variables })
            },
          },
        },
      })
      await wrapper.vm.$nextTick()
      const svg = wrapper.find('svg.svg-vis')
      svg.element.transform = { baseVal: [] }

      const rectangulos = svg.findAll('rect.nodo-rectangulo')
      const paths = svg.findAll('path.enlace')

      expect(rectangulos.length).toBe(datos.nodos.length)
      expect(paths.length).toBe(datos.enlaces.length)
    })
  })
})
