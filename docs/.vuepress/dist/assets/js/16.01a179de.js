(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{560:function(a,o,e){},602:function(a,o,e){"use strict";e(560)},629:function(a,o,e){"use strict";e.r(o);var t=e(45),r=(e(25),e(108),e(233),e(234),e(37),e(528),e(74),e(24),e(7),e(537)),n=(e(0),e(532)),i=e(559),c={ene:"01",feb:"02",mar:"03",abr:"04",may:"05",jun:"06",jul:"07",ago:"08",sep:"09",oct:"10",nov:"11",dic:"12"},l={};Object.keys(c).map((function(a){return l[c[a]]=a})),n.map((function(a){if(a.fecha_1.includes("/")){var o=a.fecha_1.split("/");a.fecha_1=[o[0],c[o[1]],o[2]].join("-"),o=a.fecha_2.split("/"),a.fecha_2=[o[0],c[o[1]],o[2]].join("-")}}));var s={name:"areas-apiladas-slots-tooltip",components:{CheckboxColor:r.default},data:function(){return{datos_grafica:Array,casos_positivos:i.filter((function(a){return"00"==a.cve_ent})),alternar_absolutos_porcentaje:"porcentaje",formatoY:function(a){return a.toLocaleString("en")},variables:[{id:"Omicron",nombre:"Omicron",color:"#C2E7D9"},{id:"Delta",nombre:"Delta",color:"#A6CFD5"},{id:"Gamma",nombre:"Gamma",color:"#26408B"},{id:"Beta",nombre:"Beta",color:"#0F084B"},{id:"Alpha",npmbre:"Alpha",color:"#0D0221"}]}},mounted:function(){},beforeMount:function(){this.datos_grafica=Object(t.a)(n)},methods:{}},m=(e(602),e(12)),u=Object(m.a)(s,(function(){var a=this.$createElement,o=this._self._c||a;return o("div",[o("DadsigAreasApiladas",{attrs:{areas_apiladas_id:"streamgraphbasico",datos:this.datos_grafica,variables:[{id:"Omicron",nombre:"Omicron",color:"#C2E7D9"},{id:"Delta",nombre:"Delta",color:"#A6CFD5"},{id:"Gamma",nombre:"Gamma",color:"#26408B"},{id:"Beta",nombre:"Beta",color:"#0F084B"},{id:"Alpha",nombre:"Alpha",color:"#0D0221"}],alto_vis:300,nombre_columna_horizontal:"fecha_1",tooltip_activo:!1}})],1)}),[],!1,null,"1827c72b",null);o.default=u.exports}}]);