<script setup>
import { select } from 'd3-selection';
import { sum } from 'd3-array'

import { onMounted, ref, watch, toRefs } from 'vue'
import dimensionesSVG from "../../composables/dimensiones-svg.js"
import apilarDatos from "../../composables/procesamientos/apilar-datos.js"
import escalaLinealD3 from "../../composables/escalas/escala-lineal.js"
import escalaBandasD3 from "../../composables/escalas/escala-banda.js"
import ejeIzquierdo from "../../composables/ejes/crea-eje-izquierdo.js"
import ejeAbajo from "../../composables/ejes/crea-eje-abajo.js"

import Barras from "../../composables/crea-graficos/crea-barras.js"


const propsSetup = defineProps({
  barras_id: String,
  margen: {
    type: Object,
    default: function () {
      return { arriba: 20, abajo: 50, izquierda: 60, derecha: 20 }
    }
  },
  alto_vis: {
    type: Number,
    default: 250
  },
  logo_conacyt: {
    type: Boolean,
    default: true
  },
  titulo_eje_y: {
    type: String,
    default: "título de eje vertical"
  },
  titulo_eje_x: {
    type: String,
    default: "título de eje horizontal"
  },
  datos: Array,
  variables: {
    type: Array,
    default: function () {
      return []
    }
  },
  dominio_lineal_fijo: Array,
  apiladas_o_agrupadas: {
    type: String,
    default: "apiladas"
  },
  orientacion: {
    type: String,
    default: "vertical"
  },
  espaciado_barras: {
    type: Number,
    default: .3
  },
  espaciado_barras_agrupadas: {
    type: Number,
    default: .3
  },
  // Por renombrar
  nombre_barra: String,

})
/**
 * Arreglos de objetos que contiene 
 */
const { datos, variables } = toRefs(propsSetup)


const { configurandoDimensionesParaSVG, ancho_leyenda_y, alto, ancho } = dimensionesSVG()

const { datos_apilados } = apilarDatos(datos, variables);

const dominio_lineal = ref(propsSetup.apiladas_o_agrupadas === "apiladas" ?
  (propsSetup.dominio_lineal_fijo ? dominio_lineal_fijo : [0, Math.max(...datos.value.map((d) => sum([...variables.value.map((dd) => d[dd.id])])))]) :
  (propsSetup.dominio_lineal_fijo ? dominio_lineal_fijo : [0, Math.max(...datos.value.map((d) => Math.max(...variables.value.map((dd) => d[dd.id]))))]));
const dominio_bandas = ref(datos.value.map(d => d[propsSetup.nombre_barra]))

const { creaEscalaLineal, escalaLineal } = escalaLinealD3(dominio_lineal);
const { creaEscalaBandas, escalaBandas } = escalaBandasD3(dominio_bandas);
const eje_y = ref();
const eje_x = ref();

const { actualizaEjeIzquierdo } = ejeIzquierdo()
const { actualizaEjeAbajo } = ejeAbajo()
const { creaBarras } = Barras();

let grupo_contenedor;

onMounted(() => {
  const svg = ref(select(`#${propsSetup.barras_id} .svg-grafico`))
  grupo_contenedor = svg.value.select(".grupo-contenedor-de-grafico");
  const grupo_fondo = svg.value.select(".grupo-fondo");
  const grupo_frente = svg.value.select(".grupo-frente");
  eje_y.value = grupo_contenedor
    .select("g.eje-y")
  eje_x.value = grupo_contenedor
    .select("g.eje-x")

  configurandoDimensionesParaSVG(propsSetup.barras_id, propsSetup.margen, propsSetup.alto_vis, svg);
  /**
 * Cálculo de dominio lineal según si son barras apiladas o agrupadas
 */
  dominio_lineal.value = propsSetup.apiladas_o_agrupadas === "apiladas" ?
    (propsSetup.dominio_lineal_fijo ? dominio_lineal_fijo : [0, Math.max(...datos.value.map((d) => sum([...variables.value.map((dd) => d[dd.id])])))]) :
    (propsSetup.dominio_lineal_fijo ? dominio_lineal_fijo : [0, Math.max(...datos.value.map((d) => Math.max(...variables.value.map((dd) => d[dd.id]))))]);

  /**
   * calculo dominio bandas
   */
  dominio_bandas.value = datos.value.map(d => d[propsSetup.nombre_barra])
  /**
   * Creando escala líneal, el rango depende de si es horizontal u vertical
   */
  creaEscalaLineal(propsSetup.orientacion == 'vertical' ? [alto.value, 0] : [0, ancho.value])
  /**
   * Creando escala bandas, el rango depende de si es horizontal u vertical
   */
  creaEscalaBandas(
    propsSetup.orientacion == 'vertical' ? [0, ancho.value] : [alto.value, 0],
    propsSetup.espaciado_barras
  )

  actualizaEjeAbajo(eje_x.value, escalaBandas.value, alto.value);
  actualizaEjeIzquierdo(eje_y.value, escalaLineal.value, ancho.value);

  creaBarras(
    grupo_contenedor,
    datos_apilados.value,
    variables.value,
    escalaBandas.value,
    escalaLineal.value,
    propsSetup.nombre_barra
  )

})

