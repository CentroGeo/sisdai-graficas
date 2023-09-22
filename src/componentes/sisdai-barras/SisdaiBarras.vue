<script setup>
import { max, sum } from 'd3-array'
import { axisBottom, axisLeft, axisRight } from 'd3-axis'
import { scaleBand, scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { stack } from 'd3-shape'
import { transition } from 'd3-transition'

import { onMounted, ref, shallowRef, toRefs, watch } from 'vue'
import usarRegistroGraficas from './../../composables/usarRegistroGraficas'
import { buscarIdContenedorHtmlSisdai } from './../../utils'

var idGrafica

const props = defineProps({
  datos: {
    type: Array,
    require: true,
  },
  variables: {
    type: Array,
    require: true,
    validator(value) {
      // debe tener: id, nombre_subcategoria, color
      const validado = value.some(
        ({ id, nombre_subcategoria, color }) =>
          id !== undefined ||
          nombre_subcategoria !== undefined ||
          color !== undefined
      )
      if (!validado) {
        console.error('El objeto no cumple con las especificaciones')
      }
      return validado
    },
  },
  acomodo: {
    type: String,
    default: 'apiladas',
    validator(value) {
      const validado = value === 'apiladas' || value === 'agrupadas'
      if (!validado) {
        console.error(
          "la propiedad 'acomodo' sólo admite los valores 'apiladas' o 'agrupadas'"
        )
      }
      return validado
    },
  },
  separacion: {
    type: Number,
    default: 0.2,
    validator(value) {
      const validado = 0 <= value && value <= 1
      if (!validado) {
        console.error('El valor debe estar entre 0 y 1')
      }
      return validado
    },
  },
  separacion_agrupadas: {
    type: Number,
    default: 0.1,
    validator(value) {
      const validado = 0 <= value && value <= 1
      if (!validado) {
        console.error('El valor debe estar entre 0 y 1')
      }
      return validado
    },
  },
  clave_categorias: {
    type: String,
    default: 'categoria',
  },
  alineacion_eje_y: {
    type: String,
    default: 'izquierda',
    validator(value) {
      const validado = value === 'izquierda' || value === 'derecha'
      if (!validado) {
        console.error(
          "la propiedad 'alineacion_eje_y' sólo admite los valores 'izquierda' o 'derecha'"
        )
      }
      return validado
    },
  },
})

const sisdaiBarras = shallowRef()
const { datos, clave_categorias, variables } = toRefs(props)
transition
const margenesSvg = ref({})

const escalaBanda = ref(),
  escalaLineal = ref(),
  escalaSubBanda = ref()
const grupoContenedor = ref(),
  data_apilada = ref(),
  grupoBarras = ref()

function calcularEscalas(grupoVis) {
  if (!grupoVis && grupoVis.ancho === 0) return

  escalaBanda.value = scaleBand()
    .domain(datos.value?.map(d => d[clave_categorias.value]))
    .range([0, grupoVis.ancho])
    .padding(props.separacion)

  escalaLineal.value = scaleLinear()
    .domain([
      0,
      max(datos.value?.map(d => sum(variables.value.map(dd => d[dd.id])))),
    ])
    .range([grupoVis.alto, 0])

  select(`div#${idGrafica} svg g.eje-x-abajo`).call(
    axisBottom(escalaBanda.value)
  )
  select(`div#${idGrafica} svg g.eje-y-${props.alineacion_eje_y}`)
    .transition()
    .duration(500)
    .call(
      props.alineacion_eje_y === 'izquierda'
        ? axisLeft(escalaLineal.value)
        : axisRight(escalaLineal.value)
    )
  escalaSubBanda.value = scaleBand()
    .domain(variables.value.map(d => d.id))
    .range([0, escalaBanda.value.bandwidth()])
    .padding(props.separacion_agrupadas)
}
function creaBarras() {
  let apilada = stack().keys(variables.value.map(d => d.id))(datos.value)
  for (let i = 0; i < variables.value.length; i++) {
    apilada[i].forEach(d => {
      d.data = { ...d.data, ...{ key: apilada[i].key } }
    })
  }
  data_apilada.value = apilada

  grupoBarras.value = grupoContenedor.value
    .selectAll('g.subcategoria-barras')
    .data(data_apilada.value)
    .join(
      enter => {
        let grupo = enter
          .append('g')
          .attr('class', 'subcategoria-barras')
          .attr(
            'fill',
            d => variables.value.filter(v => v.id === d.key)[0].color
          )
        grupo
          .selectAll('rect.barra')
          .data(d => d)
          .enter()
          .append('rect')
          .attr('class', 'barra')
          .attr('y', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .attr('x', d => {
            return props.acomodo === 'apiladas'
              ? escalaBanda.value(d.data[clave_categorias.value])
              : escalaBanda.value(d.data[clave_categorias.value]) +
                  escalaSubBanda.value(d.data.key)
          })
          .attr('height', 0)
          .attr(
            'width',
            props.acomodo === 'apiladas'
              ? escalaBanda.value.bandwidth()
              : escalaSubBanda.value.bandwidth()
          )
          .transition()
          .duration(500)
          .attr('y', d =>
            props.acomodo === 'apiladas'
              ? escalaLineal.value(d[1])
              : escalaLineal.value(d[1] - d[0])
          )
          .attr('height', d =>
            escalaLineal.value(d[0]) - escalaLineal.value(d[1]) < 0
              ? 0
              : escalaLineal.value(d[0]) - escalaLineal.value(d[1])
          )
      },
      update => {
        let grupo = update.call(update1 =>
          update1
            .transition()
            .duration(500)
            .attr(
              'fill',
              d => variables.value.filter(v => v.id === d.key)[0].color
            )
            .attr(
              'width',
              props.acomodo === 'apiladas'
                ? escalaBanda.value.bandwidth()
                : escalaSubBanda.value.bandwidth()
            )
        )
        grupo
          .selectAll('rect.barra')
          .data(d => d)
          .join(
            barras_enter => {
              barras_enter
                .append('rect')
                .attr('class', 'barra')
                .attr(
                  'y',
                  usarRegistroGraficas().grafica(idGrafica).grupoVis.alto
                )
                .attr('x', d =>
                  props.acomodo === 'apiladas'
                    ? escalaBanda.value(d.data[clave_categorias.value])
                    : escalaBanda.value(d.data[clave_categorias.value]) +
                      escalaSubBanda.value(d.data.key)
                )
                .attr('height', 0)
                .attr(
                  'width',
                  props.acomodo === 'apiladas'
                    ? escalaBanda.value.bandwidth()
                    : escalaSubBanda.value.bandwidth()
                )
                .transition()
                .duration(500)
                .attr('y', d =>
                  props.acomodo === 'apiladas'
                    ? escalaLineal.value(d[1])
                    : escalaLineal.value(d[1] - d[0])
                )
                .attr('height', d =>
                  escalaLineal.value(d[0]) - escalaLineal.value(d[1]) < 0
                    ? 0
                    : escalaLineal.value(d[0]) - escalaLineal.value(d[1])
                )
            },
            barras_update => {
              barras_update
                .transition()
                .duration(500)
                .attr('y', d =>
                  props.acomodo === 'apiladas'
                    ? escalaLineal.value(d[1])
                    : escalaLineal.value(d[1] - d[0])
                )
                .attr('height', d =>
                  escalaLineal.value(d[0]) - escalaLineal.value(d[1]) < 0
                    ? 0
                    : escalaLineal.value(d[0]) - escalaLineal.value(d[1])
                )
                .attr('x', d =>
                  props.acomodo === 'apiladas'
                    ? escalaBanda.value(d.data[clave_categorias.value])
                    : escalaBanda.value(d.data[clave_categorias.value]) +
                      escalaSubBanda.value(d.data.key)
                )
                .attr(
                  'width',
                  props.acomodo === 'apiladas'
                    ? escalaBanda.value.bandwidth()
                    : escalaSubBanda.value.bandwidth()
                )
            },
            barras_exit => barras_exit.remove()
          )
      }, // no update function
      exit => {
        exit.remove()
      }
    )
}

onMounted(() => {
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiBarras.value)
  grupoContenedor.value = select('#' + idGrafica + ' svg g.contenedor-barras')

  margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).margenes,
    nv => (margenesSvg.value = nv)
  )
  calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
  creaBarras()

  watch(
    () => usarRegistroGraficas().grafica(idGrafica).grupoVis,
    () => {
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
      if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
        creaBarras()
      }
    }
  )
  watch(datos, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaBarras()
  })
  watch(variables, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaBarras()
  })
})
</script>

<template>
  <g
    ref="sisdaiBarras"
    :transform="`translate(${margenesSvg?.izquierda || 0},${
      margenesSvg?.arriba || 0
    })`"
    class="contenedor-barras"
  >
  </g>
</template>
