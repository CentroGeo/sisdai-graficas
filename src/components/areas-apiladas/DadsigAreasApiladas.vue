<template>
  <div :id="stream_graph_id" class="contenedor-stream-graph">    
    <div class="header-barras">
      <h3 v-if="titulo" class="titulo-visualizacion">{{ titulo }}</h3>
    </div>
    <div class="contenedor-svg">
      <div class="tooltip-fo">
        <div class="tooltip-contenido">
          <div class="contenedor-boton-cerrar">
            <p class="tooltip-encabezado"></p>
            <button class="boton-cerrar-tooltip" @click="mouseOutStreams">
              <!-- <img alt="Cerrar Tooltip" src="@/assets/imgs/cerrar.svg"> -->
            </button>
          </div>
          <hr class="no-margin">
          <p class="tooltip-positivos"></p>
          <hr class="no-margin">
          <p class="tooltip-cifra"></p>
          <div class="tooltip-contenido-ul"></div>
        </div>
      </div>
      <svg class="svg-streamgraph">
        <g class="grupo-contenedor-de-streams"></g>
        <g class="grupo-contenedor-de-ejes"></g>
        <g class="grupo-rect">
          <rect></rect>
        </g>
      </svg>
    </div>
    <div id="leyenda-streams-apilados">
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
    <div class="stream-footer">
      <!-- <PieComponenteLibreria :absoluto="true"/> -->
    </div>
    <!---<div id="leyenda-streams-apilados" >
      <p class="titulo-leyenda">{{titulo_leyenda}}</p>
      <label class="checkbox" v-for="(variable) in variables" :key="variable.id">
        <input type="checkbox" :value="variable.id" v-model="categorias_checkeadas">
        <span class="color" v-bind:style="{background: variable.color}"></span>
        <span class="nombre">{{variable.nombre}}</span>
      </label>
    </div>-->
  </div>
</template>

<script>
import * as d3 from 'd3';
import CheckboxColor from "./checkbox-color/CheckboxColor.vue";
import PieComponenteLibreria from './pie-componente-libreria/PieComponenteLibreria.vue';

