<script setup>
import { max, sum } from 'd3-array'
import { axisBottom, axisLeft } from 'd3-axis'
import { scaleBand, scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'

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

const margenesSvg = ref({})

const escalaBanda = ref(),
  escalaLineal = ref()
function calcularEscalas(grupoVis) {
  if (!grupoVis && grupoVis.ancho === 0) return

  escalaBanda.value = scaleBand()
    .domain(datos.value?.map(d => d[clave_categorias.value]))
    .range([0, grupoVis.ancho])

  escalaLineal.value = scaleLinear()
    .domain([
      0,
      max(datos.value?.map(d => sum(props.variables.map(dd => d[dd.id])))),
    ])
    .range([0, grupoVis.alto])

  select(`div#${idGrafica} svg g.eje-x-abajo`).call(
    axisBottom(escalaBanda.value)
  )
  select(`div#${idGrafica} svg g.eje-y-izquierda`).call(
    axisLeft(escalaLineal.value)
  )
}

onMounted(() => {
  console.log('SisdaiBarras')
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiBarras.value)

  // console.log(usarRegistroGraficas().grafica(idGrafica))

  margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).margenes,
    nv => (margenesSvg.value = nv)
  )

  calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).grupoVis,
    calcularEscalas
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
  >
    <circle
      r="10"
      fill="#AB7C94"
    />
  </g>
</template>
