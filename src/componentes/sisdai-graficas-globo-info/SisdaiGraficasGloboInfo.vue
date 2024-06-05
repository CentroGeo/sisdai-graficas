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
    class="globo-informacion globo-informacion-extra"
    role="tooltip"
    :style="{
      width: props.ancho + 'px',
    }"
  >
    <slot></slot>
    <button
      class="boton-pictograma boton-sin-contenedor-secundario globo-informacion-cerrar no-visible-esc"
    >
      <span
        class="pictograma-cerrar"
        aria-hidden="true"
      ></span>
      <span class="a11y-solo-lectura">Cerrar.</span>
    </button>
  </div>
</template>
<style land="scss" scoped>
.globo-informacion {
  position: absolute;
  visibility: hidden;
}
</style>
