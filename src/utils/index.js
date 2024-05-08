import { ascending, max, min, range } from 'd3-array'
import { axisBottom, axisLeft, axisRight } from 'd3-axis'
import { select } from 'd3-selection'
import {
  timeDay,
  timeHour,
  timeMinute,
  timeMonth,
  timeSecond,
  timeWeek,
  timeYear,
} from 'd3-time'
import { timeFormatLocale } from 'd3-time-format'
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
    .attr('class', 'vis-valores-ejes')
    .style('dominant-baseline', 'middle')
    .text(d => d.toLocaleString('en'))
  eje_y
    .selectAll('g.tick line')
    .interrupt()
    .attr('x1', '0')
    .attr('y1', '0')
    .attr('x2', alineacion === 'izquierda' ? ancho : -ancho)
    .attr('y2', '0')
    .attr('class', 'vis-linea-ejes')
  eje_y.selectAll('line.vis-linea-base').remove()
  eje_y
    .append('line')
    .attr('class', 'vis-linea-base')
    .attr('x1', '0')
    .attr('y1', max(escala.range()))
    .attr('x2', alineacion === 'izquierda' ? ancho : -ancho)
    .attr('y2', max(escala.range()))
  return eje_y
}
/**
 * Crea el eje horizontal
 * @param {String} id el id asociado al componente SisdaiGraficas.
 * @param {Function} escala funcion de d3 (scaleBand, scaleLinear, etc.) que se emplea para graficar y se asocia al eje vertical.
 * @param {Number} angulo es el ángulo que se rotan las etiquetas del eje.
 */
export function creaEjeHorizontal(id, escala, angulo) {
  const eje_x = select(`div#${id} svg g.eje-x-abajo`)
  eje_x
    .transition()
    .duration(500)
    .call(
      axisBottom(escala).tickFormat(d => {
        if (d instanceof Date) {
          return multiFormat(d)
        } else {
          return d
        }
      })
    )

  eje_x.selectAll('path').remove()
  eje_x.selectAll('line').remove()
  eje_x
    .selectAll('text')
    .attr('class', 'vis-valores-ejes')
    .attr('transform', `translate(0,8)rotate(${angulo})`)
    .attr('dy', `${-Math.abs(angulo / 90)}em`)
    .style('dominant-baseline', angulo !== 0 ? 'middle' : 'inherit')
    .style(
      'text-anchor',
      angulo < 0 ? 'end' : angulo === 0 ? 'middle' : 'start'
    )
  return eje_x
}

/**
 * formatea eje temporal al espaniol
 * @param {Date} date el id asociado al componente SisdaiGraficas.
 */
export function multiFormat(date) {
  /**
   * Método para traducir el formato de fecha
   */
  let locale = timeFormatLocale({
    decimal: ',',
    thousands: '.',
    grouping: [3],
    currency: ['€', ''],
    dateTime: '%A, %e %B %Y г. %X',
    date: '%d.%m.%Y',
    time: '%H:%M:%S',
    periods: ['AM', 'PM'],
    days: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ],
    shortDays: ['Dom', 'Lun', 'Mar', 'Mi', 'Jue', 'Vie', 'Sab'],
    months: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ],
    shortMonths: [
      'ene',
      'feb',
      'mar',
      'abr',
      'may',
      'jun',
      'jul',
      'ago',
      'sep',
      'oct',
      'nov',
      'dic',
    ],
  })
  let formatMillisecond = locale.format('.%L')
  let formatSecond = locale.format(':%S')
  let formatMinute = locale.format('%I:%M')
  let formatHour = locale.format('%I %p')
  let formatDay = locale.format('%a %d')
  let formatWeek = locale.format('%b %d')
  //let formatMonth = locale.format('%b')
  let formatMonthYear = locale.format('%Y')
  //let formatYear = locale.format('%Y')
  return (
    timeSecond(date) < date
      ? formatMillisecond
      : timeMinute(date) < date
      ? formatSecond
      : timeHour(date) < date
      ? formatMinute
      : timeDay(date) < date
      ? formatHour
      : timeMonth(date) < date
      ? timeWeek(date) < date
        ? formatDay
        : formatWeek
      : timeYear(date) < date
      ? formatMonthYear
      : formatMonthYear
  )(date)
}

export function reordenamientoApilado(datos_apilados) {
  for (
    var indice_fecha = 0;
    indice_fecha < datos_apilados[0].length;
    indice_fecha++
  ) {
    var dictsStack = []
    for (
      var indice_franja = 0;
      indice_franja < datos_apilados.length;
      indice_franja++
    ) {
      var min_val = min(
        range(datos_apilados.length).map(
          i => datos_apilados[i][indice_fecha][0]
        )
      )
      dictsStack[indice_franja] = {
        cat: indice_franja,
        intervalo: datos_apilados[indice_franja][indice_fecha],
        delta:
          datos_apilados[indice_franja][indice_fecha][1] -
          datos_apilados[indice_franja][indice_fecha][0],
        minimo: min_val,
      }
    }
    dictsStack.sort((a, b) => ascending(a.delta, b.delta))
    let contador_apilador = 0
    for (
      indice_franja = 0;
      indice_franja < datos_apilados.length;
      indice_franja++
    ) {
      if (indice_franja === 0) {
        contador_apilador = dictsStack[indice_franja].minimo
      }

      dictsStack[indice_franja].intervalo = [
        contador_apilador,
        contador_apilador + dictsStack[indice_franja].delta,
      ]
      datos_apilados[dictsStack[indice_franja].cat][indice_fecha][0] =
        contador_apilador
      datos_apilados[dictsStack[indice_franja].cat][indice_fecha][1] =
        contador_apilador + dictsStack[indice_franja].delta
      contador_apilador += dictsStack[indice_franja].delta
    }
  }
  return datos_apilados
}
