<script setup>
    import Nomenclatura from "../../.vitepress/components/opciones-avanzadas/nomenclatura-graficas.vue";
    import Checks from "../../.vitepress/components/opciones-avanzadas/checks-avanzadas.vue";
  import GloboInfo from "../../.vitepress/components/opciones-avanzadas/globo-informacion.vue"
  import Combinacion from "../../.vitepress/components/opciones-avanzadas/combinacion-graficas.vue"
  import Elementos from "../../.vitepress/components/opciones-avanzadas/elementos-fondo-frente.vue"
  import RotacionEjes from "../../.vitepress/components/opciones-avanzadas/rotacion-ejes.vue"
    import Narrativa from "../../.vitepress/components/opciones-avanzadas/narrativa-graficas.vue"
</script>

# Opciones avanzadas

En este apartado se exploran otras posibilidades que ofrece la biblioteca `sisdai-graficas` para personalizar las visualizaciones.

## Añadiendo nomenclatura

El componente `<SisdaiNomenclatura/>` se puede emplear para mostrar la nomenclatura asociada a una gráfica. Este componente sólo admite la propiedad variables. A continuación se muestra un ejemplo de su uso:

<Nomenclatura/>
<<< @/.vitepress/components/opciones-avanzadas/nomenclatura-graficas.vue

## Añadiendo checks

El componente `<SisdaiChecks/>` se puede emplear para mostrar la nomenclatura junto con controladores. Este componente sólo admite la propiedad variables y debe conectarse con la gráfica como se muestra en el siguiente ejemplo:

<Checks/>
<<< @/.vitepress/components/opciones-avanzadas/checks-avanzadas.vue

## Globo de información

El componente `<SisdaiGraficasGloboInfo/>` se puede emplear dentro del template `#globo-informacion` para mostrar la información de las visualizaciones. Actualmente sólo se ha implementado para gráficos de barras y donas. Puedes insertar los datos asociados a la posición del cursor haciendo una referencia a la gráfica y accediendo a la variable `datos_hover` cómo se muestra a continuación:

<GloboInfo/>
<<< @/.vitepress/components/opciones-avanzadas/globo-informacion.vue

## Combinación de gráficas

<Combinacion/>
<<< @/.vitepress/components/opciones-avanzadas/combinacion-graficas.vue

## Elementos de fondo y de frente

En este ejemplo se muestra cómo añadir elementos tanto al fondo como al frente de la gráfica, como dos rectángulos en el fondo y una línea en el frente. Esto se logra accediendo a las referencias expuestas `grupoFondo` y `grupoFrente` de `SisdaiGraficas`, junto con las escalas `escalaLineal` y `escalaBanda` de `SidadiCajasBigotes`

<Elementos/>
<<< @/.vitepress/components/opciones-avanzadas/elementos-fondo-frente.vue

## Rotación de ejes

En este ejemplo se implementa el uso de una función para rotar los ejes de la gráfica.

<RotacionEjes/>
<<< @/.vitepress/components/opciones-avanzadas/rotacion-ejes.vue

## Narrativa

El siguiente ejemplo muestra cómo se puede combinar el uso de `sisdai-graficas` con `sisdai-componentes` para construir una narrativa visual. Se recomienda consultar [sisdai-componentes](https://codigo.conahcyt.mx/sisdai/sisdai-componentes) para conocer más sobre el funcionamiento del componente `<SisdaiNarrativa>`

<Narrativa/>
<<< @/.vitepress/components/opciones-avanzadas/narrativa-graficas.vue
