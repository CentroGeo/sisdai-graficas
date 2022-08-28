<template>
  <div :id="stream_graph_id" class="contenedor-stream-graph">    
    <slot name="encabezado"></slot>
    <div class="contenedor-tooltip-svg">
      <!--<div class="tooltip">
        <div class="tooltip-contenido">
          <div class="contenedor-boton-cerrar">
            <p class="tooltip-encabezado"></p>
            <button class="boton-cerrar-tooltip" @click="mouseOutStreams">
              &times;
            </button>
          </div>
          <hr class="no-margin">
          <p class="tooltip-positivos"></p>
          <hr class="no-margin">
          <p class="tooltip-cifra"></p>
          <div class="tooltip-contenido-ul"></div>
        </div>
      </div>-->
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
      <svg class="svg-streamgraph">
        
        <g class="grupo-fondo"></g>
        <g class="grupo-contenedor-de-streams"></g>
        <g class="grupo-contenedor-de-ejes"></g>
        
        <g class="grupo-frente">
					<g class="eje-x"></g>
        	<g class="eje-y"></g>
          <line class="guia-x"></line>
        </g>
      </svg>
      <div class="eje-x">
        <p :style="{
                    padding: `${margen.abajo +10}px ${margen.derecha}px 0 ${margen.izquierda + ancho_leyenda_y}px `
                }" v-html="titulo_eje_x"></p>
      </div>
    </div>
    <slot name="pie"></slot>
    <!---<div id="leyenda-streams-apilados">
      <div class="leyenda-stream">
        <p class="titulo-leyenda">{{ titulo_leyenda }}</p>
        <button class="quita-pon" @click="quitaPon">{{ status_button }}</button>
      </div>
      <div class="checks">
        <div v-for="(variable,i) in variables" :key="variable.id" class="label-1">
          <CheckboxColor v-model="lista_filtros_activos[i]" :color="variable.color">
            <span v-if="variable.nombre === 'variantes_restantes'"  class="categoria-texto">Otras variantes</span>
            <span v-else class="categoria-texto">{{ variable.nombre }}</span>
          </CheckboxColor>
          <button v-if="i === variables.length-1 && $store.getters.varianteSeleccionada === 'VTODAS'" 
            id="boton_otras"
            class="boton-info-otras" 
            @click="toggleTooltip"
            >
            <span>i</span>
            <div class="tooltip" :class="{ mostrar: tooltip_is_showing }">
              La categoría “otras variantes” hace referencia a las variantes que
              actualmente no pertenecen a ninguna de las clasificaciones VOC,
              VOI o VUM, debido a que sus niveles de circulación actual son poco
              significativas para la salud pública mundial, su presencia durante
              un periodo prolongado no ha resultado en una afectación de la
              situación epidemiológica general y/o no hay evidencia científica
              que demuestre que las variantes dentro de esta categoría poseen
              características preocupantes
              <a href="https://www.who.int/es/activities/tracking-SARS-CoV-2-variants">(OMS, 2022)</a>.
            </div>
          </button>
        </div>
      </div>
      <div class="notas">
        <hr />
        <h4 class="titulo-notas">Notas</h4>
        <p class="texto-notas">
          La gráfica muestra por cada semana epidemiológica del año 1) el número de muestras analizadas, así como a qué variante pertenecieron, según el día en que se tomó la muestra y 2) el número de casos positivos a COVID-19 registrados de acuerdo a la fecha de ingreso del paciente (datos obtenidos de la Secretaría de Salud DGE en Secretaría de Salud.DGE.
          <a
            class="link-externo"
            href="https://www.gob.mx/salud/documentos/datos-abiertos-152127"
            target="_blank"
            rel="noopener"
            >https://www.gob.mx/salud/documentos/datos-abiertos-152127</a>).
        </p>
      </div>
    </div>
    -->
    <div v-show="logo_conacyt" class="grid-column-4 grid-column-6-esc">
      <a class="boton boton-conacyt" href="https://conacyt.mx/" target="_blank">
        <img src="https://conacyt.mx/wp-content/uploads/2021/10/logo_conacyt_con_sintagma_azul_completo.svg" alt="Conacyt" height="28px">
      </a>
    </div>
    
  </div>
</template>

<script>
import * as d3 from 'd3';
import CheckboxColor from "./checkbox-color/CheckboxColor.vue";

export default {
  name: 'DadsigAreasApiladas',
  components: {
    CheckboxColor,
  },
  props: {
    stream_graph_id: String,
    datos: Array,
    variables: Array,
    titulo_eje_y: String,
    titulo_eje_x: String,
    
    
    nombre_variables: {
      type: Object,
    },
    nombre_columna_horizontal:String,
    conversionTemporal: {
      type: Function,
      default: d3.timeParse("%d-%m-%Y")
    },
    logo_conacyt: {
      type: Boolean,
      default: function () {
        return true
      }
    },
		tooltip_activo: {
			default: true,
			type: Boolean
		},
   
    ancho_tooltip: {
      type: Number,
      default: 250,
    },
    alto_vis: {
      type: Number,
      default: 200,
    },
		tickFormat:{
			default: (d) => d + "%",
			type: Function
		},
    margen: {
      type: Object,
      default: () => ({
        arriba: 10,
        abajo: 20,
        izquierda: 50,
        derecha: 10,
      }),
    },
    textoTooltip: {
      type: Function,
      default: function () {
        let total_muestras = d3.sum(this.variables.map((d) => this.tooltip_data_seleccionada[d.id]));
          let cifras_variables = this.variables.map((d) => `<p>
							<span class="nomenclatura-tooltip" style="background: ${d.color} "></span>
							${d.nombre} <b>${(this.tooltip_data_seleccionada[d.id]).toLocaleString("en")}</b>
							(${Math.round(100 * this.tooltip_data_seleccionada[d.id] / total_muestras)}%)
							</p>`)
          return `${cifras_variables.join("")}`

      }
    }


  },
  watch: {
    variables(nv) {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaStream();
      this.creandoStreams()
      this.actualizandoStreams();
    },
    datos() {

			console.log("cambiando datos")
      this.configurandoDimensionesParaSVG();
			this.configurandoDimensionesParaStream();
      this.creandoStreams()
      this.actualizandoStreams();
    },
		margen() {
      this.reescalandoPantalla()
    }

  },
  data: () => (
    {
      notas_open: false,
      orden_inicial: true,
      zoom_activo: 'hidden',
      width: 200,
      height: 0,
      height_vis: Number,
      lista_filtros_activos: Array,
      data_porcentual: [],
      status_button: "Quitar todos",
      tooltip_is_showing: false,
      width: 200,
      ancho_leyenda_y: 0,
      tooltip_data_seleccionada: Object
    }
  ),
  mounted() {
    //this.boton_otras = document.getElementById('boton_otras');
    this.alto_vis = this.alto_vis;

    /*this.lista_filtros_activos = this.variables.map(d => true);
    this.categorias_checkeadas = this.variables.map((d, i) => this.lista_filtros_activos[i] ? d.id : "").filter((d) => d != "");*/

    this.svg = d3.select(`div#${this.stream_graph_id} svg.svg-streamgraph`);
    this.grupo_contenedor = this.svg.select('g.grupo-contenedor-de-streams');
    
    
    
    this.grupo_frente = this.svg.select("g.grupo-frente")
    this.grupo_fondo = this.svg.select("g.grupo-fondo")

		this.eje_x = this.grupo_frente
        .select("g.eje-x");
    this.eje_y = this.grupo_frente
        .select("g.eje-y");
    
    this.guia_x = this.grupo_frente.select("line.guia-x").style("stroke","gray")

    this.configurandoDimensionesParaSVG();
    this.configurandoDimensionesParaStream();
    this.creandoStreams();
    this.actualizandoStreams();

    this.tooltip = d3.select("div#" + this.stream_graph_id + " div.tooltip")
    window.addEventListener('resize', this.reescalandoPantalla);

  },
  methods: {
    multiFormat(date) {
      /**
       * Método para traducir el formato de fecha
       */
      this.locale = d3.timeFormatLocale({
        "decimal": ",",
        "thousands": ".",
        "grouping": [3],
        "currency": ["€", ""],
        "dateTime": "%A, %e %B %Y г. %X",
        "date": "%d.%m.%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "days": ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        "shortDays": ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
        "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        "shortMonths": ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
      });
      this.formatMillisecond = this.locale.format(".%L");
      this.formatSecond = this.locale.format(":%S");
      this.formatMinute = this.locale.format("%I:%M");
      this.formatHour = this.locale.format("%I %p");
      this.formatDay = this.locale.format("%a %d");
      this.formatWeek = this.locale.format("%b %d");
      this.formatMonth = this.locale.format("%b");
      this.formatMonthYear = this.locale.format("%b/%Y");
      this.formatYear = this.locale.format("%Y");
      // console.log(date)
      return (d3.timeSecond(date) < date ? this.formatMillisecond
          : d3.timeMinute(date) < date ? this.formatSecond
              : d3.timeHour(date) < date ? this.formatMinute
                  : d3.timeDay(date) < date ? this.formatHour
                      : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? this.formatDay : this.formatWeek)
                          : d3.timeYear(date) < date ? this.formatMonthYear
                              : this.formatMonthYear)(date);
    },
    configurandoDimensionesParaSVG() {
      this.ancho_leyenda_y = document.querySelector("#" + this.stream_graph_id + " .rotation-wrapper-outer .element-to-rotate")
          .clientHeight

      this.ancho = document.querySelector(`#${this.stream_graph_id}`).clientWidth - this.margen.derecha - this.margen.izquierda - this.ancho_leyenda_y
      this.alto = this.alto_vis - this.margen.arriba - this.margen.abajo;

      this.svg
          .attr("width", this.ancho + this.margen.derecha + this.margen.izquierda)
          .attr("height", this.alto + this.margen.arriba + this.margen.abajo)
          .style("left", this.ancho_leyenda_y + "px");

      this.grupo_contenedor
          .attr("transform", `translate(${this.margen.izquierda},${this.margen.arriba})`)

      this.grupo_fondo
          .attr("transform", `translate(${this.margen.izquierda},${this.margen.arriba})`)

      this.grupo_frente
          .attr("transform", `translate(${this.margen.izquierda},${this.margen.arriba})`)


    },
    configurandoDimensionesParaStream() {
      this.datos.forEach((d) => {
        d.fech = this.conversionTemporal(d[this.nombre_columna_horizontal])
      })
      this.data_apilada = d3.stack()
        .keys(this.variables.map((d) => d.id))(this.datos);
      for (let i = this.variables.length - 1; i >= 0; i -= 1) {
        this.data_apilada[i].forEach((dd) => {
          dd.data = Object.assign({}, dd.data, {key: this.data_apilada[i].key});
        });
      }

      this.escalaY = d3.scaleLinear()
        .domain([0, d3.max(this.datos.map((d) => d3.sum(this.variables.map((dd) => d[dd.id]))))])
        .range([this.alto, 0]);


      this.escalaX = d3.scaleTime()
        .domain(d3.extent(this.datos.map((d) => d.fech)))
        .range([0, this.ancho])

      this.guia_x
        .attr("x1", 0)
        .attr("y1", this.escalaY(0))
        .attr("x2", 0)
        .attr("y2", this.escalaY(100))
        .style("stroke-opacity", 0)
      this.area = d3.area()
        //.x((d)=> this.escalaX.bandwidth()*.5  +this.escalaX(d.data[this.nombre_variables.nombre]))
        .x((d) => this.escalaX(d.data.fech))
        .y0((d) => this.escalaY(d[0]))
        .y1((d) => this.escalaY(d[1]))
        .curve(d3.curveLinear)


      this.eje_y.call(
          d3.axisLeft(this.escalaY)
            .ticks(4)
            .tickFormat(this.tickFormat)
        )
      this.eje_y.select("path").style("opacity", 0);
      this.eje_y.selectAll("line")
          .attr("x2", this.ancho)
          .style("stroke-dasharray", "3 2 ")
          .style("stroke", "gray");

      this.eje_x
        .call(
          d3.axisBottom(this.escalaX)
          .ticks(5)
          .tickFormat(this.multiFormat)
        )
				.attr("transform", `translate(${0}, ${this.alto})`);
      this.eje_x.selectAll("text")
          //.style("text-anchor","middle")
          .style("dominant-baseline", "middle");
      this.eje_x.selectAll('line')
        .attr('y1', -this.alto)
        .style('stroke-dasharray', '3 2')
        .style('stroke', '#707070')
      this.eje_x.select("path").remove()

      this.eje_y.selectAll('path').remove()
      this.eje_y.selectAll('line').remove()

    },
    creandoStreams() {
      this.grupo_contenedor.selectAll("path.paths-streams").remove();

      this.grupo_contenedor.selectAll("path.paths-streams")
        .remove()
      this.streams_apilados = this.grupo_contenedor
        .selectAll('gpaths')
        .data(this.data_apilada)
        .enter()
        .append('path')
        .attr('class', (d) => `${d.key} paths-streams`)
        .style('fill', (d, i) => this.variables[i].color)
      if (this.tooltip_activo) {

				this.svg.on('mousemove', (evento) => {
					this.mostrarTooltip(evento)
				})
				.on("mouseout", this.cerrarTooltip)
			}

    },

    actualizandoStreams() {

      this.streams_apilados
        .data(this.data_apilada)
        .transition()
        .duration(500)
        .attr("d", this.area)

      
      

    },
    reescalandoPantalla() {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaStream();
      this.actualizandoStreams();
    },
    mostrarTooltip(evento) {
      let bisecetDate = d3.bisector((d) => d.fech).left;
      let x0 = this.escalaX.invert(evento.layerX - this.margen.izquierda)
      let indice = bisecetDate(this.datos, x0, 1);
      let d0 = this.datos[indice - 1]
      let d1 = this.datos[indice];
      if (d0 != undefined & d1 != undefined) {
        this.tooltip_data_seleccionada = x0 - d0.fech > d1.fech - x0 ? d1 : d0;
        this.guia_x
          .transition().duration(100)
          .attr("x1", this.escalaX(this.tooltip_data_seleccionada.fech))
          .attr("x2", this.escalaX(this.tooltip_data_seleccionada.fech))
          .attr("y1", 0)
          .attr("y2", this.alto)
          .style("stroke-opacity", 1)

        this.tooltip
            .style("visibility", "visible")
              .style("left", evento.layerX > .5 * (this.ancho + this.margen.izquierda + this.margen.derecha) ? `${evento.layerX - this.ancho_tooltip + this.ancho_leyenda_y - 20}px` : `${evento.layerX + this.ancho_leyenda_y + 20}px`)
            .style("top", 0 + "px")
            .attr("width", this.ancho_tooltip)
            .attr("height", 30)

        const contenidoTooltip = this.tooltip.select('div.tooltip-contenido')
            .style('background', 'rgba(0, 0, 0,.8)')
            .style('min-width', this.ancho_tooltip)
            .style('border-radius', '8px')
            .style('width', `${this.ancho_tooltip}px`)
            .style("padding", "0 3px 0 10px")


        contenidoTooltip
            .select('div.tooltip-cifras')
            .html(this.textoTooltip())
            .style('margin', '0')
            .style("padding", "0 0 5px 0");

        this.tooltip
            .style("height", contenidoTooltip.style("height"))
            .style("width", contenidoTooltip.style("width"))
      }

      /*
      let datum = x0 - d0.fech > d1.fech - x0 ? d1 : d0;
      let total_muestras = d3.sum(this.categorias_checkeadas.map((d) => this.datos.filter((dd) => dd[this.nombre_variables.info_extra_1] == datum[this.nombre_variables.info_extra_1])[0][d]));
  

      let cifras_variables = this.categorias_checkeadas.map((d) =>  {
        if(this.variables.filter(dd => dd.id == d)[0].nombre === 'variantes_restantes'){
          return `<li>
            <span class="span-tooltip-color" style="background: ${this.variables.filter(dd => dd.id == d)[0].color} "></span>
            Otras variantes
            <b>${Math.round(10 * datum[d]) / 10}%</b>
            ${this.datos.filter((dd) => dd[this.nombre_variables.info_extra_1] == datum[this.nombre_variables.info_extra_1])[0][d]}
          </li>`
       } else {
        return `<li>
        <span class="span-tooltip-color" style="background: ${this.variables.filter(dd => dd.id == d)[0].color} "></span>
          ${this.variables.filter(dd => dd.id == d)[0].nombre} <b>${Math.round(10 * datum[d]) / 10}%</b>
          ${this.datos.filter((dd) => dd[this.nombre_variables.info_extra_1] == datum[this.nombre_variables.info_extra_1])[0][d]}
        </li>`
       }
      })
      this.linea_guia
        .transition().duration(100)
        .attr("x1", this.escalaX(datum.fech))
        .attr("x2", this.escalaX(datum.fech))
        .attr("y1", this.escalaY(0))
        .attr("y2", this.escalaY(100))
        .style("stroke-opacity", 1)


      this.tooltip.style('visibility', 'visible');
      this.tooltip
        .style('width', this.ancho_tooltip + "px")
        .style('height', 30 + "px");
      // Estilo del tooltip
      const contenidoTooltip = this.tooltip.select('div.tooltip-contenido')
        .style('background', 'rgba(0, 0, 0,.8)')
        .style('min-width', this.ancho_tooltip)
        .style('border-radius', '8px')
        .style('width', `${this.ancho_tooltip}px`)
        // Aquí se agrega padding o margen interno de 10px para todo el contenedor del contenido del tooltip
        .style('padding', '10px');


      contenidoTooltip
        .select('p.tooltip-encabezado')
        .html(`<b>Semana epidemiológica ${datum[this.nombre_variables.nombre].slice(2,4)} <br/>
          ${datum[this.nombre_variables.info_extra_1]} - ${datum[this.nombre_variables.info_extra_2]}
        </b>`)
        .style('margin', '0')
        .style('padding', '0 0 5px 0');

      // Casos positivos a COVID
      let casos_positivos;
      this.datos_positivos.map(d => { datum["se"] === d.se ? casos_positivos = d.positivos : '' })
      contenidoTooltip
        .select('p.tooltip-positivos')
        .html(`Casos positivos a COVID: <b>${casos_positivos.toLocaleString()}</b>`)
        .style('margin', '0')
        .style('padding', '0 0 5px 0');

      contenidoTooltip
        .select('p.tooltip-cifras')
        // Bold para las cifras y/o porcentajes
        .html(`Total de muestras: <b>${total_muestras.toLocaleString()}</b>`)
        .style('margin', '0')
        .style('padding', '0 0 5px 0');
      cifras_variables

      contenidoTooltip
        .select('div.tooltip-contenido-ul')
        .html(`<ul>${cifras_variables.join("")}</ul>`)
        .style('margin', '0')
        .style('padding', '0');
      console.log(contenidoTooltip.style('height'))
      this.tooltip
        .style('height', contenidoTooltip.style('height') + "px")
        .style('width', (parseInt(contenidoTooltip.style('width'), 10) + 13) + "px")
      if (window.innerWidth > 798) {
        this.tooltip
          .style('left', (evento.layerX < 0.5 * this.ancho ? evento.layerX + 20 : evento.layerX - this.ancho_tooltip - 20) + "px")
          .style('top', (this.alto * .5 - .4 * parseInt(contenidoTooltip.style('height')) + this.margen.arriba) + "px");
      } else {
        this.tooltip
          .style('left', (this.ancho * .5 - .5 * parseInt(contenidoTooltip.style('width')) + this.margen.izquierda) + "px")
          .style('top', (this.alto * .5 - .5 * parseInt(contenidoTooltip.style('height'))) + "px");
      }*/
    },

    cerrarTooltip() {
      this.tooltip.style('visibility', 'hidden');
    },
  },
};
/* eslint-enable */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

svg.svg-streamgraph {
  position: absolute;
  top: 0;
}

svg.svg-streamgraph::v-deep text {
  font-family: "Montserrat";
}

div.contenedor-tooltip-svg {
  position: relative;

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
