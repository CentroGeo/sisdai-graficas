<script setup>
import { ref } from 'vue'
import cajasbigotesejemplos1 from '../../assets/datos/cajas_bigotes_ejemplo_1.json'
import cajasbigotesejemplos2 from '../../assets/datos/cajas_bigotes_ejemplo_2.json'
const base = ref(1)
const datos_dinamicos = ref(cajasbigotesejemplos1)
const variables_dinamicas = ref({
  id: 'acciones_vendidas',
  nombre: 'Acciones vendidas',
  color: 'red',
})
function alternaDatos() {
  if (base.value == 1) {
    variables_dinamicas.value = {
      id: 'metrica',
      nombre: 'Metrica',
      color: '#2c7fb8',
    }
    datos_dinamicos.value = cajasbigotesejemplos2

    base.value = 2
  } else {
    variables_dinamicas.value = {
      id: 'acciones_vendidas',
      nombre: 'Acciones vendidas',
      color: 'red',
    }
    datos_dinamicos.value = cajasbigotesejemplos1

    base.value = 1
  }
}
</script>

<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
    class="con-panel-encabezado-vis"
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
    <SisdaiCajasBigotes
      :datos="datos_dinamicos"
      :variables="variables_dinamicas"
      :clave_categorias="base == 1 ? 'nombre_empresa' : 'nombre_categoria'"
    />
  </SisdaiGraficas>
</template>
