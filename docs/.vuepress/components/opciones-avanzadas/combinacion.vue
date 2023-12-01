<script setup>
import cajasbigotesejemplos from './cajas_bigotes_ejemplo_1.json'

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
    :margenes="{ arriba: 30, abajo: 20, derecha: 30, izquierda: 40 }"
  >
    <SisdaiBarras
      :datos="[
        { categoria: 'Empresa A', cantidad_1: 100, cantidad_2: 100 },
        { categoria: 'Empresa B', cantidad_1: 80, cantidad_2: 100 },
        { categoria: 'EmpresaC', cantidad_1: 20, cantidad_2: 100 },
      ]"
      :variables="[
        {
          id: 'cantidad_1',
          nombre: 'Cantidad 1',
          color: 'pink',
        },
        {
          id: 'cantidad_2',
          nombre: 'Cantidad 2',
          color: 'orange',
        },
      ]"
      :separacion="0.6"
      :alineacion_eje_y="'derecha'"
    />
    <SisdaiCajasBigotes
      :datos="datos_dinamicos"
      :variables="variables_dinamicas"
      :clave_categorias="'nombre_empresa'"
    />
  </SisdaiGraficas>
</template>
