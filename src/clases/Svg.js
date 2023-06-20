import * as valoresPorDefecto from './../valores/grafica'

export default class Svg {
  _alto = 0
  _ancho = 0
  _margenes = new Margenes(valoresPorDefecto.margenes)
  _grupoVis = new GrupoVis({
    alto: 0,
    ancho: 0,
  })

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
    this.grupoVis = {
      alto: 0,
      ancho: this._ancho - this.margenes.horizontal,
    }
  }

  get ancho() {
    return this._ancho
  }

  set margenes(opciones) {
    this._margenes = new Margenes(opciones)
    this.grupoVis = {
      alto: 0,
      ancho: this._ancho - this.margenes.horizontal,
    }
  }

  get margenes() {
    return this._margenes
  }

  set grupoVis(opciones) {
    this._grupoVis = new GrupoVis(opciones)
  }

  get grupoVis() {
    return this._grupoVis
  }
}

class GrupoVis {
  constructor({ alto, ancho }) {
    this.alto = alto
    this.ancho = ancho
  }
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
