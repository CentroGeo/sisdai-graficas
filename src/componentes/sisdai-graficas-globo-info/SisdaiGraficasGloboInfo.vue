<script setup>
import { ref } from 'vue'
const props = defineProps({
  ancho: { type: Number, default: 240 },
})
const contenedorGlobo = ref()
</script>
<template>
  <div
    ref="contenedorGlobo"
    class="contenedor-globo-info"
    :style="{
      width: props.ancho + 'px',
    }"
    style="position: absolute; visibility: hidden"
  >
    <div class="cuerpo-globo-info">
      <slot></slot>
    </div>
    <button class="boton-icono boton-chico boton-cerrar no-visible-esc">
      <span
        class="icono-cerrar"
        aria-hidden="true"
      ></span>
      <span class="a11y-solo-lectura">Cerrar.</span>
    </button>
  </div>
</template>
