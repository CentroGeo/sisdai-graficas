<script setup>
import { ref } from 'vue'
const variablesCheckeadas = ref()

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
  <div
    class="contenedor-vis borde-redondeado-8 con-panel-encabezado-vis con-panel-pie-vis"
  >
    <div class="panel-encabezado-vis">
      <div>
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
        :variables="
          variablesCheckeadas
            ? variablesCheckeadas.variables_activas
            : variables
        "
      />
    </SisdaiGraficas>
    <div class="panel-pie-vis">
      <SisdaiChecks
        :variables="variables"
        ref="variablesCheckeadas"
      ></SisdaiChecks>
      <hr />
    </div>
    <div class="contenedor-vis-atribuciones">
      <a
        class="logo-conacyt"
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
