<script setup>
import { extent, max, sum } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select } from 'd3-selection'
import { stack } from 'd3-shape'

import { area } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import { transition } from 'd3-transition'
import { onMounted, ref, shallowRef, toRefs, watch } from 'vue'
import usarRegistroGraficas from '../../composables/usarRegistroGraficas'
import {
  buscarIdContenedorHtmlSisdai,
  creaEjeHorizontal,
  creaEjeVertical,
  reordenamientoApilado,
} from '../../utils'
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
      // debe tener: id, nombre, color
      const validado = value.some(
        ({ id, nombre, color }) =>
          id !== undefined || nombre !== undefined || color !== undefined
      )
      if (!validado) {
        console.error('El objeto no cumple con las especificaciones')
      }
      return validado
    },
  },
  clave_fecha: {
    type: String,
    default: 'fecha',
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
  angulo_etiquetas_eje_x: {
    type: Number,
    default: 0,
    validator(value) {
      // debe estar entre -90 y 90
      const validado = -90 <= value && value <= 90
      if (!validado) {
        console.error('El número debe estar entre -90 y 90')
      }
      return validado
    },
  },
  angulo_etiquetas_eje_y: {
    type: Number,
    default: 0,
    validator(value) {
      // debe estar entre -90 y 90
      const validado = -90 <= value && value <= 90
      if (!validado) {
        console.error('El número debe estar entre -90 y 90')
      }
      return validado
    },
  },
  formato_temporal: {
    default: '%d-%m-%Y',
    type: String,
  },
  reordenamientoTemporal: {
    // Propiedad de prueba
    default: false,
  },
})

const sisdaiAreasApiladas = shallowRef()
const { datos, clave_fecha, variables } = toRefs(props)
transition
const margenesSvg = ref({})
const datos_apilados = ref([])
const conversionTemporal = timeParse(props.formato_temporal)
const escalaTemporal = ref(),
  escalaLineal = ref()
const grupoContenedor = ref(),
  grupoAreas = ref()

function calcularEscalas(grupoVis) {
  if (!grupoVis && grupoVis.ancho === 0) return
  escalaTemporal.value = scaleTime()
    .domain(extent(datos.value?.map(d => d.la_fecha)))
    .range([0, grupoVis.ancho])
  escalaLineal.value = scaleLinear()
    .domain([
      0,
      max(datos.value?.map(d => sum(variables.value.map(dd => d[dd.id])))),
    ])
    .range([grupoVis.alto, 0])

  creaEjeHorizontal(
    idGrafica,
    escalaTemporal.value,
    props.angulo_etiquetas_eje_x
  )

  creaEjeVertical(
    idGrafica,
    escalaLineal.value,
    props.angulo_etiquetas_eje_y,
    props.alineacion_eje_y,
    grupoVis.ancho
  )
}
function creaAreas() {
  datos.value.forEach(
    d => (d.la_fecha = conversionTemporal(d[clave_fecha.value]))
  )
  datos_apilados.value = stack().keys(variables.value.map(d => d.id))(
    datos.value
  )
  if (props.reordenamientoTemporal) {
    datos_apilados.value = reordenamientoApilado(datos_apilados.value)
  }

  grupoAreas.value = grupoContenedor.value
    .selectAll('path.area')
    .data(datos_apilados.value)
    .join(
      enter => {
        enter
          .append('path')
          .attr('class', 'area')
          .attr('d', dd =>
            area()
              .x(d => escalaTemporal.value(d.data.la_fecha))
              .y0(d => escalaLineal.value(d[0]))
              .y1(d => escalaLineal.value(d[1]))(dd)
          )
          .attr(
            'fill',
            d => variables.value.filter(dd => dd.id === d.key)[0].color
          )
      },
      update => {
        update
          .transition()
          .duration(500)
          .attr('d', dd =>
            area()
              .x(d => escalaTemporal.value(d.data.la_fecha))
              .y0(d => escalaLineal.value(d[0]))
              .y1(d => escalaLineal.value(d[1]))(dd)
          )
          .attr(
            'fill',
            d => variables.value.filter(dd => dd.id === d.key)[0].color
          )
          .selection()
      },
      exit => {
        exit.remove()
      }
    )
}

onMounted(() => {
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiAreasApiladas.value)
  grupoContenedor.value = select('#' + idGrafica + ' svg g.contenedor-areas')

  margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).margenes,
    nv => (margenesSvg.value = nv)
  )
  datos.value.forEach(
    d => (d.la_fecha = conversionTemporal(d[clave_fecha.value]))
  )
  calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
  creaAreas()

  watch(
    () => usarRegistroGraficas().grafica(idGrafica).grupoVis,
    () => {
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
      if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
        creaAreas()
      }
    }
  )
  watch(datos, () => {
    datos.value.forEach(
      d => (d.la_fecha = conversionTemporal(d[clave_fecha.value]))
    )
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaAreas()
  })
  watch(variables, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaAreas()
  })
})
defineExpose({
  escalaTemporal,
  escalaLineal,
})
</script>

<template>
  <g
    ref="sisdaiAreasApiladas"
    :transform="`translate(${margenesSvg?.izquierda || 0},${
      margenesSvg?.arriba || 0
    })`"
    class="contenedor-areas"
  >
  </g>
</template>
