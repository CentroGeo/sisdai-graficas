<script setup>
import cajasbigotesejemplos from '../../assets/datos/cajas_bigotes_ejemplo_1.json'

import { ref } from 'vue'
const datos_dinamicos = ref(cajasbigotesejemplos)
const variables_dinamicas = ref({
  id: 'acciones_vendidas',
  nombre: 'Acciones vendidas',
  color: '#2c7fb8',
})
const lasCajasBigotes = ref()
</script>

<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
  >
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo :ancho="200">
        <p>
          <b>{{ lasCajasBigotes?.datos_hover?.categoria }}</b
          ><br />
          Bigote superior: {{ lasCajasBigotes?.datos_hover?.max }}<br />
          Tercer cuartil: {{ lasCajasBigotes?.datos_hover?.q3 }}<br />
          Promedio:
          {{ lasCajasBigotes?.datos_hover?.promedio.toLocaleString('en')
          }}<br />
          Mediana: {{ lasCajasBigotes?.datos_hover?.mediana }}<br />
          Primer cuartil: {{ lasCajasBigotes?.datos_hover?.q1 }}<br />
          Bigote inferior: {{ lasCajasBigotes?.datos_hover?.min }}<br />
        </p>
      </SisdaiGraficasGloboInfo>
    </template>
    <SisdaiCajasBigotes
      ref="lasCajasBigotes"
      :datos="datos_dinamicos"
      :variables="variables_dinamicas"
      :clave_categorias="'nombre_empresa'"
    />
  </SisdaiGraficas>
</template>
