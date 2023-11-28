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
  <div>
    <span
      class="controlador-vis"
      v-for="variable in variables"
      :key="variable.id"
    >
      <span
        class="figura-variable"
        :style="{ background: variable.color }"
      ></span>
      <input
        :id="variable.id"
        type="checkbox"
        :value="variable.id"
        v-model="variables_checkeadas"
      />
      <label
        class="nombre-variable"
        :for="variable.id"
        >{{ variable.nombre }}</label
      >
    </span>
  </div>
</template>
