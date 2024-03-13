<script setup>
import { ref } from 'vue'
import datos_energia from '../../assets/datos/alluvial_balance_energia.json'

const datos = ref(datos_energia)
</script>
<template>
  <SisdaiGraficas
    :alto="800"
    :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
  >
    <SisdaiAlluvial
      :datos="datos"
      :variables="[
        { id: 'node0', color: '#999' },
        { id: 'node1', color: '#999' },
        { id: 'node2', color: '#999' },
        { id: 'node3', color: '#000000' },
        { id: 'node4', color: '#85200c' },
        { id: 'node5', color: '#f00' },
        { id: 'node6', color: '#4a86e8' },
        { id: 'node7', color: '#9900ff' },
        { id: 'node8', color: '#783f04' },
        { id: 'node9', color: '#0000ff' },
        { id: 'node10', color: '#0ff' },
        { id: 'node11', color: '#0ff' },
        { id: 'node12', color: '#6d9eeb' },
        { id: 'node13', color: '#ff0' },
        { id: 'node14', color: '#b45f06' },
        { id: 'node15', color: '#999' },
        { id: 'node16', color: '#999' },
        { id: 'node17', color: '#999' },
        { id: 'node18', color: '#999' },
        { id: 'node19', color: '#999' },
        { id: 'node20', color: '#999' },
        { id: 'node21', color: '#999' },
        { id: 'node22', color: '#999' },
        { id: 'node23', color: '#999' },
        { id: 'node24', color: '#999' },
        { id: 'node25', color: '#999' },
        { id: 'node26', color: '#999' },
        { id: 'node27', color: '#999' },
        { id: 'node28', color: '#999' },
        { id: 'node29', color: '#999' },
        { id: 'node30', color: '#cc4125' },
        { id: 'node31', color: '#000000' },
        { id: 'node32', color: '#666666' },
        { id: 'node33', color: '#999' },
        { id: 'node34', color: '#b7b7b7' },
        { id: 'node35', color: '#cccccc' },
        { id: 'node36', color: '#c9daf8' },
        { id: 'node37', color: '#6d9eeb' },
        { id: 'node38', color: '#ff00ff' },
        { id: 'node39', color: '#999' },
        { id: 'node40', color: '#00ff00' },
        { id: 'node41', color: '#00ff00' },
        {
          id: 'enlaces',
          color: 'purple',
        },
      ]"
    />
  </SisdaiGraficas>
</template>
