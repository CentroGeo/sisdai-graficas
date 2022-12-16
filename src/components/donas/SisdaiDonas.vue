<template>
  <div v-bind:id="dona_id" class="contenedor-dona">
    <slot name="encabezado"></slot>
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
      <svg class="svg-dona">
        <defs></defs>
        <g class="grupo-contenedor-de-dona"></g>
        <g class="grupo-frente"></g>
      </svg>
    </div>
    <slot name="pie"></slot>
    <div v-show="logo_conacyt" class="grid-column-4 grid-column-6-esc">
      <a class="boton boton-conacyt" href="https://conacyt.mx/" target="_blank">
        <img
          src="https://conacyt.mx/wp-content/uploads/2021/10/logo_conacyt_con_sintagma_azul_completo.svg"
          alt="Conacyt"
          height="28px"
        />
      </a>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "SisdaiDonas",
  props: {
    dona_id: String,
    datos: Array,
    // tooltip_activo: {
    //   type: Boolean,
    //   default: function () {
    //     return true
    //   }
    // },
    logo_conacyt: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    ancho_tooltip: {
      type: Number,
      default: 100,
    },
    radio_interno: {
      type: Number,
      default: 0.18,
    },
    radio_externo: {
      type: Number,
      default: 0.32,
    },
    radio_texto: {
      type: Number,
      default: 0.33,
    },
    alto_vis: {
      type: Number,
    },
    textoTooltip: {
      type: Function,
      default: function () {
        return `${
          this.tooltip_data_seleccionada["nombre"]
        }<br>${this.tooltip_data_seleccionada["cantidad"].toLocaleString(
          "en"
        )} | <b>${
          Math.round(
            (1000 * this.tooltip_data_seleccionada["cantidad"]) /
              d3.sum(this.datos.map((d) => d.cantidad))
          ) /
            10 +
          "%"
        }<b>`;
      },
    },
  },
  watch: {
    datos: function (new_val, old_val) {
      this.configurandoDimensionesParaDona();
      if (new_val.length > old_val.length) {
        //Actualizamos paths
        this.segmentos = this.grupo_contenedor
          .selectAll("path")
          .data(this.data_para_pay);

        this.segmentos = this.segmentos
          .enter()
          .append("path")
          .style("cursor", "pointer")
          .merge(this.segmentos);

        this.segmentos.exit().remove();

        //Actualizamos textos
        this.textos_porcentajes = this.grupo_contenedor
          .selectAll("text")
          .data(this.data_para_pay);

        this.textos_porcentajes = this.textos_porcentajes
          .enter()
          .append("text")
          .merge(this.textos_porcentajes);

        this.textos_porcentajes.exit().remove();
      } else {
        this.segmentos.data(this.data_para_pay).exit().remove();

        this.textos_porcentajes.data(this.data_para_pay).exit().remove();
      }

      //Ajustes
      this.textos_porcentajes.style("fill-opacity", "1");
      // this.reestablecerVista();

      this.actualizandoDona();
    },
  },
  mounted() {
    this.svg = d3.select("#" + this.dona_id + " svg.svg-dona");
    this.grupo_contenedor = this.svg.select("g.grupo-contenedor-de-dona");
    this.tooltip = d3.select("div#" + this.dona_id).select("div.tooltip");

    this.configurandoDimensionesParaSVG();
    /*
     Creando la funcion y dimensiones para el pie:
     Es importante que el pie no tenga ninguna funcion sort y que las
     rebanadas hereden el orden de la base de datos para que los indices
     de las rebanadas coincidan con los indices de la nomenclatura
    */
    this.pie = d3.pie().sort(null);
    this.arc = d3.arc();
    this.arc_texto = d3.arc();

    this.configurandoDimensionesParaDona();
    this.creandoDona();
    this.actualizandoDona();

    window.addEventListener("resize", this.reescalandoPantalla);
  },
  destroyed() {
    window.removeEventListener("resize", this.reescalandoPantalla);
  },
  methods: {
    configurandoDimensionesParaDona() {
      let limites = d3.min([this.ancho, this.alto]);
      this.pie.value((d) => d.cantidad);
      this.data_para_pay = this.pie(this.datos);
      this.arc
        .innerRadius(limites * this.radio_interno)
        .outerRadius(limites * this.radio_externo);
      this.arc_texto
        .innerRadius(limites * this.radio_texto)
        .outerRadius(limites * this.radio_texto);
    },
    configurandoDimensionesParaSVG() {
      /*
        El ancho siempre es responsivo, pero el alto sí se puede delimitar siempre y cuando
        el alto sea menor que el ancho. Si lo que se busca es que haya un espacio en blanco
        más pronunciado arriba y/o abajo de la dona, lo ideal es especificar márgenes con css

      
      */
      this.ancho = document.getElementById(this.dona_id).clientWidth;
      if (this.alto_vis) {
        if (this.alto_vis < this.ancho) {
          this.alto = this.alto_vis;
        } else {
          this.alto = this.ancho;
        }
      } else {
        this.alto = this.ancho;
      }

      this.svg.attr("width", this.ancho).attr("height", this.alto);
      this.grupo_contenedor.attr(
        "transform",
        `translate(${this.ancho * 0.5}, ${this.alto * 0.5})`
      );
    },
    creandoDona() {
      this.segmentos = this.grupo_contenedor
        .selectAll("paths")
        .data(this.data_para_pay)
        .enter()
        .append("path")
        .style("cursor", "pointer");

      this.textos_porcentajes = this.grupo_contenedor
        .selectAll("allLabels")
        .data(this.data_para_pay)
        .enter()
        .append("text");
      this.svg
        .on("mousemove", (evento) => {
          this.mostrarTooltip(evento);
        })
        .on("mouseout", this.cerrarTooltip);
    },
    actualizandoDona() {
      this.segmentos
        .attr("d", this.arc)
        .attr("fill", (d) => d.data.color)
        .attr("class", (d, i) => "rebanada-" + i)
        .attr("stroke-opacity", 0);

      this.textos_porcentajes
        .text(
          (d) =>
            Math.round(
              (1000 * d.data.cantidad) /
                d3.sum(this.datos.map((d) => d.cantidad))
            ) /
              10 +
            "%"
        )
        .attr("class", (d, i) => "texto-" + i)
        .style("font-size", "20px")
        .style("fill", (d) => d.data.color)
        .style("font-weight", "700")
        .attr("transform", (d) => {
          var pos = this.arc_texto.centroid(d);
          return "translate(" + pos + ")";
        })
        .style("fill-opacity", 1)
        //
        // Los siguientes dos estilos alinean el texto segun el angulo en el que se encuentre
        .style("text-anchor", (d) => {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < Math.PI ? "start" : "end";
        })
        .style("dominant-baseline", (d) => {
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
          return midangle < 0.5 * Math.PI || midangle > 1.5 * Math.PI
            ? "auto"
            : "hanging";
        });
      if (this.tooltip_activo) {
        this.svg
          .on("mousemove", (evento) => {
            this.mostrarTooltip(evento);
          })
          .on("mouseout", this.cerrarTooltip);
      }
    },
    reescalandoPantalla() {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaDona();
      this.actualizandoDona();
    },
    mostrarTooltip(evento) {
      let x = evento.layerX - 0.5 * this.ancho;
      let y = evento.layerY - 0.5 * this.alto;
      let angulo = Math.atan(y / x) + 0.5 * Math.PI;
      if (x >= 0) {
        angulo = angulo;
      } else {
        angulo = angulo + Math.PI;
      }

      this.segmentos.style("fill-opacity", 0.25);
      var segmento_over = this.segmentos
        .filter((d) => d.startAngle <= angulo && angulo < d.endAngle)
        .style("fill-opacity", 1);

      this.textos_porcentajes.style("fill-opacity", 0.25);

      this.textos_porcentajes
        .filter((d) => d.startAngle <= angulo && angulo < d.endAngle)
        .style("fill-opacity", 1);

      let indice = segmento_over._groups[0][0].__data__.index;
      this.tooltip_data_seleccionada = this.datos[indice];
      this.tooltip
        .style("visibility", "visible")
        .style(
          "left",
          `${
            angulo < Math.PI
              ? evento.layerX - this.ancho_tooltip - 15
              : evento.layerX + 15
          }px`
        )

        .attr("width", this.ancho_tooltip)
        .attr("height", 30);

      let contenido_tooltip = this.tooltip
        .select("div.tooltip-contenido")
        .style("background", "rgba(0, 0, 0, .8)")
        .style("min-width", this.ancho_tooltip)
        .style("border-radius", "8px")
        .style("width", this.ancho_tooltip + "px")
        .attr("height", 70)
        .style("padding", "0 3px 0 10px");

      contenido_tooltip
        .select("div.tooltip-cifras")
        .html(this.textoTooltip())
        .style("margin", "0")
        .style("padding", "0 0 5px 0");

      this.tooltip
        .style("height", contenido_tooltip.style("height"))
        .style("width", contenido_tooltip.style("width"));
      this.tooltip.style(
        "top",
        `${
          angulo > 0.5 * Math.PI && angulo < 1.5 * Math.PI
            ? evento.layerY - parseInt(contenido_tooltip.style("height")) - 10
            : evento.layerY + 15
        }px`
      );
    },
    cerrarTooltip() {
      this.tooltip.style("visibility", "hidden");
      this.segmentos.style("fill-opacity", "1");
      this.textos_porcentajes.style("fill-opacity", "1");
    },
  },
};
</script>

<style scoped lang="scss">
svg.svg-donas {
  position: absolute;
  top: 0;
}

svg.svg-donas::v-deep text {
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

  div.tooltip::v-deep div.tooltip-cifras {
    padding-bottom: 5px;

    p {
      margin: 3px;

      span.nomenclatura-tooltip {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: solid 1px rgba(255, 255, 255, 0.7);
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
    line-height: 0.9;
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
