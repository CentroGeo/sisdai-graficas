<script setup>
import violin_resistencia_edad from '../../assets/datos/violin_resistencia_edad.json'

import { ref } from 'vue'
const datos = ref(violin_resistencia_edad)
const losViolines = ref()
</script>

<template>
  <SisdaiGraficas
    :titulo_eje_y="'Edad'"
    :titulo_eje_x="'Tipo de resistencia'"
  >
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">
          Resistencia a antirretrovirales con respecto a la edad
        </p>
        <p class="vis-fecha-actualizacion">Última actualización: 14/05/2023</p>
        <p class="vis-instruccional">Descripción o texto instruccional.</p>
      </div>
    </template>
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo :ancho="200">
        <p>
          {{ losViolines?.datos_hover?.categoria }}<br />
          {{ losViolines?.datos_hover?.cantidad_muestras_segmento }} casos de
          {{ losViolines?.datos_hover?.x0 }} a casos de
          {{ losViolines?.datos_hover?.x1 }} años
        </p>
      </SisdaiGraficasGloboInfo>
    </template>
    <SisdaiViolines
      ref="losViolines"
      :datos="datos"
      :variables="{
        id: 'edad',
        nombre: 'Edad',
        color: '#2c7fb8',
      }"
      :nombre_indice="'resistencia'"
      :tabla_caption="'Datos de ejemplo de resistencia a antirretrovirales por grupos de edad'"
    />
  </SisdaiGraficas>
</template>
