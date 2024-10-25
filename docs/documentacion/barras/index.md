<script setup>

    import BarrasAgrupadas from "../../.vitepress/components/barras/barras-agrupadas.vue";

    import Basico from "../../.vitepress/components/barras/basico.vue";
</script>

# SisdaiBarras

El componente `<SisdaiBarras/>` permite construir gráficos de barras. A continuación, se detalla su uso y configuración:

Ejemplo de implementación:

```html
<SisdaiGraficas>
  <SisdaiBarras
    :datos="datos"
    :variables="variables"
    :nombre_indice="'nombre'"
  >
  </SisdaiBarras>
</SisdaiGraficas>
```

## API

### Propiedades

- `datos`: Conjunto de datos a visualizar.Consiste en una arreglo de objetos en dónde cada uno corresponde a una categoría principal. Estos objetos contienen la información necesaria para construir una barra, la cual puede estar conformada por otros rectángulos apilados o bien por un conjunto de barras agrupadas.
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
> El arreglo mostrado anteriormente puede ser el objeto resultante de la importación de datos mediante la biblioteca D3.js o utilizando algún complemento (plugin) como [plugin-dsv](https://www.npmjs.com/package/@rollup/plugin-dsv) para procesar un archivo .csv con la siguiente estructura equivalente:

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
> En este ejemplo, `categoria` representa la categoría principal y `cantidad_1` y `cantidad_2` corresponden a los valores numéricos que representa la magnitud de dichas subcategorías. Cabe mencionar que el nombre de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no necesariamente deben coincidir con los del ejemplo mostrado. Las propiedades `variables` y `nombre_indice` permiten especificar el nombre de las claves (o columnas).

- `variables`: Arreglo de objetos en donde cada uno contiene información de las subcategorías incluidas en el conjunto de datos, así como sus respectivos colores.

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
    > Esta propiedad incluye un validador para verificar que todos los objetos contengan las siguiente tres claves:
    >
    > - `id`: su valor es un `String` que debe coincidir con alguna subcategoría de `datos`, equivalente a un nombre de las columnas con valores numéricos.
    > - `nombre`: es un `String` que proporciona una descripción más detallada sobre el id y que puede ser útil para mostrar globos de información.
    > - `color`: es un `String` que define el color de cada categoría, en formato RGB, hexadecimal u otro formato reconocido por CSS.

- `nombre_indice`: especifica la clave que se utiliza para las categorías principales. Por defecto es `"categoria"` pero si los datos usan otro nombre, esta propiedad debe especificarse.
  - Tipo: `String`
  - Valor predeterminado: `"fecha"`
  - Requerido: Sí
- `separacion`: determina el espacio en blanco entre barras. El valor oscila entre 0 y 1. Por defecto es `0.2` y significa que el 20% de la gráfica será espacio en blanco.

  - Tipo: `Number`
  - Valor predeterminado: `0.2`
  - Requerido: No

- `acomodo`: define cómo se mostrarán las barras cuando hay múltiples subcategorías. Admite los valores `"apiladas"` o `"agrupadas"`.
  - Tipo: `String`
  - Valor predeterminado: `"apiladas"`
  - Requerido: No
- `padding_agrupadas`: ajusta la separación entre barras agrupadas, con valores entre 0 y 1. Para ver su efecto, se debe tener la propiedad `acomodo` en `"agrupadas"`. Por defecto es 0.1, lo cual significa que para un subgrupo barras el 10% será espacio en blanco.

  - Tipo: `Number`
  - Valor predeterminado: `0.1`
  - Requerido: No

- `alineacion_eje_y`: determina la posición del eje vertical. Las opciones válidas son `'izquierda'` o `'derecha'`.
  - Tipo: `String`
  - Valor predeterminado: `"izquierda"`
  - Requerido: No
- `angulo_etiquetas_eje_y`: es un valor numérico entre `-90` y `90` que indica el ángulo de rotación de las etiquetas del eje vertical.
  - Tipo: `Number`
  - Valor predeterminado: `0`
  - Requerido: No
- `angulo_etiquetas_eje_x`: es un valor numérico entre `-90` que indica el ángulo de rotación de las etiquetas eje horizontal.
  - Tipo: `Number`
  - Valor predeterminado: `0`
  - Requerido: No

### Métodos

- `calcularEscalas`: Este método se ejecuta al montar el componente o cuando se detectan cambios en las propiedades `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>`. Calcula escalas necesarias para graficar los datos.
- `creaBarras`: Este método se ejecuta al montar el componente o cuando se detectan cambios en las propiedades `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` .Crea y actualiza el gráfico de barras.

### Propiedades expuestas

- `datos_hover`: propiedad reactiva que se actualiza según la posición del cursor cuando se usa el slot `globo-informacion`.Devuelve un `Object` con los datos asociados a la fecha más cercana indicada por el cursor. Generalmente se usa esta propiedad para llenar el componente de `SisdaiGraficasGloboInfo` con información.

- `escalaBanda`: Es la función de D3 `d3.scaleBand` que se emplea en el eje horizontal. Es útil cuando se desean agregar elementos al gráfico que se basen en la escala categórica

- `escalaSubBanda`: Es la función de D3 `d3.scaleBand` que se emplea en el eje horizontal cuando la la propiedad `acomodo` toma el valor de `"agrupadas"`. Esta escala controla la separación entre las barras dentro de cada grupo, permitiendo que las subcategorías se visualicen de manera agrupada.
- `escalaLineal`: Es la función de D3 `d3.scaleLinear` que se emplea en el eje vertical. Es útil cuando se desean agregar elementos al gráfico que dependan de esta escala.

## Ejemplos

<Basico/>
<<< @/.vitepress/components/barras/basico.vue

<BarrasAgrupadas/>
<<< @/.vitepress/components/barras/barras-agrupadas.vue
