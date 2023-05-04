<script setup>
import { select } from 'd3-selection'
import { ref, onMounted } from 'vue'
const props = defineProps({
  id: {
    type: String,
    require: true,
  },
  tituloEje: {
    type: String,
    default: 'este es el titulo',
  },
  tooltip: {
    type: Function,
  },
  margen: {
    type: Object,
    default: () => ({ arriba: 20, abajo: 20, derecha: 20, izquierda: 20 }),
  },
})
const ancho = ref()
const alto = ref()
const svg = ref()
onMounted(() => {
  ancho.value =
    document.querySelector(`div#${props.id}`).clientWidth -
    props.margen.izquierda -
    props.margen.derecha
  alto.value = ancho.value * 0.5 - props.margen.arriba - props.margen.abajo
  svg.value = select(`div#${props.id} svg`)
})

console.log(svg)
</script>

<template>
  <div
    :id="id"
    class="grafica"
  >
    hola soy una grafica
    <svg
      :width="ancho + margen.izquierda + margen.derecha"
      :height="alto + margen.arriba + margen.abajo"
    >
      <!--<g :transform="`translate(${margen.izquierda}, ${margen.arriba})`">
        <circle r="10"></circle>
      </g>-->
      <slot />
    </svg>
  </div>
</template>

<style>
.grafica {
  width: 100%;
}
</style>
