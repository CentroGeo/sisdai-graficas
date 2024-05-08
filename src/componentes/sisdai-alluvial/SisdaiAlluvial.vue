<script setup>
import { format } from 'd3-format'
import { sankey, sankeyLinkHorizontal } from 'd3-sankey'
import { select } from 'd3-selection'
import { transition } from 'd3-transition'

import { onMounted, ref, shallowRef, toRefs, watch } from 'vue'
import usarRegistroGraficas from '../../composables/usarRegistroGraficas'
import { buscarIdContenedorHtmlSisdai } from '../../utils'

var idGrafica

const props = defineProps({
  datos: {
    type: Object,
    require: true,
  },
  variables: {
    type: Array,
    require: true,
    validator(value) {
      // debe tener: id, ¡ color
      const validado = value.some(
        ({ id, color }) => id !== undefined || color !== undefined
      )
      if (!validado) {
        console.error('El objeto no cumple con las especificaciones')
      }
      return validado
    },
  },
})

const sisdaiAlluvial = shallowRef()
const { datos, variables } = toRefs(props)
transition
const margenesSvg = ref({})

const grupoContenedor = ref(),
  grupoNodos = ref(),
  grupoEnlaces = ref()

// preguntar a Dani y Moni
const formatea = format(',.0f') // cero decimales

