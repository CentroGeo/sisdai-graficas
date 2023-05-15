<script setup>
//import { select } from 'd3-selection'
import { ref, onMounted, onUnmounted, toRefs, watch } from 'vue'

import usarRegistroGraficas from '../../composables/usarRegistroGraficas'
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
  margenes: {
    type: Object,
    default: () => ({ arriba: 20, abajo: 20, derecha: 20, izquierda: 20 }),
  },
})
const { borrar, usarDimensiones } = usarRegistroGraficas(props.id)

const { guardarMargenes, alto, guardarAlto, ancho, guardarAncho } =
  usarDimensiones(props.id)

const { margenes } = toRefs(props)

guardarMargenes(margenes.value)

watch(margenes, guardarMargenes)

guardarAlto(0)
guardarAncho(0)
const contenedorSisdaiGraficas = ref(null)

onMounted(() => {
  guardarAncho(
    contenedorSisdaiGraficas.value.clientWidth -
      margenes.value.izquierda -
      margenes.value.derecha
  )
  guardarAlto(ancho.value * 0.5)
  console.log(
    contenedorSisdaiGraficas.value.clientWidth -
      margenes.value.izquierda -
      margenes.value.derecha
  )
})
onUnmounted(() => {
  borrar()
})
</script>

<template>
  <div
    :id="id"
    ref="contenedorSisdaiGraficas"
    class="grafica"
  >
    hola soy una grafica
    <svg
      :width="ancho + margenes.izquierda + margenes.derecha"
      :height="alto + margenes.arriba + margenes.abajo"
    >
      <slot />
      <g
        class="eje-x"
        :transform="`translate(${margenes.izquierda}, ${
          alto + margenes.arriba
        })`"
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
