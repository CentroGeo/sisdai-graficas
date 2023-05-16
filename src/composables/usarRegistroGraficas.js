import { reactive } from 'vue'
import _usarDimensiones from './usarDimensiones'

let graficas_registradas = {}

export default function (idGrafica) {
  // Esto regresa verdadero o falso
  const graficaExiste = _idGrafica =>
    Object.keys(graficas_registradas).includes(_idGrafica)

  function registrar(_idGrafica) {
    if (!graficaExiste(_idGrafica)) {
      graficas_registradas[_idGrafica] = reactive({})
      //console.log(`grafica ${_idGrafica} instanciada`)
    }
  }
  const idGraficaValida = () =>
    idGrafica !== undefined && typeof idGrafica === typeof String()

  if (idGraficaValida()) {
    registrar(idGrafica)
  }

  function borrar(_idGrafica) {
    // Si la gráfica con el id existe
    // remueve la gráfica registrada
    const graficaParaBorrar = idGrafica || _idGrafica
    if (graficaExiste(graficaParaBorrar)) {
      delete graficas_registradas[graficaParaBorrar]
      //console.log(`grafica ${graficaParaBorrar} borrada`)
    }
  }
  function grafica(_idGrafica) {
    const graficaParaConsultar = idGrafica || _idGrafica
    if (graficaExiste(graficaParaConsultar)) {
      return graficas_registradas[graficaParaConsultar]
    }
    // eslint-disable-next-line
    console.warn(`No se encontró la gráfica ${graficaParaConsultar}`)
  }
  function usarDimensiones(_idGrafica) {
    // Aquí en lugar de que _usarDimensiones
    // utilice graficaParaConsultar, debe
    // utilizar _idGrafica
    const graficaParaConsultar = idGrafica || _idGrafica
    if (graficaExiste(graficaParaConsultar)) {
      return _usarDimensiones(graficaParaConsultar)
    }
    // eslint-disable-next-line
    console.warn(`No se encontró la gráfica ${graficaParaConsultar}`)
  }
  return {
    registrar,
    borrar,
    grafica,
    usarDimensiones,
  }
}
