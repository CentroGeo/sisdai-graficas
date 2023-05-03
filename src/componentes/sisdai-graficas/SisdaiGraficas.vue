<script setup>
defineProps({
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
})
</script>

<template>
  <div>hola soy una grafica</div>
</template>
