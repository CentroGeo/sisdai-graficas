<script setup>
import { onMounted, ref, watch } from 'vue'
const margen = ref(30)
const sisdaiGraficaEditable = ref(null)
const ancho_rectangulo = ref()
const alto_rectangulo = ref()
watch(margen, () => {
  ancho_rectangulo.value = sisdaiGraficaEditable.value.grafica().grupoVis.ancho
  alto_rectangulo.value = sisdaiGraficaEditable.value.grafica().grupoVis.alto
})
watch(
  () => sisdaiGraficaEditable.value?.grafica()._ancho,
  () => {
    ancho_rectangulo.value =
      sisdaiGraficaEditable.value.grafica().grupoVis.ancho
    alto_rectangulo.value = sisdaiGraficaEditable.value.grafica().grupoVis.alto
  }
)
onMounted(() => {
  ancho_rectangulo.value = sisdaiGraficaEditable.value.grafica().grupoVis.ancho
  alto_rectangulo.value = sisdaiGraficaEditable.value.grafica().grupoVis.alto
})
</script>

<template>
  <div
    class="contenedor-vis borde-redondeado-8 con-panel-encabezado-vis con-panel-pie-vis"
  >
    <div class="panel-encabezado-vis">
      <p class="vis-titulo-visualizacion">Titulo de visualizacion</p>
      <p class="vis-instruccional">
        Modifica el margen para ver su efecto en el componente
      </p>
      <input
        id="margenes"
        type="range"
        v-model="margen"
      />
      <label for="margenes">margen: {{ margen }}</label>
    </div>

    <SisdaiGraficas
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
      <rect
        :x="margen"
        :y="margen"
        :height="alto_rectangulo"
        :width="ancho_rectangulo"
      ></rect>
    </SisdaiGraficas>
    <div class="panel-pie-vis">
      <p class="vis-leyenda">Leyenda al pie de gráfica</p>
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
