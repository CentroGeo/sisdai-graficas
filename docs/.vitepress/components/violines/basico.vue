<script setup>
import violin_seguridad_social_edad from '../../assets/datos/violin_seguridad_social_edad.json'

import { ref } from 'vue'
const datos = ref(violin_seguridad_social_edad)
const losViolines = ref()
</script>

<template>
  <SisdaiGraficas
    :titulo_eje_y="'Edad'"
    :titulo_eje_x="'Seguridad social'"
  >
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
      :clave_categorias="'seguridad_social'"
    />
  </SisdaiGraficas>
</template>
