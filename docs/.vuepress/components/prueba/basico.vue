<script setup>
import { ref } from 'vue'
import lista_estados from './lista-estados.json'
const margen = ref(30)
const cantidad_variables = ref(1)
const datos_dinamicos = ref([
  { categoria: 'aguascalientes', cantidad_1: 100, cantidad_2: 100 },
  { categoria: 'baja_cal', cantidad_1: 80, cantidad_2: 100 },
  { categoria: 'baja_cal_sur', cantidad_1: 20, cantidad_2: 100 },
  { categoria: 'zacatecas', cantidad_1: 20, cantidad_2: 100 },
])
const variables_dinamicas = ref([
  { id: 'cantidad_1', nombre_subcategoria: '$ pesos 1', color: 'red' },
  { id: 'cantidad_2', nombre_subcategoria: '$ pesos 2', color: 'blue' },
])
function modificandoDatos() {
  let cantidad_datos = 2 + parseInt(17 * Math.random())
  let datum = []
  for (var i = 0; i < cantidad_datos; i++) {
    datum.push({
      categoria: lista_estados[i].nombre,
      cantidad_1: 100 * Math.random(),
      cantidad_2: 100 * Math.random(),
    })
  }
  datos_dinamicos.value = datum
}
function modificandoVariables() {
  if (cantidad_variables.value == 1) {
    cantidad_variables.value = 2
    variables_dinamicas.value = [
      {
        id: 'cantidad_1',
        nombre_subcategoria: '$ pesos 1',
        color: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
      },
      {
        id: 'cantidad_2',
        nombre_subcategoria: '$ pesos 2',
        color: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
      },
    ]
  } else {
    cantidad_variables.value = 1
    variables_dinamicas.value = [
      {
        id: 'cantidad_1',
        nombre_subcategoria: '$ pesos 1',
        color: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
      },
    ]
  }
}
</script>

<template>
  <div>
    <input
      id="margenes"
      type="range"
      v-model="margen"
    />
    <label for="margenes">margen: {{ margen }}</label>
    <button @click="modificandoDatos">Modifica datos</button>
    <button @click="modificandoVariables">Modifica variables</button>

    <hr />
    <SisdaiGraficas
      :margenes="{
        arriba: Number(margen),
        abajo: Number(margen),
        derecha: Number(margen),
        izquierda: Number(margen),
      }"
    >
      <SisdaiBarras
        :datos="datos_dinamicos"
        :variables="variables_dinamicas"
      />
    </SisdaiGraficas>

    <hr />

    <SisdaiGraficas>
      <SisdaiBarras
        :datos="[
          { categoria: 'aguascalientes', cantidad: 100 },
          { categoria: 'baja_cal', cantidad: 80 },
          { categoria: 'baja_cal_sur', cantidad: 20 },
          { categoria: 'zacatecas', cantidad: 20 },
        ]"
        :variables="[
          { id: 'cantidad', nombre_subcategoria: '$ pesos', color: 'red' },
        ]"
      />
    </SisdaiGraficas>
  </div>
</template>
