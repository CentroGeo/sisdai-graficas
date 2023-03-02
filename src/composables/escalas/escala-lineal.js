import  { scaleLinear }  from "d3-scale"

import { ref, watch } from 'vue'

export default function(dominio_lineal){

  const escalaLineal = ref();
  
  function creaEscalaLineal(rango){
    escalaLineal.value = scaleLinear()
      .domain(dominio_lineal.value)
      .range(rango)
  }

  watch(dominio_lineal, creaEscalaLineal)


  return {
    creaEscalaLineal,
    escalaLineal
  }
}