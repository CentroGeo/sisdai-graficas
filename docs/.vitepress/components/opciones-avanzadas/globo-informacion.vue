<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
  >
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo :ancho="200">
        <p>
          <span
            class="globo-informacion-punto-color"
            style="background: pink"
          ></span>
          Cantidad 1: {{ lasBarras?.datos_hover?.cantidad_1 }}
          <br />
          <span
            class="globo-informacion-punto-color"
            style="background: orange"
          ></span>
          Cantidad 2: {{ lasBarras?.datos_hover?.cantidad_2 }}
        </p>
      </SisdaiGraficasGloboInfo>
    </template>
    <SisdaiBarras
      :datos="[
        { categoria: 'categoría 1', cantidad_1: 100, cantidad_2: 100 },
        { categoria: 'categoría 2', cantidad_1: 80, cantidad_2: 100 },
        { categoria: 'categoría 3', cantidad_1: 20, cantidad_2: 100 },
        { categoria: 'categoría 4', cantidad_1: 20, cantidad_2: 100 },
      ]"
      :variables="[
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
      ]"
      ref="lasBarras"
      :nombre_indice="'categoria'"
    />
    <template #panel-pie-vis>
      <div>
        <div class="vis-titulo-leyenda">Datos asociados al cursor:</div>
        <p>
          {{ lasBarras?.datos_hover }}
        </p>
      </div>
    </template>
  </SisdaiGraficas>
</template>
<script setup>
import { ref } from 'vue'
const lasBarras = ref()
</script>
