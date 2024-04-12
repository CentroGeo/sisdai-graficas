<script setup>
import { min, sum } from 'd3-array'
import { select } from 'd3-selection'
import { arc, pie } from 'd3-shape'
import { transition } from 'd3-transition'
import { onMounted, ref, shallowRef, toRefs, watch } from 'vue'
import usarRegistroGraficas from '../../composables/usarRegistroGraficas'
import { buscarIdContenedorHtmlSisdai } from '../../utils'
const props = defineProps({
  datos: {
    type: Array,
    require: true,
  },
  clave_categoria: {
    type: String,
    default: 'categoria',
  },
  clave_cantidad: {
    type: String,
    default: 'cantidad',
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
  radio_interno: {
    type: Number,
    default: 0.18,
  },
  radio_externo: {
    type: Number,
    default: 0.32,
  },
})
const alto = ref(0)
const ancho = ref(0)
var idGrafica
const sisdaiDona = shallowRef()
const datos_hover = ref()
const { datos, clave_cantidad, variables, clave_categoria } = toRefs(props)
transition
const margenesSvg = ref({})
const pay = ref(pie()),
  arco = ref(arc()),
  arco_txt = ref(arc()),
  data_pay = ref()

const grupoContenedor = ref(),
  grupoDona = ref()

function calcularEscalas(grupoVis) {
  alto.value = grupoVis.alto
  ancho.value = grupoVis.ancho
  let limites = min([ancho.value, alto.value])

  pay.value.sort(null).value(d => d[clave_cantidad.value])
  arco.value
    .innerRadius(props.radio_interno * limites)
    .outerRadius(props.radio_externo * limites)
  arco_txt.value
    .innerRadius(props.radio_externo * limites)
    .outerRadius(props.radio_externo * limites)
  data_pay.value = pay.value(
    datos.value.filter(d =>
      variables.value.map(dd => dd.id).includes(d[clave_categoria.value])
    )
  )
}
function creaDona() {
  grupoDona.value = grupoContenedor.value
    .selectAll('g.segmento')
    .data(data_pay.value)
  grupoDona.value.join(
    enter => {
      var grupo = enter
        .append('g')
        .attr('class', 'segmento')
        .attr('fill', d => {
          return variables.value.filter(
            dd => dd.id === d.data[clave_categoria.value]
          )[0].color
        })
      grupo
        .selectAll('path.path-segmento')
        .data(d => [d])
        .enter()
        .append('path')
        .attr('class', 'path-segmento')
        .attr('d', arco.value)
      grupo
        .selectAll('text.vis-valores-ejes')
        .data(d => [d])
        .enter()
        .append('text')
        .attr('class', 'vis-valores-ejes')
        .text(
          d =>
            Math.round(
              (1000 * d.data[clave_cantidad.value]) /
                sum(data_pay.value.map(d => d.data[clave_cantidad.value]))
            ) /
              10 +
            '%'
        )
        .style('text-anchor', d => {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return midangle < Math.PI ? 'start' : 'end'
        })
        .style('dominant-baseline', d => {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return midangle < 0.5 * Math.PI || midangle > 1.5 * Math.PI
            ? 'auto'
            : 'hanging'
        })
        .style('font-size', '16px')
        .style('font-weight', '500')
        .attr('transform', d => 'translate(' + arco_txt.value.centroid(d) + ')')
        .style('font-weight', '500')
    },
    update => {
      let grupo = update.call(update1 => {
        update1
          .transition()
          .duration(500)
          .attr('fill', d => {
            return variables.value.filter(
              dd => dd.id === d.data[clave_categoria.value]
            )[0].color
          })
      })
      grupo
        .selectAll('path.path-segmento')
        .data(d => [d])
        .attr('d', arco.value)

      grupo
        .selectAll('text.vis-valores-ejes')
        .data(d => [d])
        .text(
          d =>
            Math.round(
              (1000 * d.data[clave_cantidad.value]) /
                sum(data_pay.value.map(d => d.data[clave_cantidad.value]))
            ) /
              10 +
            '%'
        )
        .style('font-size', '16px')
        .style('font-weight', '500')
        .style('text-anchor', d => {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return midangle < Math.PI ? 'start' : 'end'
        })
        .style('dominant-baseline', d => {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return midangle < 0.5 * Math.PI || midangle > 1.5 * Math.PI
            ? 'auto'
            : 'hanging'
        })
        .attr('transform', d => 'translate(' + arco_txt.value.centroid(d) + ')')
        .attr('class', 'vis-valores-ejes')
    },
    exit => {
      exit.remove()
    }
  )
}

onMounted(() => {
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiDona.value)
  grupoContenedor.value = select('#' + idGrafica + ' svg g.contenedor-dona')

  margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).margenes,
    nv => (margenesSvg.value = nv)
  )

  calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
  creaDona()

  watch(
    () => usarRegistroGraficas().grafica(idGrafica).grupoVis,
    () => {
      calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
      if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
        creaDona()
      }
    }
  )
  watch(datos, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaDona()
  })
  watch(variables, () => {
    calcularEscalas(usarRegistroGraficas().grafica(idGrafica).grupoVis)
    creaDona()
  })
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).posicion_cursor,
    nv => {
      let x =
        nv.x - 0.5 * usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho
      let y =
        nv.y - 0.5 * usarRegistroGraficas().grafica(idGrafica).grupoVis.alto
      let ang = Math.atan(y / x) + 0.5 * Math.PI
      let angulo
      if (x >= 0) {
        angulo = ang
      } else {
        angulo = ang + Math.PI
      }
      grupoDona.value.style('fill-opacity', '.2')
      var segmento_over = grupoDona.value
        .filter(d => d.startAngle <= angulo && angulo < d.endAngle)
        .style('fill-opacity', 1)
      datos_hover.value = segmento_over.data()[0].data
    },
    { deep: true }
  )
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).globo_visible,
    nv => {
      if (!nv) {
        grupoDona.value.style('fill-opacity', '1')
      }
    }
  )
})
defineExpose({ datos_hover })
</script>

<template>
  <g
    ref="sisdaiDona"
    :transform="`translate(${
      margenesSvg.izquierda ? margenesSvg.izquierda + ancho * 0.5 : ancho * 0.5
    },${margenesSvg.arriba ? margenesSvg.arriba + alto * 0.5 : alto * 0.5})`"
    class="contenedor-dona"
  >
  </g>
</template>
