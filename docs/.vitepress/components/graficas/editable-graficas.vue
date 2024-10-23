<script setup>
import { onMounted, ref } from 'vue'
const margen = ref(30)
const sisdaiGraficaEditable = ref(null)
onMounted(() => {
  // Los métodos de grupoFondo y grupoFrente son heredados de d3
  sisdaiGraficaEditable.value.grupoFondo
    .append('circle')
    .attr('cx', 10)
    .attr('cy', 10)
    .attr('r', 20)
    .style('fill', 'cyan')
    .style('fill-opacity', '.8')
  sisdaiGraficaEditable.value.grupoFrente
    .append('circle')
    .attr('cx', 30)
    .attr('cy', 10)
    .attr('r', 20)
    .style('fill', 'magenta')
    .style('fill-opacity', '.8')
})
</script>

<template>
  <SisdaiGraficas
    class="con-panel-encabezado-vis"
    ref="sisdaiGraficaEditable"
    :margenes="{
      arriba: Number(margen),
      abajo: Number(margen),
      derecha: Number(margen),
      izquierda: Number(margen),
    }"
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
  >
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">Titulo de visualizacion</p>
        <p class="vis-instruccional">
          Modifica el margen para ver su efecto en el componente{{
            sisdaiGraficaEditable?.grafica()._grupoVis
          }}
        </p>
        <label for="margenes">margen: {{ margen }}</label>
        <input
          id="margenes"
          type="range"
          v-model="margen"
        />
      </div>
    </template>
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo :ancho="180">
        <p>Soy un globo de información :P</p>
      </SisdaiGraficasGloboInfo>
    </template>
    <rect
      fill="rgba(0,0,0,.5)"
      :x="margen"
      :y="margen"
      :height="sisdaiGraficaEditable?.grafica()._grupoVis.alto"
      :width="sisdaiGraficaEditable?.grafica()._grupoVis.ancho"
    ></rect>
    <template #panel-pie-vis>
      <div>
        <p class="vis-instruccional">
          Se están agregando elementos al grupoFondo y grupoFrente, además se
          agregó el slot de globo-informacion
        </p>
      </div>
    </template>
  </SisdaiGraficas>
</template>
