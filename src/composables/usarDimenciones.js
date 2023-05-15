import { computed } from 'vue'
import usarGraficas from './usarGraficas'

export default function (idGrafica) {
  const grafica = usarGraficas().grafica(idGrafica)

  const alto = computed(() => grafica?.alto)
  const guardarAlto = _alto => (grafica.alto = _alto)

  const ancho = computed(() => grafica?.ancho)
  const guardarAncho = _ancho => (grafica.ancho = _ancho)

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
