<script setup>
    import Basico from "../../.vitepress/components/cajas-bigotes/basico.vue";
    import ModificandoDatos from "../../.vitepress/components/cajas-bigotes/modificando-datos.vue";
</script>

# Cajas y Bigotes

El componente `<SisdaiCajasBigotes/>` se utiliza para generar diagramas de cajas y bigotes que son útiles para visualizar distribuciones. A continuación se explica su uso.

Ejemplo de implementación:

```html
<SisdaiGraficas>
  <SisdaiCajasBigotes
    :datos="datos"
    :variables="variables"
    :nombre_indice="'nombre_empresa'"
  >
  </SisdaiCajasBigotes>
</SisdaiGraficas>
```

## Vista general

<Basico/>
<<< @/.vitepress/components/cajas-bigotes/basico.vue

## API

### Propiedades

- `datos`: Conjunto de datos a visualizar. Consiste en un arreglo de objetos en dónde cada objeto corresponde a un elemento de la distribución y debe incluir una categoría y un valor numérico.
  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> Ejemplo de `datos`:
>
> ```json
> [
>   {
>     "nombre_empresa": "Empresa A",
>     "acciones_vendidas": 180
>   },
>   {
>     "nombre_empresa": "Empresa B",
>     "acciones_vendidas": 178
>   },
>   {
>     "nombre_empresa": "Empresa C",
>     "acciones_vendidas": 467
>   },
>   {
>     "nombre_empresa": "Empresa A",
>     "acciones_vendidas": 264
>   },
> ...
> ]
> ```
>
> El arreglo mostrado anteriormente puede ser el objeto resultante de la importación de datos mediante la biblioteca D3.js o utilizando algún complemento (plugin) como [plugin-dsv](https://www.npmjs.com/package/@rollup/plugin-dsv) para procesar un archivo .csv con la siguiente estructura equivalente:
>
> <table>
> <thead>
> <tr>
> <th>nombre_empresa</th>
> <th>acciones_vendidas</th>
> </tr>
> </thead>
> <tbody>
> <tr>
> <td>Empresa A</td>
> <td>180</td>
> </tr>
> <tr>
> <td>Empresa B</td>
> <td>178</td>
> </tr>
> <tr>
> <td>Empresa C</td>
> <td>467</td>
> </tr>
> <tr>
> <td>Empresa A</td>
> <td>264</td>
> </tr>
> <tr>
> <td>...</td>
> <td>...</td>
> </tr>
>
> </tbody>
> </table>
>
> En este ejemplo, **nombre_empresa** indica las categorías con las que se agruparán los datos, mientras que **acciones_vendidas** es el valor numérico utilizado para calcular los cuartiles y otros otros elementos estadísticos de cada subconjunto de los datos. Cabe mencionar que los nombres de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no necesariamente deben coincidir con los del ejemplo mostrado. Las propiedades `variables` y `nombre_indice` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: Arreglo de objetos que contienen información sobre el color y el nombre de la clave asociada a la variable numérica en `datos`. Si consideramos el caso anterior de `datos`, un ejemplo de `variables` es:

  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

    > ```json
    >   {
    >     "id": "acciones_vendidas",
    >     "nombre": "Acciones vendidas",
    >     "color": "#2c7fb8"
    >   },
    > ```
    >
    > Esta propiedad incluye un validador para verificar que el objeto contenga las siguientes tres claves

    > - `id`: su valor es un `String` que debe coincidir con alguna subcategoría de `datos`, equivalente a un nombre de las columnas.
    > - `nombre`: su valor es un `String` que proporciona una descripción más detallada sobre el id y que puede ser útil para mostrar globos de información.
    > - `color`: Es un `String` que define el color del diagrama especificando en formatos RGB, hexadecimal u otro formato reconocido por CSS.

- `nombre_indice`:especifica la clave que se utiliza para las categorías que se usarán para agrupar al conjunto de datos. Por defecto es `"categoria"`, pero si los datos usan otro nombre, esta propiedad debe especificarse. Con el ejemplo anterior de datos tendría que especificarse como `"nombre_empresa"`
  - Tipo: `String`
  - Valor predeterminado: `"categoria"`
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
- `tabla_caption`: es un texto que se inserta en el elemento `<caption>` de la tabla asociada a la gráfica. **Aunque esta propiedad no es obligatora, por accesibilidad y buenas prácticas de desarrollo es muy importante incluir un texto que describa correctamente la información de la tabla**.

  - Tipo: `String`
  - Valor predeterminado: `"Tabla de datos de la gráfica de cajas y bigotes"`
  - Requerido: No

- `numero_marcas_y`: Valor númerico entero que especifica el número aproximado de marcas para el eje creado con d3 mediante el [método](https://d3js.org/d3-axis) `.ticks()` para el eje vertical.
  - Tipo: `Number`
  - Valor predeterminado: -
  - Requerido: No

### Métodos

- `calcularEscalas`: Este método se ejecuta al montar el componente o cuando se detectan cambios en las propiedades `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>`. Calcula escalas necesarias para graficar los datos.
- `creaCajasBigotes`: Este método se ejecuta al montar el componente o cuando se detectan cambios en las propiedades `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` .Crea y actualiza el gráfico de cajas y bigotes.

### Propiedades expuestas

- `datos_hover`: propiedad reactiva que se actualiza según la posición del cursor cuando se usa el slot `globo-informacion`. Devuelve un `Object` con los datos del diagrama asociado la categoría más cercana indicada por el cursor. Los valores que devuelve el objeto corresponden a la categoría `"categoria"`, el bigote superior `"max"`,el tercer cuartil `"q3"`, el promedio `"promedio"`, la mediana `"mediana"`, el primer cuartil `"q1"` y el bigote inferior `"min"`. Generalmente se usa esta propiedad expuesta para llenar el componente de `SisdaiGraficasGloboInfo` con información.

- `escalaBanda`: Es la función de D3 `d3.scaleBand` que se emplea en el eje horizontal. Es útil cuando se desean agregar elementos al gráfico que se basen en la escala categórica.

- `escalaLineal`: Es la función de D3 `d3.scaleLinear` que se emplea en el eje vertical. Es útil cuando se desean agregar elementos al gráfico que dependan de esta escala.

## Ejemplo

<ModificandoDatos/>
<<< @/.vitepress/components/cajas-bigotes/modificando-datos.vue
