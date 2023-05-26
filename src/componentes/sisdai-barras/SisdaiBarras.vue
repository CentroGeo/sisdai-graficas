<script setup>
import { onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import usarRegistroGraficas from './../../composables/usarRegistroGraficas'
import { buscarIdContenedorHtmlSisdai } from './../../utils'

var idGrafica

const sisdaiBarras = shallowRef()

const margenesPadre = ref({})

onMounted(() => {
  console.log('SisdaiBarras')
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiBarras.value)

  const { margenes } = usarRegistroGraficas().grafica(idGrafica).dimensiones
  // console.log(margenes)
  margenesPadre.value = margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).dimensiones.margenes,
    nv => (margenesPadre.value = nv)
  )
})

onUnmounted(() => {})
</script>

<template>
  <g
    ref="sisdaiBarras"
    :transform="`translate(${margenesPadre?.izquierda || 0},${
      margenesPadre?.arriba || 0
    })`"
  >
    <circle
      r="10"
      fill="#AB7C94"
    />
  </g>
</template>
