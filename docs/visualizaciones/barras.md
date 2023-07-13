# Barras

A continuación se describe la utilización del componente de visualización `<SisdaiBarras/>` para construir un gráfico de
barras. Este componente puede ser utilizado para crear barras apiladas, barras agrupadas y controlar la orientación si es que se desea una vista vertical o una horizontal

## Parámetros

La siguiente es una lista de propiedades que admite el componente y que se tienen que especificar al importar el mismo.

### Obligatorios

* `barras_id`: (_String_) Identificador básico del componente, sin espacios ni caracteres especiales.
* `datos`: (_Array_) Base de datos, lista de objetos en donde cada elemento corresponde a una barra. Se debe especificar
  el nombre de la barra y los valores de sus subcategorías/colores, por ejemplo en la siguiente base de datos se dan dos 
  valores numéricos (métricas) para una variable categórica que representa los nombres de los estados de la República
  Mexicana.

  ```json
  [
    {"nombre_entidad": "Yucatán", "cantidad_1": 120, "cantidad_2": 30}, 
    {"nombre_entidad": "Puebla", "cantidad_1": 100, "cantidad_2": 50}
  ]
  ```

El valor de las métricas `cantidad_1` y `cantidad_2` son las que generan las barras apiladas. Si la base de datos 
sólo incluye una métrica, entonces la visualización será una de [barras verticales]() sencillas.
 
* `variables`:  (_Array_) Arreglo de objetos, en donde cada uno contiene información de las subcategorías/colores
  incluidos en la base de datos. Por ejemplo:

  ```json
  [
    {"id": "cantidad_1", "nombre_colores": "cantidad 1", "color": "#ffffcc"},
    {"id": "cantidad_2", "nombre_colores": "cantidad 2", "color": "#c7e9b4"}
  ] 
  ``` 

  > Con este parámetro se puede controlar cuantas subcategorías se quieran visualizar. Por ejemplo, si la base de datos 
  > tiene valores para `cantidad_1`, `cantidad_2` y `cantidad_3`, pero en variables solo se especifican dos objetos 
  > para `cantidad_2` y `cantidad_3`, entonces la gráfica mostrará sólo estos últimos dos colores. El parámetro `id` 
  > se refiere al nombre del identificador que se está usando en la base de datos; `nombre_colores` es una clave que 
  > puede cambiar y se debe especificar el nombre de dicha clave en el parámetro `nombre_color`, pero se refiere 
  > al texto que quiere que aparezca para la persona usuaria, ya sea en tooltips o en nomenclatura; y `color` es 
  > el color que se quiere que tenga cada subcategoría.

* `nombre_color`: (_String_) Debe tener el mismo valor que se está usando en el arreglo `variables` para referirse
  al texto que se quiere que aparezca para el cliente. Es decir, si `variables`
  fuera 

  ```json
    [
      {"id": "cantidad_1", "nombre_subcategoria": "cantidad 1", "color": "#ffffcc"}, 
      {"id": "cantidad_2", "nombre_subcategoria": "cantidad 2", "color": "#c7e9b4"}
    ]
  ```
  entonces `nombre_color` debe ser igual a `"nombre_subcategoria"`.


* `nombre_barra`: (_String_) Debe tomar el valor que se está usando como clave para referirnos a los nombres de las
  barras o categorías generales en la base de datos. En este ejemplo, tendría que ser igual a `'nombre_entidad'`.

* `titulo_eje_x`: (_String_) Titulo para el eje horizontal, en esta visualización será para la variable categórica.
* `titulo_eje_y`: (_String_) Titulo para el eje vertical, en esta visualización será para las variables numéricas
  o métricas.

### Opcionales

Estos parámetros cuentan con un valor _default_ al importar el componente, por lo tanto la persona usuaria tendrá más
libertad de customizar el componente al modificarlos.

