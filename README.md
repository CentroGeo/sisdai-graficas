# sisdai-graficas

El proyecto sisdai-graficas es una biblioteca de visualización de datos que forma parte del Sistema de
Diseño y Accesibilidad para la Investigación ([Sisdai](https://sisdai.conahcyt.mx)).

> **_Limitación de responsabilidad_**
>
> El presente es un proyecto en construcción, por tanto Conacyt no es responsable del uso y contenido del presente
> recurso, toda vez que se trata de una versión en su modalidad prueba, y no de una versión pública, por lo que una vez
> que sea lanzada la versión final, se invita a la persona usuaria a consultarla y validar sus requisitos.

## Utilidades

Las gráficas de esta biblioteca están desarrolladas como [componentes](https://es.vuejs.org/v2/guide/components.html) de
[Vue.js](https://es.vuejs.org/) usando [D3.js](https://d3js.org/), por lo tanto se recomienda a la persona usuaria tener
conocimientos básicos de lo anterior así como de desarrollo en [JavaScript](https://www.javascript.com/).

## Instalación y uso

### Instala la biblioteca

En la carpeta principal de tu proyecto Vue, instala la biblioteca en las dependencias de tu proyecto con:

``` bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas
```

Dependiendo de la versión de la biblioteca a instalar, la instrucción anterior puede cambiar a:

``` bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas#vN.N.N
```

(Sustituir `ruta_al_repositorio` por la ruta en local de la persona usuaria)

donde N.N.N indica el número de versión, por ejemplo v1.0.0

### Importa la biblioteca

Para poder utilizar un componente de visualización de esta biblioteca, es necesario importar y registrarlo en el
archivo `src/main.js` del proyecto (de Vue) a trabajar, por ejemplo en el siguiente script se está registrando e
importando el componente de `SisdaiBarras` de esta biblioteca (que construye una gráfica de barras).

```javascript
import Vue from 'Vue'
import App from './App.Vue'
import { SisdaiBarras } from 'sisdai-graficas'
import 'sisdai-graficas/dist/sisdai-graficas.css'

Vue.use(SisdaiBarras)
```

### Uso

En cualquier vista en la sección `<template>` de tu proyecto puedes utilizar los componentes de la biblioteca 
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

_Para un uso avanzado revisa la documentación._

## Actualización de la biblioteca

Si actualmente utilizas la biblioteca y necesitas utilizar otra versión de las gráficas, 
en la carpeta del proyecto instala la versión que requieres nuevamente

```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas#vN.N.N
```

donde N.N.N indica el número de versión, por ejemplo v1.0.0

## Listado de gráficas

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
  :datos="[
    {
      nombre_rectangulos: 'Nombre de variable 1',
      cantidad_1: 120,
      cantidad_2: 40,
      cantidad_3: 40,
    },
    {
      nombre_rectangulos: 'Nombre de variable 2',
      cantidad_1: 100,
      cantidad_2: 30,
      cantidad_3: 40,
    },
    {
      nombre_rectangulos: 'Nombre de variable 3',
      cantidad_1: 20,
      cantidad_2: 130,
      cantidad_3: 540,
    },
    {
      nombre_rectangulos: 'Nombre de variable 4',
      cantidad_1: 20,
      cantidad_2: 130,
      cantidad_3: 540,
    },
  ]"
  :variables="[
    { id: 'cantidad_1', nombre_colores: 'cantidad 1', color: 'yellow' },
    { id: 'cantidad_2', nombre_colores: 'cantidad 2', color: 'magenta' },
    { id: 'cantidad_3', nombre_colores: 'cantidad 3', color: 'blue' },
  ]"
  :nombre_barra="'nombre_rectangulos'"
  :nombre_color="'nombre_colores'"
/>
```

En el script anterior se especifican los parámetros del componente `SisdaiBarras` como pueden ser el `id`, los
datos que se usarán para construir las barras, las variables para construir la gráfica, etc. Una lista completa de los
parámetros usados en cada uno de los componentes de visualización se puede hallar en la [documentación en línea](https://sisdai.conacyt.mx/).

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

Para contribuir al proyecto, se pide que se haga por medio de los lineamientos de contribución de SALSA que se
pueden consultar [aquí](https://salsa.crip.conacyt.mx/guidelines/contribute/).

\*En los lineamientos de contribución se lista la rama _master_ como principal, sin embargo en este proyecto, dicha
rama es _main_.
