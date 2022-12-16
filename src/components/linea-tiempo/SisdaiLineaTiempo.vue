<template>
  <div :id="id_linea_tiempo">
    timeline
    <div class="linea-de-tiempo tema-oscuro"></div>
    <svg>
      <g class="eje-x"></g>
      <g class="contenedor-objetos"></g>
      <g class="brush"></g>
    </svg>
  </div>
</template>
<script>
import * as d3 from "d3";
import { DataSet, Timeline } from "vis-timeline/standalone";
import "vis-timeline/styles/vis-timeline-graph2d.css";
export default {
  name: "SisdaiLineaTiempo",
  props: {
    eventos: {
      type: Array,
    },
    opciones: {
      default: {},
      type: Object,
    },
    id_linea_tiempo: {
      type: String,
    },
    alto_vis: {
      type: Number,
      default: 100,
    },
    margen: {
      type: Object,
      default: ()=> {return {
        arriba: 10,
        abajo: 20,
        derecha: 25,
        izquierda: 25,
      }},
      
    },
    conversionTemporal: {
      type: Function,
      default: d3.timeParse("%Y-%m-%d"),
    },
  },
  mounted() {
    // DOM element where the Timeline will be attached
    const container = document.querySelector(
      `#${this.id_linea_tiempo} .linea-de-tiempo`
    );
    // Create a Timeline
    this.timeline = new Timeline(
      container,
      new DataSet(this.eventos),
      this.opciones
    );
    this.timeline.on("rangechanged", this.rangoModificadoTL)


    this.ancho =
      document.querySelector(`#${this.id_linea_tiempo}`).clientWidth -
      this.margen.derecha -
      this.margen.izquierda
    
    this.alto = this.alto_vis - this.margen.arriba - this.margen.abajo;
    this.svg = d3.select(`#${this.id_linea_tiempo} svg`);
    this.brush = d3
      .brushX()
      .extent([
        [0, 0],
        [this.ancho, this.alto],
      ])
      .on("end", this.brushed);
    this.svg
      .attr("width", this.ancho + this.margen.derecha + this.margen.izquierda)
      .attr("height", this.alto + this.margen.arriba + this.margen.abajo)
      .style("left", this.ancho_leyenda_y + "px");
    this.eje_x = this.svg.select("g.eje-x")
      .attr(
        "transform",
        `translate(${this.margen.izquierda},${this.alto + this.margen.arriba})`
      ) 
    this.rect_fondo = this.eje_x.append("rect")
      .attr("class","fondo") 
    this.g_contenedor_objetos = this.svg.select("g.contenedor-objetos")
      .attr(
        "transform",
        `translate(${this.margen.izquierda},${this.margen.arriba})`
      )
    this.configurandoEscalas()
    this.creandoObjetos()
    this.actualizandoObjetos()
    this.g_brush = this.svg.select("g.brush")
      .attr(
        "transform",
        `translate(${this.margen.izquierda},${this.margen.arriba})`
      )
      .call(this.brush)
      .call(this.brush.move, this.escalaX.range());
    
      
   
      
  },
  methods: {
    multiFormat(date) {
      /**
       * Método para traducir el formato de fecha
       */
      this.locale = d3.timeFormatLocale({
        decimal: ",",
        thousands: ".",
        grouping: [3],
        currency: ["€", ""],
        dateTime: "%A, %e %B %Y г. %X",
        date: "%d.%m.%Y",
        time: "%H:%M:%S",
        periods: ["AM", "PM"],
        days: [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado",
        ],
        shortDays: ["Dom", "Lun", "Mar", "Mi", "Jue", "Vie", "Sab"],
        months: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ],
        shortMonths: [
          "ene",
          "feb",
          "mar",
          "abr",
          "may",
          "jun",
          "jul",
          "ago",
          "sep",
          "oct",
          "nov",
          "dic",
        ],
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
      return (
        d3.timeSecond(date) < date
          ? this.formatMillisecond
          : d3.timeMinute(date) < date
          ? this.formatSecond
          : d3.timeHour(date) < date
          ? this.formatMinute
          : d3.timeDay(date) < date
          ? this.formatHour
          : d3.timeMonth(date) < date
          ? d3.timeWeek(date) < date
            ? this.formatDay
            : this.formatWeek
          : d3.timeYear(date) < date
          ? this.formatMonthYear
          : this.formatMonthYear
      )(date);
    },
    configurandoEscalas() {
      this.escalaX = d3
        .scaleTime()
        .domain([this.opciones.min, this.opciones.max])
        .range([0, this.ancho]);

      this.eje_x
        .call(d3.axisBottom(this.escalaX).ticks(5).tickFormat(this.multiFormat))
      
    },
    creandoObjetos(){
      this.rectangulos = this.g_contenedor_objetos
        .selectAll("rects-background")
        .data(this.eventos.filter(d=> d.type=="background"))
        .enter()
        .append("rect")
      this.rango_tiempo = this.g_contenedor_objetos
        .selectAll("rects-background")
        .data(this.eventos.filter(d=> d.type!="background" && d.end))
        .enter()
        .append("line")
      
      this.eventos = this.g_contenedor_objetos
        .selectAll("rects-background")
        .data(this.eventos.filter(d=> !d.end))
        .enter()
        .append("line")
      console.log(this.eventos.filter(d=> d.type=="background"))
    },
    actualizandoObjetos(){
      this.rect_fondo
        .attr("x", 0)
        .attr("y", -this.alto)
        .attr("width", this.ancho)
        .attr("height", this.alto)
        .style("fill","black")
      this.rectangulos
        .attr("x",d => this.escalaX(this.conversionTemporal(d.start)))
        .attr("y",0)
        .attr("width",d=>this.escalaX(this.conversionTemporal(d.end)) - this.escalaX(this.conversionTemporal(d.start)))
        .attr("height", this.alto)
        .attr("class",d=>d.className)
      this.rango_tiempo
        .attr("x1",d => this.escalaX(this.conversionTemporal(d.start)))
        .attr("x2",d => this.escalaX(this.conversionTemporal(d.end)))

        .attr("y1",this.alto * .5)
        .attr("y2",this.alto * .5)
        .style("stroke","gray")
        .style("stroke-width", "2px")
      this.eventos
        .attr("x1",d => this.escalaX(this.conversionTemporal(d.start)))
        .attr("x2",d => this.escalaX(this.conversionTemporal(d.start)))

        .attr("y1",0)
        .attr("y2",this.alto)
        .style("stroke","gray")
        .style("stroke-width", "1px")
    },
    brushed(event) {
      let limites = event.selection.map(this.escalaX.invert)
      this.timeline.setWindow(limites[0], limites[1])
      
    },
    rangoModificadoTL(event){
      console.log(event)

      this.g_brush
        .transition()
        .duration(500)
        .call(this.brush.move, [this.escalaX(event.start),this.escalaX(event.end)]);

    }
  },
};
</script>
<style lang="scss" >
div.linea-de-tiempo {
  &.tema-oscuro {
    div.vis-timeline{
      background: #141414;
    }
    div.vis-time-axis.vis-foreground {
      background: #333333;
    }
    div.vis-text {
      color: #ffffff;
    }
    .vis-item.vis-box.vis-readonly{
      border: none;
      background:none;
      &.vis-selected{
        div.vis-item-content {
          border-color:#80AEFF;
          background-color: #676e9f;
        }
      }

      div.vis-item-content {
        position: relative;
        left: 50%;
        border-left: 4px solid #80AEFF;
        background-color: #373737;
        border-radius: 4px;
        white-space: normal;
        text-align: left;
        color: #fff;
      }
    }
    div.vis-item.vis-line.vis-selected {
      border-left-width: 2px;
      border-color:#80AEFF;
    }
    .vis-dot.vis-selected{
      border-color:#80AEFF;
    }

    .vis-item.vis-range.vis-readonly{
      &.vis-selected{
        border-color: #FF9864;
        background-color: #676e9f;
      }
      border: none;
      background-color: #373737;
      border-top: 4px solid #FF9864;
      div.vis-item-content {
        border-radius: 4px;
        white-space: normal;
        text-align: left;
        color: #fff;
        border: none;
      }
    }
    
    
    .vis-time-axis{
      .vis-grid.vis-major {
        border-width: 2px;
        border-color: #6F7271;
      }
      .vis-grid.vis-minor {
        border-width: 1px;
        border-color:#6F7271;
      }

    } 

  }
}
</style>