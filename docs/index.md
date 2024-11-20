# sisdai-graficas

El proyecto sisdai-graficas es una biblioteca de componentes reutilizables de visualización de datos, desarrollados en de Vue y construidos con [D3.js](https://d3js.org). Esta biblioteca sigue las pautas del Sistema de Diseño y Accesibilidad para la Investigación [Sisdai](https://sisdai.conahcyt.mx/).

Se recomienda utilizar Vue **3.4.36** con el soporte para [Composition Api](https://vuejs.org/api/composition-api-setup.html) para garantizar la compatibilidad.

<section id="instalacion">

## Instalación

En la carpeta raíz de tu proyecto Vue, instala la biblioteca como una dependencia utilizando el siguiente comando npm:

```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas
```

Si necesitas instalar una versión específica de la biblioteca, reemplaza N.N.N con el número de versión deseado, por ejemplo v5.0.0:

```bash
npm install git+https://codigo.conahcyt.mx/sisdai/sisdai-graficas#vN.N.N
```

### Instalación de estilos

Dado que los componentes están ligados con el estilo visual de [Sisdai](https://sisdai.conahcyt.mx/), es necesario incluir los estilos correspondientes. Lo siguiente es dar de alta los estilos de [Sisdai Css](https://codigo.conahcyt.mx/sisdai/sisdai-css) en el archivo de inicialización del proyecto.

Sigue estos pasos:

1. Abre el archivo de inicialización de tu proyecto, generalmente `src/main.js`.
2. Agrega la siguiente línea de importación para cargar los estilos:

```js
import 'sisdai-css/dist/sisdai.min.css'
```

### Importación de componentes

#### Registro de componentes específicos ​

Si no necesitas todos los componentes de la biblioteca, es recomendable importar y registrar solo aquellos que vas a utilizar. Para dar de alta de manera global en toda la aplicación:

1. Abre el archivo de inicialización de tu proyecto, generalmente `src/main.js`
2. Importa los componentes específicos y registrarlos

```js
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import { SisdaiGraficas, SisdaiDona } from 'sisdai-graficas/src/componentes'

app.use(SisdaiGraficas)
app.use(SisdaiDona)

app.mount('#app')
```

Por otra parte, si deseas usar estos componentes en un archivo, puedes importarlos de la siguiente manera en un archivo `.vue`:

```html

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

#### Registro global de todos los componentes​

Si planeas utilizar la mayoría o todos los componentes de la biblioteca, puedes registrarlos globalmente en tu aplicación para simplificar el proceso. Esta opción es conveniente debido a su simplicidad, pero solo se recomienda si realmente necesitas la mayoría de los componentes.

1. Abre el archivo de inicialización de tu proyecto, generalmente `src/main.js`.
2. Agrega la siguiente línea para registrar todos los componentes:

```js
import SisdaiGraficas from 'sisdai-graficas'

Vue.use(SisdaiGraficas)
```

Aunque esta forma es la más limpia en el código , solo es recomendable si se tiene claro que se están usando todos o la mayoría de los componentes.

</section>
