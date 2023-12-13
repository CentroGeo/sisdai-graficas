# sisdai-graficas

Esta es una biblioteca de visualización de datos que forma parte del Sistema de
Diseño y Accesibilidad para la Investigación ([Sisdai](https://sisdai.conahcyt.mx)).

Cualquier persona puede hacer uso de esta biblioteca al clonarla e instalarla
en su equipo a través del **protocolo HTTPS**.

## Requerimientos

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

En cambio si se quiere instalar esta biblioteca para su uso en otro proyecto (de Vue) se puede hacer:

``` bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas
```

Dependiendo de la versión de la biblioteca a instalar, la instrucción anterior puede cambiar a:
``` bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas#vN.N.N
```
donde N.N.N indica el número de versión, por ejemplo v1.0.0

Así mismo también se puede agregar la biblioteca en el archio `package.json` de otro 
proyecto.



## Inicio rápido

### Registrando el componente en un proyecto de Vue

Para poder utilizar un componente de visualización de esta biblioteca, es necesario importar y registrarlo en el
archivo `src/main.js` del proyecto (de Vue) a trabajar, por ejemplo en el siguiente script se está registrando e
importando el componente de `SisdaiBarras` de esta biblioteca (que construye una gráfica de barras).

```javascript
import Vue from 'Vue'
import App from './App.Vue'
import {SisdaiBarras} from "sisdai-graficas";
import 'sisdai-graficas/dist/sisdai-graficas.css';

Vue.use(SisdaiBarras)

new Vue({
    render: h => h(App),
}).$mount('#app')
```

### Uso básico

Una vez instalado y registrado el componente, ya se puede usar dentro de un `<template>` de otros componentes o vistas
de Vue como se muestra a continuación.

```vue

<SisdaiBarras
    :barras_id="'mi_proyecto_de_barras'"
    :datos="
    [
      {nombre_rectangulos:'Nombre de variable 1', cantidad_1:120, cantidad_2:40, cantidad_3:40 },
	  {nombre_rectangulos:'Nombre de variable 2', cantidad_1:100, cantidad_2:30, cantidad_3:40 },
	  {nombre_rectangulos:'Nombre de variable 3', cantidad_1:20, cantidad_2:130, cantidad_3:540 },
	  {nombre_rectangulos:'Nombre de variable 4', cantidad_1:20, cantidad_2:130, cantidad_3:540 },
	]"
    :variables='
    [
	  {"id":"cantidad_1","nombre_colores":"cantidad 1","color":"yellow"},
	  {"id":"cantidad_2","nombre_colores":"cantidad 2","color":"magenta"},
	  {"id":"cantidad_3","nombre_colores":"cantidad 3","color":"blue"},
	]'
    :nombre_barra="'nombre_rectangulos'"
    :nombre_color="'nombre_colores'"
/>
```

En el script anterior se especifican los parámetros del componente `SisdaiBarras` como pueden ser el `id`, los
datos que se usarán para construir las barras, las variables para construir la gráfica, etc. Una lista completa de los
parámetros usados en cada uno de los componentes de visualización se puede hallar en
la [documentación en línea](https://sisdai.conahcyt.mx/).

## Licencia

**SOFTWARE LIBRE Y ESTÁNDARES ABIERTOS**

Sisdai y sisdai-componentes están alineadas a las disposiciones establecidas por
la Coordinación de Estrategia Digital Nacional (
DOF:06/09/2021) en donde se estipula que las "políticas y disposiciones tienen
como objetivo fortalecer el uso del software
libre y los estándares abiertos, fomentar el desarrollo de aplicaciones
institucionales con utilidad pública, lograr la
autonomía, soberanía e independencia tecnológicas dentro de la APF". En el
artículo 63 se explicita que "cuando se trate
de desarrollos basados en software libre, se respetarán las condiciones de su
licenciamiento original [...]".

Considerando lo anterior sisdai-componentes se publica bajo la licencia
[GPL3](https://www.gnu.org/licenses/gpl-3.0.html). Dicha licencia se puede
consultar en el archivo _LICENSE_ de este repositorio.
Esta licencia se encuentra disponible en inglés porque aunque el Sisdai privilegia
el idioma español se respeta la versión original de acuerdo al proyecto
[GNU](https://www.gnu.org/licenses/licenses.html).

## Contribuir

Por el momento sólo quienes sean
parte de un equipo de investigación del capítulo de un [ENI](https://eni.conahcyt.mx)
podrán levantar issues en este repositorio.
