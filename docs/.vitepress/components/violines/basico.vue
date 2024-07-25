<script setup>
import violin_seguridad_social_edad from '../../assets/datos/violin_seguridad_social_edad.json'

import { ref } from 'vue'
const datos = ref(violin_seguridad_social_edad)
</script>

<template>
  <SisdaiGraficas
    :titulo_eje_y="'Edad'"
    :titulo_eje_x="'Seguridad social'"
  >
    <SisdaiViolines
      :datos="datos"
      :variables="{
        id: 'edad',
        nombre: 'Edad',
        color: '#2c7fb8',
      }"
      :clave_categorias="'seguridad_social'"
    />
  </SisdaiGraficas>
</template>
