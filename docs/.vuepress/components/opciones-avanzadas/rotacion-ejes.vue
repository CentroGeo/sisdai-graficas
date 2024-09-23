<script setup>
import cajasbigotesejemplos from './cajas_bigotes_ejemplo_1.json'

import { ref } from 'vue'
const laGrafica = ref()
const cajasBigotes = ref()
const datos_dinamicos = ref(cajasbigotesejemplos)
const variables_dinamicas = ref({
  id: 'acciones_vendidas',
  nombre: 'Acciones vendidas',
  color: '#2c7fb8',
})
const angulo_x = ref(0)
const angulo_y = ref(0)
</script>

<template>
  <SisdaiGraficas
    ref="laGrafica"
    class="con-panel-encabezado-vis"
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
    :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
  >
    <template #panel-encabezado-vis>
      <div>
        <div>
          <p class="vis-titulo-visualizacion">
            Ejemplo rotacion de eje horizontal
          </p>
        </div>
        <label for="angulo-x">ángulo x: {{ angulo_x }}</label>

        <input
          id="angulo-x"
          type="range"
          v-model="angulo_x"
          min="-90"
          max="90"
          step="1"
        />
        <label for="angulo-y">ángulo y: {{ angulo_y }}</label>

        <input
          id="angulo-y"
          type="range"
          v-model="angulo_y"
          min="-90"
          max="90"
          step="1"
        />
      </div>
    </template>
    <SisdaiCajasBigotes
      :datos="datos_dinamicos"
      :variables="variables_dinamicas"
      :clave_categorias="'nombre_empresa'"
      :angulo_etiquetas_eje_x="parseInt(angulo_x)"
      :angulo_etiquetas_eje_y="parseInt(angulo_y)"
      ref="cajasBigotes"
    />
  </SisdaiGraficas>
</template>
