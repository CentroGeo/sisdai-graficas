(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{657:function(a,t,s){"use strict";s.r(t);var n=s(12),e=Object(n.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"barras-horizontales"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#barras-horizontales"}},[a._v("#")]),a._v(" Barras horizontales")]),a._v(" "),s("p",[a._v("A continuación se describe la utilización del componente de visualización "),s("code",[a._v("<DadsigBarras/>")]),a._v(" para construir un gráfico de\nbarras horizontales.")]),a._v(" "),s("h2",{attrs:{id:"parametros"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#parametros"}},[a._v("#")]),a._v(" Parámetros")]),a._v(" "),s("p",[a._v("Se puede considerar este un caso particular de la visualización  de barras verticales apiladas, por\nlo tanto los parámetros obligatorios y opcionales descritos en la sección "),s("em",[a._v("Barras verticales apiladas")]),a._v(" serán los mismos\nque se deben de especificar para esta visualización y por lo tanto ya no se repetirán aquí.")]),a._v(" "),s("h2",{attrs:{id:"ejemplo-de-uso"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ejemplo-de-uso"}},[a._v("#")]),a._v(" Ejemplo de uso")]),a._v(" "),s("p",[a._v("Cuando los datos introducidos sólo describen una variable categorica y una variable numérica (métrica),\nel componente de visualizacion "),s("code",[a._v("<DadsigBarras/>")]),a._v(" construirá una gráfica de barras horizontales simples. Es importante que se agregue dentro de  los parámetros la orientación del componente: "),s("code",[a._v('orientacion="horizontal"')]),a._v(", así como el nombre correcto de "),s("code",[a._v('titulo_eje_x="Eje horizontal(numérico)"')]),a._v(" y "),s("code",[a._v('titulo_eje_y="Eje vertical (categórico)"')]),a._v(".")]),a._v(" "),s("p",[a._v("Por ejemplo, teniendo el siguientee arreglo para "),s("code",[a._v("datos")]),a._v(",")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"categoria"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Variable A"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"cantidad"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("120")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"categoria"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Variable B "')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"cantidad"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("150")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"categoria"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"Variable C "')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"cantidad"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[a._v("72")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),s("p",[a._v("y el arreglo "),s("code",[a._v("variables")]),a._v(" como sigue,")]),a._v(" "),s("div",{staticClass:"language-json extra-class"},[s("pre",{pre:!0,attrs:{class:"language-json"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"id"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"cantidad"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"nombre_colores"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"cantidad"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[a._v('"color"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[a._v('"#7fcdbb"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),s("div",{staticClass:"language-html extra-class"},[s("pre",{pre:!0,attrs:{class:"language-html"}},[s("code",[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token tag"}},[s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("<")]),a._v("DadsigBarras")]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v(":barras_id")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v("horizontales_simples"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v(":datos")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("[{categoria: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v("Variable A"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v(", cantidad: 120},\n                 {categoria: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v("Variable B"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v(", cantidad: 150},\n                 {categoria: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v("Variable C"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v(", cantidad: 72}]"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v(":nombre_barra")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v("categoria"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v(":nombre_color")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v("nombre_colores"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("titulo_eje_x")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("Eje horizontal (numérico)"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("titulo_eje_y")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("Eje vertical (categórico)"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v("orientacion")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("horizontal"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v(":tooltip_activo")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("true"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),a._v("\n        "),s("span",{pre:!0,attrs:{class:"token attr-name"}},[a._v(":variables")]),s("span",{pre:!0,attrs:{class:"token attr-value"}},[s("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[a._v("=")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')]),a._v("[{id:"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v("cantidad"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v(", nombre_colores:"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v("cantidad"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v(", color: "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v("#7fcdbb"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("'")]),a._v("}]"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v('"')])]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("/>")])]),a._v("\n")])])]),s("p",[a._v("Lo que producirá el siguiente gráfico de barras horizontales simples,")]),a._v(" "),s("barras-horizontales-simples")],1)}),[],!1,null,null,null);t.default=e.exports}}]);