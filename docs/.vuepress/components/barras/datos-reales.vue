<script setup>
import { ref } from 'vue'
import data_apilada_seguridad from '../../assets/datos/vih_barras_seguridad.json'
const datos = ref(data_apilada_seguridad)
</script>
<template>
  <SisdaiGraficas
    :titulo_eje_y="'Cantidad de participantes'"
    :titulo_eje_x="'Género'"
    :margenes="{ arriba: 10, abajo: 50, derecha: 30, izquierda: 40 }"
  >
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">
          Seguridad social con respecto al género
        </p>
        <p class="vis-fecha-actualizacion">Última Actualización: 07/02/2023</p>
      </div>
    </template>
    <SisdaiBarras
      :datos="datos"
      :variables="[
        { id: 'Sin_seguridad', nombre: 'No', color: '#000000' },
        { id: 'Con_seguridad', nombre: 'Sí', color: '#646464' },
        { id: 'Desconoce', nombre: 'No sabe', color: '#632680' },
        { id: 'Sin_informacion', nombre: 'Sin dato', color: '#B726FC' },
      ]"
      clave_categorias="nombre"
      :angulo_etiquetas_eje_x="-30"
    />
  </SisdaiGraficas>
</template>
