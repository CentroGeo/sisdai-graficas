<script setup>
import { ref } from 'vue'
const props = defineProps({
  ancho: { type: Number, default: 240 },
})
const visible = ref(false)
</script>
<template>
  <div
    class="contenedor-globo-info"
    :style="{
      width: props.ancho + 'px',
      visibility: visible ? 'visible' : 'hidden',
    }"
  >
    <div class="cuerpo-globo-info">
      <slot></slot>
    </div>
    <button
      class="boton-icono boton-chico boton-cerrar no-visible-esc"
      @click="visible = false"
    >
      <span
        class="icono-cerrar"
        aria-hidden="true"
      ></span>
      <span class="a11y-solo-lectura">Cerrar.</span>
    </button>
  </div>
</template>
<style land="scss" scoped>
.contenedor-globo-info {
  position: absolute;
  visibility: hidden;
}
</style>
