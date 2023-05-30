<script setup>
import { onMounted, onUnmounted, ref, toRefs, watch } from 'vue'
import { idAleatorio } from '../../utils'
import usarRegistroGraficas from './../../composables/usarRegistroGraficas'
import * as valoresPorDefecto from './../../valores/grafica'

const props = defineProps({
  id: {
    type: String,
    default: () => idAleatorio(),
  },
  margenes: {
    type: Object,
    default: () => valoresPorDefecto.margenes,
  },
})

usarRegistroGraficas().registrarGrafica(props.id)
function grafica() {
  return usarRegistroGraficas().grafica(props.id)
}

const { margenes } = toRefs(props)
grafica().margenes = margenes.value
watch(margenes, nv => {
  grafica().margenes = nv
})

const contenedorSisdaiGraficas = ref(null)

onMounted(() => {
  console.log('SisdaiGraficas')
  grafica().ancho = contenedorSisdaiGraficas.value.clientWidth
  grafica().alto = valoresPorDefecto.altoVis
})

onUnmounted(() => {
  usarRegistroGraficas().borrarGrafica(props.id)
})
</script>

<template>
  <div
    ref="contenedorSisdaiGraficas"
    :sisdai-grafica="id"
    class="contenedor-sisdai-graficas"
    :id="id"
  >
    <h1>Hola, soy un contenedor de gráficas [{{ id }}]</h1>

    <figure>
      <svg
        :width="grafica().ancho"
        :height="grafica().alto"
      >
        <g class="eje-x-arriba" />
        <g class="eje-y-derecha" />
        <slot />
        <g
          class="eje-x-abajo"
          :transform="`translate(${margenes.izquierda}, ${
            grafica().alto - margenes.abajo
          })`"
        />
        <g class="eje-y-izquierda" />
      </svg>
    </figure>
  </div>
</template>

<style>
.contenedor-sisdai-graficas {
  width: 100%;
  border: solid 1px tomato;
}
</style>
