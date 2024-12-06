<script setup>
import { computed, ref } from 'vue'
import datos_consorcio from '../../assets/datos/consorcio_variantes_todas.json'
const lasAreasApiladas = ref()
const datos = ref(datos_consorcio)
const variables = ref([
  { id: 'Omicron', color: '#FFCE00', nombre: 'Omicron' },
  { id: 'Delta', color: '#FA5600', nombre: 'Delta' },
  { id: 'Gamma', color: '#C7690D', nombre: 'Gamma' },
  { id: 'Beta', color: '#FF9F4D', nombre: 'Beta' },
  { id: 'Alpha', color: '#FFAC99', nombre: 'Alpha' },
  { id: 'Mu', color: '#29037B', nombre: 'Mu' },
  { id: 'Lambda', color: '#A359D9', nombre: 'Lambda' },
  {
    id: 'variantes_restantes',
    color: '#bcbcbc',
    nombre: 'Variantes restantes',
  },
])
const variablesCheckeadas = ref()
const variablesDinamicas = computed(() =>
  variablesCheckeadas.value
    ? variablesCheckeadas.value?.variables_activas
    : variables.value
)
</script>
<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
    :margenes="{ arriba: 10, abajo: 40, derecha: 30, izquierda: 40 }"
  >
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo :ancho="200">
        <p>{{ lasAreasApiladas?.datos_hover?.fecha_1 }}</p>
        <p>
          <span
            v-for="(variable, i) in variablesDinamicas"
            :key="i"
          >
            <span
              class="globo-informacion-punto-color"
              :style="{ background: variable.color }"
            ></span>
            {{ variable.nombre }}:
            {{ lasAreasApiladas?.datos_hover?.[variable.id] }}
            <br />
          </span>
        </p>
      </SisdaiGraficasGloboInfo>
    </template>
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">
          Evolución de variantes del virus SARS-CoV-2
        </p>
        <p class="vis-fecha-actualizacion">Última actualización: 14/05/2023</p>
      </div>
    </template>
    <SisdaiAreasApiladas
      ref="lasAreasApiladas"
      :datos="datos"
      :variables="variablesDinamicas"
      :angulo_etiquetas_eje_x="-45"
      :nombre_indice="'fecha_2'"
      :formato_temporal="'%d/%m/%Y'"
      :tabla_caption="'Datos muestras de variantes del virus SARS-CoV-2 tomadas por semana epidemiológica'"
    />
    <template #panel-pie-vis>
      <div>
        <div class="vis-titulo-leyenda">Variantes del virus SARS-CoV-2</div>
        <SisdaiChecks
          ref="variablesCheckeadas"
          :variables="variables"
        ></SisdaiChecks>
      </div>
    </template>
  </SisdaiGraficas>
</template>
