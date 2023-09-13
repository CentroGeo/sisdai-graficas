<script setup>
import cajasbigotesejemplos from './cajas_bigotes_ejemplo_1.json'

import { ref } from 'vue'
const datos_dinamicos = ref(cajasbigotesejemplos)
const variables_dinamicas = ref({
  id: 'acciones_vendidas',
  nombre_subcategoria: 'Acciones vendidas',
  color: '#2c7fb8',
})
</script>

<template>
  <div class="contenedor-vis borde-redondeado-8">
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
  </div>
</template>