export default {
  name: 'DadsigAreasApiladas',
  components: {
    CheckboxColor,
    PieComponenteLibreria
  },
  props: {
    nombre_variables: {
      type: Object,
    },
    titulo_leyenda: String,
    stream_graph_id: {
      type: String,
      default: () => 'streamgraph',
    },
    datos: {
      type: Array,
      default: () => [{fecha: '2021-01-01', "v": 120, cantidad_2: 30}],
    },
    datos_positivos: {
      type: Array,
      default: () => [{fecha: '2021-01-01', "v": 120, cantidad_2: 30}],
    },
    titulo: String,
    nombre_eje_y: String,
    nombre_eje_x: String,
    titulo_tooltip: {
      type: String,
      default: '',
    },
    variables: Array,
    ancho_tooltip: {
      type: Number,
      default: 250,
    },
    alto_vis: {
      type: Number,
      default: 200,
    },
    margen: {
      type: Object,
      default: () => ({
        arriba: 10,
        abajo: 40,
        izquierda: 60,
        derecha: 10,
      }),
    },


  },
  watch: {
    lista_filtros_activos(nv) {
      this.categorias_checkeadas = this.variables.map((d, i) => this.lista_filtros_activos[i] ? d.id : "").filter((d) => d != "");
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaStream();


      this.actualizandoStreams();
    },
    datos(nv) {
      this.datos = nv;
      let dict_meses = {
        'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04',
        'may': '05', 'jun': '06', 'jul': '07', 'ago': '08',
        'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
      }
      this.parseDate = d3.timeParse("%d-%m-%Y")
      this.datos.forEach((d) => {
        let fecha_sep = d.fecha_1.split("/")
        d.fech = this.parseDate([fecha_sep[0], dict_meses[fecha_sep[1]], fecha_sep[2]].join("-"))
      })
      this.lista_filtros_activos = this.variables.map(d => true);
      this.categorias_checkeadas = this.variables.map((d, i) => this.lista_filtros_activos[i] ? d.id : "").filter((d) => d != "");
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaStream();
      this.creandoStreams()


      this.reestablecerVista();
      this.actualizandoStreams();
    },

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
      tooltip_is_showing: false
    }
  ),
  mounted() {
    //this.boton_otras = document.getElementById('boton_otras');
    this.height_vis = this.alto_vis;

    this.lista_filtros_activos = this.variables.map(d => true);
    this.categorias_checkeadas = this.variables.map((d, i) => this.lista_filtros_activos[i] ? d.id : "").filter((d) => d != "");

    this.svg = d3.select(`div#${this.stream_graph_id} svg.svg-streamgraph`);
    this.grupo_contenedor = this.svg.select('g.grupo-contenedor-de-streams');
    this.grupo_contenedor_ejes = this.svg.select("g.grupo-contenedor-de-ejes");
    this.grupo_contenedor_rect = this.svg.select("g.grupo-rect")
    this.rect_over = this.grupo_contenedor_rect.select("rect")
      .style("fill-opacity", "0")
    this.texto_x = this.grupo_contenedor_ejes.append("text").text(this.nombre_eje_x).attr("class", "label-x").style("font-weight", "600")
    this.texto_y = this.grupo_contenedor_ejes.append("text").text(this.nombre_eje_y).attr("class", "label-y").style("font-weight", "600")


    this.eje_x = this.grupo_contenedor_ejes
      .append('g')
      .attr('class', 'eje-x');
    this.eje_y = this.grupo_contenedor_ejes
      .append('g')
      .attr('class', 'eje-y');
    this.linea_guia = this.grupo_contenedor_ejes.append("line").attr("class", "linea-guia").style("stroke", "#fff")
    this.configurandoDimensionesParaSVG();
    this.configurandoDimensionesParaStream();
    this.creandoStreams();
    this.actualizandoStreams();

    this.tooltip = d3.select("div#" + this.stream_graph_id + " div.tooltip-fo")
    window.addEventListener('resize', this.reescalandoPantalla);

  },
  methods: {
    quitaPon() {
      if (!this.lista_filtros_activos.includes(false)) {
        this.status_button = "Poner todos"
        this.lista_filtros_activos = this.lista_filtros_activos.map(() => false)
      } else {
        this.status_button = "Quitar todos"
        this.lista_filtros_activos = this.lista_filtros_activos.map(() => true)

      }
    },
    toggleTooltip (){
      this.tooltip_is_showing = !this.tooltip_is_showing;
    },
    configurandoDimensionesParaSVG() {
      window.innerWidth > 768 ? this.height_vis = 310 : this.height_vis = 350;
      this.width = document.getElementById(this.stream_graph_id).clientWidth
        - this.margen.izquierda - this.margen.derecha;
      this.height = this.height_vis - this.margen.arriba - this.margen.abajo;
      this.svg.attr('width', this.width + this.margen.izquierda + this.margen.derecha)
        .attr('height', this.height + this.margen.arriba + this.margen.abajo);

      this.grupo_contenedor
        .attr('transform', `translate(${this.margen.izquierda},${this.margen.arriba})`);
      this.grupo_contenedor_rect
        .attr('transform', `translate(${this.margen.izquierda},${this.margen.arriba})`);
      this.rect_over.attr('width', this.width + this.margen.izquierda + this.margen.derecha)
        .attr('height', this.height + this.margen.arriba + this.margen.abajo);

      this.grupo_contenedor_ejes
        .attr('transform', `translate(${this.margen.izquierda},${this.margen.arriba})`);

      window.innerWidth > 768 ? this.margen.abajo = 50 : this.margen.abajo = 80;

      this.texto_x
        .attr("transform", window.innerWidth > 768 ? `translate(${this.width * .5},${this.height + this.margen.abajo - 10})`:`translate(${this.width * .5},${this.height + this.margen.abajo - 20})`)
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .style("dominant-baseline", "hanging")

      this.texto_y

        .style("text-anchor", "middle")
        .attr("transform", `translate(${-45},${this.height * .5}) rotate(-90)`)
        .style("font-size", "10px")
        .style("dominant-baseline", "hanging")


    },
    calculoPorcentual() {
      this.data_porcentual = this.datos.map((d, i) => {
        let dic_ef = {};
        this.variables.map((dd) => {
          if (this.categorias_checkeadas.includes(dd.id)) {
            dic_ef[dd.id] = d3.sum(this.categorias_checkeadas.map(cat_check => this.datos[i][cat_check])) != 0 ? 100 * this.datos[i][dd.id] / d3.sum(this.categorias_checkeadas.map(cat_check => this.datos[i][cat_check])) : 0;
          } else {
            dic_ef[dd.id] = 0
          }

        })
        for (let z in this.nombre_variables) {
          dic_ef[this.nombre_variables[z]] = d[this.nombre_variables[z]]
        }

        return dic_ef
      })

    },
    configurandoDimensionesParaStream() {


      let dict_meses = {
        'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04',
        'may': '05', 'jun': '06', 'jul': '07', 'ago': '08',
        'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
      }
      let dict_meses_invert = {}
      Object.keys(dict_meses).map(d => dict_meses_invert[dict_meses[d]] = d);

      this.parseDate = d3.timeParse("%d-%m-%Y")

      this.calculoPorcentual()
      this.data_porcentual.forEach((d) => {
        let fecha_sep = d.fecha_1.split("/")
        d.fech = this.parseDate([fecha_sep[0], dict_meses[fecha_sep[1]], fecha_sep[2]].join("-"))
      })
      this.data_apilada = d3.stack()
        .keys(this.variables.map((d) => d.id))(this.data_porcentual);
      for (let i = this.variables.length - 1; i >= 0; i -= 1) {
        this.data_apilada[i].forEach((dd) => {
          dd.data = Object.assign({}, dd.data, {key: this.data_apilada[i].key});
        });
      }

      this.escalaY = d3.scaleLinear()
        .domain([0, d3.max(this.data_porcentual.map((d) => d3.sum(this.variables.map((dd) => d[dd.id]))))])
        .range([this.height, 0]);

      /* this.escalaX = d3.scaleBand()
        .domain(this.data_porcentual.map((d) => d[this.nombre_variables.nombre]))
        .range([0, this.width])
        .padding(0);
      */
      this.escalaX = d3.scaleTime()
        .domain(d3.extent(this.data_porcentual.map((d) => d.fech)))
        .range([0, this.width])

      this.linea_guia
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


      this.eje_y.attr('transform', `translate(${0},${0})`).transition().duration(100).call(
        d3.axisLeft(this.escalaY)
          .ticks(4)
          .tickFormat((d) => d + "%")
      )
      ;

      this.eje_x.call(d3.axisBottom(this.escalaX).tickFormat(d3.timeFormat("%d-%m-%Y")))
        .attr('transform', `translate(${0},${this.height})`);
      this.eje_x.select('path.domain').remove();
      this.eje_x.selectAll("text")
        .text(function(d){
          let dd = d3.select(this)._groups[0][0].textContent.split("-")
          return `${dd[0]}/${dict_meses_invert[dd[1]]}/ ${dd[2]}`
        })
        .attr("transform", window.innerWidth > 768 ? `translate(0,0)rotate(-20)` : `translate(0,0)rotate(-45)`)
        .style("text-anchor", `end`)
        .attr("dy", window.innerWidth > 768 ? `5` : `-2`)
        .attr("y", window.innerWidth > 768 ? `9` : `15`)

      this.eje_y.selectAll('path').remove()
      this.eje_y.selectAll('line').remove()

    },
    creandoStreams() {
      this.grupo_contenedor.selectAll("path.paths-streams")
        .remove()
      this.streams_apilados = this.grupo_contenedor
        .selectAll('gpaths')
        .data(this.data_apilada)
        .enter()
        .append('path')
        .attr('class', (d) => `${d.key} paths-streams`)
        .style('fill', (d, i) => this.variables[i].color)

      this.rect_over.on('mousemove', (evento, datum) => {
        this.mostrarTooltip(evento, datum)
      })

      this.svg
        .on('mouseleave', (event) => {
          if (window.innerWidth >= 769) {
            this.mouseOutStreams();
          }
        })

    },

    mouseOutStreams() {
      this.tooltip.style('visibility', 'hidden');

    },
    actualizandoStreams() {

      this.streams_apilados
        .data(this.data_apilada)
        .transition()
        .duration(500)
        .attr("d", this.area)

      this.eje_y.selectAll('line')
      //.attr('x1', this.width)
      //.style('stroke-dasharray', '3 2')
      //.style('stroke', '#707070');
      this.eje_y.select('path')
        .style('opacity', 0);
      this.eje_x.selectAll('line')
        .attr('y1', -this.height)
        .style('stroke-dasharray', '3 2')
        .style('stroke', '#707070')

    },
    reescalandoPantalla() {
      this.configurandoDimensionesParaSVG();
      this.configurandoDimensionesParaStream();
      this.actualizandoStreams();
    },
    mostrarTooltip(evento) {
      let bisecetDate = d3.bisector((d) => d.fech).left;
      let x0 = this.escalaX.invert(evento.layerX - this.margen.izquierda)
      let indice = bisecetDate(this.data_porcentual, x0, 1);
      let d0 = this.data_porcentual[indice - 1]
      let d1 = this.data_porcentual[indice];
      let datum = x0 - d0.fech > d1.fech - x0 ? d1 : d0;
      let total_muestras = d3.sum(this.categorias_checkeadas.map((d) => this.datos.filter((dd) => dd[this.nombre_variables.info_extra_1] == datum[this.nombre_variables.info_extra_1])[0][d]));
      // let cifras_variables = this.categorias_checkeadas.map((d) => `<li>
      //   <span class="span-tooltip-color" style="background: ${this.variables.filter(dd => dd.id == d)[0].color} "></span>
      //     ${this.variables.filter(dd => dd.id == d)[0].nombre} <b>${Math.round(10 * datum[d]) / 10}%</b>
      //     ${this.datos.filter((dd) => dd[this.nombre_variables.info_extra_1] == datum[this.nombre_variables.info_extra_1])[0][d]}
      //   </li>`)
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
        //.attr("x1", this.escalaX(semana)+ .5 * this.escalaX.bandwidth()).attr("x2", this.escalaX(semana) + .5 * this.escalaX.bandwidth())
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

      /*
        <p class="tooltip-encabezado">Nombre de variable 2 </p>
        <p class="tooltip-cifra">120 | <b> 29.3%<b></b></b></p>
        <div class="tooltip-contenido"></div>
      */
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
        .select('p.tooltip-cifra')
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
          .style('left', (evento.layerX < 0.5 * this.width ? evento.layerX + 20 : evento.layerX - this.ancho_tooltip - 20) + "px")
          .style('top', (this.height * .5 - .4 * parseInt(contenidoTooltip.style('height')) + this.margen.arriba) + "px");
      } else {
        this.tooltip
          .style('left', (this.width * .5 - .5 * parseInt(contenidoTooltip.style('width')) + this.margen.izquierda) + "px")
          .style('top', (this.height * .5 - .5 * parseInt(contenidoTooltip.style('height'))) + "px");
      }
    },

    reestablecerVista() {
      this.tooltip.style('visibility', 'hidden');
    },
  },
};
/* eslint-enable */
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$border-radius-tarjeta: 10px;
button.button-volver {
  background: #fff;
  color: #000;
  height: 40px;
  width: 40px;
  float: right;

  &:hover,
  &:focus {
    background: #000;
    color: #fff;
  }
}

