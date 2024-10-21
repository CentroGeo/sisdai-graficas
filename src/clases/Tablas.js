export default class Tablas {
  constructor() {
    this._tablas = {}
  }

  set tablas(v) {
    this._tablas = v
  }

  get tablas() {
    return this._tablas
  }

  agregaTabla(id, t) {
    console.log(id, t)
    this._tablas[id] = t
  }
}
