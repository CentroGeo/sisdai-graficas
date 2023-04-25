import  { axisLeft }  from "d3-axis"
import {transition} from "d3-transition"

export default function(){
  function actualizaEjeIzquierdo(eje, escala, ancho, punteado=true){
    eje
    .transition()
      .duration(500)
      .call(axisLeft(escala).ticks(4))
    eje.select("path.domain").remove()
    /**
     * por defecto es true, ya que en la mayoría de gráficas se pintan lineas 
     * punteadas horizontales para guiar y resaltar las etiquetas de los ejes 
     */
    if( punteado == true){
      eje.selectAll("line")
        .attr("x1", ancho)
        .style("stroke-dasharray", "3 2")
        .style("stroke", "#707070")
    }
    else{
      eje.selectAll("line")
        .remove()
    }
    
    
  }
  

  return {
    actualizaEjeIzquierdo
  }
}