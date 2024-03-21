---
layout: LayoutDocumentacion
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

## Combinación de gráficas

<utils-ejemplo-doc ruta="opciones-avanzadas/combinacion.vue"/>

## Elementos de fondo y de frente

En este ejemplo se muestra cómo añadir elementos al fondo de la gráfica como son dos rectángulos y al frente como lo es una línea. Esto accediendo a las referencias expuestas `grupoFondo` y `grupoFrente` de `SisdaiGraficas` y a `escalaLineal` y `escalaBanda` de `SidadiCajasBigotes`

<utils-ejemplo-doc ruta="opciones-avanzadas/elementos.vue"/>

## Rotación de ejes

En este ejemplo se implementa el uso de una función para rotar ejes

<utils-ejemplo-doc ruta="opciones-avanzadas/rotacion-ejes.vue"/>

<utils-ejemplo-doc ruta="opciones-avanzadas/modificando-datos-checks.vue"/>
