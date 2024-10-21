<script setup>
import { bin, extent, max, rollup, sum } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { area, curveCatmullRom } from 'd3-shape'
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
  numero_divisiones: {
    type: Number,
    default: 10,
  },
})
const datos_hover = ref()

const sisdaiViolines = shallowRef()
const { datos, nombre_indice, variables } = toRefs(props)
transition
const margenesSvg = ref({})
const escalaBanda = ref(),
  escalaLineal = ref(),
  escalaPathX = ref()

const grupoContenedor = ref(),
  data_agrupada = ref(),
  histograma = ref(),
  grupoViolines = ref(),
  grupoMarcador = ref()
function calcularEscalas(grupoVis) {
  if (!grupoVis && grupoVis.ancho === 0) return

  escalaBanda.value = scaleBand()
    .domain(datos.value?.map(d => d[nombre_indice.value]))
    .range([0, grupoVis.ancho])
    .padding(0.05)

  escalaLineal.value = scaleLinear()
    .domain(extent(datos.value.map(d => d[variables.value.id])))
    .range([grupoVis.alto, 0])

  creaEjeHorizontal(idGrafica, escalaBanda.value, props.angulo_etiquetas_eje_x)

  creaEjeVertical(
    idGrafica,
    escalaLineal.value,
    props.angulo_etiquetas_eje_y,
    props.alineacion_eje_y,
    grupoVis.ancho
  )
  histograma.value = bin()
    .domain(escalaLineal.value.domain())
    .thresholds(props.numero_divisiones)
    .value(d => d)
  data_agrupada.value = rollup(
    datos.value,
    d => {
      let input = d.map(g => g[variables.value.id])
      let bins = histograma.value(input)

      return bins
    },
    d => d[props.nombre_indice]
  )

  let numero_maximo = 0
  for (var i of data_agrupada.value) {
    let longuest = max(i[1].map(a => a.length))
    if (longuest > numero_maximo) {
      numero_maximo = longuest
    }
  }
  escalaPathX.value = scaleLinear()
    .range([0, escalaBanda.value.bandwidth()])
    .domain([-numero_maximo, numero_maximo])
}
function creaViolines() {
  grupoViolines.value = grupoContenedor.value
    .selectAll('g.grupo-violin')
    .data(data_agrupada.value)
    .join(
      enter => {
        let grupo = enter
          .insert('g', 'g.grupo-marcador')
          .attr('class', 'grupo-violin')
          .style('fill', variables.value.color)
          .attr('transform', d => `translate(${escalaBanda.value(d[0])} ,0)`)

        grupo
          .selectAll('path.violin')
          .data(d => [d[1]])
          .enter()
          .append('path')
          .attr('class', 'violin')
          .attr('width', escalaBanda.value.bandwidth())

          .transition()
          .duration(500)
          .attr(
            'd',
            area()
              .x0(d => escalaPathX.value(-d.length))
              .x1(d => escalaPathX.value(d.length))
              .y(d => escalaLineal.value(d.x0))
              .curve(curveCatmullRom)
          )
      },
      update => {
        let grupo = update.call(update1 =>
          update1
            .transition()
            .duration(500)
            .style('fill', variables.value.color)
            .attr('transform', d => `translate(${escalaBanda.value(d[0])} ,0)`)
        )

        grupo
          .selectAll('path.violin')
          .data(d => [d[1]])
          .transition()
          .duration(500)
          .attr(
            'd',
            area()
              .x0(d => escalaPathX.value(-d.length))
              .x1(d => escalaPathX.value(d.length))
              .y(d => escalaLineal.value(d.x0))
              .curve(curveCatmullRom)
          )
      },
      exit => {
        exit.remove()
      }
    )
}

onMounted(() => {
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiViolines.value)
  grupoContenedor.value = select('#' + idGrafica + ' svg g.contenedor-violines')
  grupoMarcador.value = grupoContenedor.value.select('g.grupo-marcador')
  margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).margenes,
    nv => (margenesSvg.value = nv)
  )
  calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
  creaViolines()

  watch(
    () => usarRegistroGraficas().grafica(idGrafica).grupoVis,
    () => {
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
      if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
        creaViolines()
      }
    }
  )
  watch(datos, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaViolines()
  })
  watch(variables, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaViolines()
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
            : parseInt((nv.x - margenesSvg.value.izquierda) / bandas)
      indice =
        indice === escalaBanda.value.domain().length ? indice - 1 : indice
      let categoria = escalaBanda.value.domain()[indice]
      let dato_violin = data_agrupada.value.get(categoria)
      let y0 = escalaLineal.value.invert(nv.y - margenesSvg.value.arriba)
      let dato_violin_segmento = dato_violin.filter(
        arr => arr.x0 <= y0 && y0 <= arr.x1
      )[0]
      datos_hover.value = {
        categoria,
        datos_segmento: dato_violin_segmento,
        x0: dato_violin_segmento?.x0,
        x1: dato_violin_segmento?.x1,
        cantidad_muestras_segmento: dato_violin_segmento?.length,
        cantidad_muestras_violin: sum(dato_violin.map(d => d.length)),
      }
      grupoMarcador.value
        .style('fill-opacity', 1)
        .attr(
          'transform',
          `translate(${escalaBanda.value(datos_hover.value.categoria)},0)`
        )
      if (!datos_hover.value.categoria) {
        grupoMarcador.value
          .select('path.triangulo-0')
          .attr(
            'd',
            `M ${escalaPathX.value(-datos_hover.value.cantidad_muestras_segmento)},${escalaLineal.value(datos_hover.value.x0)} ${escalaPathX.value(-datos_hover.value.cantidad_muestras_segmento) - 5},${escalaLineal.value(datos_hover.value.x0) + 5} ${escalaPathX.value(-datos_hover.value.cantidad_muestras_segmento) - 5},${escalaLineal.value(datos_hover.value.x0) - 5}z`
          )

        grupoMarcador.value
          .select('line')
          .attr(
            'x1',
            escalaPathX.value(datos_hover.value.cantidad_muestras_segmento)
          )
          .attr('y1', escalaLineal.value(datos_hover.value.x0))
          .attr(
            'x2',
            escalaPathX.value(-datos_hover.value.cantidad_muestras_segmento)
          )
          .attr('y2', escalaLineal.value(datos_hover.value.x0))
          .style('stroke', 'black')
        grupoMarcador.value
          .select('path.triangulo-1')
          .attr(
            'd',
            `M ${escalaPathX.value(datos_hover.value.cantidad_muestras_segmento)},${escalaLineal.value(datos_hover.value.x0)} ${escalaPathX.value(datos_hover.value.cantidad_muestras_segmento) + 5},${escalaLineal.value(datos_hover.value.x0) + 5} ${escalaPathX.value(datos_hover.value.cantidad_muestras_segmento) + 5},${escalaLineal.value(datos_hover.value.x0) - 5}z`
          )
      }
    },
    { deep: true }
  )
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).globo_visible,
    nv => {
      if (!nv) {
        grupoMarcador.value.style('fill-opacity', 0)
      }
    }
  )
})
defineExpose({
  escalaBanda,
  escalaLineal,
  datos_hover,
})
</script>

<template>
  <g
    ref="sisdaiViolines"
    :transform="`translate(${margenesSvg?.izquierda || 0},${
      margenesSvg?.arriba || 0
    })`"
    class="contenedor-violines"
  >
    <g class="grupo-marcador">
      <path class="triangulo-0"></path>
      <line></line>
      <path class="triangulo-1"></path>
    </g>
  </g>
</template>
