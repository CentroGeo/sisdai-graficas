<script setup>
const props = defineProps({
  ancho: { type: Number, default: 240 },
})
</script>
<template>
  <div
    class="contenedor-globo-info"
    :style="{
      width: props.ancho + 'px',
    }"
  >
    <div class="cuerpo-globo-info">
      <slot></slot>
    </div>
  </div>
</template>
<style land="scss" scoped>
.contenedor-globo-info {
  position: absolute;
  visibility: hidden;
}
</style>
