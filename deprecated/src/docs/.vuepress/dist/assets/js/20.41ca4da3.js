(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{565:function(a,t,d){},611:function(a,t,d){"use strict";d(565)},643:function(a,t,d){"use strict";d.r(t);d(0);var e={name:"verticales-agrupadas-slots-tooltip",data:function(){return{algo:!0,datos:[{nombre_rectangulos:"Nombre de variable 1 ",cantidad_1_total:120,cantidad_2_total:40,cantidad_3_total:40,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0},{nombre_rectangulos:"Nombre de variable 2 ",cantidad_1_total:100,cantidad_2_total:30,cantidad_3_total:40,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0},{nombre_rectangulos:"Nombre de variable 3 ",cantidad_1_total:20,cantidad_2_total:130,cantidad_3_total:540,cantidad_1_porcentaje:30,cantidad_2_porcentaje:60,cantidad_3_porcentaje:10},{nombre_rectangulos:"Nombre de variable 4 ",cantidad_1_total:20,cantidad_2_total:130,cantidad_3_total:40,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0},{nombre_rectangulos:"Nombre de variable 5 ",cantidad_1_total:40,cantidad_2_total:130,cantidad_3_total:1,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0}],datos_1:[{nombre_rectangulos:"Nombre de variable 1 ",cantidad_1_total:120,cantidad_2_total:40,cantidad_3_total:40,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0},{nombre_rectangulos:"Nombre de variable 2 ",cantidad_1_total:100,cantidad_2_total:30,cantidad_3_total:40,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0},{nombre_rectangulos:"Nombre de variable 3 ",cantidad_1_total:20,cantidad_2_total:130,cantidad_3_total:540,cantidad_1_porcentaje:30,cantidad_2_porcentaje:60,cantidad_3_porcentaje:10},{nombre_rectangulos:"Nombre de variable 4 ",cantidad_1_total:20,cantidad_2_total:130,cantidad_3_total:40,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0},{nombre_rectangulos:"Nombre de variable 5 ",cantidad_1_total:40,cantidad_2_total:130,cantidad_3_total:1,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0}],datos_2:[{nombre_rectangulos:"Nombre de variable 1 ",cantidad_1_total:20,cantidad_2_total:40,cantidad_3_total:40,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0},{nombre_rectangulos:"Nombre de variable 2 ",cantidad_1_total:180,cantidad_2_total:30,cantidad_3_total:40,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0},{nombre_rectangulos:"Nombre de variable 3 ",cantidad_1_total:30,cantidad_2_total:130,cantidad_3_total:540,cantidad_1_porcentaje:40,cantidad_2_porcentaje:60,cantidad_3_porcentaje:0},{nombre_rectangulos:"Nombre de variable 4 ",cantidad_1_total:20,cantidad_2_total:130,cantidad_3_total:40,cantidad_1_porcentaje:33,cantidad_2_porcentaje:33,cantidad_3_porcentaje:33},{nombre_rectangulos:"Nombre de variable 5 ",cantidad_1_total:50,cantidad_2_total:130,cantidad_3_total:1,cantidad_1_porcentaje:50,cantidad_2_porcentaje:50,cantidad_3_porcentaje:0}],variables_ejemplo_basico:[{id:"cantidad_1_total",nombre_colores:"cantidad 1",color:"yellow"},{id:"cantidad_2_total",nombre_colores:"cantidad 2",color:"magenta"},{id:"cantidad_3_total",nombre_colores:"cantidad 3",color:"blue"}]}},mounted:function(){},methods:{cambiaDatos:function(){this.algo?(this.datos=this.datos_2,this.variables_ejemplo_basico=[{id:"cantidad_1_total",nombre_colores:"cantidad 1",color:"yellow"},{id:"cantidad_2_total",nombre_colores:"cantidad 2",color:"magenta"},{id:"cantidad_3_total",nombre_colores:"cantidad 2",color:"red"}]):(this.datos=this.datos_1,this.variables_ejemplo_basico=[{id:"cantidad_1_porcentaje",nombre_colores:"cantidad 1",color:"cyan"},{id:"cantidad_2_porcentaje",nombre_colores:"cantidad 2",color:"green"},{id:"cantidad_3_porcentaje",nombre_colores:"cantidad 2",color:"purple"}]),this.algo=!this.algo,this.$refs.barritas1.grupo_fondo.append("circle").style("fill","var(--variable)").attr("cx",.5*this.$refs.barritas1.ancho).attr("cy",.5*this.$refs.barritas1.alto).attr("r",.25*this.$refs.barritas1.alto)}}},o=(d(611),d(12)),n=Object(o.a)(e,(function(){var a=this.$createElement,t=this._self._c||a;return t("div",[t("SisdaiBarras",{attrs:{barras_id:"verticales_agrupadas_slots_tooltip",datos:[{nombre_rectangulos:"A",cantidad_1:120,cantidad_2:40,cantidad_3:40},{nombre_rectangulos:"B",cantidad_1:100,cantidad_2:30,cantidad_3:40},{nombre_rectangulos:"C",cantidad_1:90,cantidad_2:60,cantidad_3:40},{nombre_rectangulos:"D",cantidad_1:70,cantidad_2:60,cantidad_3:10},{nombre_rectangulos:"E",cantidad_1:40,cantidad_2:30,cantidad_3:80},{nombre_rectangulos:"F",cantidad_1:60,cantidad_2:50,cantidad_3:30}],variables:[{id:"cantidad_1",nombre_colores:"cantidad 1",color:"#ffffcc"},{id:"cantidad_2",nombre_colores:"cantidad 2",color:"#c7e9b4"},{id:"cantidad_3",nombre_colores:"cantidad 3",color:"#7fcdbb"}],nombre_barra:"nombre_rectangulos",nombre_color:"nombre_colores",titulo_eje_y:"Eje vertical (numérico)",titulo_eje_x:"Eje horizontal (categórico)",apiladas_o_agrupadas:"agrupadas"}},[t("template",{slot:"encabezado"},[t("div",{staticClass:"slot-encabezado"},[t("h4",[this._v("Título slots")]),this._v(" "),t("p",{staticClass:"slot-parrafo"},[this._v("\n          Tanto el título que aparece arriba, como este texto, se integran\n          como slot. Se puede estilizar segun las necesidades con un poco de\n          CSS o, en su momento, importando el sistema de diseño\n        ")])])]),this._v(" "),t("template",{slot:"pie"},[t("div",{staticClass:"slot-pie"},[t("h4",[this._v("Pie de gráfica")]),this._v(" "),t("p",{staticClass:"slot-parrafo"},[this._v("\n          Este otro bloque corresponde al slot de pie de gráfica, en donde\n          usualmente se ponen nomenclaturas, notas o controles, y también\n          puede modificarse con CSS según las necesidades.\n        ")])])])],2)],1)}),[],!1,null,"f16bedea",null);t.default=n.exports}}]);