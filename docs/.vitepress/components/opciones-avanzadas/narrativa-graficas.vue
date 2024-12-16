<script setup>
import SisdaiNarrativa from '@centrogeomx/sisdai-componentes/src/componentes/narrativa/SisdaiNarrativa.vue'
import { ref, watch } from 'vue'
const laDona = ref()
const variables_visibles = ref([])

const variables = ref([
  { id: 'Variable A', nombre: 'Variable A', color: '#a1c5ff' },
  { id: 'Variable B', nombre: 'Variable B', color: '#5188e0' },
  { id: 'Variable C', nombre: 'Variable C', color: '#51c96f' },
  { id: 'Variable D', nombre: 'Variable D', color: '#c9c351' },
])
const miNarrativa = ref()
watch(
  () => miNarrativa.value?.seccion_visible,
  nv => {
    if (nv === -1) {
      variables_visibles.value = []
    } else if (nv === 0) {
      variables_visibles.value = ['Variable A']
    } else if (nv === 1) {
      variables_visibles.value = ['Variable A', 'Variable B']
    } else if (nv === 2) {
      variables_visibles.value = ['Variable A', 'Variable B', 'Variable C']
    } else if (nv === 3) {
      variables_visibles.value = [
        'Variable A',
        'Variable B',
        'Variable C',
        'Variable D',
      ]
    }
  }
)
</script>

<template>
  <SisdaiNarrativa ref="miNarrativa">
    <template #contenido-fondo-sticky>
      <SisdaiGraficas class="p-t-10">
        <SisdaiDona
          ref="laDona"
          :datos="[
            { categoria: 'Variable A', cantidad: 20 },
            { categoria: 'Variable B', cantidad: 20 },
            { categoria: 'Variable C', cantidad: 30 },
            { categoria: 'Variable D', cantidad: 10 },
          ]"
          :variables="variables"
          :variables_visibles="variables_visibles"
          :nombre_indice="'categoria'"
        />
        <template
          #panel-pie-vis
          v-if="miNarrativa?.seccion_visible === 3"
        >
          <SisdaiNomenclatura :variables="variables"></SisdaiNomenclatura>
        </template>
      </SisdaiGraficas>
    </template>
    <div class="vineta p-1 contenedor">
      <div class="contenedor-vineta contenedor alineacion-centrada">
        <p class="p-2 texto-centrado">Viñeta 0</p>
      </div>
    </div>
    <div class="vineta p-1 contenedor">
      <div class="contenedor-vineta contenedor alineacion-centrada">
        <p class="p-2 texto-centrado">Viñeta 1</p>
      </div>
    </div>
    <div class="vineta p-1 contenedor">
      <div class="contenedor-vineta contenedor alineacion-centrada">
        <p class="p-2 texto-centrado">Viñeta 2</p>
      </div>
    </div>
    <div class="vineta p-1 contenedor">
      <div class="contenedor-vineta contenedor alineacion-centrada">
        <p class="p-2 texto-centrado">Viñeta 3</p>
      </div>
    </div>
  </SisdaiNarrativa>
</template>
<style scoped>
.contenedor-vineta {
  background: var(--color-conahcyt-3);
  color: var(--color-conahcyt-0);

  max-width: 354px;
}
.vineta {
  position: absolute;
}
</style>
