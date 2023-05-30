import * as valoresPorDefecto from './../valores/grafica'

export default class SisdaiGrafica {
  constructor({ dimensiones }) {
    // console.log('class SisdaiGrafica', dimensiones)
    this.dimensiones = new Dimensiones(dimensiones)
  }
}

class Dimensiones {
  // constructor({ alto, ancho, margenes }) {
  constructor(opciones) {
    // console.log('margenes', opciones?.margenes)
    this.alto = Number(opciones?.alto) | 0
    this.ancho = Number(opciones?.ancho) | 0

    // this._margenes = new Margenes({
    //   ...valoresPorDefecto.margenes,
    //   ...opciones?.margenes,
    // })

    this.margenes = {
      ...valoresPorDefecto.margenes,
      ...opciones?.margenes,
    }
  }

  get margenes() {
    return this._margenes
  }

  set margenes(opciones) {
    // console.log('modificando margenes')
    this._margenes = new Margenes({
      ...this._margenes,
      ...opciones,
    })
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