* `ancho_tooltip`: (_Number_) Ancho de tooltip, por defecto usa 165.
* `margen` : (_Object_) Objeto que contiene los márgenes a la derecha, izquierda, arriba y abajo. Por defecto
  es ` {arriba: 20, abajo: 50, izquierda: 60, derecha: 20}`.
* `alto_vis` : (_Number_) Altura del svg, 195 por defecto.
* `tooltip_activo`: (_Boolean_) `true` por default lo que hace que se muestre el tooltip.
* `textoTooltip`: (_Function_) que debe regresar el texto que queremos en el tooltip. Para usar los datos de la barra
  más cercana al cursor, podemos acceder mediante `this.$refs['barras1'] .tooltip_data_seleccionada` suponiendo que
  se agrega al componente `ref="barras1"`.

* `orientacion`: (_String_) Especifica si se desea que las barras estén verticales u horizontales. Los valores que admite son `'vertical'` u `'horizontal'` y por defecto es `'vertical'`
* `apiladas_o_agrupadas`: (_String_) Especifica si se desea que las barras estén apiladas o agrupadas. Por defecto, apila y los valores que admite son `'apiladas'` o `'agrupadas'`

## Ejemplo de uso

A continuación se presentan varios ejemplos que se pueden ir complejizando según las propiedades y los datos que se usen.

### Barras simples
Cuando los datos introducidos sólo describen una variable categorica y una variable numérica (métrica),
el componente de visualizacion `<SisdaiBarras/>` construirá una gráfica de barras verticales simples.

Por ejemplo, teniendo el siguientee arreglo para `datos`,

```json
[
{"categoria": "Variable A", "cantidad": 120},
{"categoria": "Variable B ", "cantidad": 150},
{"categoria": "Variable C ", "cantidad": 72}
]
```

y el arreglo `variables` como sigue,

```json
[
  {"id": "cantidad", "nombre_colores": "cantidad", "color": "#7fcdbb"}
]
``` 

Entonces se usa el componente `<SisdaiBarras/>` de la siguiente manera.

```html
<template>
  <div>
    <SisdaiBarras
        :barras_id="'verticales_simples'"
        :datos="[{categoria: 'Variable A', cantidad: 120},
                 {categoria: 'Variable B', cantidad: 150},
                 {categoria: 'Variable C', cantidad: 72}]"
        :nombre_barra="'categoria'"
        :nombre_color="'nombre_colores'"
        titulo_eje_x="Eje horizontal (categórico)"
        titulo_eje_y="Eje vertical (numérico)"
        :variables="[{id:'cantidad', nombre_colores:'cantidad', color: '#7fcdbb'}]"/>
  </div>
</template>
```

Lo que producirá el siguiente gráfico de barras verticales simples,

<barras-verticales-simples/>


Si agregamos la propiedad `orientacion="horizontal"`, para modificar el estado que por default es `'vertical'`, como se muestra en el siguiente código, obtendremos un gráfico de barras horizontales. 

```html
<SisdaiBarras
        :barras_id="'horizontales_simples'"
        :datos="[{categoria: 'Variable A', cantidad: 120},
                 {categoria: 'Variable B', cantidad: 150},
                 {categoria: 'Variable C', cantidad: 72}]"
        :nombre_barra="'categoria'"
        :nombre_color="'nombre_colores'"
        titulo_eje_x="Eje horizontal (numérico)"
        titulo_eje_y="Eje vertical (categórico)"
        :variables="[{id:'cantidad', nombre_colores:'cantidad', color: '#7fcdbb'}]"
        :orientacion="'horizontal'"/>
```

Lo que producirá el siguiente gráfico de barras horizontales simples,

<barras-horizontales-simples/>

Cabe mencionar que esta propiedad `orientacion` podemos utilizarla para todas las variaciones del componente, como en los casos que se mostrarán más adelante de barras apiladas y agrupadas 

### Barras apiladas

Para hacer una gráfica de barras apiladas, el uso del componente es el mismo, y la única diferencia radica en las propiedades `datos` y `variables`.

