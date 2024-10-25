<script setup>
    import Basico from "../../.vitepress/components/series-tiempo/basico.vue";
    import ModificandoDatos from "../../.vitepress/components/series-tiempo/modificando-datos.vue";
    import MultiplesLineas from "../../.vitepress/components/series-tiempo/multiples-lineas.vue";
</script>

# SisdaiSeriesTiempo

El componente `<SisdaiSeriesTiempo/>` sirve para graficar datos temporales, permitiendo visualizar la evolución de valores a lo largo del tiempo. A continuación, se detalla su uso y configuración.

Ejemplo de implementación:

```html
<SisdaiGraficas>
  <SisdaiSeriesTiempo
    :datos="datos"
    :variables="variables"
    :formato_temporal="'%d/%m/%Y'"
    :nombre_indice="'nombre_fecha'"
  >
  </SisdaiSeriesTiempo>
</SisdaiGraficas>
```

## API

### Propiedades

- `datos`: Conjunto de datos a visualizar. Consiste en un arreglo de objetos en dónde cada objeto está asociado a una fecha y a los valores muestreados vinculados a dicha fecha.

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
> El arreglo mostrado anteriormente puede ser el objeto resultante de la importación de datos mediante la biblioteca D3.js o utilizando algún complemento (plugin) como [plugin-dsv](https://www.npmjs.com/package/@rollup/plugin-dsv), para procesar un un archivo .csv con la siguiente estructura equivalente:
>
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
> Cabe mencionar que los nombres de las claves en los objetos (o de las columnas desde el punto de vista de la tabla) no necesariamente deben coincidir con los del ejemplo mostrado. Las propiedades  `variables` y `nombre_indice` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: Arreglo de objetos que contienen la información de las series de tiempo representadas en los datos.

  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> En relación con el ejemplo empleado en `datos`, `variables` podría tener la siguiente estructura:
>
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
> Esta propiedad incluye un validador para verificar que todos los objetos contengan las siguientes tres claves:
>
> - `id`: su valor es un `String` que debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas que contienen información numérica.
> - `nombre`: su valor es un `String` que proporciona una descriçión más detallada sobre el id y que puede ser empleado para globos de información.
> - `color`: Es un `String` que define el color de la serie especificado en formatos RGB, hexadecimal u otro formato reconocido por CSS.

- `nombre_indice`: Especifica la clave empleada para la columna temporal. Por defecto es `"fecha"` y con el ejemplo anterior de datos podría no especificarse esta propiedad, pero si `datos` emplea otra clave para la temporalidad, esta propiedad tendrá que especificarse.

  - Tipo: `String`
  - Valor predeterminado: `"fecha"`
  - Requerido: Sí

- `formato_temporal`: Especifica el formato de las fechas en los datos. Este formato es procesado por la función de D3 `d3.timeParse` y que sirve para transformar un formato de texto a un formato temporal dentro del contexto de JavaScript. En esta [documentación](https://d3-wiki.readthedocs.io/zh-cn/master/Time-Formatting/) se explica cómo especificar formatos para D3.
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

### Métodos

- `calcularEscalas`: Este método se ejecuta al montar el componente o cuando se detectan cambios en las propiedades`datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>`. Calcula escalas necesarias para graficar los datos.
- `creaSeries`: Este método se ejecuta al montar el componente o cuando se detectan cambios en las propiedades `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` .Crea y actualiza el gráfico de series de tiempo.

### Propiedades expuestas

- `datos_hover`: propiedad reactiva que se actualiza según la posición del cursor cuando se usa el slot `globo-informacion`.Devuelve un `Object` con los datos asociados a la fecha más cercana indicada por el cursor. Generalmente se usa esta propiedad para llenar el componente de `SisdaiGraficasGloboInfo` con información.
- `escalaTemporal`: Es la función de D3 `d3.scaleTime` que se emplea en el eje horizontal. Es útil cuando se desean agregar elementos al gráfico que se basen en la escala temporal.
- `escalaLineal`: Es la función de D3 `d3.scaleLinear` que se emplea en el eje vertical. Es útil cuando se desean agregar elementos al gráfico que dependan de esta escala.
- `conversionTemporal`: Es la función de D3 `d3.timeParse` que tiene como argumento el `formato_temporal` que se haya especificado en las propiedades. Puede ser útil cuando se desea agregar elementos usando la `escalaTemporal` y antes de ello los argumentos de dicha escala deben convertirse de `String` a un tipo de objeto `Date`.

## Ejemplos

<Basico/>
<<< @/.vitepress/components/series-tiempo/basico.vue

<ModificandoDatos/>
<<< @/.vitepress/components/series-tiempo/modificando-datos.vue
<MultiplesLineas/>
<<< @/.vitepress/components/series-tiempo/multiples-lineas.vue
