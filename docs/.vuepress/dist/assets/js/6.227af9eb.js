(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{536:function(a){a.exports=JSON.parse('[{"nombre":"Variable A","cantidad":100,"color":"#253494"},{"nombre":"Variable B","cantidad":120,"color":"#2c7fb8"},{"nombre":"Variable C","cantidad":60,"color":"#41b6c4"},{"nombre":"Variable D","cantidad":50,"color":"#7fcdbb"},{"nombre":"Variable E","cantidad":40,"color":"#c7e9b4"}]')},569:function(a,e,o){},614:function(a){a.exports=JSON.parse('[{"nombre":"Categoría A","cantidad":210,"color":"#54278f"},{"nombre":"Categoría B","cantidad":120,"color":"#756bb1"},{"nombre":"Categoría C","cantidad":85,"color":"#9e9ac8"},{"nombre":"Categoría D","cantidad":52,"color":"#dadaeb"}]')},615:function(a){a.exports=JSON.parse('[{"nombre":"Categoría 1","cantidad":550,"color":"#a63603"},{"nombre":"Categoría 2","cantidad":402,"color":"#e6550d"},{"nombre":"Categoría 3","cantidad":135,"color":"#fd8d3c"}]')},616:function(a,e,o){"use strict";o(569)},643:function(a,e,o){"use strict";o.r(e);var t=o(536),s=o(614),n=o(615),c={name:"donas-cambiando-base",data:function(){return{datos:t,base_seleccionada:1}},methods:{alternandoBase:function(){1==this.base_seleccionada?(this.base_seleccionada=2,this.datos=s):2==this.base_seleccionada?(this.base_seleccionada=3,this.datos=n):(this.base_seleccionada=1,this.datos=t)}}},i=(o(616),o(12)),d=Object(i.a)(c,(function(){var a=this,e=a.$createElement,o=a._self._c||e;return o("div",{attrs:{id:"app"}},[o("DadsigDonas",{ref:"donas_cambio_base",attrs:{datos:a.datos,dona_id:"donas_cambio_base",alto_vis:400}},[o("template",{slot:"encabezado"},[o("div",{staticClass:"encabezado"},[o("h3",{staticClass:"titulo-visualizacion"},[a._v("Título de gráfica con cambio de datos")]),a._v(" "),o("p",{staticClass:"fecha-actualizacion"},[a._v("Fecha: dd/mm/aaaa")])])]),a._v(" "),o("template",{slot:"pie"},[o("div",{staticClass:"pie"},[o("h3",{staticClass:"titulo-visualizacion"},[a._v("Pie de gráfica")]),a._v(" "),o("p",[a._v("Aliquam erat volutpat. In cursus ipsum purus. Quisque a pellentesque justo. Donec nec justo sodales,\n          dignissim leo consectetur, pulvinar leo. Aenean sodales a lacus eget porta.")]),a._v(" "),o("button",{on:{click:a.alternandoBase}},[a._v("Cambia la data")])])])],2)],1)}),[],!1,null,null,null);e.default=d.exports}}]);