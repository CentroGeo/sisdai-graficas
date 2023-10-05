import { axisBottom, axisLeft, axisRight } from 'd3-axis'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'
transition
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

/**
 * Crea el eje vertical
 * @param {String} id el id asociado al componente SisdaiGraficas.
 * @param {Function} escala funcion de d3 (scaleBand, scaleLinear, etc.) que se emplea para graficar y se asocia al eje vertical.
 * @param {Number} angulo es el ángulo que se rotan las etiquetas del eje.
 * @param {String} alineacion corresponde a la propiedad alineacion_eje_y con valor 'izquierda' o 'derecha'.
 * @param {Number} ancho es el ancho de la gráfica. Se utiliza para dar longitud correcta a las lineas punteadas.
 */
export function creaEjeVertical(id, escala, angulo, alineacion, ancho) {
  const eje_y = select(`div#${id} svg g.eje-y-${alineacion}`)
  eje_y
    .transition()
    .duration(500)
    .call(alineacion === 'izquierda' ? axisLeft(escala) : axisRight(escala))
  eje_y.selectAll('path').remove()
  eje_y
    .selectAll('text')
    .attr(
      'transform',
      `translate(${alineacion === 'izquierda' ? '-5' : '5'},0)rotate(${angulo})`
    )
    .attr('dy', `0em`)
    .interrupt()
    .attr('x', '0')
    .style('dominant-baseline', 'middle')
    .text(d => d.toLocaleString('en'))
  eje_y
    .selectAll('g.tick line')
    .interrupt()
    .attr('x1', '0')
    .attr('y1', '0')
    .attr('x2', alineacion === 'izquierda' ? ancho : -ancho)
    .attr('y2', '0')
    .style('stroke-dasharray', alineacion === 'izquierda' ? '2 2' : '3 4')
    .style('stroke', '#6F7271')
}
/**
 * Crea el eje horizontal
 * @param {String} id el id asociado al componente SisdaiGraficas.
 * @param {Function} escala funcion de d3 (scaleBand, scaleLinear, etc.) que se emplea para graficar y se asocia al eje vertical.
 * @param {Number} angulo es el ángulo que se rotan las etiquetas del eje.
 
 */
export function creaEjeHorizontal(id, escala, angulo) {
  const eje_x = select(`div#${id} svg g.eje-x-abajo`)
  eje_x.transition().duration(500).call(axisBottom(escala))

  eje_x.selectAll('path').remove()
  eje_x.selectAll('line').remove()
  eje_x
    .selectAll('text')
    .attr('transform', `translate(0,8)rotate(${angulo})`)
    .attr('dy', `${-Math.abs(angulo / 90)}em`)
    .style('dominant-baseline', angulo !== 0 ? 'middle' : 'inherit')
    .style(
      'text-anchor',
      angulo < 0 ? 'end' : angulo === 0 ? 'middle' : 'start'
    )
}
