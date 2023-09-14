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
    validator(objeto) {
      // Debe tener las claves arriba, abajo, derecha e izquierda
      const validado =
        'arriba' in objeto &&
        'abajo' in objeto &&
        'derecha' in objeto &&
        'izquierda' in objeto

      if (!validado) {
        console.error('El objeto no cumple con las especificaciones', objeto)
      }
      return validado
    },
  },
  titulo_eje_y: {
    type: String,
  },
  titulo_eje_x: {
    type: String,
  },
  ancho: {
    type: Number,
  },
  alto: {
    type: Number,
  },
})
const ancho_grafica = ref()
const alto_grafica = ref()

usarRegistroGraficas().registrarGrafica(props.id)
const grafica = () => {
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
  grafica().ancho = props.ancho
    ? props.ancho
    : contenedorSisdaiGraficas.value.clientWidth - espacio_eje_y.value
  grafica().alto = props.alto ? props.alto : valoresPorDefecto.altoVis

  ancho_grafica.value = props.ancho
    ? props.ancho
    : contenedorSisdaiGraficas.value.clientWidth - espacio_eje_y.value
  alto_grafica.value = props.alto ? props.alto : valoresPorDefecto.altoVis
}
defineExpose({
  ancho_grafica,
  alto_grafica,
  grafica,
})
onUnmounted(() => {
  usarRegistroGraficas().borrarGrafica(props.id)
  window.removeEventListener('resize', obteniendoDimensiones)
})
</script>

<template>
  <div
    ref="contenedorSisdaiGraficas"
    :sisdai-grafica="id"
    class="contenido-vis"
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
              0.5 * (margenes.arriba - margenes.abajo)
            }px))`,
          }"
          class="titulo-eje-y vis-titulo-ejes"
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
          <g
            class="eje-y-derecha"
            :transform="`translate(${
              grafica().ancho - margenes.derecha
            }, ${+margenes.arriba})`"
          />
          <slot />
        </svg>
      </figure>
      <div class="contenedor-titulo-eje-x">
        <div
          class="titulo-eje-x vis-titulo-ejes"
          v-html="titulo_eje_x"
        ></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.contenido-vis {
  width: 100%;
  div.contenedor-svg-ejes-tooltip {
    position: relative;
    width: 100%;
    display: inline-block;

    .contenedor-titulo-eje-y {
      display: inline-block;
      .titulo-eje-y {
        position: absolute;
        display: block;
        transform-origin: top left;
        //transform: rotate(-90deg) translate(-100%);
        text-align: center;
      }
    }
    div.contenedor-titulo-eje-x {
      position: relative;
      width: 100%;
      .titulo-eje-x {
        text-align: center;
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
