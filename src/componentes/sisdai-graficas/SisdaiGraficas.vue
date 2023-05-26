<script setup>
import { onMounted, onUnmounted, reactive, ref, toRefs, watch } from 'vue'
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
grafica().dimensiones.margenes = margenes.value
watch(margenes, nv => {
  grafica().dimensiones.margenes = nv
})

const contenedorSisdaiGraficas = ref(null)

const dimenciones = reactive({
  ancho: 0,
  alto: 0,
})
watch(
  () => dimenciones.ancho,
  nv => {
    console.log('ancho cambiado')
    dimenciones.alto = nv * 0.5
  }
)

onMounted(() => {
  console.log('SisdaiGraficas')
  dimenciones.ancho = contenedorSisdaiGraficas.value.clientWidth
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
  >
    <h1>Hola, soy un contenedor de gráficas [{{ id }}]</h1>

    <figure>
      <svg
        :width="dimenciones.ancho"
        :height="dimenciones.alto"
      >
        <g class="eje-x-arriba" />
        <g class="eje-y-derecha" />
        <slot />
        <g
          class="eje-x-abajo"
          :transform="`translate(${margenes.izquierda}, ${
            dimenciones.alto - margenes.abajo
          })`"
        >
          <rect
            width="20"
            height="20"
            style="fill: #ab7c94"
          />
        </g>
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
