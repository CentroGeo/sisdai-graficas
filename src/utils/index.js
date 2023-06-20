/**
 * @module utiles/index
 */

/**
 * Devuelve una cadena de texto aleatoreo.
 * @returns {String}
 */
export function idAleatorio() {
  return 'id-' + Math.random().toString(36).substring(2)
}

/**
 * Busca el atributo `sisdai-{tipo}` en los elemntos padre del html de un componente y deviuelve
 * su valor.
 * @param {String} tipo puede ser contenedor de grafica, mapa o algun derivado de los mismos.
 * @param {HTMLElement} html de cualquier elemento.
 * @returns {String} valor del atrubutos sisdai-contenedor.
 */
export function buscarIdContenedorHtmlSisdai(tipo, { parentElement }) {
  // console.log('buscarIdContenedorHtmlSisdai', parentElement)

  if (parentElement.getAttribute(`sisdai-${tipo}`) !== null) {
    // console.log('es sisdai-contenedor')
    return parentElement.getAttribute(`sisdai-${tipo}`)
  }

  if (parentElement.parentElement !== null) {
    // console.log('buscar un nivel abajo', parentElement.parentElement)
    return buscarIdContenedorHtmlSisdai(tipo, parentElement)
  } else {
    // console.log('ya no hay más hijos')
    // eslint-disable-next-line
    console.warn(`No se encontro el contenedor`)
  }
}
