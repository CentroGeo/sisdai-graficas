<script setup>
import { ref } from 'vue'
const lasBarras = ref()
const variablesCheckeadas = ref()

const variables = ref([
  { id: 'hasta_45', nombre: 'Hata 45 años', color: '#1BB584' },
  { id: 'de_46_60', nombre: 'De 46 a 60 años', color: '#409FFF' },
  { id: 'mas_de_60', nombre: 'Más de 60 años', color: '#6D6DFC' },
])
</script>
<template>
  <SisdaiGraficas
    :titulo_eje_y="'Título de eje Y'"
    :titulo_eje_x="'Título de eje X'"
    :margenes="{ arriba: 10, abajo: 50, derecha: 30, izquierda: 45 }"
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
      <SisdaiGraficasGloboInfo :ancho="230">
        <p>
          <b> {{ lasBarras?.datos_hover?.categoria }} </b><br />
          <span
            class="globo-informacion-punto-color"
            :style="{
              background: '#1BB584',
            }"
          ></span>
          <b> Hasta 45 años</b>:
          {{ lasBarras?.datos_hover?.hasta_45.toLocaleString('en') }}
          <br />
          <span
            class="globo-informacion-punto-color"
            :style="{
              background: '#409FFF',
            }"
          ></span>
          <b> De 46 a 60 años</b>:
          {{ lasBarras?.datos_hover?.de_46_60.toLocaleString('en') }} <br />
          <span
            class="globo-informacion-punto-color"
            :style="{
              background: '#6D6DFC',
            }"
          ></span>
          <b> Más de 60 años</b>:
          {{ lasBarras?.datos_hover?.mas_de_60.toLocaleString('en') }}
        </p>
      </SisdaiGraficasGloboInfo>
    </template>
    <SisdaiBarras
      ref="lasBarras"
      :datos="[
        {
          hasta_45: 10000,
          de_46_60: 4500,
          mas_de_60: 2700,
          categoria: 'Candidatas',
        },
        {
          hasta_45: 9200,
          de_46_60: 4400,
          mas_de_60: 2600,
          categoria: 'Nivel 1',
        },
        {
          hasta_45: 9100,
          de_46_60: 4300,
          mas_de_60: 2500,
          categoria: 'Nivel 2',
        },
        {
          hasta_45: 9000,
          de_46_60: 4200,
          mas_de_60: 2400,
          categoria: 'Nivel 3',
        },
        {
          hasta_45: 8900,
          de_46_60: 4100,
          mas_de_60: 2300,
          categoria: 'Eméritas',
        },
      ]"
      :variables="
        variablesCheckeadas ? variablesCheckeadas.variables_activas : variables
      "
      :acomodo="'agrupadas'"
      :angulo_etiquetas_eje_x="-30"
      :nombre_indice="'categoria'"
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
