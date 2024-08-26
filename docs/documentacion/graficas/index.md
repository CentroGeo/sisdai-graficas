<script setup>
  import Basico from "../../.vitepress/components/graficas/basico.vue";
  import Editable from "../../.vitepress/components/graficas/editable-graficas.vue";

</script>

# SisdaiGraficas

El componente de `<SisdaiGraficas>` consiste en un contenedor en el cual se pueden agregar distintos tipos de gráficas. Este contenedor crea un svg con un id único, y en dicho svg se pintarán los subcomponentes de barras, series de tiempo, cajas, etc.

Uso:

```vue
<SisdaiGraficas
  :titulo_eje_y="'título del eje y'"
  :titulo_eje_x="'título del eje x'"
>
  ...
</SisdaiGraficas>
```

## API

### Propiedades

- `id`: Identificador único del componente que se asigna como atributo-selector `id` del elemento `html`
  - Tipo: `String`
  - Valor predeterminado: Se genera un identificador aleatorio al montar el componente
  - Requerido: no
- `margenes`: Objeto que especifica en píxeles la separación que habrá entre los bordes del SVG y los elementos gráficos como ejes
  - Tipo: `Object` con la estructura `{arriba: Number, abajo: Number, izquierda: Number, derecha: Number}`
  - Valor predeterminado:`{ arriba: 20, abajo: 20, derecha: 20, izquierda: 30 }`
  - Requerido: opcional
- `titulo_eje_y`: Título del eje vertical
  - Tipo: `String`
  - Valor predeterminado: `""`
  - Requerido: Opcional
- `titulo_eje_x`: Título del eje horizontal
  - Tipo: `String`
  - Valor predeterminado: `""`
  - Requerido: Opcional
- `ancho`: Por defecto el ancho del `SVG` se ajusta de forma responsiva al 100% del contenedor, pero si se desea especificar otro ancho en píxeles se puede usar esta propiedad.
  - Tipo: `Number`
  - Valor predeterminado: `Number`
  - Requerido: No
- `alto`: Por defecto el alto del `SVG` es de `400px`, pero si se desea usar otra altura en píxeles se puede usar esta propiedad.
  - Tipo: `Number`
  - Valor predeterminado: `400`
  - Requerido: No

### Slots

- **Slot principal**: Mediante este slot predeterminado se introducirán los componentes de gráficas de esta biblioteca, por ejemplo `<SisdaiBarras/>`.
- `panel-encabezado-vis`: En este slot se puede introducir contenido `HTML` en la parte superior del gráfico usando los estilos especificados para visualizaciones por el [Sisdai](https://sisdai.conahcyt.mx/), tales como títulos de gráfica, instrucción, fecha de actualización, etc.
- `panel-pie-vis`: En este slot se puede introducir contenido `HTML` en la parte inferior del gráfico usando los estilos especificados para visualizaciones por el [Sisdai](https://sisdai.conahcyt.mx/), tales como nomenclaturas, fuentes, etc.
- `globo-informacion`: En este slot se inserta el componente `<SisdaiGraficasGloboInfo/>` que sirve para mostrar información sobre el gráfico de forma interactiva. Puedes consultar más información <a href="/documentacion/globo-informacion" >aquí</a>.

### Métodos

- `obteniendoDimensiones`: Esta función toma el tamaño del contenedor o las propiedades `ancho` y `alto` en caso de haber sido especificadas, así como los tamaños de los contenedores del `titulo_eje_y` y `titulo_eje_x` y con ello asigna el tamaño del `SVG`.
- `siHayGlobo`: Se ejecuta si se está usando el slot `globo-informacion`, y en caso de ser así activará las funciones interactivas de `mousemove`, `click` y `mouseout`. Además almacenará la posición del cursor en el método y propiedad expuesta `grafica` que se menciona más adelante.
- `panelesEnUso`: Detecta si los slots `panel-pie-vis` o `panel-encabezado-vis` están siendo utilizados y agrega clases al elemento `HTML` para configurar estilos.
- `grafica`: Es un método expuesto que devuelve un objeto con información sobre el componente con los siguientes atributos:
  - `_alto`: `Number` altura del `SVG`
  - `_ancho`: `Number` ancho del `SVG`
  - `_globo_visible`: `Boolean` que indica si se está usando el slot `globo-informacion`
  - `_grupoVis`: `Object` con los valores de `alto` y `ancho` que corresponden al espacio en donde se graficará. Equivalen a las dimensiones del `SVG` `_alto` y `_ancho` una vez que se se restan los márgenes verticales y laterales respectivamente.
  - `_margenes`: `Object` igual a la propiedad `margenes`
  - `_posicion_cursor`: `Object` con los valores `x` y `y` correspondientes a la posición horizontal y vertical del cursor. Estos se actualizan de forma interactiva si se utiliza el slot `globo-informacion`.

### Propiedades expuestas

- `ancho_grafica`: `Number` altura del `SVG`
- `alto_grafica`: `Number` ancho del `SVG`
- `grafica`: `Function` método que devuelve información sobre el componente, el cual se describe arriba.
- `grupoFondo`: `Object` de tipo `Selection` de d3 asociada a un grupo `g.grupo-fondo` del `SVG` que está detrás del grupo en el que se va a graficar, y por lo tanto hereda todos los métodos de `Selection` de d3. Es un buen auxiliar cuando se desean agregar elementos gráficos en el fondo de la visualización.
- `grupoFrente`: `Object` de tipo `Selection` de d3 asociada a un grupo `g.grupo-frente` del `SVG` que está en frente del grupo en el que se va a graficar, y por lo tanto hereda todos los métodos de `Selection` de d3. Es un buen auxiliar cuando se desean agregar elementos gráficos al frente de la visualización.

## Ejemplos

### Ejemplo básico de componente

En este ejemplo se muestra cómo se escribe el componente `<SisdaiGraficas>` y se especifican algunas de sus propiedades. Una inspección de elementos deja ver que este componente simplemente crea un svg con algunos grupos en su interior.

<Basico/>
<<< @/.vitepress/components/graficas/basico.vue

### Ejemplo con propiedades dinámicas

En este ejemplo se agrega un rectángulo en el interior del svg que para ilustrar cómo se puede agregar reactividad a este para ajustar sus dimensiones según el ancho del contenedor del svg y según la manipulación de los márgenes. El área del rectángulo ilustra el espacio en el cual se dibujarán los gráficos y los márgenes pueden servir como espacio para pintar los ejes.
<Editable/>
<<< @/.vitepress/components/graficas/editable-graficas.vue
