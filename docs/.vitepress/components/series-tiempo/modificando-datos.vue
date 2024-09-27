<script setup>
import { ref, watch } from 'vue'
import numero_de_conglomerados from '../../assets/datos/numero_de_conglomerados.json'
const datos = ref(numero_de_conglomerados)
const variables = ref([
  {
    id: 'num_conglomerados_no_acum',
    nombre: 'No acumulado',
    color: '#B726FC',
  },
])

const visualizando = ref('num_conglomerados_no_acum')
watch(visualizando, nv => {
  if (nv === 'num_conglomerados_no_acum') {
    variables.value = [
      {
        id: 'num_conglomerados_no_acum',
        nombre: 'No acumulado',
        color: '#B726FC',
      },
    ]
  } else {
    variables.value = [
      {
        id: 'num_conglomerados_acum',
        nombre: 'Acumulado',
        color: '#7C38FB',
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
          class="boton-chico"
          @click="
            visualizando === 'num_conglomerados_no_acum'
              ? (visualizando = 'num_conglomerados_acum')
              : (visualizando = 'num_conglomerados_no_acum')
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
      :clave_fecha="'anio_mes'"
      :formato_temporal="'%Y-%m'"
    />
  </SisdaiGraficas>
</template>
