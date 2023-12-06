<script setup>
import { ref } from 'vue'
import datos_consorcio from '../../assets/datos/consorcio_variantes_todas.json'

const datos = ref(datos_consorcio)
</script>
<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
    :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
  >
    <SisdaiAreasApiladas
      :datos="datos"
      :variables="[
        { id: 'Omicron', color: '#FFCE00', nombre: 'Omicron' },
        { id: 'Delta', color: '#FA5600', nombre: 'Delta' },
        { id: 'Gamma', color: '#C7690D', nombre: 'Gamma' },
        { id: 'Beta', color: '#FF9F4D', nombre: 'Beta' },
        { id: 'Alpha', color: '#FFAC99', nombre: 'Alpha' },
        { id: 'Mu', color: '#29037B', nombre: 'Mu' },
        { id: 'Lambda', color: '#A359D9', nombre: 'Lambda' },
        {
          id: 'variantes_restantes',
          color: '#bcbcbc',
          nombre: 'Variantes restantes',
        },
      ]"
      :angulo_etiquetas_eje_x="-45"
      :clave_fecha="'fecha_2'"
      :formato_temporal="'%d/%m/%Y'"
    />
  </SisdaiGraficas>
</template>
