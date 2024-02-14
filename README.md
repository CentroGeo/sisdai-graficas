# sisdai-graficas

El proyecto sisdai-graficas es una biblioteca de visualización de datos que forma parte del Sistema de
Diseño y Accesibilidad para la Investigación ([Sisdai](https://sisdai.conahcyt.mx)).

Cualquier persona puede hacer uso de esta biblioteca al clonarla e instalarla
en su equipo a través del **protocolo HTTPS**.

## Utilidades

- Homologa los estilos utilizando el sistema de diseño [Sisdai](https://sisdai.conahcyt.mx).
- Mejora la accesibilidad mediante el uso de html semántico y aplicando las reglas establecidad en [Sisdai](https://sisdai.conahcyt.mx).
- Facilita la actualización de elementos institucionales requeridos.
- Facilita y reduce el código de elementos para la visualización de datos.

## Instalación y uso

### Instala la biblioteca

En la carpeta principal de tu proyecto Vue, instala la biblioteca a las dependencias de tu proyecto con:

``` bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas
```

Dependiendo de la versión de la biblioteca a instalar, la instrucción anterior puede cambiar a:

``` bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas#vN.N.N
```

donde N.N.N indica el número de versión, por ejemplo v1.0.0

### Importa la biblioteca

En el archivo `main.js` de tu proyecto Vue, importa cada grafica que necesites de la biblioteca con:

```javascript
// src/main.js

import { SisdaiBarras } from "sisdai-graficas"
import 'sisdai-graficas/dist/sisdai-graficas.css';

Vue.use(SisdaiBarras)
```

### Uso

En cualquier vista en la sección `<template>` de tu proyecto puedes utilizar los componentes de la biblioteca que importaste, 
sin necesidad de volver a importarlo en el script. Por ejemplo:

```js
<template>

  <SisdaiBarras
      barras_id="..."
      :datos="[{...}]"
      :variables="[{...}]"
      nombre_color="..."
      nombre_barra="..."
      titulo_eje_x="..."
      titulo_eje_y="..."
  />

</template>
```

## Actualizarion de la biblioteca

Si actualmente utilizas la biblioteca y necesitas utilizar otra version de las gráficas, 
en la carpeta del proyecto en donde necesitas la actualización instala la version que requieres nuevamente

```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-componentes#vN.N.N
```

donde N.N.N indica el número de versión, por ejemplo v1.0.0

## Listado de gráficas

| Gráfica | Descripcion | Propiedades requeridas |
| ------- | ----------- | ----------- |
| SisdaiAreasApiladas | Componente para construir una gráfica de áreas apiladas | areas_apiladas_id="`texto`" :datos="`[{arreglo de objetos}]`" nombre_columna_horizontal="`texto`" :variables="`[{arreglo de objetos}]`" |
| SisdaiBarras | Componente para crear gráficas de barras, barras apiladas y barras agrupadas | barras_id="`texto`" :datos="`[{arreglo de objetos}]`" :variables="`[{arreglo de objetos}]`" nombre_color="`texto`" nombre_barra="`texto`" titulo_eje_x="`texto`" titulo_eje_y="`texto`" |
| SisdaiCajasBigotes | Componente para construir un gráfico de cajas y bigotes o también conocido como _Boxplot_ | caja_id="`texto`" :datos="`[{arreglo de objetos}]`" :variables="`{objeto}`" titulo_eje_x="`texto`" titulo_eje_y="`texto`" |
| SisdaiDiagramaProcesos | Componente para construir un gráfico de diagrama de procesos | :datos="`[{arreglo de objetos}]`"|
| SisdaiDonas | Componente para construir un gráfico de donas | dona_id="`texto`" :datos="`[{arreglo de objetos}]`" |
| SisdaiLineas | Componente para construir un gráfico de líneas cuyo eje horizontal es temporal, es decir una serie de tiempo | linea_id="`texto`" :datos="`[{arreglo de objetos}]`" nombre_columna_horizontal="`texto`" :variables="`[{arreglo de objetos}]`" |


## Uso local del proyecto

### Pasos previos recomendados

Para desarrollar este proyecto se usó [node.js](https://nodejs.org/en) como
entorno de ejecución de JavaScript. La opción recomendada para instalarlo es
[vía nvm](https://github.com/nvm-sh/nvm) que es el manejador de versiones de
node. Siguiendo este camino, también se instalará el manejador de paquetes
[npm](https://www.npmjs.com/). Dado lo anterior las instrucciones de instalación
y dependencias del proyecto se muestran aquí usando tanto npm, como nvm. 

Las gráficas de esta biblioteca están desarrolladas como [componentes](https://es.vuejs.org/v2/guide/components.html) de
[Vue.js](https://es.vuejs.org/) usando [D3.js](https://d3js.org/), por lo tanto se recomienda a la persona usuaria tener
conocimientos básicos de lo anterior así como de desarrollo en [JavaScript](https://www.javascript.com/).

### Dependencias

- [node.js (^18)](https://nodejs.org/en/download/)
- [npm (^9)](https://www.npmjs.com/get-npm)
- [Vue.js (2.6.11)](https://v2.vuejs.org/)

### Instalación 

Se puede clonar e instalar este proyecto en tu equipo
utilizando **solo el protocolo HTTPS**, es decir:

```bash
git clone https://codigo.conahcyt.mx/sisdai/sisdai-graficas.git
```

Establece la versión adecuada de npm y nvm (previamente instaladas).

```bash
nvm use 18
```

Instala las dependencias de la biblioteca.

```bash
npm install
```

### Documentación

Este proyecto cuenta con una documentación más extensa que aún está
en proceso de desarrollo. Es posible levantarla en un ambiente local con la
instrucción:

```bash
npm run docs:serve
```

## Licencia

**SOFTWARE LIBRE Y ESTÁNDARES ABIERTOS**

Sisdai y sisdai-graficas están alineadas a las disposiciones establecidas por
la Coordinación de Estrategia Digital Nacional (
DOF:06/09/2021) en donde se estipula que las "políticas y disposiciones tienen
como objetivo fortalecer el uso del software
libre y los estándares abiertos, fomentar el desarrollo de aplicaciones
institucionales con utilidad pública, lograr la
autonomía, soberanía e independencia tecnológicas dentro de la APF". En el
artículo 63 se explicita que "cuando se trate
de desarrollos basados en software libre, se respetarán las condiciones de su
licenciamiento original [...]".

Considerando lo anterior sisdai-graficas se publica bajo la licencia
[LGPLv3](https://www.gnu.org/licenses/lgpl-3.0.html). Dicha licencia se puede
consultar en el archivo _LICENSE_ de este repositorio.
Esta licencia se encuentra disponible en inglés porque aunque el Sisdai privilegia
el idioma español se respeta la versión original de acuerdo al proyecto
[GNU](https://www.gnu.org/licenses/licenses.html).

## Contribuir

Por el momento sólo quienes sean
parte de un equipo de investigación del capítulo de un [ENI](https://eni.conahcyt.mx)
podrán levantar issues en este repositorio. Mientras que el equipo del sistema de diseño [Sisdai](https://sisdai.conahcyt.mx/acerca-de) se encargará de mantenerlo.

