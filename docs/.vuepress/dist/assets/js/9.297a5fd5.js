(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{531:function(a){a.exports=JSON.parse('[{"nombre_rectangulos":"A","cantidad_1":120,"cantidad_2":40,"cantidad_3":40},{"nombre_rectangulos":"B","cantidad_1":100,"cantidad_2":30,"cantidad_3":40},{"nombre_rectangulos":"C","cantidad_1":90,"cantidad_2":60,"cantidad_3":40},{"nombre_rectangulos":"D","cantidad_1":70,"cantidad_2":60,"cantidad_3":10},{"nombre_rectangulos":"E","cantidad_1":40,"cantidad_2":30,"cantidad_3":80},{"nombre_rectangulos":"F","cantidad_1":60,"cantidad_2":50,"cantidad_3":30}]')},532:function(a){a.exports=JSON.parse('[{"nombre_rectangulos":"A","cantidad_1":120,"cantidad_2":40,"cantidad_3":40,"cantidad_4":50,"cantidad_5":20},{"nombre_rectangulos":"B","cantidad_1":100,"cantidad_2":30,"cantidad_3":40,"cantidad_4":50,"cantidad_5":20},{"nombre_rectangulos":"C","cantidad_1":90,"cantidad_2":60,"cantidad_3":40,"cantidad_4":50,"cantidad_5":20},{"nombre_rectangulos":"D","cantidad_1":70,"cantidad_2":60,"cantidad_3":10,"cantidad_4":50,"cantidad_5":20},{"nombre_rectangulos":"E","cantidad_1":40,"cantidad_2":30,"cantidad_3":80,"cantidad_4":50,"cantidad_5":20},{"nombre_rectangulos":"F","cantidad_1":60,"cantidad_2":50,"cantidad_3":30,"cantidad_4":50,"cantidad_5":20},{"nombre_rectangulos":"G","cantidad_1":100,"cantidad_2":30,"cantidad_3":40,"cantidad_4":50,"cantidad_5":20},{"nombre_rectangulos":"H","cantidad_1":90,"cantidad_2":60,"cantidad_3":40,"cantidad_4":50,"cantidad_5":20},{"nombre_rectangulos":"I","cantidad_1":70,"cantidad_2":60,"cantidad_3":10,"cantidad_4":50,"cantidad_5":20},{"nombre_rectangulos":"J","cantidad_1":40,"cantidad_2":30,"cantidad_3":80,"cantidad_4":50,"cantidad_5":20},{"nombre_rectangulos":"K","cantidad_1":60,"cantidad_2":50,"cantidad_3":30,"cantidad_4":50,"cantidad_5":20}]')},566:function(a,d,c){},612:function(a,d,c){"use strict";c(566)},645:function(a,d,c){"use strict";c.r(d);var n=c(531),t=c(532),i={name:"verticales-apiladas-cambiando-base",data:function(){return{algo:!0,datos:n,variables:[{id:"cantidad_1",nombre_colores:"cantidad 1",color:"#ffffcc"},{id:"cantidad_2",nombre_colores:"cantidad 2",color:"#c7e9b4"},{id:"cantidad_3",nombre_colores:"cantidad 3",color:"#7fcdbb"}],base_seleccionada:1}},methods:{alternandoBase:function(){1==this.base_seleccionada?(this.base_seleccionada=2,this.datos=t,this.variables=[{id:"cantidad_1",nombre_colores:"cantidad 1",color:"#dadaeb"},{id:"cantidad_2",nombre_colores:"cantidad 2",color:"#bcbddc"},{id:"cantidad_3",nombre_colores:"cantidad 3",color:"#9e9ac8"},{id:"cantidad_4",nombre_colores:"cantidad 4",color:"#756bb1"},{id:"cantidad_5",nombre_colores:"cantidad 5",color:"#54278f"}]):(this.base_seleccionada=1,this.datos=n,this.variables=[{id:"cantidad_1",nombre_colores:"cantidad 1",color:"#ffffcc"},{id:"cantidad_2",nombre_colores:"cantidad 2",color:"#c7e9b4"},{id:"cantidad_3",nombre_colores:"cantidad 3",color:"#7fcdbb"}])}}},o=(c(612),c(12)),e=Object(o.a)(i,(function(){var a=this,d=a.$createElement,c=a._self._c||d;return c("div",[c("SisdaiBarras",{attrs:{barras_id:"verticales_apiladas_cambiando_base",datos:a.datos,margen:{arriba:10,abajo:20,derecha:10,izquierda:30},nombre_barra:"nombre_rectangulos",nombre_color:"nombre_colores",variables:a.variables,titulo_eje_x:"Eje horizontal (categórico)",titulo_eje_y:"Eje vertical (numérico)"}},[c("template",{slot:"encabezado"},[c("div",{staticClass:"encabezado"},[c("h3",{staticClass:"titulo-visualizacion"},[a._v("Título de gráfica con cambio de datos")]),a._v(" "),c("p",{staticClass:"fecha-actualizacion"},[a._v("Fecha: dd/mm/aaaa")])])]),a._v(" "),c("template",{slot:"pie"},[c("div",{staticClass:"pie"},[c("h3",{staticClass:"titulo-visualizacion"},[a._v("Pie de gráfica")]),a._v(" "),c("p",[a._v("Aliquam erat volutpat. In cursus ipsum purus. Quisque a pellentesque justo. Donec nec justo sodales,\n          dignissim leo consectetur, pulvinar leo. Aenean sodales a lacus eget porta.")]),a._v(" "),c("button",{on:{click:a.alternandoBase}},[a._v("Cambia la data")])])])],2)],1)}),[],!1,null,null,null);d.default=e.exports}}]);