<script setup>
import { max, sum } from 'd3-array'
import { scaleBand, scaleLinear } from 'd3-scale'
import { select } from 'd3-selection'
import { stack } from 'd3-shape'
import { transition } from 'd3-transition'
import { idAleatorio } from '../../utils'
import { format } from 'd3-format'

import {
  onMounted,
  ref,
  shallowRef,
  toRefs,
  watch,
  onUnmounted,
  computed,
} from 'vue'
import {
  buscarIdContenedorHtmlSisdai,
  creaEjeHorizontal,
  creaEjeVertical,
} from '../../utils'
import usarRegistroGraficas from './../../composables/usarRegistroGraficas'
var idGrafica

const props = defineProps({
  tabla_caption: {
    type: String,
    default: 'Tabla de datos de la gráfica de barras',
  },
  datos: {
    type: Array,
    require: true,
    default: () => [],
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
    default: () => [{ id: '', nombre: '', color: '' }],
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
  anotaciones: {
    type: Boolean,
    default: false,
  },
  estilo_anotaciones: {
    type: Object,
    default: () => ({
      posicion_vertical: 'arriba',
      angulo: 0,
      alineacion_vertical: 'arriba',
      borde: false,
      formato: ',.2r',
    }),
  },
  numero_marcas_y: {
    type: Number,
  },
})
const datos_hover = ref()
const idTabla = idAleatorio()
const sisdaiBarras = shallowRef()
const { datos, nombre_indice, variables } = toRefs(props)
transition
const margenesSvg = ref({})

const escalaBanda = ref(),
  escalaLineal = ref(),
  escalaSubBanda = ref()
const grupoContenedor = ref(),
  data_apilada = ref(),
  grupoBarras = ref(),
  grupoTextos = ref()
const estiloAnotacionesFinal = computed(() => {
  const defaults = {
    posicion_vertical: 'arriba',
    angulo: 0,
    alineacion_vertical: 'arriba',
    borde: false,
    formato: ',.2r',
  }

  return {
    ...defaults,
    ...props.estilo_anotaciones,
  }
})
watch(estiloAnotacionesFinal, () => {
  if (props.anotaciones) {
    creaTextos()
  }
})
function calcularEscalas(grupoVis) {
  if (!grupoVis && grupoVis?.ancho === 0) return

  escalaBanda.value = scaleBand()
    .domain(datos.value?.map(d => d[nombre_indice.value]))
    .range([0, grupoVis?.ancho])
    .padding(props.separacion)

  escalaLineal.value = scaleLinear()
    .domain([
      0,
      props.acomodo === 'apiladas'
        ? max(datos.value?.map(d => sum(variables.value.map(dd => d[dd.id]))))
        : max(datos.value?.map(d => max(variables.value.map(dd => d[dd.id])))),
    ])
    .range([grupoVis?.alto, 0])
  escalaSubBanda.value = scaleBand()
    .domain(variables.value.map(d => d.id))
    .range([0, escalaBanda.value.bandwidth()])
    .padding(props.separacion_agrupadas)

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
    grupoVis?.ancho,
    props.numero_marcas_y
  )
}
function creaBarras() {
  let apilada = stack().keys(variables.value.map(d => d.id))(datos.value)
  for (let i = 0; i < variables.value.length; i++) {
    apilada[i].forEach(d => {
      d.data = { ...d.data, ...{ key: apilada[i].key } }
    })
  }
  data_apilada.value = apilada
  usarRegistroGraficas().grafica(idGrafica).agregarTabla(idTabla, {
    datos: datos.value,
    variables: variables.value,
    nombre_indice: nombre_indice.value,
    tipo: 'barras',
    caption: props.tabla_caption,
  })

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
          .attr('class', d => `barra ${d.data.key}`)
          .attr('y', usarRegistroGraficas().grafica(idGrafica)?.grupoVis?.alto)
          .attr('x', d => {
            return props.acomodo === 'apiladas'
              ? escalaBanda.value(d.data[nombre_indice.value])
              : escalaBanda.value(d.data[nombre_indice.value]) +
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
        )
        grupo
          .selectAll('rect.barra')
          .data(d => d)
          .join(
            barras_enter => {
              barras_enter
                .append('rect')
                .attr('class', d => `barra ${d.data.key}`)
                .attr(
                  'y',
                  usarRegistroGraficas().grafica(idGrafica)?.grupoVis.alto
                )
                .attr('x', d =>
                  props.acomodo === 'apiladas'
                    ? escalaBanda.value(d.data[nombre_indice.value])
                    : escalaBanda.value(d.data[nombre_indice.value]) +
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
                    ? escalaBanda.value(d.data[nombre_indice.value])
                    : escalaBanda.value(d.data[nombre_indice.value]) +
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
function creaTextos() {
  grupoTextos.value = grupoContenedor.value
    .selectAll('g.subcategoria-textos')
    .data(data_apilada.value)
    .join(
      enter => {
        let grupo = enter.append('g').attr('class', 'subcategoria-textos')

        grupo
          .selectAll('text.anotacion')
          .data(d => d)
          .enter()
          .append('text')

          .style('stroke', () =>
            estiloAnotacionesFinal.value.borde ? 'var(--fondo-neutro)' : null
          )
          .style('paint-order', 'stroke')
          .style(
            'stroke-width',
            estiloAnotacionesFinal.value.borde ? '2px' : null
          )

          .attr('class', d => `anotacion ${d.data.key}`)
          .style('text-anchor', () => {
            if (estiloAnotacionesFinal.value.angulo === 0) {
              return 'middle'
            } else {
              if (
                estiloAnotacionesFinal.value.alineacion_vertical === 'arriba'
              ) {
                return 'start'
              } else {
                ;('end')
              }
            }
          })
          .style('dominant-baseline', 'middle')
          .transition()
          .duration(500)
          .style('fill', 'var(--texto-primario)')
          .attr('transform', d => {
            let angulo = -estiloAnotacionesFinal.value.angulo
            let y_base =
              props.acomodo === 'apiladas'
                ? escalaLineal.value(d[1])
                : escalaLineal.value(d[1] - d[0])
            let y_desplazada = 0
            let y_alineacion =
              estiloAnotacionesFinal.value.angulo === 0
                ? estiloAnotacionesFinal.value.alineacion_vertical === 'arriba'
                  ? -9
                  : 11
                : -3
            if (estiloAnotacionesFinal.value.posicion_vertical === 'arriba') {
              y_desplazada = 0
            } else if (
              estiloAnotacionesFinal.value.posicion_vertical === 'mitad'
            ) {
              y_desplazada =
                0.5 * (escalaLineal.value(d[0]) - escalaLineal.value(d[1]))
            } else if (
              estiloAnotacionesFinal.value.posicion_vertical === 'abajo'
            ) {
              y_desplazada = escalaLineal.value(d[0]) - escalaLineal.value(d[1])
            }
            let y = y_base + y_desplazada + y_alineacion
            let x =
              props.acomodo === 'apiladas'
                ? escalaBanda.value(d.data[nombre_indice.value]) +
                  escalaBanda.value.bandwidth() * 0.5
                : escalaBanda.value(d.data[nombre_indice.value]) +
                  escalaSubBanda.value(d.data.key) +
                  0.5 * escalaSubBanda.value.bandwidth()
            return `translate(${x},${y}) rotate(${angulo})`
          })
          .text(d => format(estiloAnotacionesFinal.value.formato)(d[1] - d[0]))
      },
      update => {
        let grupo = update.call(update1 => update1)
        grupo
          .selectAll('text.anotacion')
          .data(d => d)
          .join(
            anotaciones_enter => {
              anotaciones_enter
                .append('text')
                .attr('class', d => `anotacion ${d.data.key}`)

                .style('text-anchor', () => {
                  if (estiloAnotacionesFinal.value.angulo === 0) {
                    return 'middle'
                  } else {
                    if (
                      estiloAnotacionesFinal.value.alineacion_vertical ===
                      'arriba'
                    ) {
                      return 'start'
                    } else {
                      ;('end')
                    }
                  }
                })
                .style('dominant-baseline', 'middle')
                .transition()
                .duration(500)
                .style('fill', 'var(--texto-primario)')
                .attr('transform', d => {
                  let angulo = -estiloAnotacionesFinal.value.angulo
                  let y_base =
                    props.acomodo === 'apiladas'
                      ? escalaLineal.value(d[1])
                      : escalaLineal.value(d[1] - d[0])
                  let y_desplazada = 0
                  let y_alineacion =
                    estiloAnotacionesFinal.value.angulo === 0
                      ? estiloAnotacionesFinal.value.alineacion_vertical ===
                        'arriba'
                        ? -9
                        : 11
                      : -3
                  if (
                    estiloAnotacionesFinal.value.posicion_vertical === 'arriba'
                  ) {
                    y_desplazada = 0
                  } else if (
                    estiloAnotacionesFinal.value.posicion_vertical === 'mitad'
                  ) {
                    y_desplazada =
                      0.5 *
                      (escalaLineal.value(d[0]) - escalaLineal.value(d[1]))
                  } else if (
                    estiloAnotacionesFinal.value.posicion_vertical === 'abajo'
                  ) {
                    y_desplazada =
                      escalaLineal.value(d[0]) - escalaLineal.value(d[1])
                  }
                  let y = y_base + y_desplazada + y_alineacion
                  let x =
                    props.acomodo === 'apiladas'
                      ? escalaBanda.value(d.data[nombre_indice.value]) +
                        escalaBanda.value.bandwidth() * 0.5
                      : escalaBanda.value(d.data[nombre_indice.value]) +
                        escalaSubBanda.value(d.data.key) +
                        0.5 * escalaSubBanda.value.bandwidth()
                  return `translate(${x},${y}) rotate(${angulo})`
                })
                .style('text-anchor', () => {
                  if (estiloAnotacionesFinal.value.angulo === 0) {
                    return 'middle'
                  } else {
                    if (
                      estiloAnotacionesFinal.value.alineacion_vertical ===
                      'arriba'
                    ) {
                      return 'start'
                    } else {
                      ;('end')
                    }
                  }
                })
                .style('dominant-baseline', 'middle')
                .text(d =>
                  format(estiloAnotacionesFinal.value.formato)(d[1] - d[0])
                )
            },
            anotaciones_update => {
              anotaciones_update

                .transition()
                .duration(500)
                .attr('transform', d => {
                  let angulo = -estiloAnotacionesFinal.value.angulo
                  let y_base =
                    props.acomodo === 'apiladas'
                      ? escalaLineal.value(d[1])
                      : escalaLineal.value(d[1] - d[0])
                  let y_desplazada = 0
                  let y_alineacion =
                    estiloAnotacionesFinal.value.angulo === 0
                      ? estiloAnotacionesFinal.value.alineacion_vertical ===
                        'arriba'
                        ? -9
                        : 11
                      : -3
                  if (
                    estiloAnotacionesFinal.value.posicion_vertical === 'arriba'
                  ) {
                    y_desplazada = 0
                  } else if (
                    estiloAnotacionesFinal.value.posicion_vertical === 'mitad'
                  ) {
                    y_desplazada =
                      0.5 *
                      (escalaLineal.value(d[0]) - escalaLineal.value(d[1]))
                  } else if (
                    estiloAnotacionesFinal.value.posicion_vertical === 'abajo'
                  ) {
                    y_desplazada =
                      escalaLineal.value(d[0]) - escalaLineal.value(d[1])
                  }
                  let y = y_base + y_desplazada + y_alineacion
                  let x =
                    props.acomodo === 'apiladas'
                      ? escalaBanda.value(d.data[nombre_indice.value]) +
                        escalaBanda.value.bandwidth() * 0.5
                      : escalaBanda.value(d.data[nombre_indice.value]) +
                        escalaSubBanda.value(d.data.key) +
                        0.5 * escalaSubBanda.value.bandwidth()
                  return `translate(${x},${y}) rotate(${angulo})`
                })
                .style('text-anchor', () => {
                  if (estiloAnotacionesFinal.value.angulo === 0) {
                    return 'middle'
                  } else {
                    if (
                      estiloAnotacionesFinal.value.alineacion_vertical ===
                      'arriba'
                    ) {
                      return 'start'
                    } else {
                      ;('end')
                    }
                  }
                })
                .style('fill', 'var(--texto-primario)')
                .style('dominant-baseline', 'middle')
                .text(d =>
                  format(estiloAnotacionesFinal.value.formato)(d[1] - d[0])
                )
            },
            anotaciones_exit => anotaciones_exit.remove()
          )
      }, // no update function
      exit => {
        exit.remove()
      }
    )
}
onUnmounted(() => {
  usarRegistroGraficas().grafica(idGrafica).quitarTabla(idTabla)
})
onMounted(() => {
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiBarras.value)
  grupoContenedor.value = select('#' + idGrafica + ' svg g.contenedor-barras')
  margenesSvg.value = usarRegistroGraficas().grafica(idGrafica)?.margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica)?.margenes,
    nv => (margenesSvg.value = nv)
  )
  calcularEscalas(usarRegistroGraficas().grafica(idGrafica)?.grupoVis)
  creaBarras()
  if (props.anotaciones) {
    creaTextos()
  }
  watch(
    () => usarRegistroGraficas().grafica(idGrafica)?.grupoVis,
    () => {
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
      if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
        creaBarras()
        creaBarras()
        if (props.anotaciones) {
          creaTextos()
        }
      }
    }
  )
  watch(datos, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaBarras()
    creaBarras()
    if (props.anotaciones) {
      creaTextos()
    }
  })
  watch(variables, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaBarras()
    creaBarras()
    if (props.anotaciones) {
      creaTextos()
    }
  })

  watch(
    () => usarRegistroGraficas().grafica(idGrafica)?.posicion_cursor,
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
      datos_hover.value = data_apilada.value[0].filter(
        dd => dd.data[nombre_indice.value] === categoria
      )[0].data

      grupoContenedor.value
        .selectAll('g.subcategoria-barras')
        .selectAll('rect.barra')

        .style('fill-opacity', '.2')

      grupoContenedor.value
        .selectAll('g.subcategoria-textos')
        .selectAll('text.anotacion')

        .style('fill-opacity', '.2')

      grupoContenedor.value
        .selectAll('g.subcategoria-barras')
        .selectAll('rect.barra')
        .filter(
          d =>
            d.data[nombre_indice.value] ===
            datos_hover.value[nombre_indice.value]
        )
        .style('fill-opacity', '1')
      grupoContenedor.value
        .selectAll('g.subcategoria-textos')
        .selectAll('text.anotacion')
        .filter(
          d =>
            d.data[nombre_indice.value] ===
            datos_hover.value[nombre_indice.value]
        )
        .style('fill-opacity', '1')
    },
    { deep: true }
  )
  watch(
    () => usarRegistroGraficas().grafica(idGrafica)?.globo_visible,
    nv => {
      if (!nv) {
        grupoContenedor.value
          .selectAll('g.subcategoria-barras')
          .selectAll('rect.barra')
          .style('fill-opacity', '1')
        grupoContenedor.value
          .selectAll('g.subcategoria-textos')
          .selectAll('text.anotacion')
          .style('fill-opacity', '1')
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
defineExpose({
  escalaBanda,
  escalaLineal,
  escalaSubBanda,
  datos_hover,
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
