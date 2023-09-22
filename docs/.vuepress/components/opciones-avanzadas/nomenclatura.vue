<script setup>
import { ref } from 'vue'

const variables = ref([
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
</script>

<template>
  <div
    class="contenedor-vis borde-redondeado-8 con-panel-encabezado-vis con-panel-pie-vis"
  >
    <div class="panel-encabezado-vis">
      <div>
        <p class="vis-titulo-visualizacion">Ejemplo con nomenclatura</p>
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
    <div class="panel-pie-vis">
      <div class="vis-titulo-leyenda">Leyenda</div>
      <SisdaiNomenclatura :variables="variables"></SisdaiNomenclatura>
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
