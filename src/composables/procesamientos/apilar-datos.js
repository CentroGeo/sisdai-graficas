import {stack} from "d3-shape";
import {ref, watch} from "vue";

export default function(datos, variables){
  const data_apilada = ref();
  function apilaDatos(){
    data_apilada.value = stack()
          .keys(variables.value.map(d => d.id))(datos.value)

  }
  apilaDatos()

  watch(datos, apilaDatos)
  watch(variables, apilaDatos)

  
  return {
    data_apilada
  }

}

