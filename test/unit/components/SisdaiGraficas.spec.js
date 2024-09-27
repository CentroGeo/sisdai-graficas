import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SisdaiGraficas from '../../../src/componentes/sisdai-graficas/SisdaiGraficas.vue'

describe('SisdaiGraficas.vue', () => {
  // Pruebas de Renderizado
  describe('Renderizado Básico', () => {
    it('debe renderizar el componente correctamente', async () => {
      const wrapper = mount(SisdaiGraficas, {
        props: { id: 'test-id-renderizado' },
      })
      await wrapper.vm.$nextTick()

      expect(wrapper.exists()).toBe(true)
    })

    it('debe renderizar el contenedor principal con el ID correcto', () => {
      const wrapper = mount(SisdaiGraficas, {
        props: { id: 'test-id' },
      })
      expect(wrapper.find('#test-id').exists()).toBe(true)
    })
  })

  // Pruebas de Props
  describe('Manejo de Props', () => {
    it('debe aplicar los márgenes correctamente', () => {
      const wrapper = mount(SisdaiGraficas, {
        props: {
          margenes: { arriba: 10, abajo: 20, derecha: 30, izquierda: 40 },
        },
      })
      const grafica = wrapper.vm.grafica()
      expect(grafica.margenes.arriba).toBe(10)
    })
  })

  // Pruebas de Slots
  describe('Renderizado de Slots', () => {
    it('debe renderizar contenido en el slot "panel-encabezado-vis"', () => {
      const wrapper = mount(SisdaiGraficas, {
        slots: {
          'panel-encabezado-vis': '<div class="slot-content">Encabezado</div>',
        },
      })
      expect(wrapper.find('.slot-content').text()).toBe('Encabezado')
    })
  })

  // Pruebas de Interacciones
  describe('Interacciones del Usuario', () => {
    it('debe actualizar la posición del cursor en mousemove', async () => {
      const wrapper = mount(SisdaiGraficas, {
        attachTo: document.body.appendChild(document.createElement('div')),

        props: { id: 'test-id-globo' },
        slots: {
          'globo-informacion': '<div class="globo-informacion">Globo</div>',
        },
      })
      // Es importante fijar un ancho para que nuestro svg tenga área
      wrapper.element.style.width = '500px'

      await wrapper.vm.$nextTick()

      const svg = wrapper.find('svg.svg-vis')

      await svg.trigger('mousemove', { layerX: 100, layerY: 200 })

      expect(wrapper.vm.posicion_cursor).toEqual({ x: 100, y: 200 })
    })
  })

  // Pruebas de Comportamiento Condicional
  describe('Comportamiento Condicional', () => {
    it('debe manejar correctamente el globo de información cuando está presente', async () => {
      const wrapper = mount(SisdaiGraficas, {
        attachTo: document.body.appendChild(document.createElement('div')),

        props: { id: 'test-id-condicional' },
        slots: {
          'globo-informacion': '<div class="globo-informacion">Globo</div>',
        },
      })
      // Es importante fijar un ancho para que nuestro svg tenga área

      wrapper.element.style.width = '500px'
      await wrapper.vm.$nextTick()

      // Simula un evento mousemove para activar el globo
      const svg = wrapper.find('svg')
      svg.element.transform = { baseVal: [] }

      await svg.trigger('mousemove', { layerX: 100, layerY: 200 })

      expect(wrapper.vm.grafica().globo_visible).toBe(true)
      expect(wrapper.find('.globo-informacion').isVisible()).toBe(true)
    })
  })

  // Pruebas de Métodos
  describe('Pruebas de Métodos', () => {
    it('debe calcular correctamente las dimensiones en obteniendoDimensiones', () => {
      const wrapper = mount(SisdaiGraficas, {
        props: {
          id: 'test-id-metodos',
          ancho: 500,
          alto: 300,
        },
      })

      wrapper.vm.obteniendoDimensiones()
      expect(wrapper.vm.ancho_grafica).toBe(500)
      expect(wrapper.vm.alto_grafica).toBe(300)
    })
  })
})
