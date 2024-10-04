<script setup>
import { ref } from 'vue'

const variables = ref([
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
  {
    id: 'cantidad_3',
    nombre: 'Cantidad 3',
    color: 'cyan',
  },
])
</script>

<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
    class="con-panel-encabezado-vis"
  >
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">Ejemplo con nomenclatura</p>
      </div>
    </template>
    <SisdaiBarras
      :datos="[
        {
          categoria: 'aguascalientes',
          cantidad_1: 100,
          cantidad_2: 100,
          cantidad_3: 60,
        },
        {
          categoria: 'baja_cal',
          cantidad_1: 80,
          cantidad_2: 100,
          cantidad_3: 60,
        },
        {
          categoria: 'baja_cal_sur',
          cantidad_1: 20,
          cantidad_2: 50,
          cantidad_3: 60,
        },
        {
          categoria: 'zacatecas',
          cantidad_1: 20,
          cantidad_2: 100,
          cantidad_3: 60,
        },
      ]"
      :variables="variables"
    />
    <template #panel-pie-vis>
      <div>
        <div class="vis-titulo-leyenda">Leyenda</div>
        <SisdaiNomenclatura :variables="variables"></SisdaiNomenclatura>
      </div>
    </template>
  </SisdaiGraficas>
</template>
