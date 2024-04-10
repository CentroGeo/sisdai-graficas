import * as valoresPorDefecto from './../valores/grafica'

export default class Svg {
  _alto = 0
  _ancho = 0
  _margenes = new Margenes(valoresPorDefecto.margenes)
  _grupoVis = new GrupoVis({
    alto: 0,
    ancho: 0,
  })
  _posicion_cursor = { x: 0, y: 0 }
  _globo_visible = false

  constructor() {}

  set alto(v) {
    this._alto = v
    this.calcularGrupoVis()
  }

  get alto() {
    return this._alto
  }

  set ancho(v) {
    this._ancho = v
    this.calcularGrupoVis()
  }

  get ancho() {
    return this._ancho
  }

  set posicion_cursor(v) {
    this._posicion_cursor = v
    //this.calcularGrupoVis()
  }

  get posicion_cursor() {
    return this._posicion_cursor
  }

  set globo_visible(v) {
    this._globo_visible = v
    //this.calcularGrupoVis()
  }

  get globo_visible() {
    return this._globo_visible
  }

  set margenes(opciones) {
    this._margenes = new Margenes(opciones)
    this.calcularGrupoVis()
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
  calcularGrupoVis() {
    this.grupoVis = {
      alto: this._alto - this.margenes.vertical,
      ancho: this._ancho - this.margenes.horizontal,
    }
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
