<script setup>
import { ref, watch } from 'vue'
import datos_donas_1 from '../../assets/datos/donas_1.json'
import datos_donas_2 from '../../assets/datos/donas_2.json'
import datos_donas_3 from '../../assets/datos/donas_3.json'
datos_donas_2
datos_donas_3
const contador = ref(0)
const variables_1 = [
  { id: 'Variable A', color: '#FFCE00', nombre: 'Var A' },
  { id: 'Variable B', color: '#FA5600', nombre: 'Var B' },
  { id: 'Variable C', color: '#C7690D', nombre: 'Var C' },
  { id: 'Variable D', color: '#FF9F4D', nombre: 'Var D' },
  { id: 'Variable E', color: '#FFAC99', nombre: 'Var E' },
]
const variables_2 = [
  { id: 'Categoría A', color: '#253494', nombre: 'cat A' },
  { id: 'Categoría B', color: '#2c7fb8', nombre: 'cat B' },
  { id: 'Categoría C', color: '#41b6c4', nombre: 'cat C' },
  { id: 'Categoría D', color: '#7fcdbb', nombre: 'cat D' },
]
const variables_3 = [
  { id: 'Categoría 1', color: '#FFCE00', nombre: 'Var 1' },
  { id: 'Categoría 2', color: '#FA5600', nombre: 'Var 2' },
  { id: 'Categoría 3', color: '#C7690D', nombre: 'Var 3' },
]
const variablesCheckeadas = ref()

const datos = ref(datos_donas_1)
const variables = ref(variables_1)
watch(contador, nv => {
  if (nv == 0) {
    datos.value = datos_donas_1

    variables.value = variables_1
  } else if (nv == 1) {
    datos.value = datos_donas_2

    variables.value = variables_2
  } else {
    datos.value = datos_donas_3
    variables.value = variables_3
  }
})
</script>
<template>
  <SisdaiGraficas
    :margenes="{ arriba: 10, abajo: 10, derecha: 10, izquierda: 10 }"
  >
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">Ejemplo de donas</p>
        <button
          class="boton-chico"
          @click="contador = (contador + 1) % 3"
        >
          Cambia datos y variables
        </button>
      </div>
    </template>
    <SisdaiDona
      :datos="datos"
      :variables="
        variablesCheckeadas?.variables_activas
          ? variablesCheckeadas.variables_activas
          : variables
      "
    />
    <template #panel-pie-vis>
      <div>
        <div class="vis-titulo-leyenda">Leyenda</div>
        <SisdaiChecks
          ref="variablesCheckeadas"
          :variables="variables"
        ></SisdaiChecks>
      </div>
    </template>
  </SisdaiGraficas>
</template>