Como podra notar, en los casos de barras simples, sólo tenemos una `cantidad` por cada objeto correspondiente a una barra (categoría), pero podríamos tener distintas cantidades, por ejemplo `cantidad_1`,  `cantidad_2`, `cantidad_3`, etc. para cada barra (categoría), de modo que más bien, tendríamos un conjunto de barras para cada categoría las propiedades de estas categorías deberán especificarse en `variables`. 

El siguiente ejemplo resulta muy ilustrativo


```html 
<SisdaiBarras
      :barras_id="'barras_apiladas_estaticas'"
      :datos="[
        {
          nombre_rectangulos: 'Variable A',
          cantidad_1: 120,
          cantidad_2: 40,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'Variable B',
          cantidad_1: 100,
          cantidad_2: 30,
          cantidad_3: 40,
        },
      ]"
      :variables="[
        { id: 'cantidad_1', nombre_colores: 'Cantidad 1', color: '#ffffcc'},
        { id: 'cantidad_2', nombre_colores: 'Cantidad 2', color: '#c7e9b4'},
        { id: 'cantidad_3', nombre_colores: 'Cantidad 3', color: '#7fcdbb'},
      ]"
      :nombre_barra="'nombre_rectangulos'"
      :nombre_color="'nombre_colores'"
      titulo_eje_y="Eje vertical (numérico)"
      titulo_eje_x="Eje horizontal (categórico)"
      :tooltip_activo="false"
    />
```

y luce como se muestra a continuación 

<barras-verticales-apiladas-basico/>

puede observar que no tiene tooltip porque se agregó la propiedad `:tooltip_activo="false"`. A este ejemplo se le podría agregar una propiedad `:orientacion="'horizontal'"` y obtendríamos algo como siguie:

<barras-horizontales-apiladas-basico/>

### Barras agrupadas

En estos ejemplos se ilustra otra forma de graficar barras con subcategorías. Se usan cuando las subcategorías no necesariamente conforman una totalidad. La **propiedad que se tiene que agregar** es `:apiladas_o_agrupadas='"agrupadas"'`, pues de otra forma, siempre las mostrará apiladas.

A continuación se muestra un ejemplo que parece ser más extenso, en el que se agregan slots de encabezado y pie. Estos son útiles para colocar títulos y algunas notas respectivamente 

```html
<SisdaiBarras
      :barras_id="'verticales_agrupadas_slots_tooltip'"
      :datos="[
        {
          nombre_rectangulos: 'A',
          cantidad_1: 120,
          cantidad_2: 40,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'B',
          cantidad_1: 100,
          cantidad_2: 30,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'C',
          cantidad_1: 90,
          cantidad_2: 60,
          cantidad_3: 40,
        },
        {
          nombre_rectangulos: 'D',
          cantidad_1: 70,
          cantidad_2: 60,
          cantidad_3: 10,
        },
        {
          nombre_rectangulos: 'E',
          cantidad_1: 40,
          cantidad_2: 30,
          cantidad_3: 80,
        },
        {
          nombre_rectangulos: 'F',
          cantidad_1: 60,
          cantidad_2: 50,
          cantidad_3: 30,
        },
      ]"
      :variables="[
        { id: 'cantidad_1', nombre_colores: 'cantidad 1', color: '#ffffcc' },
        { id: 'cantidad_2', nombre_colores: 'cantidad 2', color: '#c7e9b4' },
        { id: 'cantidad_3', nombre_colores: 'cantidad 3', color: '#7fcdbb' },
      ]"
      :nombre_barra="'nombre_rectangulos'"
      :nombre_color="'nombre_colores'"
      titulo_eje_y="Eje vertical (numérico)"
      titulo_eje_x="Eje horizontal (categórico)"
      :apiladas_o_agrupadas="'agrupadas'"

    >
      <template slot="encabezado">
        <div class="slot-encabezado">
          <h4>Título slots</h4>
          <p class="slot-parrafo">
            Tanto el título que aparece arriba, como este texto, se integran
            como slot. Se puede estilizar segun las necesidades con un poco de
            CSS o, en su momento, importando el sistema de diseño
          </p>
        </div>
      </template>
      <template slot="pie">
        <div class="slot-pie">
          <h4>Pie de gráfica</h4>
          <p class="slot-parrafo">
            Este otro bloque corresponde al slot de pie de gráfica, en donde
            usualmente se ponen nomenclaturas, notas o controles, y también
            puede modificarse con CSS según las necesidades.
          </p>
        </div>
      </template>
    </SisdaiBarras>
```


