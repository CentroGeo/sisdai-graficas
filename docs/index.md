---
home: true
title: Documentación
---

# Documentación

El proyecto sisdai-graficas es una biblioteca de componentes de visualización de datos reutilizables de Vue, creados con [D3.js](https://d3js.org) y alineada al Sistema de Diseño y Accesibilidad para la Investigación [Sisdai](https://sisdai.conahcyt.mx/).

Para el uso se recomienda utilizar Vue **3.4.31** y el soporte para [Composition Api](https://vuejs.org/api/composition-api-setup.html).

<section id="instalacion">

## Instalación

En la carpeta principal de tu proyecto Vue, instala la biblioteca en las dependencias de tu proyecto con el paquete de instalación npm de la siguiente manera:

```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas
```

Dependiendo de la versión de la biblioteca a instalar, la instrucción anterior puede cambiar a:

```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas#vN.N.N
```

en donde N.N.N indica el número de versión, por ejemplo v5.0.0

### Instalación de estilos

Puesto que el estilo de los componentes está ligado a las reglas de [Sisdai](https://sisdai.conahcyt.mx/). Lo siguiente es dar de alta los estilos de [Sisdai Css](https://codigo.conahcyt.mx/sisdai/sisdai-css) en el archivo de inicialización del proyecto.

Si su proyecto tiene configurado el preprocesador `sass` o `scss`

```js
//generalmente es el archivo src/main.js

import 'sisdai-css/src/sisdai.scss'
```

### Importación de componentes

#### Alta de componentes específicos

Esta es la manera más recomendada de importar cuando no se usan todos los componentes y en lugar de ello sólo importamos y registramos aquellos que serán utilizados.

Para dar de alta de manera global en toda la aplicación:

```js
//generalmente es el arhivo src/main.js

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { SisdaiGraficas, SisdaiDona } from 'sisdai-graficas/src/componentes'

app.use(SisdaiGraficas)
app.use(SisdaiDona)

app.mount('#app')
```

Por otra parte, si deseas usar estos componentes en un archivo, puedes importarlos de la siguiente manera en un archivo `.vue`:

```vue

<script setup>
import SisdaiGraficas from 'sisdai-graficas/src/componentes/sisdai-graficas/SisdaiGraficas.vue'
import SisdaiDona from 'sisdai-graficas/src/componentes/sisdai-dona/SisdaiDona.vue'
<script>

<template>
  <SisdaiGraficas>
    <SisdaiDona/>
  </SisdaiGraficas>
</template>
```

#### Alta general

Para dar de alta de manera global todos los componentes biblioteca, se puede hacer desde el archivo `src/main.js` como se muestra a continuación.

```js
//generalmente es el arhivo src/main.js

import SisdaiGraficas from 'sisdai-graficas'

Vue.use(SisdaiGraficas)
```

Aunque esta forma es la más limpia en el código (porque se ahorra dar de alta cada componente), solo es recomendable si se tiene claro que se están usando todos o la mayoría de los componentes.

</section>
