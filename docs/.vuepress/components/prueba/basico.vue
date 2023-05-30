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
