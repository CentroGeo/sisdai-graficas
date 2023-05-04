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
  alto.value = ancho.value * 0.5 - props.margen.arriba - props.margen.abajo
  svg.value = select(`div#${props.id} svg`)
  const { guardaDimensiones } = usarDimensiones()
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
    </svg>
  </div>
</template>

<style>
.grafica {
  width: 100%;
}
</style>
