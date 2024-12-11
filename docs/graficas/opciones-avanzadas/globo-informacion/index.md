<script setup>
      import GloboInfo from "../../../.vitepress/components/opciones-avanzadas/globo-informacion.vue"

</script>

## Globo de información

El componente `<SisdaiGraficasGloboInfo/>` se puede emplear dentro del template `#globo-informacion` para mostrar la información de las visualizaciones. Actualmente sólo se ha implementado para gráficos de barras y donas. Puedes insertar los datos asociados a la posición del cursor haciendo una referencia a la gráfica y accediendo a la variable `datos_hover` cómo se muestra a continuación:

<GloboInfo/>
<<< @/.vitepress/components/opciones-avanzadas/globo-informacion.vue
