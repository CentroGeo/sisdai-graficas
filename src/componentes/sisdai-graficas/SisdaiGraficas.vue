<script setup>
import { select } from 'd3-selection'
import { ref, onMounted } from 'vue'
import usarDimensiones from '../../composables/usarDimensiones'
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
const ancho = ref(0)
const alto = ref(0)
const svg = ref()

const { guardarMargenes } = usarDimensiones()
guardarMargenes(props.margen)

onMounted(() => {
  ancho.value =
    document.querySelector(`div#${props.id}`).clientWidth -
    props.margen.izquierda -
    props.margen.derecha

  console.log(document.querySelector(`div#${props.id}`).clientWidth)

  alto.value = ancho.value * 0.5 - props.margen.arriba - props.margen.abajo
  svg.value = select(`div#${props.id} svg`)
  const { guardaId } = usarDimensiones()
  const { guardaDimensiones } = usarDimensiones()
  guardaId(props.id)
  guardaDimensiones(ancho.value, alto.value)
})
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
      <slot />
      <g
        class="eje-x"
        :transform="`translate(${margen.izquierda}, ${alto + margen.arriba})`"
      ></g>
      <g class="eje-y-derecha"></g>
    </svg>
  </div>
</template>

<style>
.grafica {
  width: 100%;
}
</style>
