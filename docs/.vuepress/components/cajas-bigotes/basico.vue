<script setup>
import cajasbigotesejemplos from '../../assets/datos/cajas_bigotes_ejemplo_1.json'

import { ref } from 'vue'
const datos_dinamicos = ref(cajasbigotesejemplos)
const variables_dinamicas = ref({
  id: 'acciones_vendidas',
  nombre: 'Acciones vendidas',
  color: '#2c7fb8',
})
</script>

<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
  >
    <SisdaiCajasBigotes
      :datos="datos_dinamicos"
      :variables="variables_dinamicas"
      :clave_categorias="'nombre_empresa'"
    />
  </SisdaiGraficas>
</template>
