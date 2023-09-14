<script setup>
import { computed, ref } from 'vue'
const variables_completas = ref([
  {
    id: 'cantidad_1',
    nombre_subcategoria: 'Cantidad 1',
    color: 'pink',
  },
  {
    id: 'cantidad_2',
    nombre_subcategoria: 'Cantidad 2',
    color: 'orange',
  },
  {
    id: 'cantidad_3',
    nombre_subcategoria: 'Cantidad 3',
    color: 'cyan',
  },
])
const variables_checkeadas = ref([...variables_completas.value].map(d => d.id))
const variables = computed(() =>
  variables_completas.value.filter(d =>
    variables_checkeadas.value.includes(d.id)
  )
)
</script>

<template>
  <div
    class="contenedor-vis borde-redondeado-8 con-panel-encabezado-vis con-panel-pie-vis"
  >
    <div class="panel-encabezado-vis">
      <div class="p-x-2">
        <p class="vis-titulo-visualizacion">Ejemplo con checks</p>
      </div>
    </div>
    <SisdaiGraficas
      :titulo_eje_y="'título del eje y'"
      :titulo_eje_x="'título del eje x'"
    >
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
    </SisdaiGraficas>
    <div class="panel-pie-vis p-x-2 p-y-1">
      <span
        class="controlador-vis"
        v-for="variable in variables_completas"
        :key="variable.id"
      >
        <span
          class="figura-variable"
          :style="{ background: variable.color }"
        ></span>
        <input
          :id="variable.id"
          type="checkbox"
          :value="variable.id"
          v-model="variables_checkeadas"
        />
        <label
          class="nombre-variable"
          :for="variable.id"
          >{{ variable.nombre_subcategoria }}</label
        >
      </span>
      <hr class="p-x-2" />
    </div>
    <div class="boton boton-conahcyt-vis">
      <a
        href="https://conahcyt.mx"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://conahcyt.mx/wp-content/uploads/2021/10/logo_conacyt_con_sintagma_azul_completo.svg"
          alt="Conahcyt"
        />
      </a>

      <a
        href="https://sisdai.conahcyt.mx/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sisdai
      </a>
    </div>
  </div>
</template>
