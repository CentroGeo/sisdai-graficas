<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  variables: {
    type: Array,
    require: true,
    validator(value) {
      // debe tener: id, nombre, color
      const validado = value.some(
        ({ id, nombre, color }) =>
          id !== undefined || nombre !== undefined || color !== undefined
      )
      if (!validado) {
        console.error('El objeto no cumple con las especificaciones')
      }
      return validado
    },
  },
})

const variables_checkeadas = ref([...props.variables].map(d => d.id))
const variables_activas = computed(() =>
  props.variables.filter(d => variables_checkeadas.value.includes(d.id))
)
defineExpose({ variables_activas })
</script>
<template>
  <div class="contenedor-nomenclatura">
    <span
      class="vis-nomenclatura"
      v-for="variable in variables"
      :key="variable.id"
    >
      <span
        class="figura-variable"
        :style="{ background: variable.color }"
      ></span>
      <span :for="variable.id">{{ variable.nombre }}</span>
    </span>
  </div>
</template>
<style>
.contenedor-nomenclatura {
  margin-bottom: -8px;
}
</style>
