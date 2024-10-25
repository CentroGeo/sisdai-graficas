<script setup>
import { ref } from 'vue'
const laSerie = ref()
</script>
<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
    :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
  >
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo :ancho="200">
        <p>
          <span
            class="globo-informacion-punto-color"
            :style="{ background: laSerie?.datos_hover?.color }"
          ></span>

          {{ laSerie?.datos_hover?.nombre }}:
          {{ laSerie?.datos_hover?.[laSerie?.datos_hover?.id] }}
        </p>
      </SisdaiGraficasGloboInfo>
    </template>
    <SisdaiSeriesTiempo
      ref="laSerie"
      :datos="[
        { fecha: '01-01-2015', cantidad_1: 100, cantidad_2: 10 },
        { fecha: '01-01-2016', cantidad_1: 80, cantidad_2: 20 },
        { fecha: '01-01-2017', cantidad_1: 50, cantidad_2: 30 },
        { fecha: '01-01-2018', cantidad_1: 100, cantidad_2: 40 },
        { fecha: '01-01-2019', cantidad_1: 80, cantidad_2: 35 },
        { fecha: '01-01-2020', cantidad_1: 40, cantidad_2: 24 },
        { fecha: '01-01-2021', cantidad_1: 70, cantidad_2: 50 },
      ]"
      :variables="[
        {
          id: 'cantidad_1',
          nombre: 'Cantidad 1',
          color: 'blue',
        },
        {
          id: 'cantidad_2',
          nombre: 'Cantidad 1',
          color: 'red',
        },
      ]"
      :nombre_indice="'fecha'"
      :angulo_etiquetas_eje_x="-45"
    />
  </SisdaiGraficas>
</template>
