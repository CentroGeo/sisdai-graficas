<script setup>
import { ref } from 'vue'
import data_edos from './data_edos.json'
import diccionario_estados from './diccionario_estados.json'
diccionario_estados.forEach(
  d =>
    (d.color = `rgb(${220 * Math.random()},${220 * Math.random()},${
      220 * Math.random()
    })`)
)
const variables = ref(diccionario_estados)
variables
const datos = ref(data_edos)
</script>
<template>
  <div
    class="contenedor-vis borde-redondeado-8 con-panel-pie-vis con-panel-encabezado-vis"
  >
    <div class="panel-encabezado-vis"></div>
    <SisdaiGraficas
      :titulo_eje_y="'título del eje y'"
      :titulo_eje_x="'título del eje x'"
      :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
    >
      <SisdaiSeriesTiempo
        :datos="datos"
        :variables="variables"
        :clave_categorias="'fecha'"
        :angulo_etiquetas_eje_x="-45"
      />
    </SisdaiGraficas>
    <div class="panel-pie-vis">
      <hr />
    </div>
    <div class="contenedor-vis-atribuciones">
      <a
        class="logo-conacyt"
        href="https://conahcyt.mx"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://conahcyt.mx/wp-content/uploads/2021/10/logo_conacyt_con_sintagma_azul_completo.svg"
          alt="Conahcyt"
        />
      </a>

      <a
        href="https://sisdai.conahcyt.mx/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sisdai
      </a>
    </div>
  </div>
</template>
