import { transition } from 'd3-transition';

export default function(){
  function creaBarras(grupo, datos_apilados, variables, escalaBandas, escalaLineal, nombre_barra){
    grupo
    .selectAll(".g-rects")
    .data(datos_apilados)
    .join(
      (enter) =>
        enter.append("g"),
      null, // no update function
      (exit) => {
        exit.remove();
      }
    )
    .attr("class", (d) => `${d.key} g-rects`)
    .style("fill", (d, i) => variables[i].color)
    .selectAll("rect")
    .data(
      (d) => d)
    .join(
      (enter) =>
        enter
          .append("rect")
          .transition()
          .duration(500)
          .attr("width", escalaBandas.bandwidth)
          .attr("height", (d) => escalaLineal(d[0]) - escalaLineal(d[1]))
          .attr("x", (d) =>  escalaBandas(d.data[nombre_barra]))
          .attr("y", (d) => escalaLineal(d[1])),
      (join) => join,
      (exit) => {
        exit.remove();
      }
    )  
    .transition()
    .duration(500)
    .attr("width", escalaBandas.bandwidth)
    .attr("height", (d) => escalaLineal(d[0]) - escalaLineal(d[1]))
    .attr("x", (d) => escalaBandas(d.data[nombre_barra]))
    .attr("y", (d) => escalaLineal(d[1]))
        
    
  }
  return {
    creaBarras
  }
}