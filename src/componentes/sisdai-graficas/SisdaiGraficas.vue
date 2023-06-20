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
  titulo_eje_y: {
    type: String,
  },
  titulo_eje_x: {
    type: String,
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
const espacio_eje_y = ref(0)
onMounted(() => {
  console.log('SisdaiGraficas')
  obteniendoDimensiones()
  window.addEventListener('resize', obteniendoDimensiones)
})
function obteniendoDimensiones() {
  espacio_eje_y.value = document.querySelector(
    `#${props.id}  .titulo-eje-y`
  ).clientHeight
  grafica().ancho =
    contenedorSisdaiGraficas.value.clientWidth - espacio_eje_y.value
  grafica().alto = valoresPorDefecto.altoVis
}

onUnmounted(() => {
  usarRegistroGraficas().borrarGrafica(props.id)
  window.removeEventListener('resize', obteniendoDimensiones)
})
</script>

<template>
  <div
    ref="contenedorSisdaiGraficas"
    :sisdai-grafica="id"
    class="contenedor-sisdai-graficas"
    :id="id"
  >
    <div
      class="contenedor-svg-ejes-tooltip"
      :style="{
        height: !grafica().alto ? '100%' : grafica().alto + 'px',
      }"
    >
      <div
        class="contenedor-titulo-eje-y"
        :style="{
          height: !grafica().alto ? '100%' : grafica().alto + 'px',
        }"
      >
        <div
          :style="{
            width: !grafica().alto ? '100%' : grafica().alto + 'px',
            transform: `rotate(-90deg)translateX(calc(-100% - ${
              0.5 * margenes.arriba
            }px))`,
          }"
          class="titulo-eje-y"
          style="padding: 10px 0 5px 0"
          v-html="titulo_eje_y"
        ></div>
      </div>
      <figure :style="{ left: espacio_eje_y + 'px' }">
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
          <g
            class="eje-y-izquierda"
            :transform="`translate(${margenes.izquierda}, ${+margenes.arriba})`"
          />
        </svg>
      </figure>
      <div class="contenedor-titulo-eje-x">
        <div
          class="titulo-eje-x"
          v-html="titulo_eje_x"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.contenedor-sisdai-graficas {
  width: 100%;
  border: solid 1px tomato;
  div.contenedor-svg-ejes-tooltip {
    position: relative;
    width: 100%;
    display: inline-block;

    .contenedor-titulo-eje-y {
      display: inline-block;
      .titulo-eje-y {
        display: block;
        transform-origin: top left;
        //transform: rotate(-90deg) translate(-100%);
        font-size: 12px;
        text-align: center;
        font-weight: 600;
      }
    }
    div.contenedor-titulo-eje-x {
      position: relative;
      width: 100%;
      .titulo-eje-x {
        font-size: 12px;
        text-align: center;
        font-weight: 600;
      }
    }

    figure {
      position: absolute;
      top: 0;
      margin: 0;
    }
  }
}
</style>
