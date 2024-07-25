<script setup>
import { ref } from 'vue'
import violin_resistencia_edad from '../../assets/datos/violin_resistencia_edad.json'
import violin_seguridad_social_edad from '../../assets/datos/violin_seguridad_social_edad.json'

const base = ref(1)
const datos_dinamicos = ref(violin_resistencia_edad)
const variables_dinamicas = ref({
  id: 'edad',
  nombre: 'Edad',
  color: 'purple',
})
function alternaDatos() {
  if (base.value == 1) {
    variables_dinamicas.value = {
      id: 'edad',
      nombre: 'Edad',
      color: '#2c7fb8',
    }
    datos_dinamicos.value = violin_seguridad_social_edad

    base.value = 2
  } else {
    variables_dinamicas.value = {
      id: 'edad',
      nombre: 'Edad',
      color: 'purple',
    }
    datos_dinamicos.value = violin_resistencia_edad

    base.value = 1
  }
}
</script>

<template>
  <SisdaiGraficas
    :titulo_eje_y="'Edad'"
    :titulo_eje_x="base == 1 ? 'Resistencia' : 'Seguridad social'"
    class="con-panel-encabezado-vis"
    :alto="200"
  >
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">Ejemplo con datos dinámicos</p>
        <p class="vis-instruccional">
          Da click en el botón para alternar la base de datos
        </p>
        <button
          @click="alternaDatos"
          class="boton-chico"
        >
          Alternar datos
        </button>
      </div>
    </template>
    <SisdaiViolines
      :datos="datos_dinamicos"
      :variables="variables_dinamicas"
      :clave_categorias="base == 1 ? 'resistencia' : 'seguridad_social'"
    />
  </SisdaiGraficas>
</template>
