import  { scaleBand }  from "d3-scale"

import { ref, watch } from 'vue'

export default function(dominio_bandas){
  const escalaBandas = ref();
  function creaEscalaBandas(rango, espaciado = .4){
    escalaBandas.value = scaleBand()
      .domain(dominio_bandas.value)
      .range(rango)
      .padding(espaciado)
  }
  
  watch(dominio_bandas, creaEscalaBandas)

  return {
    creaEscalaBandas,
    escalaBandas,
  }
}