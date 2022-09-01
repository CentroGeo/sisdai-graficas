<template>
  <div>
    <DadsigAreasApiladas
      :areas_apiladas_id="id_stream"
      :datos="datos_grafica"
      :variables="variables"
      :alto_vis="300"
      nombre_columna_horizontal="fecha_1"
      titulo_eje_x="Fecha"
      titulo_eje_y="Distribución de variantes de la muestra"
      :tickFormat="formatoY"
      class="contenedor-areas-apiladas-slots-tooltip"
    >
    <template slot="encabezado">
      <div class="encabezado">
        <h3 class="titulo-visualizacion">Título de gráfica con cambio de datos</h3>
        <p class="fecha-actualizacion">Fecha: dd/mm/aaaa</p>
      </div>
    </template>
    

    <template slot="pie">
      <div class="pie">
        <p>Pie de la gráfica </p>
        <button @click="alternar_absolutos_porcentaje=='porcentaje' ? alternar_absolutos_porcentaje ='absolutos':alternar_absolutos_porcentaje = 'porcentaje'">{{alternar_absolutos_porcentaje}}</button>
        <div class="checks">
          <div v-for="(variable,i) in variables_all" :key="variable.id" class="label-1">
            <CheckboxColor v-model="lista_filtros_activos[i]" :color="variable.color">
              <span v-if="variable.nombre === 'variantes_restantes'"  class="categoria-texto">Otras variantes</span>
              <span v-else class="categoria-texto">{{ variable.nombre }}</span>
            </CheckboxColor>
          </div>
        </div>
      </div>
    </template>
    </DadsigAreasApiladas>
  </div>
</template>

<script>
import CheckboxColor from "./utils/CheckboxColor.vue";

import * as d3 from "d3";
import Variantes from './consorcio_variantes_todas.json';
import Variantes1 from './consorcio_variantes_todas.json';

import Variantes_voc from './consorcio_variantes_voc.json';
import Variantes_voi from './consorcio_variantes_voi.json';

import diccionarioColores from './diccionario-colores.json';

import N_positivos from './N_positivos.json';

let colores_all = {...diccionarioColores.VOC.variantes, ...diccionarioColores.VOI.variantes, ...diccionarioColores.VRESTANTES.variantes}

let variables_all = Object.keys(colores_all).map((d) => ({"id": d, "nombre": d, "color":colores_all[d]}));
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
export default {
  name:"areas-apiladas-slots-tooltip",
  components:{CheckboxColor},
  props: {
    id_stream: {
      type: String,
      default: "streamgraph1"
    },
  },
  data() {
    return {
      // diccionarioDatos: diccionarioNacional,
      
      datos_grafica: Array,
      casos_positivos: N_positivos.filter(d => d.cve_ent == "00"),
      variables_all: variables_all,
      variables: variables_all,
      lista_filtros_activos: variables_all.map(d => true),
      alternar_absolutos_porcentaje: "porcentaje",
      formatoY: (d) => d.toLocaleString("en")
      

    };
  },
  mounted(){
    this.categorias_checkeadas = variables_all.map((d, i) => this.lista_filtros_activos[i] ? d.id : "").filter((d) => d != "")
  },

  beforeMount(){
    this.datos_grafica = [...Variantes]
  },
  methods:{

    
  },
  watch: {
    lista_filtros_activos(nv) {
      this.variables = variables_all.filter((d, i) => this.lista_filtros_activos[i])
      this.categorias_checkeadas = this.variables.map((d, i) => this.lista_filtros_activos[i] ? d.id : "").filter((d) => d != "");
      
      if(this.alternar_absolutos_porcentaje =="absolutos"){
        let data_porcentual = [...Variantes].map((d)=>{
          var dict_ef = {};
          let total_muestras = d3.sum(this.variables.map(dd=>d[dd.id]));
          for(let i = 0 ; i<this.variables.length; i++){
            if(!total_muestras){dict_ef[this.variables[i].id] = 0;}
            else {dict_ef[this.variables[i].id] =100 * d[this.variables[i].id]/total_muestras}
          }
         
          dict_ef["se"] = d["se"];
          dict_ef["fecha_1"] = d["fecha_1"]
          dict_ef["fecha_2"] = d["fecha_2"]
          dict_ef["cve_ent"] = d["cve_ent"]
          dict_ef["ent"] = d["ent"]
          return dict_ef
          
        })
        this.formatoY = (d) => d + "%"
        
        this.datos_grafica = data_porcentual
      }

    },
    alternar_absolutos_porcentaje(nv,ov){
      if(ov =="porcentaje"){
        let data_porcentual = [...Variantes].map((d)=>{
          var dict_ef = {};
          let total_muestras = d3.sum(this.variables.map(dd=>d[dd.id]));
          for(let i = 0 ; i<this.variables.length; i++){
            if(!total_muestras){dict_ef[this.variables[i].id] = 0;}
            else {dict_ef[this.variables[i].id] =100 * d[this.variables[i].id]/total_muestras}
          }
         
          dict_ef["se"] = d["se"];
          dict_ef["fecha_1"] = d["fecha_1"]
          dict_ef["fecha_2"] = d["fecha_2"]
          dict_ef["cve_ent"] = d["cve_ent"]
          dict_ef["ent"] = d["ent"]
          return dict_ef
          
        })
        this.formatoY = (d) => d + "%"
        
        this.datos_grafica = data_porcentual
      }
      else{
        this.formatoY = (d) => d.toLocaleString("en")
        this.datos_grafica = [...Variantes1]
      }

    }
  }
};
</script>
<style lang="scss" scoped>
$border-radius-tarjeta: 10px;
div.contenedor-areas-apiladas-slots-tooltip{
  width: 100%;
  border: solid black 1px;
  border-radius: $border-radius-tarjeta;
  
  position: relative;

  div.pie{
    padding:5px;
    border-radius: $border-radius-tarjeta;
    box-shadow: 0px -5px 5px -1px rgb(221, 221, 221);
    margin-bottom: 10px;
    button {
      margin: 10px;
      font-size: 14px;
      font-family: Montserrat;
      padding: 5px 10px;
      &:hover {
        background: #141414;
        color: #fff;
      }
    }
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