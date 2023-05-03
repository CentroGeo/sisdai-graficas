<script setup>
defineProps({
  datos: {
    type: Array,
    require: true,
  },

  variables: {
    type: Array,
    require: true,
    validator(value) {
      // debe tener: id, nombre_subcategoria, color

      const validado = value.some(({ id, nombre_subcategoria, color }) => {
        return (
          id !== undefined ||
          nombre_subcategoria !== undefined ||
          color !== undefined
        )
      })

      if (!validado) {
        console.error('El objeto no cumple con las especificaciones')
      }

      return validado
    },
  },
})
</script>

<template>
  <g>
    <circle r="10"></circle>
  </g>
</template>
