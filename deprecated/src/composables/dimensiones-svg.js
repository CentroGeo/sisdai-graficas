import { ref } from 'vue'

export default function(){
  const ancho_leyenda_y = ref(0);
  const ancho = ref()
  const alto = ref()

  function configurandoDimensionesParaSVG(id_grafica, margen, alto_vis, svg){
    ancho_leyenda_y.value = document.querySelector(`#${id_grafica} .rotation-wrapper-outer .element-to-rotate`)
      .clientHeight;
    
    ancho.value = document.querySelector(`#${id_grafica}`).clientWidth - margen.derecha - margen.izquierda - ancho_leyenda_y.value
    alto.value = alto_vis - margen.arriba - margen.abajo;

    svg.value
      .attr("width", ancho.value + margen.derecha + margen.izquierda)
      .attr("height", alto.value + margen.arriba + margen.abajo)
      .style("left", ancho_leyenda_y.value + "px");

    svg.value.select(".grupo-contenedor-de-graficos")
      .attr("transform", `translate(${margen.izquierda},${margen.arriba})`)
    
    svg.value.select(".grupo-fondo")
      .attr("transform", `translate(${margen.izquierda},${margen.arriba})`)
    
      svg.value.select(".grupo-frente")
      .attr("transform", `translate(${margen.izquierda},${margen.arriba})`)
    
  }


  return {
    configurandoDimensionesParaSVG,
    ancho_leyenda_y,
    alto,
    ancho
  }

}