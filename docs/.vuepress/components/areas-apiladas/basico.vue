<template>
  <div>
    
    <SisdaiAreasApiladas
        areas_apiladas_id="streamgraphbasico"
        :datos="datos_grafica"
        :variables='[
          {"id":"Omicron","nombre":"Omicron", "color": "#C2E7D9"},
          {"id":"Delta","nombre":"Delta", "color":"#A6CFD5"},
          {"id":"Gamma","nombre":"Gamma","color": "#26408B"},
          {"id":"Beta","nombre":"Beta", "color": "#0F084B"},
          {"id":"Alpha","nombre":"Alpha", "color": "#0D0221"},
        ]'
        :alto_vis="300"
        nombre_columna_horizontal="fecha_1"
        :tooltip_activo="false"
    />
  
  </div>
</template>

<script>
import CheckboxColor from "./utils/CheckboxColor.vue";

import * as d3 from "d3";
import Variantes from './consorcio_variantes_voc.json';
import Variantes1 from './consorcio_variantes_voc.json';
let dict_meses = {
  'ene': '01', 'feb': '02', 'mar': '03', 'abr': '04',
  'may': '05', 'jun': '06', 'jul': '07', 'ago': '08',
  'sep': '09', 'oct': '10', 'nov': '11', 'dic': '12'
}
let dict_meses_invert = {}
Object.keys(dict_meses).map(d => dict_meses_invert[dict_meses[d]] = d);
Variantes.map((d) => {
  if(d.fecha_1.includes("/")){
    let fecha_sep = d.fecha_1.split("/")
    d.fecha_1 = [fecha_sep[0], dict_meses[fecha_sep[1]], fecha_sep[2]].join("-")
    fecha_sep = d.fecha_2.split("/")
    d.fecha_2 = [fecha_sep[0], dict_meses[fecha_sep[1]], fecha_sep[2]].join("-")
  }
  
})
import N_positivos from './N_positivos.json';

export default {
  name:"areas-apiladas-slots-tooltip",
  components:{CheckboxColor},
  
  data() {
    return {
      // diccionarioDatos: diccionarioNacional,
      
      datos_grafica: Array,
      casos_positivos: N_positivos.filter(d => d.cve_ent == "00"),
      alternar_absolutos_porcentaje: "porcentaje",
      formatoY: (d) => d.toLocaleString("en"),
      variables: [
        {"id":"Omicron","nombre":"Omicron", "color": "#C2E7D9"},
        {"id":"Delta","nombre":"Delta", "color":"#A6CFD5"},
        {"id":"Gamma","nombre":"Gamma","color": "#26408B"},
        {"id":"Beta","nombre":"Beta", "color": "#0F084B"},
        {"id":"Alpha","npmbre":"Alpha", "color": "#0D0221"},
      ]
    };
  },
  mounted(){
  },
  beforeMount(){
    this.datos_grafica = [...Variantes]
  },
  methods: {
  },
};
</script>
<style lang="scss" scoped>
$border-radius-tarjeta: 10px;
div.contenedor-areas-apiladas-slots-tooltip{
  width: 100%;
  border-radius: $border-radius-tarjeta;
  
  position: relative;

  div.pie{
    padding:5px;
    border-radius: $border-radius-tarjeta;
    box-shadow: 0px -5px 5px -1px rgb(221, 221, 221);
    margin-bottom: 10px;
  }
  div.encabezado{
    padding:5px;
    font-size: 16px;
    .titulo-visualizacion{
      margin: 5px 0 ;
      font-size: 16px
    }
  }
}
div.checks {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    overflow-x: scroll;
    padding-bottom: 20px;
    margin-left: 10px;
    margin-right: 10px;
    width: auto;
    div.label-1 {
      margin-top: 10px;
      flex: 0 0 auto;
      @media (min-width: 769px) {
        -ms-flex: 0 0 auto;
        padding: 0;
      }
      display: flex;
      span.categoria-color {
        width: 25px;
        height: 25px;
        min-width: 25px;
        display: inline-block;
        border-radius: 50%;
        position: relative;
      }
      span.categoria-texto {
        display: inline-block;
        position: relative;
        padding-left: 5px;
        font-size: 10px;
        top: 50%;
        transform: translateY(-50%);
        margin-bottom: auto;
        @media (min-width: 769px) {
          width: 80px;
        }
      }
      &.active {
        color: #000;
      }
      &.inactive {
        color: gray;
        span.categoria-color {
          background: #dbdbdb !important;
        }
      }
    }
    .boton-info-otras {
      height: 20px;
      width: 20px;
      margin: 10px;
      border-radius: 50%;
      position: relative;
      .tooltip {
        background: #000;
        color: #fff;
        position: absolute;
        width: 300px;
        top: 35px;
        left: -250px;
        text-align: left;
        padding: 15px;
        border-radius: 8px;
        font-size: 12px;
        display: none;
        z-index: 1;
        @media (min-width: 769px) {
          width: 400px;
          top: -10px;
          left: 30px;
        }
        &.mostrar{
          display: block;
        }
        a {
          font-size: 12px;
        }
        
      }
    }
  }
</style>