function creaAlluvial() {
  const grupoVis = usarRegistroGraficas().grafica(idGrafica).grupoVis

  // configura las propiedades del sankey
  const grupoSankey = sankey()
    .nodeId(d => d.name)
    .nodeWidth(24) // ancho del nodo
    .nodePadding(8) // separación vertical entre nodos
    .extent([
      [-margenesSvg.value.izquierda, -margenesSvg.value.arriba],
      [
        grupoVis.ancho + margenesSvg.value.derecha,
        grupoVis.alto + margenesSvg.value.abajo,
      ],
    ])

  // obtén el formato de datos para nodos y enlaces
  const { nodes, links } = grupoSankey({
    nodes: datos.value.nodos.map(d => Object.assign({}, d)),
    links: datos.value.enlaces.map(d => Object.assign({}, d)),
  })

  // agrega enlaces
  grupoEnlaces.value
    .selectAll('g.grupo-enlace')
    .data(links)
    .join(
      enter => {
        enter
          .append('g')
          .attr('class', 'grupo-enlace')
          .style('isolation', 'isolate') // sin aislación, el color de fondo será tomado en cuenta
          .append('path')
          .attr('class', 'enlace')
          .attr('d', sankeyLinkHorizontal())
          .attr('stroke-width', d => Math.max(1, d.width))
          .attr('fill', 'none')
          .attr(
            'stroke',
            variables.value.filter(dd => dd.id === 'enlaces')[0].color
          )
          .attr('opacity', 0.25)
          .style('mix-blend-mode', 'multiply')
          // interacción con el mouse
          .on('mouseover', function () {
            select(this).transition().duration(500).attr('opacity', 0.5)
          })
          .on('mouseout', function () {
            select(this).transition().duration(500).attr('opacity', 0.25)
          })
          .append('title')
          .text(
            d =>
              // revisar cuando son más de dos nodos
              `${d.source.name} → ${
                d.target.name
              }\nvalor: ${d.value.toLocaleString()}`
          )
      },
      update => {
        let grupo = update
        let trazo = grupo
          .selectAll('path.enlace')
          .data(d => [d])
          .attr('d', sankeyLinkHorizontal())
          .attr('stroke-width', d => Math.max(1, d.width))

        trazo
          .selectAll('title')
          .data(d => [d])
          .text(
            d =>
              `${d.source.name} → ${
                d.target.name
              }\nvalor: ${d.value.toLocaleString()}`
          )
      },
      exit => {
        exit.remove()
      }
    )

  // agrega nodos
  grupoNodos.value
    .selectAll('g.grupo-nodo')
    .data(nodes)
    .join(
      enter => {
        let grupo = enter.append('g').attr('class', 'grupo-nodo')

        grupo
          .append('rect')
          .attr('class', 'nodo-rectangulo')
          .attr('x', d => d.x0 + 1) // separación entre el nodo y el enlace
          .attr('y', d => d.y0)
          .attr('height', d => d.y1 - d.y0)
          .attr('width', d => d.x1 - d.x0 - 2) // proporcional a la separación por ambos lados
          .attr(
            'fill',
            d => variables.value.filter(dd => dd.id === d.id)[0].color
          )
          .attr('opacity', 1)
          .attr('id', (d, i) => {
            d.id = i
            return 'rect-' + i
          })
          // interacción con el mouse
          .on('mouseover', (d, i) => {
            let nodoResaltado = []

            // resalta los enlaces según el nodo seleccionado
            grupoEnlaces.value
              .transition()
              .duration(500)
              .selectAll('path.enlace')
              .attr('opacity', function (l) {
                if (l.source.index === i.index || l.target.index === i.index) {
                  nodoResaltado.push(l.target.id)
                  nodoResaltado.push(l.source.id)
                }
                return l.source.index === i.index || l.target.index === i.index
                  ? 0.5
                  : 0.2 // baja la opacidad a los enlaces que no estén relacionados
              })

            // baja la opacidad a los nodos y textos que no estén relacionados
            grupoNodos.value
              .transition()
              .duration(500)
              .selectAll('rect.nodo-rectangulo')
              .attr('opacity', 0.2)
            grupoNodos.value
              .transition()
              .duration(500)
              .selectAll('text.nodo-nombre')
              // .selectAll('foreignObject.nodo-nombre')
              .attr('opacity', 0.2)

            // resalta los nodos y textos que estén relacionados
            for (let i = 0; i < nodoResaltado.length; i++) {
              grupoNodos.value
                .transition()
                .duration(500)
                .selectAll('rect#rect-' + nodoResaltado[i])
                .attr('opacity', 1)
              grupoNodos.value
                .transition()
                .duration(500)
                .selectAll('text#rect-texto-' + nodoResaltado[i])
                // .selectAll('foreignObject#rect-texto-' + nodoResaltado[i])
                .attr('opacity', 1)
            }
          })
          .on('mouseleave', () => {
            // resetea la opacidad de los enlaces y nodos a como estaban
            grupoEnlaces.value
              .transition()
              .duration(500)
              .selectAll('path.enlace')
              .attr('opacity', 0.25)
            grupoNodos.value
              .transition()
              .duration(500)
              .selectAll('rect.nodo-rectangulo')
              .attr('opacity', 1)
            grupoNodos.value
              .transition()
              .duration(500)
              .selectAll('text.nodo-nombre')
              // .selectAll('foreignObject.nodo-nombre')
              .attr('opacity', 1)
          })
          .append('title')
          .text(d => `${d.name}\nvalor: ${d.value.toLocaleString()}`)

        // Utilizando foreignObject
        // let texto = grupo
        //   .append('foreignObject')
        //   .attr('class', 'nodo-nombre')
        //   .attr('id', (d, i) => {
        //     d.id = i
        //     return 'rect-texto-' + i
        //   })
        //   // si la x0 del vector es menor a la mitad del ancho anchoVis
        //   .attr('x', d =>
        //     d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8 - 110
        //   ) // padding horizontal de 8px
        //   .attr('y', d => (d.y1 + d.y0) / 2 - 80)
        //   .attr('width', 110)
        //   .attr('height', 160)
        //   .attr('opacity', 1)
        //   // agrega div
        //   .append('xhtml:div')
        //   .style('display', 'inline-grid')
        //   .style('align-content', 'center')
        //   .style('justify-content', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'start' : 'end'
        //   )
        //   .style('height', '160px')
        //   .style('width', '110px')
        // // agrega p
        // texto
        //   .append('p')
        //   .style('margin', '0px')
        //   .style('font-size', '.75rem')
        //   .style('font-weight', '600')
        //   .style('line-height', '1.3em')
        //   .style('text-align', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'left' : 'right'
        //   )
        //   .text(d => d.name)
        // texto
        //   .append('p')
        //   .attr('class', 'nodo-valor')
        //   .style('margin', '0px')
        //   .style('font-size', '.75rem')
        //   .attr('font-weight', '400')
        //   .style('text-align', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'left' : 'right'
        //   )
        //   .text(d => `valor: ${formatea(d.value).toLocaleString()}`) // solo la cantidad

        grupo
          .append('text')
          .attr('class', 'nodo-nombre')
          .attr('id', (d, i) => {
            d.id = i
            return 'rect-texto-' + i
          })
          .attr('x', d => (d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8)) // padding horizontal de 8px
          .attr('y', d => (d.y1 + d.y0) / 2)
          .attr('dy', '0em')
          .attr('text-anchor', d =>
            d.x0 < grupoVis.ancho / 2 ? 'start' : 'end'
          )
          .attr('font-size', '.75rem')
          .attr('font-weight', '600')
          .attr('opacity', 1)
          .text(d => d.name)
          // adjunta tspan
          .append('tspan')
          .attr('class', 'nodo-valor')
          .attr('x', d => (d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8))
          .attr('dy', '1.3em') // salto de línea con interlineado 1.3em
          .attr('font-weight', '400')
          .text(d => `valor: ${formatea(d.value).toLocaleString()}`) // solo la cantidad
      },
      update => {
        let grupo = update

        let rectangulo = grupo
          .selectAll('rect.nodo-rectangulo')
          .data(d => [d])
          .attr('x', d => d.x0 + 1)
          .attr('y', d => d.y0)
          .attr('height', d => d.y1 - d.y0)
          .attr('width', d => d.x1 - d.x0 - 2)
          .attr(
            'fill',
            d => variables.value.filter(dd => dd.id === d.id)[0].color
          )
          .attr('id', (d, i) => {
            d.id = i
            return 'rect-' + i
          })
        rectangulo
          .selectAll('title')
          .data(d => [d])
          .text(d => `${d.name}\nvalor: ${d.value.toLocaleString()}`)

        // Utilizando foreignObject
        // let texto = grupo.selectAll('foreignObject.nodo-nombre').data(d => [d])
        // texto
        //   .attr('id', (d, i) => {
        //     d.id = i
        //     return 'rect-texto-' + i
        //   })
        //   .attr('x', d =>
        //     d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8 - 110
        //   )
        //   .attr('y', d => (d.y1 + d.y0) / 2 - 80)
        //   .append('xhtml:div')
        //   .style('justify-content', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'start' : 'end'
        //   )
        // texto
        //   .append('p')
        //   .style('text-align', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'left' : 'right'
        //   )
        //   .text(d => d.name)
        // texto
        //   .append('p')
        //   .style('text-align', d =>
        //     d.x0 < grupoVis.ancho / 2 ? 'left' : 'right'
        //   )
        //   .text(d => `valor: ${formatea(d.value).toLocaleString()}`)

        let texto = grupo.selectAll('text.nodo-nombre').data(d => [d])
        texto
          .attr('id', (d, i) => {
            d.id = i
            return 'rect-texto-' + i
          })
          .attr('x', d => (d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8))
          .attr('y', d => (d.y1 + d.y0) / 2)
          .attr('text-anchor', d =>
            d.x0 < grupoVis.ancho / 2 ? 'start' : 'end'
          )
          .text(d => d.name)
          .append('tspan')
          .attr('class', 'nodo-valor')
          .attr('x', d => (d.x0 < grupoVis.ancho / 2 ? d.x1 + 8 : d.x0 - 8))
          .attr('dy', '1.3em')
          .attr('font-weight', 'normal')
          .text(d => `valor: ${formatea(d.value).toLocaleString()}`)
      },
      exit => {
        exit.remove()
      }
    )
}

