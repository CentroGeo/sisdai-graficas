<script setup>
import { ref } from 'vue'
const elAlluvial = ref()
</script>
<template>
  <SisdaiGraficas
    :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
  >
    <template #panel-encabezado-vis>
      <p class="vis-titulo-visualizacion">Ejemplo básico</p>
    </template>
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo :ancho="180">
        <p v-if="elAlluvial?.datos_hover?.tipo == 'nodo'">
          {{ elAlluvial?.datos_hover?.name }} <br />
          Valor: {{ elAlluvial?.datos_hover?.value }}
        </p>
        <p v-else-if="elAlluvial?.datos_hover?.tipo == 'enlace'">
          {{ elAlluvial?.datos_hover?.source?.name }} →
          {{ elAlluvial?.datos_hover?.target?.name }}<br />
          Valor: {{ elAlluvial?.datos_hover?.value }}
        </p>
      </SisdaiGraficasGloboInfo>
    </template>
    <SisdaiAlluvial
      ref="elAlluvial"
      :datos="{
        nodos: [
          { name: 'Nodo 0', id: 'nodo0' },
          { name: 'Nodo 1', id: 'nodo1' },
          { name: 'Nodo 2', id: 'nodo2' },
        ],
        enlaces: [
          { source: 'Nodo 0', target: 'Nodo 2', value: 1 },
          { source: 'Nodo 1', target: 'Nodo 2', value: 1 },
        ],
      }"
      :variables="[
        { id: 'nodo0', color: '#2c7fb8' },
        { id: 'nodo1', color: '#2c7fb8' },
        { id: 'nodo2', color: '#2c7fb8' },
        {
          id: 'enlaces',
          color: '#2c7fb8',
        },
      ]"
    />
  </SisdaiGraficas>
</template>
