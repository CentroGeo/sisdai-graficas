<template>
  <div>
    <button @click="cambiarDatos">Cambiar datos</button>
    <SisdaiBarrasPrueba :barras_id="'verticales_simples'" :datos="datos" :nombre_barra="'categoria'"
      :nombre_color="'nombre_colores'" titulo_eje_x="Eje horizontal (categórico)" titulo_eje_y="Eje vertical (numérico)"
      :variables="variables" />
  </div>
</template>

<script setup>

import { ref } from "vue";
const datos = ref([{ categoria: 'Variable A', h: 120, m: 120 },
{ categoria: 'Variable B', h: 150, m: 30 },
{ categoria: 'Variable C', h: 72, m: 181 }]);

const variables = ref([{ id: 'h', nombre_colores: 'Hombres', color: '#7fcdbb' },
{ id: 'm', nombre_colores: 'Mujeres', color: '#7fcd01' }
])

function cambiarDatos(){
  datos.value = [...datos.value].map(d=>{return{
    h : parseInt(Math.random() *100),
    m : parseInt(Math.random() *100),
    categoria : d.categoria
  }})
}
</script>