import {stack} from "d3-shape";
import {ref, watch} from "vue";

/**
 * Este composable toma los datos de entrada y el arreglo de variables para agrupar los datos
 * mediante una función de d3 que se llama stack, que es útil para gaficar barras apiladas 
 * o áreas apiladas entre otros 
 * @see https://github.com/d3/d3-shape#stacks
 */
export default function(datos, variables){
  const datos_apilados = ref();
  function apilaDatos(){
    datos_apilados.value = stack()
          .keys(variables.value.map(d => d.id))(datos.value)

  }
  apilaDatos()


  watch(datos, apilaDatos)
  watch(variables, apilaDatos)

  
  return {
    datos_apilados
  }

}