.titulo-proyecto {
  padding: 10px 10px 0px 10px;
  text-align: right;
  font-size: 14px;
  display: inherit;
}

.titulo-visualizacion {
  font-size: 16px;
  padding: 10px;
  margin: 0;
}

p.instruccional {
  font-size: 12px;
  padding: 0 10px;
  margin: 5px 0;
}


.contenedor-svg {
  overflow-x: auto;
  width: 100%;
  position: relative;
  .tooltip-fo {
    visibility: hidden;
    position: absolute;
    color: #fff; // Color de tipografía blanca
    font-size: 12px !important;
  }
  .tooltip-contenido {
    .no-margin {
      margin: 5px 0px;
    }
    div.contenedor-boton-cerrar {
      height: auto;
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

    button.boton-cerrar-tooltip {
      background: none;
      border: none;
      padding: 0 0 0 5px;
      cursor: pointer;
      min-width: 35px;
      align-self: flex-start;
      @media (min-width: 769px) {
        display: none;
      }

      img {
        width: 30px;
        height: 30px;
      }
    }

    div.tooltip-contenido-ul:deep() {
      ul {
        margin: 0;
        padding: 5px 0 0 0;

        li {
          list-style: none;
          margin: 0 0 5px 0;
          font-size: 12px;

          &::before {
            background: transparent;
          }

          span.span-tooltip-color {
            transform: translateY(2px);
            width: 12px;
            height: 12px;
            display: inline-block;
            border-radius: 50%;
          }
        }
      }
    }

  }
}

div#leyenda-streams-apilados {
  border-radius: $border-radius-tarjeta;
  box-shadow: 0px -5px 5px -1px rgb(221, 221, 221);
  margin-top: 0;
  @media (min-width: 769px) {
    margin-top: 8px;
  }

  div.leyenda-stream {
    width: 100%;
    display: flex;

    p.titulo-leyenda {
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      flex: auto;
    }

    button.quita-pon {
      position: relative;
      right: 0px;
      margin: 5px 10px 5px auto;
      font-size: 12px;
      padding: 0 10px;
      color: #000;
      border: 1px solid #000000;
      border-radius: 5px;
      background: #fff;
    }
  }

  div.checks {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 10px;
    div.label-1 {
      margin-top: 10px;
      width: 50%;
      -ms-flex: 0 0 50%;
      flex: 0 0 50%;
      @media (min-width: 769px) {
        width: 11%;
        -ms-flex: 0 0 auto;
        flex: 0 0 auto;
        padding: 0;
      }
      max-width: 50%;
      padding: 0px 15px;
      display: flex;
      span.categoria-color {
        width: 25px;
        height: 25px;
        min-width: 25px;
        display: inline-block;
        border-radius: 50%;
        position: relative;
      }
      span.categoria-texto {
        display: inline-block;
        position: relative;
        padding-left: 5px;
        font-size: 10px;
        top: 50%;
        transform: translateY(-50%);
        margin-bottom: auto;
        @media (min-width: 769px) {
          width: 80px;
        }
      }
      &.active {
        color: #000;
      }
      &.inactive {
        color: gray;
        span.categoria-color {
          background: #dbdbdb !important;
        }
      }
    }
    .boton-info-otras {
      height: 20px;
      width: 20px;
      margin: 10px;
      border-radius: 50%;
      position: relative;
      .tooltip {
        background: #000;
        color: #fff;
        position: absolute;
        width: 300px;
        top: 35px;
        left: -250px;
        text-align: left;
        padding: 15px;
        border-radius: 8px;
        font-size: 12px;
        display: none;
        z-index: 1;
        @media (min-width: 769px) {
          width: 400px;
          top: -10px;
          left: 30px;
        }
        &.mostrar{
          display: block;
        }
        a {
          font-size: 12px;
        }
        // &::before{
        //   content: "";
        //   display: block;
        //   width: 0;
        //   height: 0;
        //   border-style: solid;
        //   border-width: 10px 15px 10px 0;
        //   border-color: transparent rgba(0,0,0,.8) transparent transparent;
        //   position: absolute;
        //   right: 24px;
        //   top: -18px;
        //   transform: rotate(90deg);
        //   @media (min-width: 769px) {
        //     transform: rotate(0deg);
        //     left: -15px;
        //     top: 0px;
        //   }
        // }
      }
    }
  }
  .notas {
    margin: 0 10px;
    hr {
      margin: 15px 0;
      border-top: 1px solid #ddd;
    }
    .titulo-notas {
      font-size: 14px;
      margin: 0;
    }
    .texto-notas {
      margin: 10px 0;
      .link-externo {
        font-size: 12px;
      }
    }
  }
}
.stream-footer {
  height: 40px;
}
</style>
