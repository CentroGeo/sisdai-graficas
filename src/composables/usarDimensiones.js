import { ref } from 'vue'
const margen = ref()
const ancho = ref()
const alto = ref()
export default function () {
  function guardarMargenes(_margen) {
    margen.value = _margen
  }

  function guardaDimensiones(_ancho, _alto) {
    ancho.value = _ancho
    alto.value = _alto
  }

  return {
    guardarMargenes,
    guardaDimensiones,
    margen,
    ancho,
    alto,
  }
}
