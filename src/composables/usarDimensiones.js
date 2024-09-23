import { computed } from 'vue'
import usarRegistroGraficas from './usarRegistroGraficas'

export default function (idGrafica) {
  const grafica = usarRegistroGraficas().grafica(idGrafica)

  const alto = computed(() => grafica?.alto)
  const guardarAlto = _alto => (grafica.alto = _alto)

  const ancho = computed(() => grafica?.ancho)
  const guardarAncho = _ancho => (grafica.ancho = _ancho)

  const margenes = computed(() => grafica?.margenes)
  const guardarMargenes = _margenes => (grafica.margenes = _margenes)

  const posicion_cursor = computed(() => grafica?.posicion_cursor)
  const guardaPosicionCursor = _posicion_cursor =>
    (grafica.posicion_cursor = _posicion_cursor)

  const globo_visible = computed(() => grafica?.globo_visible)
  const guardarGloboVisible = _globo_visible =>
    (grafica.globo_visible = _globo_visible)

  return {
    alto,
    guardarAlto,
    ancho,
    guardarAncho,
    margenes,
    guardarMargenes,
    posicion_cursor,
    guardaPosicionCursor,
    globo_visible,
    guardarGloboVisible,
  }
}
