import { reactive } from 'vue'
import _usarDimenciones from '../composables/usarDimenciones'

let graficas = {}

export default function (idGrafica) {
  // Esto regresa verdadero o falso
  const graficaEsxiste = _idGrafica =>
    Object.keys(graficas).includes(_idGrafica)

  function intanciarGrafica(_idGrafica) {
    if (!graficaEsxiste(_idGrafica)) {
      graficas[_idGrafica] = reactive({})
      console.log(`grafica ${_idGrafica} instanciada`)
    }
  }

  const idGraficaValida = () =>
    idGrafica !== undefined && typeof idGrafica === typeof String()

  if (idGraficaValida()) {
    intanciarGrafica(idGrafica)
  }

  function borrarGrafica(_idGrafica) {
    // Si la gráfica con el id existe
    // remueve la gráfica registrada
    const graficaParaBorrar = idGrafica || _idGrafica
    if (graficaEsxiste(graficaParaBorrar)) {
      delete graficas[graficaParaBorrar]
      console.log(`grafica ${graficaParaBorrar} borrada`)
    }
  }

  function grafica(_idGrafica) {
    // Sirve como consulta para conocer
    // si existen gráfica o gráficas
    // regresa el objeto
    const graficaParaConsultar = idGrafica || _idGrafica
    if (graficaEsxiste(graficaParaConsultar)) {
      return graficas[_idGrafica]
    }

    // eslint-disable-next-line
    console.warn(`No se encontró la gráfica ${graficaParaConsultar}`)
  }

  function usarDimenciones(_idGrafica) {
    const graficaParaConsultar = idGrafica || _idGrafica
    if (graficaEsxiste(graficaParaConsultar)) {
      return _usarDimenciones(_idGrafica)
    }

    // eslint-disable-next-line
    console.warn(`No se encontró la gráfica ${graficaParaConsultar}`)
  }

  return {
    intanciarGrafica,
    borrarGrafica,
    grafica,
    usarDimenciones,
  }
}
