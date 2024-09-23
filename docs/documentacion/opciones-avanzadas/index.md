---
layout: Layout
sectionName: Opciones avanzadas
---

# Opciones avanzadas

En este apartado se exploran posibilidades que ofrece la biblioteca `sisdai-graficas` para personalizar gráficas.

## Añadiendo nomenclatura

El componente `<SisdaiNomenclatura/>` se puede emplear para mostrar la nomenclatura. Este componente sólo admite la propiedad variables, a continuación un ejemplo de sus uso.

<utils-ejemplo-doc ruta="opciones-avanzadas/nomenclatura.vue"/>

## Añadiendo checks

El componente `<SisdaiChecks/>` se puede emplear para mostrar la nomenclatura junto con controladores. Este componente sólo admite la propiedad variables, y debe conectarse con la gráfica como se muestra en el siguiente ejemplo

<utils-ejemplo-doc ruta="opciones-avanzadas/checks.vue"/>

## Globo de información

El componente `<SisdaiGraficasGloboInfo/>` se puede emplear dentro del template `#globo-informacion` para mostrar la información de las visualizaciones. Por el momento sólo se ha implementado para barras y donas. Puedes insertar los datos asociados a la posición del cursor haciendo una referencia a la gráfica y accediendo a la variable `datos_hover` cómo se muestra a continuación.

<utils-ejemplo-doc ruta="opciones-avanzadas/globo-informacion.vue"/>

## Combinación de gráficas

<utils-ejemplo-doc ruta="opciones-avanzadas/combinacion.vue"/>

## Elementos de fondo y de frente

En este ejemplo se muestra cómo añadir elementos al fondo de la gráfica como son dos rectángulos y al frente como lo es una línea. Esto accediendo a las referencias expuestas `grupoFondo` y `grupoFrente` de `SisdaiGraficas` y a `escalaLineal` y `escalaBanda` de `SidadiCajasBigotes`

<utils-ejemplo-doc ruta="opciones-avanzadas/elementos.vue"/>

## Rotación de ejes

En este ejemplo se implementa el uso de una función para rotar ejes

<utils-ejemplo-doc ruta="opciones-avanzadas/rotacion-ejes.vue"/>

<utils-ejemplo-doc ruta="opciones-avanzadas/modificando-datos-checks.vue"/>

## Narrativa

El siguiente ejemplo muestra como se puede combinar el uso de `sisdai-graficas` con `sisdai-componentes` para construir una narrativa. Se recomienda consultar [sisdai-componentes](https://codigo.conahcyt.mx/sisdai/sisdai-componentes) para conocer más sobre el funcionamiento del componente `<SisdaiNarrativa>`

<utils-ejemplo-doc ruta="opciones-avanzadas/narrativa.vue"/>
