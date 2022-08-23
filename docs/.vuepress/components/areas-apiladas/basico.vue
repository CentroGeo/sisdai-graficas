<template>
  <div>
    <div class="selectores-fijos">
        <div class="container main">
        <div class="selectores">
            <SelectorVariantes class="selector" />
            <SelectorEstados class="selector" />
        </div>
        </div>
    </div>
    <DadsigAreasApiladas
        v-if="estado_seleccionado=='00' && (['VTODAS','VOC','VOI'].includes(variante_seleccionada))"
        :titulo="tituloGrafica"
        :fecha_actualizacion="'Última actualización: '+fechaActualizacion"
        :datos="datos_grafica"
        :datos_positivos="casos_positivos"
        :nombre_variables="{ nombre: 'se', info_extra_1: 'fecha_1', info_extra_2: 'fecha_2' }"
        :variables="variables_graf"
        :alto_vis="300"
        titulo_leyenda="Variantes del virus SARS-CoV-2"
        nombre_eje_x="Fecha"
        nombre_eje_y="Distribución de variantes de la muestra"
    />
  </div>
</template>

<script>
import Variantes from './consorcio_variantes_todas.json';

import Variantes_voc from './consorcio_variantes_voc.json';
import Variantes_voi from './consorcio_variantes_voi.json';

import diccionarioColores from './diccionario-colores.json';

import N_positivos from './N_positivos.json';

let colores_all = {...diccionarioColores.VOC.variantes, ...diccionarioColores.VOI.variantes, ...diccionarioColores.VRESTANTES.variantes}

let variables_all = Object.keys(colores_all).map((d) => ({"id": d, "nombre": d, "color":colores_all[d]}));

let colores_voc = diccionarioColores.VOC.variantes;
let variables_voc = Object.keys(colores_voc).map((d) => ({"id": d, "nombre": d, "color":colores_voc[d]}));
// console.log(variables_all)

let colores_voi = diccionarioColores.VOI.variantes
let variables_voi = Object.keys(colores_voi).map((d) => ({"id": d, "nombre": d, "color":colores_voi[d]}));

export default {
name:"ejemplo-basico-areas-apiladas",
  data() {
    return {
      // diccionarioDatos: diccionarioNacional,
      datos_grafica: Variantes.filter(d => d.cve_ent == "00"),
      casos_positivos: N_positivos.filter(d => d.cve_ent == "00"),
      variables_graf: variables_all,
    };
  },
  computed: {
    fechaActualizacion() {
      return this.$store.getters.fechaActualizacion;
    },
    estado_seleccionado() {
      return this.$store.getters.estadoSeleccionado;
    },
    variante_seleccionada() {
      return this.$store.getters.varianteSeleccionada;
    },
    tituloGrafica() {
      if(this.variante_seleccionada === "VTODAS" ){
        return "Evolución de variantes del virus SARS-CoV-2"
      }
      return "Evolución de variantes del virus SARS-CoV-2"
    }
  },
  watch: {
    variante_seleccionada(nv){
      if( nv == "VOC") {
        this.datos_grafica = Variantes_voc;
        this.variables_graf  = variables_voc;
      }
      else if(nv == "VOI"){
        this.datos_grafica = Variantes_voi;
        this.variables_graf  = variables_voi;
      }
      else if(nv == "VTODAS"){
        this.datos_grafica = Variantes;
        this.variables_graf  = variables_all;
      }
    },
  }
};
</script>
