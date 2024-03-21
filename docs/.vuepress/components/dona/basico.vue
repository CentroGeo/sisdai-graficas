<template>
  <SisdaiGraficas :margenes="{ arriba: 0, abajo: 0, derecha: 0, izquierda: 0 }">
    <SisdaiDona
      :datos="[
        { categoria: 'Variable A', cantidad: 100 },
        { categoria: 'Variable B', cantidad: 120 },
        { categoria: 'Variable C', cantidad: 60 },
        { categoria: 'Variable D', cantidad: 50 },
        { categoria: 'Variable E', cantidad: 40 },
      ]"
      :variables="[
        { id: 'Variable A', nombre: 'Variable A', color: '#253494' },
        { id: 'Variable B', nombre: 'Variable B', color: '#2c7fb8' },
        { id: 'Variable C', nombre: 'Variable C', color: '#41b6c4' },
        { id: 'Variable D', nombre: 'Variable D', color: '#7fcdbb' },
        { id: 'Variable E', nombre: 'Variable E', color: '#c7e9b4' },
      ]"
    />
  </SisdaiGraficas>
</template>
