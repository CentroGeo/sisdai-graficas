<script setup>
import { ref, watch } from 'vue'
import resistencia_contra_tiempo from '../../assets/datos/resistencia_contra_tiempo.json'
const datos = ref(resistencia_contra_tiempo)
const variables = ref([
  {
    id: 'total',
    nombre: 'Total',
    color: '#B726FC',
  },
])

const visualizando = ref('total')
watch(visualizando, nv => {
  if (nv == 'total') {
    variables.value = [
      {
        id: 'total',
        nombre: 'total',
        color: '#B726FC',
      },
    ]
  } else {
    variables.value = [
      {
        id: 'porcentaje',
        nombre: 'Porcentaje',
        color: '#000',
      },
    ]
  }
})
</script>
<template>
  <SisdaiGraficas
    class="con-panel-encabezado-vis"
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
    :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
  >
    <template #panel-encabezado-vis>
      <div>
        <button
          @click="
            visualizando == 'total'
              ? (visualizando = 'porcentaje')
              : (visualizando = 'total')
          "
        >
          Cambiar variable
        </button>
      </div>
    </template>
    <SisdaiSeriesTiempo
      :datos="datos"
      :variables="variables"
      :angulo_etiquetas_eje_x="-45"
      :clave_fecha="'fecha_toma'"
      :formato_temporal="'%Y-%m'"
    />
  </SisdaiGraficas>
</template>
