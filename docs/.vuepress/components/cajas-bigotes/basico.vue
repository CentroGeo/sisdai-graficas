<script setup>
import cajasbigotesejemplos from './cajas_bigotes_ejemplo_1.json'

import { ref } from 'vue'
const margen = ref(30)
const datos_dinamicos = ref(cajasbigotesejemplos)
const variables_dinamicas = ref([
  {
    variable_distribucion: 'acciones_vendidas',
    color: '#2c7fb8',
  },
])
</script>

<template>
  <div>
    <hr />
    <SisdaiGraficas
      :margenes="{
        arriba: Number(margen),
        abajo: Number(margen),
        derecha: Number(margen),
        izquierda: Number(margen),
      }"
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
