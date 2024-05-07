<script setup>
import { ref, watch } from 'vue'
const laDona = ref()
const lista_variables = [
  [{ id: 'Variable A', nombre: 'Variable A', color: '#a1c5ff' }],
  [
    { id: 'Variable A', nombre: 'Variable A', color: '#a1c5ff' },
    { id: 'Variable B', nombre: 'Variable B', color: '#5188e0' },
  ],
  [
    { id: 'Variable A', nombre: 'Variable A', color: '#a1c5ff' },
    { id: 'Variable B', nombre: 'Variable B', color: '#5188e0' },
    { id: 'Variable C', nombre: 'Variable C', color: '#51c96f' },
  ],
  [
    { id: 'Variable A', nombre: 'Variable A', color: '#a1c5ff' },
    { id: 'Variable B', nombre: 'Variable B', color: '#5188e0' },
    { id: 'Variable C', nombre: 'Variable C', color: '#51c96f' },
    { id: 'Variable D', nombre: 'Variable D', color: '#c9c351' },
  ],
  [
    { id: 'Variable A', nombre: 'Variable A', color: '#a1c5ff' },
    { id: 'Variable B', nombre: 'Variable B', color: '#5188e0' },
    { id: 'Variable C', nombre: 'Variable C', color: '#51c96f' },
    { id: 'Variable D', nombre: 'Variable D', color: '#c9c351' },
    { id: 'Variable E', nombre: 'Variable E', color: '#c951b3' },
  ],
]
const lista_datos = [
  [{ categoria: 'Variable A', cantidad: 100 }],
  [
    { categoria: 'Variable A', cantidad: 80 },
    { categoria: 'Variable B', cantidad: 20 },
  ],
  [
    { categoria: 'Variable A', cantidad: 50 },
    { categoria: 'Variable B', cantidad: 20 },
    { categoria: 'Variable C', cantidad: 30 },
  ],
  [
    { categoria: 'Variable A', cantidad: 40 },
    { categoria: 'Variable B', cantidad: 20 },
    { categoria: 'Variable C', cantidad: 30 },
    { categoria: 'Variable D', cantidad: 10 },
  ],
  [
    { categoria: 'Variable A', cantidad: 20 },
    { categoria: 'Variable B', cantidad: 20 },
    { categoria: 'Variable C', cantidad: 30 },
    { categoria: 'Variable D', cantidad: 10 },
    { categoria: 'Variable E', cantidad: 20 },
  ],
]
const variables = ref(lista_variables[0])
const datos = ref(lista_datos[0])
const miNarrativa = ref()
watch(
  d => miNarrativa.value?.seccion_visible,
  nv => {
    console.log(nv)
    if (nv === -1) {
      datos.value = lista_datos[0]
      variables.value = lista_variables[0]
    } else if (nv === 0) {
      datos.value = lista_datos[1]
      variables.value = lista_variables[1]
    } else if (nv === 1) {
      datos.value = lista_datos[2]
      variables.value = lista_variables[2]
    } else if (nv === 2) {
      datos.value = lista_datos[3]
      variables.value = lista_variables[3]
    } else if (nv === 3) {
      datos.value = lista_datos[4]
      variables.value = lista_variables[4]
    }
  }
)
</script>

<template>
  <SisdaiNarrativa ref="miNarrativa">
    <template #contenido-fondo-sticky>
      <SisdaiGraficas class="p-t-10">
        <template #globo-informacion>
          <SisdaiGraficasGloboInfo :ancho="200">
            <template>
              <div>
                <p>
                  <span
                    class="punto-color m-r-minimo"
                    :style="{
                      background: variables.filter(
                        d => d.id === laDona?.datos_hover?.categoria
                      )[0]?.color,
                    }"
                  ></span
                  >{{ laDona?.datos_hover?.categoria }}:
                  {{ laDona?.datos_hover?.cantidad }}
                </p>
              </div>
            </template>
          </SisdaiGraficasGloboInfo>
        </template>
        <SisdaiDona
          ref="laDona"
          :datos="datos"
          :variables="variables"
        />
        <template
          #panel-pie-vis
          v-if="miNarrativa?.seccion_visible == 3"
        >
          <SisdaiNomenclatura :variables="variables"></SisdaiNomenclatura>
        </template>
      </SisdaiGraficas>
    </template>
    <p
      class="vineta p-1 conahcyt-fondo-claro-1 contenedor ancho-lectura contenedor-izq borde-redondeado-4"
    >
      Viñeta 0
    </p>
    <div class="vineta p-1 conahcyt-fondo-claro-1">Viñeta 1</div>
    <div class="vineta p-1 conahcyt-fondo-claro-1">Viñeta 2</div>
    <div class="vineta p-1 conahcyt-fondo-claro-1">Viñeta 3</div>
  </SisdaiNarrativa>
</template>
<style scoped></style>
