<script setup>
import ContenedorVisAtribuciones from '../internos/ContenedorVisAtribuciones.vue'

import { select } from 'd3-selection'
import {
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  toRefs,
  useSlots,
  watch,
} from 'vue'
import { idAleatorio } from '../../utils'
import usarRegistroGraficas from './../../composables/usarRegistroGraficas'
import * as valoresPorDefecto from './../../valores/grafica'
const props = defineProps({
  id: {
    type: String,
    default: () => idAleatorio(),
  },
  margenes: {
    type: Object,
    default: () => valoresPorDefecto.margenes,
    validator(objeto) {
      // Debe tener las claves arriba, abajo, derecha e izquierda
      const validado =
        'arriba' in objeto &&
        'abajo' in objeto &&
        'derecha' in objeto &&
        'izquierda' in objeto
      if (!validado) {
        console.error('El objeto no cumple con las especificaciones', objeto)
      }
      return validado
    },
  },
  titulo_eje_y: {
    type: String,
  },
  titulo_eje_x: {
    type: String,
  },
  ancho: {
    type: Number,
  },
  alto: {
    type: Number,
  },
})
const ancho_grafica = ref()
const alto_grafica = ref()
const slots = useSlots()
const posicion_cursor = ref({ x: 0, y: 0 })
const posicion_globo_info = ref({ x: 0, y: 0 })
const contenedorSisdaiGraficas = ref(null)
const espacio_eje_y = ref(0),
  espacio_eje_x = ref(0)
const grupoFondo = ref()
const grupoFrente = ref()

const grafica = () => {
  return usarRegistroGraficas().grafica(props.id)
}
const { margenes } = toRefs(props)
const slots_default = ref([])
const vistaActiva = ref('grafica')
// Función para acceder a la ref expuesta por el hijo
watch(margenes, nv => {
  grafica().margenes = nv
})
onBeforeMount(() => {
  usarRegistroGraficas().registrarGrafica(props.id)
  grafica().margenes = margenes.value
})
const iniciaMutationObserver = () => {
  const body = document.querySelector('body')

  const observer = new MutationObserver(mutacion => {
    mutacion.forEach(mutation => {
      if (mutation.attributeName === 'class') {
        // Cada vez que cambien las clases, actualiza `classList`
        const clases = Array.from(body.classList)
        vistaActiva.value = clases.includes('a11y-simplificada')
          ? 'tabla'
          : 'grafica'
      }
    })
  })
  // Iniciar la observación de los cambios de atributos (clases)
  observer.observe(body, { attributes: true })

  // Retorna el observador para poder desconectarlo más tarde
  return observer
}
let observer
onMounted(() => {
  observer = iniciaMutationObserver()

  vistaActiva.value = Array.from(
    document.querySelector('body').classList
  ).includes('a11y-simplificada')
    ? 'tabla'
    : 'grafica'
  obteniendoDimensiones()
  grupoFondo.value = select(`#${props.id}  g.grupo-fondo`)
  grupoFrente.value = select(`#${props.id}  g.grupo-frente`)
  window.addEventListener('resize', obteniendoDimensiones)
  slots_default.value = slots.default ? slots.default() : []
  if ('globo-informacion' in slots) {
    siHayGlobo()
  }
})
function obteniendoDimensiones() {
  espacio_eje_y.value = document.querySelector(
    `#${props.id}  .titulo-eje-y`
  )?.clientHeight
  espacio_eje_x.value = document.querySelector(
    `#${props.id}  .titulo-eje-x`
  )?.clientHeight
  grafica().ancho = props.ancho
    ? props.ancho
    : contenedorSisdaiGraficas.value.clientWidth - espacio_eje_y.value
  grafica().alto = props.alto ? props.alto : valoresPorDefecto.altoVis

  ancho_grafica.value = props.ancho
    ? props.ancho
    : contenedorSisdaiGraficas.value.clientWidth - espacio_eje_y.value
  alto_grafica.value = props.alto ? props.alto : valoresPorDefecto.altoVis
}
defineExpose({
  ancho_grafica,
  alto_grafica,
  grafica,
  grupoFondo,
  grupoFrente,
  vistaActiva,
})
onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  usarRegistroGraficas().borrarGrafica(props.id)
  window.removeEventListener('resize', obteniendoDimensiones)
})
const paneles = ['encabezado', 'izquierda', 'derecha', 'pie']

function siHayGlobo() {
  let globo_nodo = select(
    `#${props.id} .contenedor-svg-ejes-tooltip .globo-informacion`
  ).node()

  let ancho_globo = globo_nodo?.getBoundingClientRect()?.width
  select(`#${props.id} .svg-vis`)
    .on('mousemove', e => {
      posicion_cursor.value = { x: e.layerX, y: e.layerY }
      ancho_globo = globo_nodo?.getBoundingClientRect()?.width
      posicion_globo_info.value.top = e.layerY
      grafica().posicion_cursor = posicion_cursor.value
      select(`#${props.id} .contenedor-svg-ejes-tooltip .globo-informacion`)
        .style(
          'left',
          (e.layerX > 0.5 * grafica().ancho
            ? e.layerX - ancho_globo + espacio_eje_y.value - 5
            : e.layerX + espacio_eje_y.value + 5) + 'px'
        )
        .style('top', e.layerY + 15 + 'px')
        .classed('no-visible', false)

      grafica().globo_visible = true
    })
    .on('click', e => {
      posicion_cursor.value.x = e.layerX
      ancho_globo = globo_nodo.getBoundingClientRect().width
      posicion_cursor.value.y = e.layerY
      posicion_globo_info.value.top = e.layerY
      grafica().posicion_cursor = posicion_cursor.value
      select(`#${props.id} .contenedor-svg-ejes-tooltip .globo-informacion`)
        .style(
          'left',
          (e.layerX > 0.5 * grafica().ancho
            ? e.layerX - ancho_globo + espacio_eje_y.value - 5
            : e.layerX + espacio_eje_y.value + 5) + 'px'
        )
        .style('top', e.layerY + 15 + 'px')
        .classed('no-visible', false)
      grafica().globo_visible = true
    })
    .on('mouseout', () => {
      grafica().globo_visible = false
      select(
        `#${props.id} .contenedor-svg-ejes-tooltip .globo-informacion`
      ).classed('no-visible', true)
    })
}
function panelesEnUso() {
  // return !!slots[name]
  return paneles
    .filter(panel => !!slots[`panel-${panel}-vis`])
    .map(panel => `con-panel-${panel}-vis`)
}
</script>

