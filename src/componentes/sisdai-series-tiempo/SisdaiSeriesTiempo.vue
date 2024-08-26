<script setup>
import { ascending, bisector, extent, max } from 'd3-array'
import { scaleLinear, scaleTime } from 'd3-scale'
import { select } from 'd3-selection'
import { line } from 'd3-shape'
import { timeParse } from 'd3-time-format'
import { transition } from 'd3-transition'
import { onMounted, ref, shallowRef, toRefs, watch } from 'vue'
import usarRegistroGraficas from '../../composables/usarRegistroGraficas'
import {
  buscarIdContenedorHtmlSisdai,
  creaEjeHorizontal,
  creaEjeVertical,
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
})
const datos_hover = ref({})

const sisdaiSeriesTiempo = shallowRef()
const { datos, clave_fecha, variables } = toRefs(props)
transition
const margenesSvg = ref({})

const conversionTemporal = timeParse(props.formato_temporal)
const escalaTemporal = ref(),
  escalaLineal = ref()
const grupoContenedor = ref(),
  grupoSeries = ref()
const circulo_marcador = ref()
function calcularEscalas(grupoVis) {
  if (!grupoVis && grupoVis.ancho === 0) return
  escalaTemporal.value = scaleTime()
    .domain(extent(datos.value?.map(d => d.la_fecha)))
    .range([0, grupoVis.ancho])
  escalaLineal.value = scaleLinear()
    .domain([
      //min(datos.value?.map((d) => min(variables.value.map((dd) => d[dd.id])))),
      0,
      max(datos.value?.map(d => max(variables.value.map(dd => d[dd.id])))),
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
function creaSeries() {
  datos.value.forEach(
    d => (d.la_fecha = conversionTemporal(d[clave_fecha.value]))
  )
  grupoSeries.value = grupoContenedor.value.selectAll('g.serie-temporal')

  grupoSeries.value.data(variables.value).join(
    enter => {
      let grupo = enter
        .append('g')
        .attr('class', 'serie-temporal')
        .style('fill', 'none')
        .style('stroke', d => d.color)
        .style('stroke-width', '1px')
      grupo
        .selectAll('path.linea')
        .data(d => [{ ...d, datos: datos.value }])
        .enter()
        .append('path')
        .attr('class', 'linea')
        .attr('d', dd =>
          line()
            .x(d => escalaTemporal.value(d.la_fecha))
            .y(d => escalaLineal.value(d[dd.id]))(dd.datos)
        )
      grupo
        .selectAll('circle.puntos')
        .data(d =>
          datos.value.map(datum => ({
            la_fecha: datum.la_fecha,
            valor: datum[d.id],
            ...d,
          }))
        )
        .enter()
        .append('circle')
        .attr('class', 'puntos')
        .attr('r', 0)
        .attr('cx', d => escalaTemporal.value(d.la_fecha))
        .attr('cy', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
        .style('stroke', '#fff')
        .style('fill', d => d.color)
    },
    update => {
      let grupo = update.call(update1 =>
        update1
          .transition()
          .duration(500)
          .style('fill', 'none')
          .style('stroke', d => d.color)
          .style('stroke-width', '1px')
      )
      grupo
        .selectAll('path.linea')
        .data(d => [{ ...d, datos: datos.value }])
        .transition()
        .duration(500)
        .attr('d', dd =>
          line()
            .x(d => escalaTemporal.value(d.la_fecha))
            .y(d => escalaLineal.value(d[dd.id]))(dd.datos)
        )
        .style('stroke', d => d.color)

      grupo
        .selectAll('circle.puntos')
        .data(d =>
          datos.value.map(datum => ({
            la_fecha: datum.la_fecha,
            valor: datum[d.id],
            ...d,
          }))
        )
        .transition()
        .duration(500)
        .attr('r', variables.value.length > 1 ? 0 : 4)
        .attr('cx', d => escalaTemporal.value(d.la_fecha))
        .attr('cy', d => escalaLineal.value(d.valor))
        .style('stroke', '#fff')
        .style('fill', d => d.color)
    }, // no update function
    exit => {
      exit.remove()
    }
  )
}

onMounted(() => {
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiSeriesTiempo.value)
  grupoContenedor.value = select('#' + idGrafica + ' svg g.contenedor-series')
  circulo_marcador.value = grupoContenedor.value
    .append('circle')
    .style('fill-opacity', 0)
    .attr('r', 5)
  margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).margenes,
    nv => (margenesSvg.value = nv)
  )
  datos.value.forEach(
    d => (d.la_fecha = conversionTemporal(d[clave_fecha.value]))
  )
  calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
  creaSeries()

  watch(
    () => usarRegistroGraficas().grafica(idGrafica).grupoVis,
    () => {
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
      if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
        creaSeries()
      }
    }
  )
  watch(datos, () => {
    datos.value.forEach(
      d => (d.la_fecha = conversionTemporal(d[clave_fecha.value]))
    )
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaSeries()
  })
  watch(variables, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaSeries()
  })

  watch(
    () => usarRegistroGraficas().grafica(idGrafica).posicion_cursor,
    nv => {
      let bisecetDate = bisector(d => d.la_fecha).left

      let x0 = escalaTemporal.value.invert(nv.x - margenesSvg.value.izquierda)
      let indice = bisecetDate(datos.value, x0, 1)
      let d0 = datos.value[indice - 1]
      let d1 = datos.value[indice]
      if (!d1) d1 = d0
      let tooltip_data_seleccionada_x =
        x0 - d0.la_fecha > d1.la_fecha - x0 ? d1 : d0

      let datos_y = variables.value
        .map(d => [d, tooltip_data_seleccionada_x[d.id]])
        .sort((a, b) => ascending(a[1], b[1]))

      let bisectCantidad = bisector(d => d).center
      let y0 = escalaLineal.value.invert(nv.y - margenesSvg.value.arriba)

      let indiceY = bisectCantidad(
        datos_y.map(d => d[1]),
        y0
      )

      datos_hover.value = {
        ...datos_y[indiceY][0],
        ...tooltip_data_seleccionada_x,
      }
      circulo_marcador.value
        .style('fill-opacity', 1)
        .attr('cx', escalaTemporal.value(datos_hover.value.la_fecha))
        .attr(
          'cy',
          escalaLineal.value(+datos_hover.value[datos_hover.value['id']])
        )
        .style('fill', datos_hover.value.color)

      grupoSeries.value
        .selectAll('path')
        .style('stroke-width', '2px')
        .style('stroke-opacity', '.3')
      grupoSeries.value
        .filter(d => d.id === datos_hover.value.id)
        .selectAll('path')
        .style('stroke-width', '3px')
        .style('stroke-opacity', '1')
    },
    { deep: true }
  )
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).globo_visible,
    nv => {
      if (!nv) {
        circulo_marcador.value.style('fill-opacity', 0)
        grupoSeries.value
          .selectAll('path')
          .style('stroke-width', '2px')
          .style('stroke-opacity', '.8')
      }
    }
  )
  watch(
    () => props.angulo_etiquetas_eje_y,
    () => calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
  )
  watch(
    () => props.angulo_etiquetas_eje_x,
    () => calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
  )
})
defineExpose({
  escalaTemporal,
  escalaLineal,
  conversionTemporal,
  datos_hover,
})
</script>

<template>
  <g
    ref="sisdaiSeriesTiempo"
    :transform="`translate(${margenesSvg?.izquierda || 0},${
      margenesSvg?.arriba || 0
    })`"
    class="contenedor-series"
  >
  </g>
</template>
