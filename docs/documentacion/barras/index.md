<script setup>
    import Basico from "../../.vitepress/components/barras/basico.vue";
    import DatosReales from "../../.vitepress/components/barras/datos-reales.vue";
    import ModificandoDatos from "../../.vitepress/components/barras/modificando-datos.vue";
    import Checks from "../../.vitepress/components/barras/checks.vue";
</script>

# SisdaiBarras

A continuación se describe el uso del componente `<SisdaiBarras/>` para construir un gráfico de barras.

## API

### Propiedades

- `datos`: Base de datos a visualizar, consiste en una arreglo de objetos en dónde cada uno corresponde a una categoría principal y contiene la información necesaria para construir una barra, la cual puede estar conformada por otros rectángulos apilados, o bien, un conjunto de barras agupadas.
  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> Ejemplo de `datos`:
>
> ```json
> [
>   { "categoria": "aguascalientes", "cantidad_1": 100, "cantidad_2": 100 },
>   { "categoria": "baja_california", "cantidad_1": 80, "cantidad_2": 50 },
>   { "categoria": "baja_california_sur", "cantidad_1": 20, "cantidad_2": 90 },
>   { "categoria": "zacatecas", "cantidad_1": 20, "cantidad_2": 15 }
> ]
> ```
>
> El arreglo mostrado arriba puede ser el objeto resultante al importar con la biblioteca d3.js o algún plugin como [plugin-dsv](https://www.npmjs.com/package/@rollup/plugin-dsv) un archivo .csv con la estructura mostrada a continuación. En ese sentido, mantienen cierta equivalencia:
>
> <table>
> <thead>
> <tr>
> <th>categoria</th>
> <th>cantidad_1</th>
> <th>cantidad_2</th>
> </tr>
> </thead>
> <tbody>
> <tr>
> <td>aguascalientes</td>
> <td>100</td>
> <td>100</td>
> </tr>
> <tr>
> <td>baja_california</td>
> <td>80</td>
> <td>50</td>
> </tr>
> <tr>
> <td>baja_california_sur</td>
> <td>20</td>
> <td>90</td>
> </tr>
> <tr>
> <td>zacatecas</td>
> <td>20</td>
> <td>15</td>
> </tr>
> </tbody>
> </table>
>
> En este ejemplo, `categoria` indica las categorías principales, y `cantidad_1` y `cantidad_2` son un valores numérico que representa la magnitud de dichas subcategorías.
> Cabe mencionar que el nombre de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no se tienen que llamar forzosamente como en el ejemplo. Las propiedades `variables` y `clave_categorias` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: Arreglo de objetos, en donde cada uno contiene información de las subcategorías incluidas en la base de datos, así como sus colores.

  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí
    > Por ejemplo:
    >
    > ```json
    > [
    >   {
    >     "id": "cantidad_1",
    >     "nombre": "Cantidad 1",
    >     "color": "pink"
    >   },
    >   {
    >     "id": "cantidad_2",
    >     "nombre": "Cantidad 2",
    >     "color": "orange"
    >   }
    > ]
    > ```
    >
    > Esta propiedad tiene un validador para verificar que todos los objetos contengan las tres claves:
    >
    > - `id`: su valor es un `String` quedebe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas que contienen informacion numérica
    > - `nombre`: su valor es un `String` que da más información sobre el id y que puede ser empleado para globos de información
    > - `color`: Es un `String` que especifica en rgb, hexagesimal u otro formato reconoconocido por css el color que tomará cada subcategoría.

- `clave_categorias`: Indica la clave empleada para las categorías principales, por default es `"categoria"` y con el ejemplo anterior de `datos` podría no especificarse esta propiedad, pero si `datos` emplea otra clave para la categoría principal, esta propiedad tendrá que especificarse.
  - Tipo: `String`
  - Valor predeterminado: `"fecha"`
  - Requerido: Sí
- `separacion`: Valor numérico entre 0 y 1 que determina la separación de las barras. Por default es `0.2` y significa que el 20% de la gráfica será espacio en blanco.
  - Tipo: `Number`
  - Valor predeterminado: `0.2`
  - Requerido: No
- `acomodo`: Admite los valores `"apiladas"` o `"agrupadas"` y determina la forma en la que se mostrarán las barras en caso de que existan varias subcategorías.
  - Tipo: `String`
  - Valor predeterminado: `"apiladas"`
  - Requerido: No
- `padding_agrupadas`: Valor numérico entre 0 y 1 que determina la separación de las barras agrupadas. Para ver su efecto, se debe tener la propiedad `acomodo` en `"agrupadas"`. Por default es 0.1 y significa que para un subgrupo barras el 10% será espacio en blanco.
  - Tipo: `Number`
  - Valor predeterminado: `0.1`
  - Requerido: No
- `alineacion_eje_y`: Esta propiedad indica de qué lado se acomodará el eje vertical, las opciones validas son `'izquierda'` o `'derecha'`.
  - Tipo: `String`
  - Valor predeterminado: `"izquierda"`
  - Requerido: No
- `angulo_etiquetas_eje_y`: Es un valor numerico entre `-90` y `90` que indica el ángulo de rotación del eje vertical
  - Tipo: `Number`
  - Valor predeterminado: `0`
  - Requerido: No
- `angulo_etiquetas_eje_x`: Es un valor numerico entre `-90` y `90` que indica el ángulo de rotación del eje horizontal
  - Tipo: `Number`
  - Valor predeterminado: `0`
  - Requerido: No

### Métodos

- `calcularEscalas`: Este método se ejecuta al montar el componente y cuando se detectan cambios en `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` y calcula escalas para graficar.
- `creaBarras`: Este método se ejecuta al montar el componente y cuando se detectan cambios en `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` y crea y actualiza el gráfico.

### Propiedades expuestas

- `datos_hover`: Esta propiedad expuesta se modifica según la posición del cursor cuando se usa el slot `globo-informacion`, y devuelve un `Object` con los datos asociados a la categoría más cercana indicada por el cursor. Generalmente se usa esta propiedad para llenar el componente de `SisdaiGraficasGloboInfo` con información.

- `escalaBanda`: Es la función de D3 `d3.scaleBand` que se emplea en el eje horizontal. Es útil cuando se desean agregar elementos al gráfico a través de dicha escala.
- `escalaSubBanda`: Es la función de D3 `d3.scaleBand` que se emplea en el eje horizontal cuando las la propiedad `acomodo` toma el valor de `"agrupadas"` . Esta escala corresponde a la separación entre cada grupo de barras.
- `escalaLineal`: Es la función de D3 `d3.scaleLinear` que se emplea en el eje vertical. Es útil cuando se desean agregar elementos al gráfico a través de dicha escala.

## Ejemplos

<Basico/>
<<< @/.vitepress/components/barras/basico.vue
<DatosReales/>
<<< @/.vitepress/components/barras/datos-reales.vue
<ModificandoDatos/>
<<< @/.vitepress/components/barras/modificando-datos.vue
<Checks/>
<<< @/.vitepress/components/barras/checks.vue