<template>
  <div
    :sisdai-grafica="id"
    style="--contenedor-vis-alto-menus: auto"
    class="contenedor-vis contenedor-sisdai-graficas"
    :id="id"
    :style="{
      '--contenedor-vis-alto-maximo': 'auto',
      '--contenedor-vis-alto-minimo-vis': 'auto',
    }"
  >
    <div
      class="contenedor-vis-paneles"
      :class="panelesEnUso()"
    >
      <div class="panel-encabezado-vis">
        <slot name="panel-encabezado-vis" />
      </div>

      <div class="panel-izquierda-vis">
        <slot name="panel-izquierda-vis" />
      </div>
      <div
        class="contenido-vis"
        :style="{ overflow: vistaActiva === 'grafica' ? 'initial' : 'hidden' }"
        ref="contenedorSisdaiGraficas"
      >
        <div
          v-show="vistaActiva === 'grafica'"
          class="contenedor-svg-ejes-tooltip"
          :style="{
            height: !grafica()?.alto
              ? '100%'
              : `${grafica().alto + espacio_eje_x}px`,
          }"
        >
          <slot name="globo-informacion" />

          <div
            class="contenedor-titulo-eje-y"
            :style="{
              height: !grafica()?.alto ? '100%' : grafica()?.alto + 'px',
            }"
          >
            <div
              :style="{
                width: !grafica()?.alto ? '100%' : grafica()?.alto + 'px',
                transform: `rotate(-90deg)translateX(calc(-100% - ${
                  0.5 * (margenes.arriba - margenes.abajo)
                }px))`,
              }"
              class="titulo-eje-y vis-titulo-ejes"
              style="padding: 0 0 5px 0"
              v-html="titulo_eje_y"
            ></div>
          </div>

          <figure :style="{ left: espacio_eje_y + 'px' }">
            <svg
              class="svg-vis"
              :width="grafica()?.ancho"
              :height="grafica()?.alto"
              :viewBox="`0 0 ${grafica()?.ancho} ${grafica()?.alto}`"
            >
              <g
                class="grupo-fondo"
                :transform="`translate(${margenes.izquierda}, ${margenes.arriba})`"
              />
              <g class="eje-x-arriba" />
              <g
                class="eje-x-abajo"
                :transform="`translate(${margenes.izquierda}, ${
                  grafica()?.alto - margenes.abajo
                })`"
              />
              <g
                class="eje-y-izquierda"
                :transform="`translate(${
                  margenes.izquierda
                }, ${+margenes.arriba})`"
              />
              <g
                class="eje-y-derecha"
                :transform="`translate(${
                  grafica()?.ancho - margenes.derecha
                }, ${+margenes.arriba})`"
              />
              <slot ref="slotsDefaults" />
              <g
                class="grupo-frente"
                :transform="`translate(${margenes.izquierda}, ${margenes.arriba})`"
              />
            </svg>
          </figure>
          <div class="contenedor-titulo-eje-x">
            <div
              class="titulo-eje-x vis-titulo-ejes"
              v-html="titulo_eje_x"
            ></div>
          </div>
        </div>
        <div v-show="vistaActiva === 'tabla'">
          <div
            class="contenedor-tabla"
            v-for="(tabla, g) in grafica().tablas"
            :key="g"
          >
            <table v-if="tabla.tipo != 'alluvial'">
              <caption>
                {{
                  tabla.caption
                }}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{{ tabla.nombre_indice }}</th>
                  <th
                    scope="col"
                    v-for="(variable, v) in tabla.variables"
                    :key="v"
                    :id="`${g}-col-${v}`"
                  >
                    {{ variable.nombre }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(datum, d) in tabla.datos"
                  :key="d"
                  :id="`${g}-ren-${d}`"
                >
                  <th scope="row">{{ datum[tabla.nombre_indice] }}</th>
                  <td
                    v-for="(variable, v) in tabla.variables"
                    :key="v"
                    :headers="`${g}-ren-${d} ${g}-col-${v}`"
                  >
                    {{ datum[variable.id]?.toLocaleString('en') }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="panel-derecha-vis">
        <slot name="panel-derecha-vis" />
      </div>

      <div class="panel-pie-vis">
        <slot name="panel-pie-vis" />
      </div>
    </div>

    <ContenedorVisAtribuciones />
  </div>
</template>
<style scoped lang="scss">
.contenido-vis {
  max-width: 100%;
  .contenedor-tabla {
    overflow: auto;
    max-height: 500px;
  }
}
</style>
