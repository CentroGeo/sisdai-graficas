# Barras pruebas

A continuación se describe la utilización del componente de visualización `<SisdaiBarrasPrueba/>` para construir un gráfico de
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
  más cercana al cursor, podemos acceder mediante `this.$refs['barras1'].tooltip_data_seleccionada` suponiendo que
  se agrega al componente `ref="barras1"`.

* `orientacion`: (_String_) Especifica si se desea que las barras estén verticales u horizontales. Los valores que admite son `'vertical'` u `'horizontal'` y por defecto es `'vertical'`
* `apiladas_o_agrupadas`: (_String_) Especifica si se desea que las barras estén apiladas o agrupadas. Por defecto, apila y los valores que admite son `'apiladas'` o `'agrupadas'`

## Ejemplo de uso

A continuación se presentan varios ejemplos que se pueden ir complejizando según las propiedades y los datos que se usen.

### Barras simples
Cuando los datos introducidos sólo describen una variable categorica y una variable numérica (métrica),
el componente de visualizacion `<SisdaiBarrasPrueba/>` construirá una gráfica de barras verticales simples.

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

Entonces se usa el componente `<SisdaiBarrasPrueba/>` de la siguiente manera.

```html
<template>
  <div>
    <SisdaiBarrasPrueba
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

<barras-prueba-verticales-simples/>
