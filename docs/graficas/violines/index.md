<script setup>
    import Basico from "../../.vitepress/components/violines/basico.vue";
    import ModificandoDatos from "../../.vitepress/components/violines/modificando-datos.vue";

</script>

# Violines

El componente `<SisdaiViolines/>` se utiliza para construir diagramas de violines, los cuales son útiles para visualizar distribuciones de datos. A continuación se detalla su uso y configuración.

Ejemplo de implementación:

```html
<SisdaiGraficas>
  <SisdaiViolines
    :datos="datos"
    :variables="variables"
  >
  </SisdaiViolines>
</SisdaiGraficas>
```

## Vista general

<Basico/>
<<< @/.vitepress/components/violines/basico.vue

## API

### Propiedades

- `datos`: Conjunto de datos a visualizar.Consiste en un arreglo de objetos en dónde cada objeto corresponde a un elemento de la distribución, el cual debe incluir una categoría y un valor numérico.
  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> Ejemplo de `datos`:
>
> ```json
> [
>   {
>     "seguridad_social": "INSABI",
>     "edad": 35
>   },
>   {
>     "seguridad_social": "INSABI",
>     "edad": 40
>   },
>   {
>     "seguridad_social": "IMSS",
>     "edad": 22
>   },
>   {
>     "seguridad_social": "Otro",
>     "edad": 19
>   },
> ...
> ]
> ```
>
> El arreglo mostrado anteriormente puede ser el objeto resultante de la importación de datos mediante la biblioteca D3.js o utilizando algún complemento (plugin) como [plugin-dsv](https://www.npmjs.com/package/@rollup/plugin-dsv) para procesar un archivo .csv con la siguiente estructura equivalente:

> <table>
> <thead>
> <tr>
> <th>seguridad_social</th>
> <th>edad</th>
> </tr>
> </thead>
> <tbody>
> <tr>
> <td>INSABI</td>
> <td>35</td>
> </tr>
> <tr>
> <td>INSABI</td>
> <td>40</td>
> </tr>
> <tr>
> <td>IMSS</td>
> <td>22</td>
> </tr>
> <tr>
> <td>Otro</td>
> <td>19</td>
> </tr>
> <tr>
> <td>...</td>
> <td>...</td>
> </tr>
>
> </tbody>
> </table>
>
> En este ejemplo, **seguridad_social** indica las categorías con las que se agruparán los datos, mientras que **edad** es la variable numérica que se usará para calcular las los cuartiles y otros elementos de cada subconjunto de los datos. Cabe mencionar que los nombres de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no necesariamente deben coincidir con los del ejemplo mostrado. Las propiedades `variables` y `nombre_indice` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: Arreglo de objetos que contienen información sobre el color y el nombre de la clave asociada a la variable numérica en `datos` Si consideramos el caso anterior de `datos`, un ejemplo de `variables` es:
  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> ```json
>   {
>     "id": "edad",
>     "nombre": "Edad",
>     "color": "#2c7fb8"
>   },
> ```
>
> Esta propiedad incluye un validador para verificar que el objeto contenga las siguiente tres claves:
>
> - `id`:su valor es un `String` que debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas.
> - `nombre`: su valor es un string que da más información sobre el `id` y es un `String` que puede ser empleado para globos de información.
> - `color`: Es un `String` que define el color de los diagramas, especificado en RGB, hexadecimal u otro formato reconocido por CSS.

- `nombre_indice`: Especifica la clave empleada para las categorías que se usarán para agrupar al conjunto de datos.Por defecto es `"categoria"` y con el ejemplo anterior de `datos` tendría que especificarse como `"seguridad_social"`
  - Tipo: `String`
  - Valor predeterminado: `"categoria"`
  - Requerido: Sí
- `numero_divisiones`: Define en cuántas partes se dividirá la distribución obtenida en el histograma.

  - Tipo: `Number`
  - Valor predeterminado: `10`
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
- `tabla_caption`: es un texto que se inserta en el elemento `<caption>` de la tabla asociada a la gráfica. **Aunque esta propiedad no es obligatora, por accesibilidad y buenas prácticas de desarrollo es muy importante incluir un texto que describa correctamente la información de la tabla**.

  - Tipo: `String`
  - Valor predeterminado: `"Tabla de datos de la gráfica de violines"`
  - Requerido: No

- `numero_marcas_y`: Valor númerico entero que especifica el número aproximado de marcas para el eje creado con d3 mediante el [método](https://d3js.org/d3-axis) `.ticks()` para el eje vertical.
  - Tipo: `Number`
  - Valor predeterminado: -
  - Requerido: No

### Métodos

- `calcularEscalas`: Este método se ejecuta al montar el componente o cuando se detectan cambios en las propiedades`datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>`. Calcula escalas necesarias para graficar los datos.
- `creaViolines`: Este método se ejecuta al montar el componente o cuando se detectan cambios en las propiedades `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` .Crea y actualiza la gráfica de violines.

### Propiedades expuestas

- `datos_hover`: Esta propiedad expuesta se actualiza según la posición del cursor cuando se usa el slot `globo-informacion`. Devuelve un `Object` con los datos del diagrama asociado la categoría y corte más cercano indicada por el cursor. Los valores que devuelve el objeto corresponden a:

  - `"categoria"`: Categoría del violín
  - `"datos_segmento"`: Es un `Array` que tiene la lista de datos asociados a la categoría y corte.
  - `"x0"`: El valor mínimo del corte.
  - `"x1"`: Es el valor máximo del corte.
  - `"cantidad_muestras_segmento"`: Es el número de muestras de dicha categoría y corte. En otras palabras, es la longitud de `"datos_segmento"`.
  - `"cantidad_muestras_violin"`: Es el número de muestras de dicha categoría tomando en cuenta el violín completo.

- `escalaBanda`: Es la función de D3 `d3.scaleBand` que se emplea en el eje horizontal. Es útil cuando se desean agregar elementos al gráfico que se basen en la escala categórica.

- `escalaLineal`: Es la función de D3 `d3.scaleLinear` que se emplea en el eje vertical. Es útil cuando se desean agregar elementos al gráfico que dependan de esta escala.

## Ejemplo

<ModificandoDatos/>
<<< @/.vitepress/components/violines/modificando-datos.vue
