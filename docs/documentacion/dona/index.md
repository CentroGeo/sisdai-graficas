<script setup>
    import Basico from "../../.vitepress/components/dona/basico.vue";
    import ModificandoDatos from "../../.vitepress/components/dona/modificando-datos.vue";
</script>

# SisdaiDona

El componente `<SisdaiDona/>` se utiliza para representar la distribución de una totalidad entre diferentes categorías mediante gráficos de dona o pastel. A continuación se detalla su uso y configuración.

Ejemplo de implementación:

```html
<SisdaiGraficas>
  <SisdaiDona
    :datos="datos"
    :variables="variables"
  >
  </SisdaiDona>
</SisdaiGraficas>
```

## API

### Propiedades

- `datos`: Conjunto de datos a visualizar.Consiste en un arreglo de objetos en dónde cada objeto corresponde a un segmento de la dona y debe incluir una clave asociada al nombre de la categoría y otra clave asociada al número que representa el segmento.
  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> Ejemplo de `datos`:
>
> ```json
> [
>   { "categoria": "cat_A", "cantidad": 210 },
>   { "categoria": "cat_B", "cantidad": 120 },
>   { "categoria": "cat_C", "cantidad": 85 },
>   { "categoria": "cat_D", "cantidad": 52 }
> ]
> ```
>
> El arreglo mostrado anteriormente puede ser el objeto resultante de la importación de datos mediante la biblioteca D3.js o utilizando algún complemento (plugin) como [plugin-dsv](https://www.npmjs.com/package/@rollup/plugin-dsv) para procesar un archivo .csv con la siguiente estructura equivalente:
>
> <table>
> <thead>
> <tr>
> <th>categoria</th>
> <th>cantidad</th>
> </tr>
> </thead>
> <tbody>
> <tr>
> <td>cat_A</td>
> <td>210</td>
> </tr>
> <tr>
> <td>cat_B</td>
> <td>120</td>
> </tr>
> <tr>
> <td>cat_C</td>
> <td>85</td>
> </tr>
> <tr>
> <td>cat_D</td>
> <td>52</td>
> </tr>
> </tbody>
> </table>

> Cabe mencionar que los nombres de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no necesariamente deben coincidir con los del ejemplo mostrado. Las propiedades `variables`, `nombre_indice` y `clave_cantidad` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: Arreglo de objetos que contienen información sobre las categorías, como un `id` que debe coincidir con los identificadores o nombres que se usan en `datos`para cada segmento . También tienen información sobre el color y un nombre que puede ser alternativo al que se usa en `datos`:

  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí
    > ```json
    > [
    >   {
    >     "id": "cat_A",
    >     "nombre": "Categoría A",
    >     "color": "#FFCE00"
    >   },
    >   {
    >     "id": "cat_B",
    >     "nombre": "Categoría B",
    >     "color": "#FA5600"
    >   },
    >   {
    >     "id": "cat_C",
    >     "nombre": "Categoría C",
    >     "color": "#C7690D"
    >   },
    >   {
    >     "id": "cat_D",
    >     "nombre": "Categoría D",
    >     "color": "#FF9F4D"
    >   }
    > ]
    > ```
    >
    > Esta propiedad incluye un validador para verificar que todos los objetos contengan las siguientes tres claves:
    >
    > - `id`: su valor es un `String` y debe coincidir con alguna categoría de `datos`.
    > - `nombre`: su valor es un `String` que proporciona una descripción más detallada sobre el id y que puede ser empleado para globos de información
    > - `color`: es un `String` que define el color de cada categoría, en formato RGB, hexadecimal u otro formato reconocido por CSS.

- `nombre_indice`: especifica la clave que se utiliza para las categorías principales. Por defecto es `"categoria"` pero si los datos usan otro nombre, esta propiedad debe especificarse.
  - Tipo: `String`
  - Valor predeterminado: `"categoria"`
  - Requerido: Sí
- `clave_cantidad`: Especifica el nombre de la clave empleada para referir la cantidad o valor asociada a cada segmento de la dona u categoría. Por defecto es `"cantidad"` y en el ejemplo anterior no tendría que especificarse, pero si en `datos` se usará una clave distinta para referir la cantidad, dicha clave tendrá que especificarse aquí.
  - Tipo: `String`
  - Valor predeterminado: `"cantidad"`
  - Requerido: Sí
- `radio_interno`:Define el radio interno de la dona, que controla el tamaño del hueco central. Es un valor numérico entre 0 y 0.5. Si se establece en 0, se obtendrá una gráfica de pastel.

  - Tipo: `Number`
  - Valor predeterminado: `0.18`
  - Requerido: No

- `radio_externo`: Define el radio externo de la dona y debe ser mayor que el radio interno. Es un valor numérico entre 0 y 0.5. Ambas propiedades en conjunto sirven para calibrar el grosor y tamaño de la dona.

  - Tipo: `Number`
  - Valor predeterminado: `0.32`
  - Requerido: No

- `variables_visibles`: Arreglo opcional que especifica qué segmentos (identificador por `id`) serán mostrados en el gráfico. Los segmentos que no estén incluidos en el arreglo, no se visualizarán.

  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: No

- `color_dona_fondo`: Especifica el color de fondo de la dona para las áreas no asignadas a ningún segmento. Por defecto utiliza la variable de [sisdai-css](https://codigo.conahcyt.mx/sisdai/sisdai-css) `"var(--fondo)"`, pero se puede definir cualquier formato de color admitido por CSS.
  - Tipo: `String`
  - Valor predeterminado: `"var(--fondo)"`
  - Requerido: No

## Ejemplos

<Basico/>
<<< @/.vitepress/components/dona/basico.vue

<ModificandoDatos/>
<<< @/.vitepress/components/dona/modificando-datos.vue
