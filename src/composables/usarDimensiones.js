import { ref } from 'vue'
const margen = ref()
const ancho = ref()
const alto = ref()
const svg = ref()
const id_svg = ref()
export default function () {
  function guardarMargenes(_margen) {
    margen.value = _margen
  }

  function guardaDimensiones(_ancho, _alto) {
    ancho.value = _ancho
    alto.value = _alto
  }
  function guardaSvg(_svg) {
    svg.value = _svg
  }
  function guardaId(_id) {
    id_svg.value = _id
  }

  return {
    guardarMargenes,
    guardaDimensiones,
    guardaSvg,
    guardaId,
    margen,
    ancho,
    alto,
    svg,
    id_svg,
  }
}
