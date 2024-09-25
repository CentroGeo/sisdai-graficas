<script setup>
  import Basico from "../../.vitepress/components/graficas/basico.vue";
  import Editable from "../../.vitepress/components/graficas/editable-graficas.vue";

</script>

# SisdaiGraficas

El componente de `<SisdaiGraficas>` actúa como un contenedor principal para visualizar distintos tipos de gráficas. Al utilizarlo, se crea un elemento SVG con un identificador único (id) donde se renderizan los subcomponentes gráficos como barras, series de tiempo, cajas, entre otros.

Ejemplo de implementación:

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

- `id`: Identificador único del componente que se asigna como atributo-selector `id` del elemento `HTML`
  - Tipo: `String`
  - Valor predeterminado: Se genera un identificador único aleatorio al montar el componente
  - Requerido: no
- `margenes`: Objeto que especifica en píxeles la separación que habrá entre los bordes del SVG y los elementos gráficos como ejes.
  - Tipo: `Object` con la estructura `{arriba: Number, abajo: Number, izquierda: Number, derecha: Number}`
  - Valor predeterminado:`{ arriba: 20, abajo: 20, derecha: 20, izquierda: 30 }`
  - Requerido: opcional
- `titulo_eje_y`: Título del eje vertical.
  - Tipo: `String`
  - Valor predeterminado: `""`
  - Requerido: Opcional
- `titulo_eje_x`: Título del eje horizontal.
  - Tipo: `String`
  - Valor predeterminado: `""`
  - Requerido: Opcional
- `ancho`: Ancho personalizado del `SVG`. Por defecto el ancho del `SVG` se ajusta de forma responsiva al 100% del contenedor, pero si se desea especificar otro ancho en píxeles se puede usar esta propiedad.
  - Tipo: `Number`
  - Valor predeterminado: `Number` Ajuste automático al 100%
  - Requerido: No
- `alto`: Alto personalizado del `SVG`. Por defecto el alto del `SVG` es de `400px`, pero si se desea usar otra altura en píxeles se puede usar esta propiedad.
  - Tipo: `Number`
  - Valor predeterminado: `400`
  - Requerido: No

### Slots

- **Slot principal**: Se utiliza para insertar los subcomponentes gráficos, como `<SisdaiBarras/>` , dentro de `<SisdaiGraficas/>`.
- `panel-encabezado-vis`: En este slot se puede introducir contenido `HTML` en la parte superior del gráfico usando los estilos especificados para visualizaciones por el [Sisdai](https://sisdai.conahcyt.mx/), tales como títulos de gráfica, instrucción, fecha de actualización, entre otros.
- `panel-pie-vis`: En este slot se puede introducir contenido `HTML` en la parte inferior del gráfico, usando los estilos especificados para visualizaciones por el [Sisdai](https://sisdai.conahcyt.mx/), tales como nomenclaturas, fuentes, entre otros.
- `globo-informacion`: En este slot se inserta el componente `<SisdaiGraficasGloboInfo/>` que muestra información sobre el gráfico de forma interactiva. Puedes consultar más información <a href="/documentacion/globo-informacion" >aquí</a>.

### Métodos

- `obteniendoDimensiones`: Esta función toma el tamaño del contenedor o las propiedades `ancho` y `alto` en caso de haber sido especificadas, así como los tamaños de los contenedores del `titulo_eje_y` y `titulo_eje_x` y con ello asigna el tamaño del `SVG`.
- `siHayGlobo`: Se ejecuta si se está usando el slot `globo-informacion`, y en caso de ser así activará las funciones interactivas de `mousemove`, `click` y `mouseout`. Además almacenará la posición del cursor en el método y propiedad expuesta `grafica` que se menciona más adelante.
- `panelesEnUso`: Detecta si los slots `panel-pie-vis` o `panel-encabezado-vis` están siendo utilizados y agrega clases al elemento `HTML` para configurar estilos.
- `grafica`: Es un método expuesto que devuelve un objeto con información sobre el componente con los siguientes atributos:
  - `_alto`: `Number` altura del `SVG`
  - `_ancho`: `Number` ancho del `SVG`
  - `_globo_visible`: `Boolean` que indica si se está usando el slot `globo-informacion`
  - `_grupoVis`: `Object` con los valores de `alto` y `ancho` que corresponden al espacio en donde se graficará. Equivalen a las dimensiones del `SVG` `_alto` y `_ancho` una vez que se restan los márgenes verticales y laterales respectivamente.
  - `_margenes`: `Object` igual a la propiedad `margenes`
  - `_posicion_cursor`: `Object` con los valores `x` y `y` correspondientes a la posición horizontal y vertical del cursor. Estos se actualizan de forma interactiva si se utiliza el slot `globo-informacion`.

### Propiedades expuestas

- `ancho_grafica`: `Number` altura del `SVG`
- `alto_grafica`: `Number` ancho del `SVG`
- `grafica`: `Function` método que devuelve información sobre el componente, descrita en el método `grafica`.
- `grupoFondo`: `Object` de tipo `Selection` de D3 asociada a un grupo `g.grupo-fondo` del `SVG`, ubicada detrás del grupo en el que se va a graficar, por lo tanto hereda todos los métodos de `Selection` de D3. Auxiliar para agregar elementos gráficos de fondo.
- `grupoFrente`: `Object` de tipo `Selection` de d3 asociada a un grupo `g.grupo-frente` del `SVG`, ubicada en frente del grupo en el que se va a graficar, por lo tanto hereda todos los métodos de `Selection` de D3. Auxiliar para agregar elementos gráficos en el primer plano.

## Ejemplos

### Ejemplo básico de componente

En este ejemplo se muestra cómo se escribe el componente `<SisdaiGraficas>` y se especifican algunas de sus propiedades. Al inspeccionar los elementos, se puede observar que este componente crea un `SVG` con algunos grupos en su interior.

<Basico/>
<<< @/.vitepress/components/graficas/basico.vue

### Ejemplo con propiedades dinámicas

En este ejemplo se agrega un rectángulo en el interior del `SVG` para mostrar cómo se puede aplicar reactividad y ajustar sus dimensiones en función del ancho del contenedor del `SVG` y la manipulación de los márgenes. El área del rectángulo ilustra el espacio en el cual se dibujarán los gráficos, mientras que los márgenes pueden utilizarse como espacio reservado para los ejes.

<Editable/>
<<< @/.vitepress/components/graficas/editable-graficas.vue
