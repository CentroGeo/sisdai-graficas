<script setup>
    import Basico from "../../.vitepress/components/areas-apiladas-ordenadas/basico.vue";
    import ModificandoDatos from "../../.vitepress/components/areas-apiladas-ordenadas/modificando-datos.vue";
</script>

# SisdaiAreasApiladasOrdenadas

El componente `<SisdaiAreasApiladasOrdenadas/>` sirve para graficar datos temporales de distintas categorías y que conforman una totalidad, y además se ordenan de mayor a menor a través del tiempo.

Uso:

```html
<SisdaiGraficas>
  <SisdaiAreasApiladasOrdenadas
    :datos="datos"
    :variables="variables"
    :formato_temporal="'%d/%m/%Y'"
    :clave_fecha="'nombre_fecha'"
  >
  </SisdaiAreasApiladasOrdenadas>
</SisdaiGraficas>
```

## API

### Propiedades

- `datos`: Base de datos a visualizar, consiste en un arreglo de objetos en dónde cada objeto está asociado a una fecha y a los valores muestreados vinculados a dicha fecha.
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
> El arreglo mostrado arriba puede ser el objeto resultante al importar con la biblioteca d3.js o algún plugin como [plugin-dsv](https://www.npmjs.com/package/@rollup/plugin-dsv) un archivo .csv con la estructura mostrada a continuación. En ese sentido, mantienen cierta equivalencia:
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
> Cabe mencionar que el nombre de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no se tienen que llamar forzosamente como en el ejemplo. Las propiedades `variables` y `clave_fecha` más adelante nos permiten especificar el nombre de las claves (o columnas).

- `variables`: Arreglo de objetos, en donde cada uno contiene información de las variables o series de tiempo incluidas en la base de datos.
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
> Esta propiedad tiene un validador para verificar que todos los objetos contengan las tres claves:
>
> - `id`: su valor es un `String` que debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas que contiene información numérica
> - `nombre`: su valor es un `String` que da más información sobre el id y que puede ser empleado para globos de información
> - `color`: Es un `String` que especifica en rgb, hexadecimal u otro formato reconocido por css el color que tomará cada subcategoría.

- `clave_fecha`: Indica la clave empleada para la columna temporal, por default es `"fecha"` y con el ejemplo anterior de `datos` podría no especificarse esta propiedad, pero si `datos` emplea otra clave para la temporalidad, esta propiedad tendrá que especificarse.
  - Tipo: `String`
  - Valor predeterminado: `"fecha"`
  - Requerido: Sí
- `formato_temporal`: Especifica el formato temporal que tiene la variable de tiempo. Es un parámetro que se introduce a la función de d3 `d3.timeParse` y que sirve para transformar un formato de texto a un formato temporal dentro del contexto de javascript. En esta [documentación](https://d3-wiki.readthedocs.io/zh-cn/master/Time-Formatting/) se explica cómo especificar formatos para d3.
  - Tipo: `String`
  - Valor predeterminado: `"%d-%m-%Y"`
  - Requerido: Sí
- `alineacion_eje_y`: Esta propiedad indica de qué lado se acomodará el eje vertical, las opciones válidas son `'izquierda'` o `'derecha'`.
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
- `ancho_barra`: Valor entre 0 y 1 que especifica la fracción que ocupan las barras con respecto al espacio total. Por default es 0.3, no obstante, si la fracción es tal que dibuja unas barras de más de 20px, entonces el componente pintará barras de 20px y no más ancha. Dicha condición previene que se obtengan unas barras muy anchas que se "salgan" del svg o que generen una visualización desproporcionada.
  - Tipo: `Number`
  - Valor predeterminado: `0.3`
  - Requerido: No

### Métodos

- `calcularEscalas`: Este método se ejecuta al montar el componente y cuando se detectan cambios en `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` y calcula escalas para graficar.
- `creaAreas`: Este método se ejecuta al montar el componente y cuando se detectan cambios en `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` y crea y actualiza el gráfico.

### Propiedades expuestas

- `datos_hover`: Esta propiedad expuesta se modifica según la posición del cursor cuando se usa el slot `globo-informacion`, y devuelve un `Object` con los datos asociados a la fecha más cercana indicada por el cursor. Generalmente se usa esta propiedad para llenar el componente de `SisdaiGraficasGloboInfo` con información.

- `escalaTemporal`: Es la función de D3 `d3.scaleTime` que se emplea en el eje horizontal. Es útil cuando se desean agregar elementos al gráfico a través de dicha escala.
- `escalaLineal`: Es la función de D3 `d3.scaleLinear` que se emplea en el eje vertical. Es útil cuando se desean agregar elementos al gráfico a través de dicha escala.
- `conversionTemporal`: Es la función de D3 `d3.timeParse` que tiene como argumento el `formato_temporal` que se haya especificado en las propiedades. Puede ser útil cuando se desea agregar elementos usando la `escalaTemporal` y antes de ello los argumentos de dicha escala deben convertirse de `String` a un tipo de objeto `Date`.

## Ejemplos

<Basico/>
<<< @/.vitepress/components/areas-apiladas-ordenadas/basico.vue
<ModificandoDatos/>
<<< @/.vitepress/components/areas-apiladas-ordenadas/modificando-datos.vue
