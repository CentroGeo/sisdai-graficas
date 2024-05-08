<script setup>
import { computed, ref, watch } from 'vue'
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

watch(
  () => props.variables,
  nv => {
    variables_checkeadas.value = [...nv].map(d => d.id)
  }
)
const variables_activas = computed(() => {
  let vars_activas = props.variables.filter(d =>
    variables_checkeadas.value.includes(d.id)
  )
  if (vars_activas.length === 0) {
    vars_activas = [...props.variables]
  }
  return vars_activas
})
defineExpose({ variables_activas })
</script>
<template>
  <div>
    <span
      class="controlador-vis"
      v-for="variable in variables"
      :key="variable.id"
    >
      <input
        :id="variable.id"
        type="checkbox"
        :value="variable.id"
        v-model="variables_checkeadas"
        :disabled="
          variables_checkeadas.length === 1 &&
          variable.id == variables_checkeadas[0]
        "
      />
      <label
        class="nombre-variable"
        :for="variable.id"
        ><span
          class="figura-variable"
          :style="{ background: variable.color }"
        ></span>
        <span class="nombre-variable">
          {{ variable.nombre }}
        </span></label
      >
    </span>
  </div>
</template>
