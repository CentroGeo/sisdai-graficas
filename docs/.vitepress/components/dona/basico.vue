<script setup>
import { ref } from 'vue'
const laDona = ref()
const variables = ref([
  { id: 'fut', nombre: 'Futbol', color: '#fb4c56' },
  { id: 'natacion', nombre: 'Natación', color: '#023b88' },
  { id: 'basquet', nombre: 'Básquetbol', color: '#19a7ac' },
  { id: 'ciclismo', nombre: 'Ciclismo', color: '#046b4f' },
  { id: 'box', nombre: 'Boxeo', color: '#f9af05' },
])
const laGrafica = ref()
</script>
<template>
  <SisdaiGraficas
    :margenes="{ arriba: 0, abajo: 0, derecha: 0, izquierda: 0 }"
    ref="laGrafica"
  >
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo :ancho="216">
        <p>
          <span
            class="globo-informacion-punto-color"
            :style="{
              background: variables.filter(
                d => d.id === laDona?.datos_hover?.categoria
              )[0]?.color,
            }"
          ></span
          >{{
            variables.filter(d => d.id === laDona?.datos_hover?.categoria)[0]
              ?.nombre
          }}: {{ laDona?.datos_hover?.cantidad }} |
          {{ laDona?.datos_hover?.porcentaje }} %
        </p>
      </SisdaiGraficasGloboInfo>
    </template>
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">
          Actividades deportivas realizadas por estudiantes de secundaria
        </p>
        <p class="vis-fecha-actualizacion">Última actualización: 14/05/2023</p>
        <p class="vis-instruccional">
          Se presentan las cinco actividades deportivas más practicadas por
          estudiantes de secundaria en su tiempo libre. Pasa el cursor por
          encima de cada segmento para conocer el detalle.
        </p>
      </div>
    </template>
    <SisdaiDona
      ref="laDona"
      :datos="[
        { categoria: 'fut', cantidad: 93 },
        { categoria: 'natacion', cantidad: 52 },
        { categoria: 'basquet', cantidad: 31 },
        { categoria: 'ciclismo', cantidad: 24 },
        { categoria: 'box', cantidad: 12 },
      ]"
      :variables="variables"
      :nombre_indice="'categoria'"
      :tabla_caption="'Datos de ejemplo de cuantas personas prefieren cada tipo de deporte'"
    />
    <template #panel-pie-vis>
      <div>
        <div v-if="laGrafica?.vistaActiva === 'grafica'">
          <p class="vis-titulo-leyenda">Actividades deportivas</p>
          <SisdaiNomenclatura :variables="variables"></SisdaiNomenclatura>
        </div>

        <p class="vis-fuente">
          Fuente: Los datos que se visualizan en este gráfico son hipotéticos
        </p>
      </div>
    </template>
  </SisdaiGraficas>
</template>