onMounted(() => {
  idGrafica = buscarIdContenedorHtmlSisdai('grafica', sisdaiAlluvial.value)
  grupoContenedor.value = select('#' + idGrafica + ' svg g.contenedor-alluvial')

  margenesSvg.value = usarRegistroGraficas().grafica(idGrafica).margenes
  watch(
    () => usarRegistroGraficas().grafica(idGrafica).margenes,
    nv => (margenesSvg.value = nv)
  )

  grupoEnlaces.value = grupoContenedor.value
    .append('g')
    .attr('class', 'contenedor-enlaces')
  grupoNodos.value = grupoContenedor.value
    .append('g')
    .attr('class', 'contenedor-nodos')

  if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
    creaAlluvial()
  }

  watch(
    () => usarRegistroGraficas().grafica(idGrafica).grupoVis,
    () => {
      if (usarRegistroGraficas().grafica(idGrafica).grupoVis.ancho > 0) {
        creaAlluvial()
      }
    }
  )
  watch(datos, () => {
    creaAlluvial()
  })
  watch(variables, () => {
    creaAlluvial()
  })
})
</script>

<template>
  <g
    ref="sisdaiAlluvial"
    :transform="`translate(${margenesSvg?.izquierda || 0},${
      margenesSvg?.arriba || 0
    })`"
    class="contenedor-alluvial"
  >
  </g>
</template>
