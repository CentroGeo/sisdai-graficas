<script setup>
import cajasbigotesejemplos from './cajas_bigotes_ejemplo_1.json'

import { onMounted, ref, watch } from 'vue'
const laGrafica = ref()
const cajasBigotes = ref()
const datos_dinamicos = ref(cajasbigotesejemplos)
const variables_dinamicas = ref({
  id: 'acciones_vendidas',
  nombre: 'Acciones vendidas',
  color: '#2c7fb8',
})
const rect_fondo_1 = ref(),
  rect_fondo_2 = ref(),
  linea_frente = ref()
onMounted(() => {
  // Usamos los métodos heredados de select en d3 como el .append
  rect_fondo_1.value = laGrafica.value.grupoFondo.append('rect')
  rect_fondo_2.value = laGrafica.value.grupoFondo.append('rect')
  linea_frente.value = laGrafica.value.grupoFrente.append('line')
})
watch(
  () => cajasBigotes.value?.escalaLineal,
  nv => {
    if (nv.range()[0] > 0) {
      rect_fondo_1.value
        .attr('width', cajasBigotes.value.escalaBanda.range()[1])
        .attr('height', nv(0) - nv(500))
        .attr('y', nv(500))
        .style('fill', 'rgba(80,200,80,.5)')
      rect_fondo_2.value
        .attr('width', cajasBigotes.value.escalaBanda.range()[1])
        .attr('height', nv(500) - nv(nv.domain()[1]))
        .attr('y', nv(nv.domain()[1]))
        .style('fill', 'rgba(200,80,80,.5)')
      linea_frente.value
        .attr('x1', 0)
        .attr('y1', nv(250))
        .attr('x2', cajasBigotes.value.escalaBanda.range()[1])
        .attr('y2', nv(250))
        .style('stroke', 'black')
        .style('stroke-dasharray', '3 3')
        .style('stroke-width', '3px')
    }
  }
)
</script>

<template>
  <div
    class="contenedor-vis borde-redondeado-8 con-panel-pie-vis con-panel-encabezado-vis"
  >
    <div class="panel-encabezado-vis">
      <div>
        <p class="vis-titulo-visualizacion">
          Ejemplo con elementos de fondo y de frente
        </p>
      </div>
    </div>
    <SisdaiGraficas
      ref="laGrafica"
      :titulo_eje_y="'título del eje y'"
      :titulo_eje_x="'título del eje x'"
      :margenes="{ arriba: 30, abajo: 20, derecha: 30, izquierda: 40 }"
    >
      <SisdaiCajasBigotes
        :datos="datos_dinamicos"
        :variables="variables_dinamicas"
        :clave_categorias="'nombre_empresa'"
        ref="cajasBigotes"
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
