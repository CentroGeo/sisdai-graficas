<script setup>
import { max, sum } from 'd3-array'
import { axisBottom, axisLeft } from 'd3-axis'
import { scaleBand, scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { stack } from 'd3-shape'
import { transition } from 'd3-transition'

import { onMounted, onUnmounted, ref, shallowRef, toRefs, watch } from 'vue'
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

      const validado = value.some(({ id, nombre_subcategoria, color }) => {
        return (
          id !== undefined ||
          nombre_subcategoria !== undefined ||
          color !== undefined
        )
      })

      if (!validado) {
        console.error('El objeto no cumple con las especificaciones')
      }

      return validado
    },
  },
  clave_categorias: {
    type: String,
    default: 'categoria',
  },
})

const sisdaiBarras = shallowRef()
const { datos, clave_categorias } = toRefs(props)
transition
const margenesSvg = ref({})

const escalaBanda = ref(),
  escalaLineal = ref()
const grupoContenedor = ref(),
  data_apilada = ref(),
  grupoBarras = ref(),
  rectangulos = ref()

function calcularEscalas(grupoVis) {
  if (!grupoVis && grupoVis.ancho === 0) return

  escalaBanda.value = scaleBand()
    .domain(datos.value?.map(d => d[clave_categorias.value]))
    .range([0, grupoVis.ancho])
    .padding(0.5)

  escalaLineal.value = scaleLinear()
    .domain([
      0,
      max(datos.value?.map(d => sum(props.variables.map(dd => d[dd.id])))),
    ])
    .range([grupoVis.alto, 0])

  select(`div#${idGrafica} svg g.eje-x-abajo`).call(
    axisBottom(escalaBanda.value)
  )
  select(`div#${idGrafica} svg g.eje-y-izquierda`).call(
    axisLeft(escalaLineal.value)
  )
}
function creaBarras() {
  data_apilada.value = stack().keys(props.variables.map(d => d.id))(datos.value)
  grupoBarras.value = grupoContenedor.value
    .selectAll('g.subcategoria-barras')
    .data(data_apilada.value)
    .enter()
    .append('g')
    .join(
      enter => enter.append('g'),
      null, // no update function
      exit => {
        exit.remove()
      }
    )
    .attr('fill', d => props.variables.filter(v => v.id === d.key)[0].color)
    .attr('class', 'subcategoria-barras')

  rectangulos.value = grupoBarras.value
    .selectAll('rect.barras')
    .data(d => d)
    .join(
      enter => enter.append('rect'),

      join => join,
      exit => {
        exit.remove()
      }
    )
    .attr('class', 'barras')
  console.log(rectangulos.value)
}
function configurarBarras() {
  rectangulos.value
    .transition()
    .duration(500)
    .attr('x', d => escalaBanda.value(d.data[clave_categorias.value]))
    .attr('y', d => escalaLineal.value(d[1]))
    .attr('width', escalaBanda.value.bandwidth())
    .attr('height', d => escalaLineal.value(d[0]) - escalaLineal.value(d[1]))
}
onMounted(() => {
  console.log('SisdaiBarras')
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiBarras.value)
  grupoContenedor.value = select('#' + idGrafica + ' svg g.contenedor-barras')
  // console.log(usarRegistroGraficas().grafica(idGrafica))

  margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).margenes,
    nv => (margenesSvg.value = nv)
  )
  creaBarras()
  calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)

  watch(
    () => usarRegistroGraficas().grafica(idGrafica).grupoVis,
    () => {
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
      if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
        configurarBarras()
      }
    }
  )
})

onUnmounted(() => {})
</script>

<template>
  <g
    ref="sisdaiBarras"
    :transform="`translate(${margenesSvg?.izquierda || 0},${
      margenesSvg?.arriba || 0
    })`"
    class="contenedor-barras"
  >
    <circle
      r="10"
      fill="#AB7C94"
    />
  </g>
</template>
