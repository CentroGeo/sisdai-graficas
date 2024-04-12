<script setup>
import { ref } from 'vue'
const laDona = ref()
const variables = ref([
  { id: 'Variable A', nombre: 'Variable A', color: '#253494' },
  { id: 'Variable B', nombre: 'Variable B', color: '#2c7fb8' },
  { id: 'Variable C', nombre: 'Variable C', color: '#41b6c4' },
  { id: 'Variable D', nombre: 'Variable D', color: '#7fcdbb' },
  { id: 'Variable E', nombre: 'Variable E', color: '#c7e9b4' },
])
</script>
<template>
  <SisdaiGraficas :margenes="{ arriba: 0, abajo: 0, derecha: 0, izquierda: 0 }">
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
      :datos="[
        { categoria: 'Variable A', cantidad: 100 },
        { categoria: 'Variable B', cantidad: 120 },
        { categoria: 'Variable C', cantidad: 60 },
        { categoria: 'Variable D', cantidad: 50 },
        { categoria: 'Variable E', cantidad: 40 },
      ]"
      :variables="variables"
    />
  </SisdaiGraficas>
</template>
