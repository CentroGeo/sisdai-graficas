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
  <div>
    <input
      id="margenes"
      type="range"
      v-model="margen"
    />
    <label for="margenes">margen: {{ margen }}</label>
    <hr />
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

    <hr />
  </div>
</template>