<barras-verticales-agrupadas-slots-tooltip/>

Por último, escribiremos otro ejemplo de barras agrupadas, en donde se agregó al código una función para alternar los datos e ilustrar la reactividad del componente. 

El html es como se muestra a continuación:
```html
<SisdaiBarras
        :barras_id="'verticales_apiladas_cambiando_base'"
        :datos="datos"
        :margen="{arriba: 10, abajo: 20, derecha:10, izquierda:30}"
        :nombre_barra="'nombre_rectangulos'"
        :nombre_color="'nombre_colores'"
        :variables="variables"
        titulo_eje_x="Eje horizontal (categórico)"
        titulo_eje_y="Eje vertical (numérico)"
        :apiladas_o_agrupadas="'agrupadas'"
        :orientacion="'horizontal'"

    >
      <template slot="encabezado">
        <div class="encabezado">
          <h3 class="titulo-visualizacion">Título de gráfica con cambio de datos</h3>
          <p class="fecha-actualizacion">Fecha: dd/mm/aaaa</p>
        </div>
      </template>
      <template slot="pie">
        <div class="pie">
          <h3 class="titulo-visualizacion">Pie de gráfica</h3>
          <p>Aliquam erat volutpat. In cursus ipsum purus. Quisque a pellentesque justo. Donec nec justo sodales,
            dignissim leo consectetur, pulvinar leo. Aenean sodales a lacus eget porta.</p>
          <button @click="alternandoBase">Cambia la data</button>
        </div>
      </template>
    </SisdaiBarras>
```
mientras que el script luce como sigue: 

```javascript
<script>
import base_dummy_1 from "./base_dummy_1.json";
import base_dummy_2 from "./base_dummy_2.json";

export default {
  name: "verticales-agrupadas-cambiando-base",
  data: function () {
    return {
      algo: true,
      datos: base_dummy_1,
      variables: [
        {id: "cantidad_1", nombre_colores: "cantidad 1", color: "#ffffcc"},
        {id: "cantidad_2", nombre_colores: "cantidad 2", color: "#c7e9b4"},
        {id: "cantidad_3", nombre_colores: "cantidad 3", color: "#7fcdbb"},
      ],
      base_seleccionada: 1,
    };
  },
  methods: {
    alternandoBase() {
      if (this.base_seleccionada == 1) {
        this.base_seleccionada = 2;
        this.datos = base_dummy_2;
        this.variables = [
          {id: "cantidad_1", nombre_colores: "cantidad 1", color: "#dadaeb"},
          {id: "cantidad_2", nombre_colores: "cantidad 2", color: "#bcbddc"},
          {id: "cantidad_3", nombre_colores: "cantidad 3", color: "#9e9ac8"},
          {id: "cantidad_4", nombre_colores: "cantidad 4", color: "#756bb1"},
          {id: "cantidad_5", nombre_colores: "cantidad 5", color: "#54278f"}
        ];

      } else {
        this.base_seleccionada = 1;
        this.datos = base_dummy_1;
        this.variables = [
          {id: "cantidad_1", nombre_colores: "cantidad 1", color: "#ffffcc"},
          {id: "cantidad_2", nombre_colores: "cantidad 2", color: "#c7e9b4"},
          {id: "cantidad_3", nombre_colores: "cantidad 3", color: "#7fcdbb"}
        ];
      }
    },
  },
};
</script>
```
El componente resultante luce así:
<barras-horizontales-agrupadas-cambiando-base/>