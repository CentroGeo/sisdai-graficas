import { reactive } from 'vue'
import RegistroObjetos from './../clases/ResgistroObjetos'
import SisdaiGrafica from './../clases/SisdaiGrafica'
//import Tablas from './../clases/Tablas'

const registroGraficas = new RegistroObjetos('grafica')

export default function (idGrafica) {
  function registrarGrafica(_idGrafica) {
    registroGraficas.registrar(_idGrafica, reactive(new SisdaiGrafica({})))
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
