<template>
  <div v-bind:id=barras_id class="contenedor-barras">
    <slot name="encabezado"></slot>
    <h1>Barras pruebas</h1>
    <div class="contenedor-tooltip-svg">
      <div class="tooltip">
        <div class="tooltip-contenido">
          <div class="contenedor-boton-cerrar">
            <button class="boton-cerrar-tooltip" @click="cerrarTooltip">
              &times;
            </button>
          </div>
          <div class="tooltip-cifras"></div>
        </div>
      </div>
      <div class="rotation-wrapper-outer">
        <div class="rotation-wrapper-inner">
          <div :style="{width: `${alto_vis - margen.arriba - margen.abajo}px`,
                    transform: `rotate(-90deg)translateX(calc(-100% - ${.5 * margen.arriba}px))`}" class="element-to-rotate">
            <p style="padding:10px 0 5px 0" v-html="titulo_eje_y"></p>
          </div>
        </div>
      </div>
      <svg class="svg-barras">
        <defs></defs>
        <g class="grupo-fondo"></g>
        <g class="grupo-contenedor-de-barras"></g>
        <g class="grupo-frente"></g>
      </svg>
      <div class="eje-x">
        <p :style="{
                    padding: `${margen.abajo +10 }px ${margen.derecha}px 0 ${margen.izquierda + ancho_leyenda_y}px `
                }" v-html="titulo_eje_x"></p>
      </div>
    </div>
    <slot name="pie"></slot>
    <div v-show="logo_conacyt" class="grid-column-4 grid-column-6-esc">
      <a class="boton boton-conacyt" href="https://conacyt.mx/" target="_blank">
        <img src="https://conacyt.mx/wp-content/uploads/2021/10/logo_conacyt_con_sintagma_azul_completo.svg" alt="Conacyt" height="28px">
      </a>
    </div>
  </div>
</template>

<script setup>
  const propiedades = {
    barras_id: String,
    datos: Array,
    variables: {
      type: Array,
      default: function () {
        return []
      }
    },
    orientacion: {
      type: String,
      default: 'vertical'
    },
    nombre_barra: String,
    nombre_color: String,
    titulo_eje_y: String,
    titulo_eje_x: String,
    ancho_tooltip: {
      type: Number,
      default: 195
    },
    margen: {
      type: Object,
      default: function () {
        return {arriba: 20, abajo: 50, izquierda: 60, derecha: 20}
      }
    },
    alto_vis: {
      type: Number,
      default: function () {
        return 250
      }
    },
    espaciado_barras: {
      type: Number,
      default: function () {
        return .3
      }
    },
    logo_conacyt: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    tooltip_activo: {
      type: Boolean,
      default: function () {
        return true
      }
    },
    textoTooltip: {
      type: Function,
      default: function () {
        var txt = []
        this.variables.map((d) => {
          txt.push(`<p><span class="nomenclatura-tooltip" style="background: ${d.color}"></span>
						${d[this.nombre_color]} | <b>${this.tooltip_data_seleccionada[d.id].toLocaleString("en")}</b> 
						</p>`)
        })

        return `<p>${this.tooltip_categoria}</p>
						${txt.reverse().join(" ")}`
      }
    },
    apiladas_o_agrupadas:{
      default: () => "apiladas",
      type: String
    },
    padding_agrupadas: {
      type: Number,
      default: () => .1
    }
  }
  
  const props = defineProps(["foo"])



</script>

<style lang="scss" scoped>
$border-radius-tarjeta: 10px;
svg.svg-barras {
  position: absolute;
  top: 0;
}

svg.svg-barras::v-deep text {
  font-family: "Montserrat";

}

div.contenedor-tooltip-svg {
  position: relative;
  svg{
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

  div.tooltip::v-deep
  div.tooltip-cifras {
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