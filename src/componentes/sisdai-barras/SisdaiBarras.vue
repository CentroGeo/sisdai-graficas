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
const { margenes, ancho, id_svg } = usarDimensiones()
const escalaBanda = ref()

watch(ancho, nv => {
  if (nv !== 0) {
    escalaBanda.value = scaleBand()
      .domain(props.datos.map(d => d[props.clave_categorias]))
      .range([0, ancho.value])
    console.log(id_svg.value)
    select(`div#${id_svg.value} svg g.eje-x`).call(
      axisBottom(escalaBanda.value)
    )
  }
  //console.log(svg.value)
})
</script>

<template>
  <g :transform="`translate(${margenes.izquierda},${margenes.arriba})`">
    <circle r="10"></circle>
  </g>
</template>
