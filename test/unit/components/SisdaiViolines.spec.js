import { mount, shallowMount } from '@vue/test-utils'
import SisdaiGraficas from '../../../src/componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiViolines from '../../../src/componentes/sisdai-violines/SisdaiViolines.vue'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import datos from '../../../docs/.vitepress/assets/datos/cajas_bigotes_ejemplo_1.json'

const variables = {
  id: 'acciones_vendidas',
  nombre: 'Acciones vendidas',
  color: '#2c7fb8',
}
const clave_categorias = 'nombre_empresa'
describe('SisdaiGraficas con SisdaiViolines', () => {
  it('debe renderizar SisdaiViolines en el slot por defecto', () => {
    const wrapper = shallowMount(SisdaiGraficas, {
      props: { id: 'test-id' },
      slots: {
        default: SisdaiViolines,
      },
    })

    // Verifica que SisdaiViolines está en el DOM
    expect(wrapper.findComponent(SisdaiViolines).exists()).toBe(true)
  })

  describe('SisdaiGraficas con SisdaiViolines', () => {
    it('debe pasar props correctamente a SisdaiViolines', () => {
      const wrapper = mount(SisdaiGraficas, {
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiViolines, { datos, variables })
            },
          },
        },
      })

      // Verifica que el componente SisdaiViolines está montado
      const sisdaiViolines = wrapper.findComponent(SisdaiViolines)
      expect(sisdaiViolines.exists()).toBe(true)
      // Verifica las props de SisdaiViolines
      expect(sisdaiViolines.props('datos')).toEqual(datos)
      expect(sisdaiViolines.props('variables')).toEqual(variables)
    })
    it('Debe generar el mismo número violines que de categorías únicas mediante clave_categorias', async () => {
      const wrapper = mount(SisdaiGraficas, {
        props: { id: 'test-id-graficas-barras', ancho: 500 },
        attachTo: document.body.appendChild(document.createElement('div')),
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiViolines, {
                datos,
                variables,
                clave_categorias,
              })
            },
          },
        },
      })
      await wrapper.vm.$nextTick()
      const svg = wrapper.find('svg.svg-vis')
      svg.element.transform = { baseVal: [] }

      const violines = svg.findAll('path.violin')

      const categorias_unicas = [
        ...new Set(datos.map(d => d[clave_categorias])),
      ].length

      expect(violines.length).toBe(categorias_unicas)
    })
  })
})
