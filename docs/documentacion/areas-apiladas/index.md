<script setup>
  import Basico from "../../.vitepress/components/areas-apiladas/basico.vue";
  import ModificandoDatos from "../../.vitepress/components/areas-apiladas/modificando-datos.vue";
</script>

# SisdaiAreasApiladas

El componente `<SisdaiAreasApiladas/>` permite graficar datos temporales que pertenecen a distintas categorías que, en conjunto, forman una totalidad. Este tipo de gráficas es conocido como “áreas apiladas” o _stream graphs_ en inglés.

Ejemplo de implementación:

```html
<SisdaiGraficas>
  <SisdaiAreasApiladas
    :datos="datos"
    :variables="variables"
    :formato_temporal="'%d/%m/%Y'"
    :nombre_indice="'nombre_fecha'"
  >
  </SisdaiAreasApiladas>
</SisdaiGraficas>
```

## API

### Propiedades

- `datos`: Conjunto de datos a visualizar. Consiste en un arreglo de objetos en dónde cada objeto está asociado a una fecha y a los valores muestreados en esa fecha.
  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> Ejemplo de `datos`:
>
> ```json
> [
>   { "fecha": "01-01-2021", "ags": 100, "bc": 100 },
>   { "fecha": "01-02-2021", "ags": 80, "bc": 50 },
>   { "fecha": "01-03-2021", "ags": 20, "bc": 90 },
>   { "fecha": "01-04-2021", "ags": 20, "bc": 15 }
> ]
> ```
>
> El arreglo mostrado anteriormente puede ser el objeto resultante de la importación de datos mediante la biblioteca D3.js o utilizando complemento (plugin) como [plugin-dsv](https://www.npmjs.com/package/@rollup/plugin-dsv) para procesar un archivo .csv con la siguiente estructura equivalente:

> <table>
> <thead>
> <tr>
> <th>fecha</th>
> <th>ags</th>
> <th>bc</th>
> </tr>
> </thead>
> <tbody>
> <tr>
> <td>01-01-2021</td>
> <td>100</td>
> <td>100</td>
> </tr>
> <tr>
> <td>01-02-2021</td>
> <td>80</td>
> <td>50</td>
> </tr>
> <tr>
> <td>01-03-2021</td>
> <td>20</td>
> <td>90</td>
> </tr>
> <tr>
> <td>01-04-2021</td>
> <td>20</td>
> <td>15</td>
> </tr>
> </tbody>
> </table>
> Los nombres de las claves en los diccionarios (o  las columnas desde el punto de vista de la tabla) no necesariamente deben de coincidir con  el ejemplo mostrado. Las propiedades `variables` y `nombre_indice` permiten especificar los nombres de las claves (o columnas) correspondientes.

- `variables`: Arreglo de objetos que describen las variables o series de tiempo incluidas en el conjunto de datos.

  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> En relación con el ejemplo empleado en `datos`, `variables` podría tener la siguiente estructura:

> ```json
> [
>   {
>     "id": "ags",
>     "nombre": "Aguascalientes",
>     "color": "pink"
>   },
>   {
>     "id": "bc",
>     "nombre": "Baja California",
>     "color": "orange"
>   }
> ]
> ```
>
> Esta propiedad incluye un validador que asegura que cada objeto en el arreglo contenga las siguientes tres claves:

> - `id`: su valor es un `String` que debe coincidir con alguna subcategoría de `datos` (equivalente a uno de los nombres de las columnas que contienen información numérica).

> - `nombre`: su valor es un `String` que proporciona información adicional sobre el id y que puede ser útil para globos de información.

> - `color`: es un `String` que define el color de cada categoría, en formato RGB, hexadecimal u otro formato reconocido por CSS.

- `nombre_indice`: define la clave empleada para identificar la columna temporal. Por defecto es `"fecha"` , pero si los datos usan otro nombre, esta propiedad debe especificarse.
  - Tipo: `String`
  - Valor predeterminado: `"fecha"`
  - Requerido: Sí
- `formato_temporal`: Especifica el formato temporal de la variable de tiempo. Es un parámetro que se introduce a la función de D3 `d3.timeParse` y que sirve para transformar un formato de texto a un formato temporal dentro del contexto de JavaScript. En esta [documentación](https://d3-wiki.readthedocs.io/zh-cn/master/Time-Formatting/) se explica cómo especificar formatos para D3.
  - Tipo: `String`
  - Valor predeterminado: `"%d-%m-%Y"`
  - Requerido: Sí
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
- `tabla_caption`: es un texto que se inserta en el elemento `<caption>` de la tabla asociada a la gráfica.
  - Tipo: `String`
  - Valor predeterminado: `"Tabla de datos de la gráfica de áreas apiladas"`
  - Requerido: No

### Métodos

- `calcularEscalas`: Este método se ejecuta al montar el componente o cuando se detectan cambios en las propiedades`datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>`. Calcula escalas necesarias para graficar los datos.

- `creaAreas`: Este método se ejecuta al montar el componente o cuando se detectan cambios en las propiedades `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` .Crea y actualiza el gráfico de áreas apiladas.

### Propiedades expuestas

- `datos_hover`: propiedad reactiva que se actualiza según la posición del cursor cuando se usa el slot `globo-informacion`.Devuelve un `Object` con los datos asociados a la fecha más cercana indicada por el cursor. Generalmente se usa esta propiedad para llenar el componente de `SisdaiGraficasGloboInfo` con información.

- `escalaTemporal`: Es la función de D3 `d3.scaleTime` que se emplea en el eje horizontal. Es útil cuando se desean agregar elementos al gráfico que se basen en la escala temporal.
- `escalaLineal`: Es la función de D3 `d3.scaleLinear` que se emplea en el eje vertical. Es útil cuando se desean agregar elementos al gráfico que dependan de esta escala.
- `conversionTemporal`: Es la función de D3 `d3.timeParse` que tiene como argumento el `formato_temporal` que se haya especificado en las propiedades. Puede ser útil cuando se desea agregar elementos usando la `escalaTemporal` y antes de ello los argumentos de dicha escala deben convertirse de `String` a un tipo de objeto `Date`.

## Ejemplos

<Basico/>
<<< @/.vitepress/components/areas-apiladas/basico.vue
<ModificandoDatos/>
<<< @/.vitepress/components/areas-apiladas/modificando-datos.vue
