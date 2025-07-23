<script setup>
import { ref } from 'vue'
const lasBarras = ref()
const variablesCheckeadas = ref()

const variables = ref([
  { id: 'predeterminado_1', nombre: 'Predeterminado 1', color: '#96cf67' },
  { id: 'predeterminado_2', nombre: 'Predeterminado 2', color: '#4974F3' },
])
</script>
<template>
  <SisdaiGraficas
    :titulo_eje_y="'Título de eje Y'"
    :titulo_eje_x="'Título de eje X'"
    :margenes="{ arriba: 60, abajo: 20, derecha: 30, izquierda: 40 }"
  >
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">Título de visualización</p>
        <p class="vis-fecha-actualizacion">Ultima actualización: 14/05/2023</p>
        <p class="vis-instruccional">
          Descripción o texto instruccional. Pasa el cursor por encima de la
          gráfica para más información.
        </p>
      </div>
    </template>
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo :ancho="240">
        <p>
          {{ lasBarras?.datos_hover?.categoria }} <br />
          <span
            class="globo-informacion-punto-color"
            :style="{
              background: '#96cf67',
            }"
          ></span>
          <b> Predeterminado 1</b>:
          {{ lasBarras?.datos_hover?.predeterminado_1.toLocaleString('en') }}
          <br />
          <span
            class="globo-informacion-punto-color"
            :style="{
              background: '#4974F3',
            }"
          ></span>
          <b> Predeterminado 2</b>:
          {{ lasBarras?.datos_hover?.predeterminado_2.toLocaleString('en') }}
          <br />
        </p>
      </SisdaiGraficasGloboInfo>
    </template>
    <SisdaiBarras
      ref="lasBarras"
      :datos="[
        {
          predeterminado_1: 4500,
          predeterminado_2: 3700,
          categoria: '2018',
        },
        {
          predeterminado_1: 1000,
          predeterminado_2: 4400,
          categoria: '2019',
        },
        {
          predeterminado_1: 2100,
          predeterminado_2: 4300,
          categoria: '2020',
        },
        {
          predeterminado_1: 6000,
          predeterminado_2: 1200,
          categoria: '2021',
        },
        {
          predeterminado_1: 3000,
          predeterminado_2: 3000,
          categoria: '2022',
        },
      ]"
      :variables="
        variablesCheckeadas ? variablesCheckeadas.variables_activas : variables
      "
      :nombre_indice="'categoria'"
      :tabla_caption="'Datos de ejemplo'"
    />
    <template #panel-pie-vis>
      <div>
        <p class="vis-titulo-leyenda">Título de la leyenda</p>
        <SisdaiChecks
          ref="variablesCheckeadas"
          :variables="variables"
        ></SisdaiChecks>
      </div>
    </template>
  </SisdaiGraficas>
</template>
