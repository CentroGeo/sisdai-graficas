import  { axisBottom }  from "d3-axis"
import { transition } from 'd3-transition';

export default function(){
  function actualizaEjeAbajo(eje, escala, alto, punteado=false){
    eje
      .call(axisBottom(escala))
      .transition()
      .duration(500)
      .attr("transform", `translate(${0}, ${alto})`)
    eje.select("path.domain").remove()
    /**
     * por defecto es false, ya que en la mayoría de gráficas no se pintan lineas 
     * verticales para resaltar las etiquetas de los ejes
     */
    if( punteado == true){
      eje.selectAll("line")
        .attr("y1", -alto)
        .style("stroke-dasharray", "3 2")
        .style("stroke", "#707070")
    }
    else{
      eje.selectAll("line")
        .remove()
    }
        
    
  }
  return {
    actualizaEjeAbajo
  }
}