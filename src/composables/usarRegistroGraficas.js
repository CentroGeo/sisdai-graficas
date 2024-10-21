import { reactive } from 'vue'
import RegistroObjetos from './../clases/ResgistroObjetos'
import Svg from './../clases/Svg'
import Tablas from './../clases/Tablas'

const registroGraficas = new RegistroObjetos('grafica')

export default function (idGrafica) {
  function registrarGrafica(_idGrafica) {
    registroGraficas.registrar(_idGrafica, {
      svg: reactive(new Svg({})),
      tablas: reactive(new Tablas()),
    })
  }

  if (idValido(idGrafica)) {
    registrarGrafica(idGrafica)
  }

  function grafica(_idGrafica) {
    return registroGraficas.objeto(_idGrafica || idGrafica)
  }

  function graficaPromesa(_idGrafica) {
    return registroGraficas.objetoPromesa(_idGrafica || idGrafica)
  }

  function borrarGrafica(_idGrafica) {
    registroGraficas.borrar(_idGrafica || idGrafica)
  }

  return {
    registrarGrafica,
    grafica,
    graficaPromesa,
    borrarGrafica,
  }
}

function idValido(id) {
  return id !== undefined && typeof id === typeof String()
}
