<script setup>
import { ref } from 'vue'
import lista_estados from './lista-estados.json'
const margen = ref(30)
const acomodo = ref('apiladas')
const cantidad_variables = ref(1)
const datos_dinamicos = ref([
  { categoria: 'aguascalientes', cantidad_1: 100, cantidad_2: 100 },
  { categoria: 'baja_cal', cantidad_1: 80, cantidad_2: 100 },
  { categoria: 'baja_cal_sur', cantidad_1: 20, cantidad_2: 100 },
  { categoria: 'zacatecas', cantidad_1: 20, cantidad_2: 100 },
])
const variables_dinamicas = ref([
  { id: 'cantidad_1', nombre: '$ pesos 1', color: 'red' },
  { id: 'cantidad_2', nombre: '$ pesos 2', color: 'blue' },
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
        nombre: '$ pesos 1',
        color: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
      },
      {
        id: 'cantidad_2',
        nombre: '$ pesos 2',
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
        nombre: '$ pesos 1',
        color: `rgb(${Math.random() * 255},${Math.random() * 255},${
          Math.random() * 255
        })`,
      },
    ]
  }
}
</script>

<template>
  <SisdaiGraficas
    class="con-panel-encabezado-vis"
    :margenes="{
      arriba: Number(margen),
      abajo: Number(margen),
      derecha: Number(margen),
      izquierda: Number(margen),
    }"
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
  >
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">
          Ejemplo con propiedades dinámicas
        </p>
        <p class="vis-instruccional">
          Usa el <i>slider</i> para modificar los márgenes, y los botones para
          modificar los datos aleatoriamente, para modificar las variables que
          se visualizan o para cambiar la disposición de las barras
        </p>

        <div class="m-b-3 p-x-minimo">
          <label for="margenes">margen: {{ margen }}</label>

          <input
            id="margenes"
            type="range"
            v-model="margen"
          />
        </div>
        <button
          class="boton-chico m-b-1"
          @click="modificandoDatos"
        >
          Modifica datos
        </button>
        <button
          class="boton-chico m-b-1"
          @click="modificandoVariables"
        >
          Modifica variables
        </button>
        <button
          class="boton-chico m-b-1"
          @click="
            acomodo == 'apiladas'
              ? (acomodo = 'agrupadas')
              : (acomodo = 'apiladas')
          "
        >
          {{ acomodo == 'apiladas' ? 'Agrupar' : 'Apilar' }}
        </button>
      </div>
    </template>
    <SisdaiBarras
      :datos="datos_dinamicos"
      :variables="variables_dinamicas"
      :acomodo="acomodo"
    />
  </SisdaiGraficas>
</template>
