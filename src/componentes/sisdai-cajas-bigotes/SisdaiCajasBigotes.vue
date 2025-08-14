<script setup>
import { idAleatorio } from '../../utils'

import { ascending, descending, extent, mean, quantile, rollup } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'

import { onMounted, ref, shallowRef, toRefs, watch, onUnmounted } from 'vue'
import usarRegistroGraficas from '../../composables/usarRegistroGraficas'
import {
  buscarIdContenedorHtmlSisdai,
  creaEjeHorizontal,
  creaEjeVertical,
} from '../../utils'

var idGrafica
const props = defineProps({
  tabla_caption: {
    type: String,
    default: 'Tabla de datos de la gráfica de cajas y bigotes',
  },
  datos: {
    type: Array,
    require: true,
  },
  variables: {
    type: Object,
    require: true,
    validator(value) {
      // debe tener: id, nombre, color

      const validado = 'id' in value && 'nombre' in value && 'color' in value
      if (!validado) {
        console.error('El objeto no cumple con las especificaciones')
      }
      return validado
    },
  },
  nombre_indice: {
    type: String,
    require: true,
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
  numero_marcas_y: {
    type: Number,
  },
})
const datos_hover = ref()

const sisdaiCajasBigotes = shallowRef()
const { datos, nombre_indice, variables } = toRefs(props)
transition
const margenesSvg = ref({})
const escalaBanda = ref(),
  escalaLineal = ref()

const grupoContenedor = ref(),
  data_agrupada = ref(),
  grupoCajasBigotes = ref()

const idTabla = idAleatorio()

function calcularEscalas(grupoVis) {
  if (!grupoVis && grupoVis.ancho === 0) return

  escalaBanda.value = scaleBand()
    .domain(datos.value?.map(d => d[nombre_indice.value]))
    .range([0, grupoVis.ancho])
    .padding(0.5)

  escalaLineal.value = scaleLinear()
    .domain(extent(datos.value.map(d => d[variables.value.id])))
    .range([grupoVis.alto, 0])

  creaEjeHorizontal(
    idGrafica,
    escalaBanda.value,
    props.angulo_etiquetas_eje_x,
    null
  )

  creaEjeVertical(
    idGrafica,
    escalaLineal.value,
    props.angulo_etiquetas_eje_y,
    props.alineacion_eje_y,
    grupoVis.ancho,
    props.numero_marcas_y
  )
}
function creaCajasBigotes() {
  data_agrupada.value = rollup(
    datos.value,
    d => {
      let q1 = quantile(d.map(g => g[variables.value.id]).sort(ascending), 0.25)
      let mediana = quantile(
        d.map(g => g[variables.value.id]).sort(ascending),
        0.5
      )
      let q3 = quantile(d.map(g => g[variables.value.id]).sort(ascending), 0.75)
      let rango_intercuantil = q3 - q1
      let min = q1 - 1.5 * rango_intercuantil
      let max = q3 + 1.5 * rango_intercuantil
      let puntos = d.map(g => g[variables.value.id])
      let promedio = mean(d.map(g => g[variables.value.id]))
      max = puntos.filter(g => g <= max).sort(descending)[0]
      min = puntos.filter(g => g >= min).sort(ascending)[0]

      return {
        q1: q1,
        mediana: mediana,
        q3: q3,
        rango_intercuantil: rango_intercuantil,
        min: min,
        max: max,
        puntos: puntos,
        promedio: promedio,
      }
    },
    d => d[props.nombre_indice]
  )
  usarRegistroGraficas()
    .grafica(idGrafica)
    .agregarTabla(idTabla, {
      datos: Array.from(data_agrupada.value).map(d => ({
        categoria: d[0],
        ...d[1],
      })),
      variables: [
        { id: 'max', nombre: 'Límite superior' },
        { id: 'q3', nombre: 'Tercer cuantil' },
        { id: 'mediana', nombre: 'Mediana' },
        { id: 'promedio', nombre: 'Promedio' },
        { id: 'q1', nombre: 'Primer cuantil' },
        { id: 'min', nombre: 'Límite inferior' },
      ],
      nombre_indice: 'categoria',
      tipo: 'cajas-bigotes',
      caption: props.tabla_caption,
    })
  grupoCajasBigotes.value = grupoContenedor.value
    .selectAll('g.grupo-caja')
    .data(data_agrupada.value)
    .join(
      enter => {
        let grupo = enter
          .append('g')
          .attr('class', 'grupo-caja')
          .style('fill', variables.value.color)
          .style('stroke', variables.value.color)
          .attr('transform', d => `translate(${escalaBanda.value(d[0])} ,0)`)
        grupo
          .selectAll('line.vertical')
          .data(d => [d[1]])
          .enter()
          .append('line')
          .attr('class', 'vertical')
          .attr('x1', 0.5 * escalaBanda.value.bandwidth())
          .attr('x2', 0.5 * escalaBanda.value.bandwidth())
          .attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .transition()
          .duration(500)
          .attr('y1', d => escalaLineal.value(d.min))
          .attr('y2', d => escalaLineal.value(d.max))
          .style('stroke-width', '2px')
        grupo
          .selectAll('rect.caja-fondo')
          .data(d => [d[1]])
          .enter()
          .append('rect')
          .attr('class', 'caja-fondo')
          .attr('width', escalaBanda.value.bandwidth())
          .attr('x', 0)
          .attr('y', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .attr('height', 0)
          .style('fill', 'var(--fondo)')
          .style('stroke-width', '0')
          .transition()
          .duration(500)
          .attr('y', d => escalaLineal.value(d.q3))
          .attr('height', d =>
            escalaLineal.value(d.q1) - escalaLineal.value(d.q3) < 0
              ? 0
              : escalaLineal.value(d.q1) - escalaLineal.value(d.q3)
          )
        grupo
          .selectAll('line.max')
          .data(d => [d[1]])
          .enter()
          .append('line')
          .attr('class', 'max')
          .attr('x1', 0)
          .attr('x2', escalaBanda.value.bandwidth())
          .attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .transition()
          .duration(500)
          .attr('y1', d => escalaLineal.value(d.max))
          .attr('y2', d => escalaLineal.value(d.max))
          .style('stroke-width', '2px')
        grupo
          .selectAll('line.min')
          .data(d => [d[1]])
          .enter()
          .append('line')
          .attr('class', 'min')
          .attr('x1', 0)
          .attr('x2', escalaBanda.value.bandwidth())
          .attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .style('stroke-width', '2px')
          .transition()
          .duration(500)
          .attr('y1', d => escalaLineal.value(d.min))
          .attr('y2', d => escalaLineal.value(d.min))
        grupo
          .selectAll('line.q1')
          .data(d => [d[1]])
          .enter()
          .append('line')
          .attr('class', 'q1')
          .attr('x1', 0)
          .attr('x2', escalaBanda.value.bandwidth())
          .attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .style('stroke-width', '2px')
          .transition()
          .duration(500)
          .attr('y1', d => escalaLineal.value(d.q1))
          .attr('y2', d => escalaLineal.value(d.q1))
        grupo
          .selectAll('line.q3')
          .data(d => [d[1]])
          .enter()
          .append('line')
          .attr('class', 'q3')
          .attr('x1', 0)
          .attr('x2', escalaBanda.value.bandwidth())
          .attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .style('stroke-width', '2px')
          .transition()
          .duration(500)
          .attr('y1', d => escalaLineal.value(d.q3))
          .attr('y2', d => escalaLineal.value(d.q3))

        grupo
          .selectAll('rect.caja')
          .data(d => [d[1]])
          .enter()
          .append('rect')
          .attr('class', 'caja')
          .attr('width', escalaBanda.value.bandwidth())
          .attr('x', 0)
          .attr('y', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .attr('height', 0)
          .style('fill-opacity', 0.25)
          .style('stroke-width', '0')
          .transition()
          .duration(500)
          .attr('y', d => escalaLineal.value(d.q3))
          .attr('height', d =>
            escalaLineal.value(d.q1) - escalaLineal.value(d.q3) < 0
              ? 0
              : escalaLineal.value(d.q1) - escalaLineal.value(d.q3)
          )
        grupo
          .selectAll('line.media')
          .data(d => [d[1]])
          .enter()
          .append('line')
          .attr('class', 'media')
          .attr('x1', 0)
          .attr('x2', escalaBanda.value.bandwidth())
          .attr('y1', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .attr('y2', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .style('stroke-width', '10px')
          .transition()
          .duration(500)
          .attr('y1', d => escalaLineal.value(d.mediana))
          .attr('y2', d => escalaLineal.value(d.mediana))
        grupo
          .selectAll('circle.promedio')
          .data(d => [d[1]])
          .enter()
          .append('circle')
          .attr('class', 'promedio')
          .attr('r', 0)
          .attr('cx', escalaBanda.value.bandwidth() * 0.5)
          .attr('cy', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .style('stroke', 'var(--fondo)')
          .style('stroke-width', '2px')
          .transition()
          .duration(500)
          .attr('cy', d => escalaLineal.value(d.promedio))
          .attr('r', 5)
        grupo
          .selectAll('circle.atipicos')
          .data(d => d[1].puntos.filter(dd => dd < d[1].min || d[1].max < dd))
          .enter()
          .append('circle')
          .attr('class', 'atipicos')
          .attr('r', 0)
          .attr('cx', escalaBanda.value.bandwidth() * 0.5)
          .attr('cy', usarRegistroGraficas().grafica(idGrafica).grupoVis.alto)
          .style('stroke-opacity', '.4')
          .style('stroke-width', '2px')
          .style('fill-opacity', 0.25)
          .transition()
          .duration(500)
          .attr('cy', d => escalaLineal.value(d))
          .attr('r', 4)
      },
      update => {
        let grupo = update.call(update1 =>
          update1
            .transition()
            .duration(500)
            .style('fill', variables.value.color)
            .style('stroke', variables.value.color)
            .attr('transform', d => `translate(${escalaBanda.value(d[0])} ,0)`)
        )
        grupo
          .selectAll('line.vertical')
          .data(d => [d[1]])
          .transition()
          .duration(500)
          .attr('x1', 0.5 * escalaBanda.value.bandwidth())
          .attr('y1', d => escalaLineal.value(d.min))
          .attr('x2', 0.5 * escalaBanda.value.bandwidth())
          .attr('y2', d => escalaLineal.value(d.max))
        grupo
          .selectAll('line.max')
          .data(d => [d[1]])
          .transition()
          .duration(500)
          .attr('x1', 0)
          .attr('x2', escalaBanda.value.bandwidth())
          .attr('y1', d => escalaLineal.value(d.max))
          .attr('y2', d => escalaLineal.value(d.max))
        grupo
          .selectAll('line.min')
          .data(d => [d[1]])
          .transition()
          .duration(500)
          .attr('x1', 0)
          .attr('x2', escalaBanda.value.bandwidth())
          .attr('y1', d => escalaLineal.value(d.min))
          .attr('y2', d => escalaLineal.value(d.min))
        grupo
          .selectAll('line.q1')
          .data(d => [d[1]])
          .transition()
          .duration(500)
          .attr('x1', 0)
          .attr('x2', escalaBanda.value.bandwidth())
          .attr('y1', d => escalaLineal.value(d.q1))
          .attr('y2', d => escalaLineal.value(d.q1))
        grupo
          .selectAll('line.q3')
          .data(d => [d[1]])
          .transition()
          .duration(500)
          .attr('x1', 0)
          .attr('x2', escalaBanda.value.bandwidth())
          .attr('y1', d => escalaLineal.value(d.q3))
          .attr('y2', d => escalaLineal.value(d.q3))
        grupo
          .selectAll('rect.caja-fondo')
          .data(d => [d[1]])
          .transition()
          .duration(500)
          .attr('y', d => escalaLineal.value(d.q3))
          .attr(
            'height',
            d => escalaLineal.value(d.q1) - escalaLineal.value(d.q3)
          )
          .attr('width', escalaBanda.value.bandwidth())
        grupo
          .selectAll('rect.caja')
          .data(d => [d[1]])
          .transition()
          .duration(500)
          .attr('y', d => escalaLineal.value(d.q3))
          .attr(
            'height',
            d => escalaLineal.value(d.q1) - escalaLineal.value(d.q3)
          )
          .attr('width', escalaBanda.value.bandwidth())
        grupo
          .selectAll('line.media')
          .data(d => [d[1]])
          .transition()
          .duration(500)
          .attr('x1', 0)
          .attr('x2', escalaBanda.value.bandwidth())
          .attr('y1', d => escalaLineal.value(d.mediana))
          .attr('y2', d => escalaLineal.value(d.mediana))
        grupo
          .selectAll('circle.promedio')
          .data(d => [d[1]])
          .transition()
          .duration(500)
          .attr('cx', escalaBanda.value.bandwidth() * 0.5)
          .attr('cy', d => escalaLineal.value(d.promedio))
          .attr('r', 5)
        grupo
          .selectAll('circle.atipicos')
          .data(d => d[1].puntos.filter(dd => dd < d[1].min || d[1].max < dd))
          .join(
            atipicos_enter => {
              atipicos_enter
                .append('circle')
                .attr('class', 'atipicos')
                .attr('r', 0)
                .attr('cx', escalaBanda.value.bandwidth() * 0.5)
                .attr(
                  'cy',
                  usarRegistroGraficas().grafica(idGrafica).grupoVis.alto
                )
                .style('stroke-opacity', '.4')
                .style('stroke-width', '2px')
                .style('fill-opacity', 0.25)
                .transition()
                .duration(500)
                .attr('cy', d => escalaLineal.value(d))
                .attr('r', 4)
            },
            atipicos_update => {
              atipicos_update
                .transition()
                .duration(500)
                .attr('cy', d => escalaLineal.value(d))
                .attr('r', 4)
                .attr('cx', escalaBanda.value.bandwidth() * 0.5)
            },
            atipicos_exit => {
              atipicos_exit.remove()
            }
          )
      },
      exit => {
        exit.remove()
      }
    )
}

onMounted(() => {
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiCajasBigotes.value)
  grupoContenedor.value = select(
    '#' + idGrafica + ' svg g.contenedor-cajas-bigotes'
  )

  margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).margenes,
    nv => (margenesSvg.value = nv)
  )
  calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
  creaCajasBigotes()

  watch(
    () => usarRegistroGraficas().grafica(idGrafica).grupoVis,
    () => {
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
      if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
        creaCajasBigotes()
      }
    }
  )
  watch(datos, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaCajasBigotes()
  })
  watch(variables, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaCajasBigotes()
  })
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).posicion_cursor,
    nv => {
      let bandas = escalaBanda.value.step()

      let indice =
        nv.x < margenesSvg.value.derecha
          ? 0
          : nv.x >=
              usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho +
                margenesSvg.value.izquierda
            ? escalaBanda.value.domain().length - 1
            : parseInt(
                (nv.x -
                  margenesSvg.value.derecha -
                  margenesSvg.value.izquierda) /
                  bandas
              )
      indice =
        indice === escalaBanda.value.domain().length ? indice - 1 : indice
      let categoria = escalaBanda.value.domain()[indice]

      datos_hover.value = { categoria, ...data_agrupada.value.get(categoria) }

      grupoContenedor.value.selectAll('g.grupo-caja').style('opacity', '.2')

      grupoContenedor.value
        .selectAll('g.grupo-caja')
        .filter(d => d[0] === categoria)
        .style('opacity', '1')
    },
    { deep: true }
  )
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).globo_visible,
    nv => {
      if (!nv) {
        grupoContenedor.value.selectAll('g.grupo-caja').style('opacity', '1')
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
  watch(
    () => props.numero_marcas_y,
    () => calcularEscalas(usarRegistroGraficas().grafica(idGrafica)?.grupoVis)
  )
})
onUnmounted(() => {
  usarRegistroGraficas().grafica(idGrafica).quitarTabla(idTabla)
})
defineExpose({
  escalaBanda,
  escalaLineal,
  datos_hover,
  data_agrupada,
})
</script>

<template>
  <g
    ref="sisdaiCajasBigotes"
    :transform="`translate(${margenesSvg?.izquierda || 0},${
      margenesSvg?.arriba || 0
    })`"
    class="contenedor-cajas-bigotes"
  >
  </g>
</template>
