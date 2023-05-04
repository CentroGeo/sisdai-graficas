<script setup>
import { watch, ref } from 'vue'
import { scaleBand } from 'd3-scale'
import { axisBottom } from 'd3-axis'

import usarDimensiones from '../../composables/usarDimensiones'
import { select } from 'd3-selection'

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
const { margen } = usarDimensiones()
console.log(margen)
const { ancho, alto } = usarDimensiones()

const escalaBanda = ref()

watch(ancho, (nv, ov) => {
  if (nv !== 0) {
    escalaBanda.value = scaleBand()
      .domain(props.datos.map(d => d[props.clave_categorias]))
      .range([0, ancho.value])

    select('g g.eje-x')
      .call(axisBottom(escalaBanda.value))

      .attr('transform', `translate(${0}, ${alto.value})`)
  }
  console.log(nv, ov)
})
</script>

<template>
  <g :transform="`translate(${margen.izquierda},${margen.arriba})`">
    <g class="eje-x"></g>
    <circle r="10"></circle>
  </g>
</template>
