# Instalación

En la carpeta raíz de tu proyecto Vue, instala la biblioteca como una dependencia utilizando el siguiente comando npm:

**Opción A.** Desde el repositorio del [sisdai-graficas en npm](https://www.npmjs.com/package/@centrogeomx/sisdai-graficas).

En la línea de comando escribe

```bash
npm i @centrogeomx/sisdai-graficas
```

**Opción B.** Desde el repositorio de [sisdai-graficas en github.com](https://github.com/CentroGeo/sisdai-graficas).

En la línea de comando escribe

```bash
npm install git+https://github.com/CentroGeo/sisdai-graficas
```

## Instalación de estilos

Dado que los componentes están ligados con el estilo visual de [Sisdai](https://sisdai.conahcyt.mx/), es necesario incluir los estilos correspondientes. Lo siguiente es dar de alta los estilos de [Sisdai Css](https://github.com/CentroGeo/sisdai-css) en el archivo de inicialización del proyecto.

Sigue estos pasos:

1. Abre el archivo de inicialización de tu proyecto, generalmente `src/main.js`.
2. Agrega la siguiente línea de importación para cargar los estilos:

```js
import '@centrogeomx/sisdai-css'
```

## Importación de componentes

### Registro de componentes específicos ​

Si no necesitas todos los componentes de la biblioteca, es recomendable importar y registrar solo aquellos que vas a utilizar. Para dar de alta de manera global en toda la aplicación:

1. Abre el archivo de inicialización de tu proyecto, generalmente `src/main.js`
2. Importa los componentes específicos y registrarlos

```js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { SisdaiGraficas, SisdaiDona } from '@centrogeomx/sisdai-graficas'

app.use(SisdaiGraficas)
app.use(SisdaiDona)

app.mount('#app')
```

Por otra parte, si deseas usar estos componentes en un archivo, puedes importarlos de la siguiente manera en un archivo `.vue`:

```html

<script setup>
import SisdaiGraficas from '@centrogeomx/sisdai-graficas/src/componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiDona from '@centrogeomx/sisdai-graficas/src/componentes/sisdai-dona/SisdaiDona.vue'
<script>

<template>
  <SisdaiGraficas>
    <SisdaiDona/>
  </SisdaiGraficas>
</template>
```

### Registro global de todos los componentes​

Si planeas utilizar la mayoría o todos los componentes de la biblioteca, puedes registrarlos globalmente en tu aplicación para simplificar el proceso. Esta opción es conveniente debido a su simplicidad, pero solo se recomienda si realmente necesitas la mayoría de los componentes.

1. Abre el archivo de inicialización de tu proyecto, generalmente `src/main.js`.
2. Agrega la siguiente línea para registrar todos los componentes:

```js
import SisdaiGraficas from '@centrogeomx/sisdai-graficas'

Vue.use(SisdaiGraficas)
```

Aunque esta forma es la más limpia en el código , solo es recomendable si se tiene claro que se están usando todos o la mayoría de los componentes.
