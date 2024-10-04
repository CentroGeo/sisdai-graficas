import { mount, shallowMount } from '@vue/test-utils'
import SisdaiGraficas from '../../../src/componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiCajasBigotes from '../../../src/componentes/sisdai-cajas-bigotes/SisdaiCajasBigotes.vue'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import datos from '../../../docs/.vitepress/assets/datos/cajas_bigotes_ejemplo_1.json'

const variables = {
  id: 'acciones_vendidas',
  nombre: 'Acciones vendidas',
  color: '#2c7fb8',
}
const clave_categorias = 'nombre_empresa'
describe('SisdaiGraficas con SisdaiCajasBigotes', () => {
  it('debe renderizar SisdaiCajasBigotes en el slot por defecto', () => {
    const wrapper = shallowMount(SisdaiGraficas, {
      props: { id: 'test-id' },
      slots: {
        default: SisdaiCajasBigotes,
      },
    })

    // Verifica que SisdaiCajasBigotes está en el DOM
    expect(wrapper.findComponent(SisdaiCajasBigotes).exists()).toBe(true)
  })

  describe('SisdaiGraficas con SisdaiCajasBigotes', () => {
    it('debe pasar props correctamente a SisdaiCajasBigotes', () => {
      const wrapper = mount(SisdaiGraficas, {
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiCajasBigotes, { datos, variables })
            },
          },
        },
      })

      // Verifica que el componente SisdaiCajasBigotes está montado
      const sisdaiCajasBigotes = wrapper.findComponent(SisdaiCajasBigotes)
      expect(sisdaiCajasBigotes.exists()).toBe(true)
      // Verifica las props de SisdaiCajasBigotes
      expect(sisdaiCajasBigotes.props('datos')).toEqual(datos)
      expect(sisdaiCajasBigotes.props('variables')).toEqual(variables)
    })
    it('Debe generar el mismo número rectángulos, lineas y puntos de promedio que de categorías únicas mediante clave_categorias', async () => {
      const wrapper = mount(SisdaiGraficas, {
        props: { id: 'test-id-graficas-barras', ancho: 500 },
        attachTo: document.body.appendChild(document.createElement('div')),
        slots: {
          default: {
            // Utilizamos un render function para pasar props
            render() {
              return h(SisdaiCajasBigotes, {
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

      const caja = svg.findAll('rect.caja')
      const linea_min = svg.findAll('line.min')
      const linea_max = svg.findAll('line.max')
      const linea_media = svg.findAll('line.media')
      const circulo_promedio = svg.findAll('circle.promedio')

      const categorias_unicas = [
        ...new Set(datos.map(d => d[clave_categorias])),
      ].length

      expect(caja.length).toBe(categorias_unicas)
      expect(linea_min.length).toBe(categorias_unicas)
      expect(linea_max.length).toBe(categorias_unicas)
      expect(linea_media.length).toBe(categorias_unicas)
      expect(circulo_promedio.length).toBe(categorias_unicas)
    })
  })
})
