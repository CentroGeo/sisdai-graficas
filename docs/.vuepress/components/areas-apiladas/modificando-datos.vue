<script setup>
import { ref } from 'vue'
import data_edos from './data_edos.json'
import diccionario_estados from './diccionario_estados.json'
diccionario_estados.forEach(
  d =>
    (d.color = `rgb(${220 * Math.random()},${220 * Math.random()},${
      220 * Math.random()
    })`)
)
const variables = ref(diccionario_estados)
variables
const datos = ref(data_edos)
</script>
<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
    :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
  >
    <SisdaiAreasApiladas
      :datos="datos"
      :variables="variables"
      :angulo_etiquetas_eje_x="-45"
    />
  </SisdaiGraficas>
</template>
