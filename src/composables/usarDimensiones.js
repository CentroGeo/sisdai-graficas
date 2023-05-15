import { computed, watch } from 'vue'
import usarRegistroGraficas from './usarRegistroGraficas'

export default function (idGrafica) {
  const grafica = usarRegistroGraficas().grafica(idGrafica)

  const alto = computed(() => grafica?.alto)
  const guardarAlto = _alto => (grafica.alto = _alto)

  const ancho = computed(() => grafica?.ancho)
  const guardarAncho = _ancho => {
    console.log(_ancho)
    grafica.ancho = _ancho
  }
  watch(ancho, (nv, ov) => {
    console.log(nv, ov)
  })
  const margenes = computed(() => grafica?.margenes)
  const guardarMargenes = _margenes => (grafica.margenes = _margenes)

  return {
    alto,
    guardarAlto,
    ancho,
    guardarAncho,
    margenes,
    guardarMargenes,
  }
}
