<script setup>
import { ref } from 'vue'

const margen = ref(30)
</script>

<template>
  <div>
    <input
      id="margenes"
      type="range"
      v-model="margen"
    />
    <label for="margenes">margen: {{ margen }}</label>
    <hr />
    <SisdaiGraficas
      :margenes="{
        arriba: Number(margen),
        abajo: Number(margen),
        derecha: Number(margen),
        izquierda: Number(margen),
      }"
    >
      <SisdaiBarras
        :datos="[
          { categoria: 'aguascalientes', cantidad_1: 100, cantidad_2: 100 },
          { categoria: 'baja_cal', cantidad_1: 80, cantidad_2: 100 },
          { categoria: 'baja_cal_sur', cantidad_1: 20, cantidad_2: 100 },
          { categoria: 'zacatecas', cantidad_1: 20, cantidad_2: 100 },
        ]"
        :variables="[
          { id: 'cantidad_1', nombre_subcategoria: '$ pesos 1', color: 'red' },
          { id: 'cantidad_2', nombre_subcategoria: '$ pesos 2', color: 'blue' },
        ]"
      />
    </SisdaiGraficas>

    <hr />

    <SisdaiGraficas>
      <SisdaiBarras
        :datos="[
          { categoria: 'aguascalientes', cantidad: 100 },
          { categoria: 'baja_cal', cantidad: 80 },
          { categoria: 'baja_cal_sur', cantidad: 20 },
          { categoria: 'zacatecas', cantidad: 20 },
        ]"
        :variables="[
          { id: 'cantidad', nombre_subcategoria: '$ pesos', color: 'red' },
        ]"
      />
    </SisdaiGraficas>
  </div>
</template>
