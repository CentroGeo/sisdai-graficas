<script setup>
import { onMounted, onUnmounted, ref, shallowRef, toRefs, watch } from 'vue'
import usarRegistroGraficas from './../../composables/usarRegistroGraficas'
import { buscarIdContenedorHtmlSisdai } from './../../utils'

var idGrafica

const props = defineProps({
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
  clave_categorias: {
    type: String,
    default: 'categoria',
  },
})

const sisdaiBarras = shallowRef()
// const { datos, clave_categorias } =
toRefs(props)

const margenesSvg = ref({})
const anchoSvg = ref(0)
watch(anchoSvg, nv => {
  console.log('anchoSvg', nv)
})

onMounted(() => {
  console.log('SisdaiBarras', sisdaiBarras)
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiBarras.value)

  // console.log(usarRegistroGraficas().grafica(idGrafica))

  const { ancho, margenes } = usarRegistroGraficas().grafica(idGrafica)

  anchoSvg.value = ancho
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).ancho,
    nv => (anchoSvg.value = nv)
  )

  margenesSvg.value = margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).margenes,
    nv => (margenesSvg.value = nv)
  )
})

onUnmounted(() => {})
</script>

<template>
  <g
    ref="sisdaiBarras"
    :transform="`translate(${margenesSvg?.izquierda || 0},${
      margenesSvg?.arriba || 0
    })`"
  >
    <circle
      r="10"
      fill="#AB7C94"
    />
  </g>
</template>
