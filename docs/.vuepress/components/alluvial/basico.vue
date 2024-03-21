<template>
  <SisdaiGraficas
    :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
  >
    <SisdaiAlluvial
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