watch(datos, () => {
  dominio_lineal.value = propsSetup.apiladas_o_agrupadas === "apiladas" ?
    (propsSetup.dominio_lineal_fijo ? dominio_lineal_fijo : [0, Math.max(...datos.value.map((d) => sum([...variables.value.map((dd) => d[dd.id])])))]) :
    (propsSetup.dominio_lineal_fijo ? dominio_lineal_fijo : [0, Math.max(...datos.value.map((d) => Math.max(...variables.value.map((dd) => d[dd.id]))))]);
  // Actualizamos el rango de la escala lineal  
  escalaLineal.value.range(propsSetup.orientacion == 'vertical' ? [alto.value, 0] : [0, ancho.value])

  dominio_bandas.value = datos.value.map(d => d[propsSetup.nombre_barra]);
  escalaBandas.value.range(propsSetup.orientacion == 'vertical' ? [0, ancho.value] : [alto.value, 0])
  escalaBandas.value.padding(.3)
  actualizaEjeIzquierdo(eje_y.value, escalaLineal.value, ancho.value);
  actualizaEjeAbajo(eje_x.value, escalaBandas.value, alto.value);

  creaBarras(
    grupo_contenedor,
    datos_apilados.value,
    variables.value,
    escalaBandas.value,
    escalaLineal.value,
    propsSetup.nombre_barra
  )

})
watch(variables, () => {
  dominio_lineal.value = propsSetup.apiladas_o_agrupadas === "apiladas" ?
    (propsSetup.dominio_lineal_fijo ? dominio_lineal_fijo : [0, Math.max(...datos.value.map((d) => sum([...variables.value.map((dd) => d[dd.id])])))]) :
    (propsSetup.dominio_lineal_fijo ? dominio_lineal_fijo : [0, Math.max(...datos.value.map((d) => Math.max(...variables.value.map((dd) => d[dd.id]))))]);

  dominio_bandas.value = datos.value.map(d => d[propsSetup.nombre_barra]);

  actualizaEjeIzquierdo(eje_y.value, escalaLineal.value, ancho.value);
  actualizaEjeAbajo(eje_x.value, escalaBandas.value, alto.value);
  
})

</script>

<template>
  <div v-bind:id=barras_id class="contenedor-grafico">
    <slot name="encabezado"></slot>
    <div class="contenedor-tooltip-svg">
      <div class="tooltip">
        <div class="tooltip-contenido">
          <div class="contenedor-boton-cerrar">
            <button class="boton-cerrar-tooltip">
              &times;
            </button>
          </div>
          <div class="tooltip-cifras"></div>
        </div>
      </div>
      <div class="rotation-wrapper-outer">
        <div class="rotation-wrapper-inner">
          <div :style="{
            width: `${alto_vis - margen.arriba - margen.abajo}px`,
            transform: `rotate(-90deg)translateX(calc(-100% - ${.5 * margen.arriba}px))`
          }" class="element-to-rotate">
            <p style="padding:10px 0 5px 0" v-html="titulo_eje_y"></p>
          </div>
        </div>
      </div>
      <svg class="svg-grafico">
        <defs></defs>
        <g class="grupo-fondo" :transform="`translate(${this.margen.izquierda},${this.margen.arriba})`"></g>
        <g class="grupo-contenedor-de-grafico" :transform="`translate(${this.margen.izquierda},${this.margen.arriba})`">
          <g class="eje-x"></g>
          <g class="eje-y"></g>
        </g>
        <g class="grupo-frente" :transform="`translate(${this.margen.izquierda},${this.margen.arriba})`"></g>
      </svg>
      <div class="eje-x">
        <p :style="{
          padding: `${margen.abajo + 10}px ${margen.derecha}px 0 ${margen.izquierda + ancho_leyenda_y}px `
        }" v-html="titulo_eje_x"></p>
      </div>
    </div>
    <slot name="pie"></slot>
    <div v-show="logo_conacyt" class="grid-column-4 grid-column-6-esc">
      <a class="boton boton-conacyt" href="https://conacyt.mx/" target="_blank">
        <img src="https://conacyt.mx/wp-content/uploads/2021/10/logo_conacyt_con_sintagma_azul_completo.svg" alt="Conacyt"
          height="28px">
      </a>
    </div>
  </div>
</template>


<style lang="scss" scoped>
$border-radius-tarjeta: 10px;

svg.svg-grafico {
  position: absolute;
  top: 0;
}

svg.svg-grafico::v-deep text {
  font-family: "Montserrat";

}

div.contenedor-tooltip-svg {
  position: relative;

  svg {
    z-index: 1;
  }

  .rotation-wrapper-outer {
    display: table;

    .rotation-wrapper-inner {
      padding: 50% 0;
      height: 0;

      .element-to-rotate {
        display: block;
        transform-origin: top left;
        //transform: rotate(-90deg) translate(-100%);
        margin-top: -50%;
        font-size: 12px;
        text-align: center;
        font-weight: 600;
      }
    }
  }

  div.eje-x {
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 12px;
    text-align: center;
    font-weight: 600;
  }


  div.tooltip {
    color: #fff;
    font-size: 12px;
    position: absolute;
    z-index: 2;
    visibility: hidden;
  }

  div.tooltip::v-deep div.tooltip-cifras {
    padding-bottom: 5px;

    p {
      margin: 3px;

      span.nomenclatura-tooltip {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: solid 1px rgba(255, 255, 255, .7);
        display: inline-block;
      }
    }

  }

  div.tooltip div.contenedor-boton-cerrar {
    height: auto;
    display: flex;
    width: 100%;
    padding-top: 5px;
    font-weight: 600;
  }

  div.tooltip button.boton-cerrar-tooltip {
    background: #fff;
    border: none;
    font-size: 30px;
    line-height: .9;
    font-weight: 300;
    padding: 0 5px;
    border-radius: 5px;
    margin: 0 0 0 auto;

    @media (min-width: 768px) {
      display: none;
    }

    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
      float: right;
    }
  }
}
</style>
