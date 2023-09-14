<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  variables: {
    type: Array,
    require: true,
    validator(value) {
      // debe tener: id, nombre_subcategoria, color
      const validado = value.some(
        ({ id, nombre_subcategoria, color }) =>
          id !== undefined ||
          nombre_subcategoria !== undefined ||
          color !== undefined
      )
      if (!validado) {
        console.error('El objeto no cumple con las especificaciones')
      }
      return validado
    },
  },
})

const variables_checkeadas = ref([...variables.value].map(d => d.id))
const variables_computadas = computed(() =>
  variables.value.filter(d => variables_checkeadas.value.includes(d.id))
)
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
        >{{ variable.nombre_subcategoria }}</label
      >
    </span>
  </div>
</template>
