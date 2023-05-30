import * as valoresPorDefecto from './../valores/grafica'

export default class Svg {
  _alto = 0
  _ancho = 0
  _margenes = new Margenes(valoresPorDefecto.margenes)
  grupoVis = new GrupoVis()

  constructor() {}

  set alto(v) {
    this._alto = v
    this.grupoVis.alto = this._alto - this.margenes.vertical
  }

  get alto() {
    return this._alto
  }

  set ancho(v) {
    this._ancho = v
    this.grupoVis.ancho = this._ancho - this.margenes.horizontal
  }

  get ancho() {
    return this._ancho
  }

  set margenes(opciones) {
    this._margenes = new Margenes(opciones)
  }

  get margenes() {
    return this._margenes
  }
}

class GrupoVis {
  alto = 0
  ancho = 0

  constructor() {}
}

class Margenes {
  constructor({ arriba, abajo, derecha, izquierda }) {
    this.arriba = arriba
    this.abajo = abajo
    this.derecha = derecha
    this.izquierda = izquierda
  }

  get vertical() {
    return this.arriba + this.abajo
  }

  get horizontal() {
    return this.derecha + this.izquierda
  }
}
