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
    class="globo-informacion no-visible"
    role="tooltip"
    :style="{
      width: props.ancho + 'px',
      position: 'absolute',
    }"
  >
    <div class="globo-informacion-cuerpo">
      <slot></slot>
    </div>
    <button class="globo-informacion-cerrar">
      <span
        class="pictograma-cerrar"
        aria-hidden="true"
      ></span>
      <span class="a11y-solo-lectura">Cerrar.</span>
    </button>
  </div>
</template>
