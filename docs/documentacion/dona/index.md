<script setup>
    import Basico from "../../.vitepress/components/dona/basico.vue";
    import ModificandoDatos from "../../.vitepress/components/dona/modificando-datos.vue";
</script>

# SisdaiDona

Las gráficas de dona o pay se usan para representar cómo se reparte una totalidad. Esta biblioteca ofrece el componente `<SisdaiDona/>` para construir este tipo de gráficas. En esta sección se explica su uso.

Uso:

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

- `datos`: Base de datos a visualizar, consiste en una arreglo de objetos en dónde cada objeto corresponde a un segmento de la dona y debe contener una clave asociada al nombre de la categoría y otra clave asociada al número que representa el segmento.
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
> El arreglo mostrado arriba puede ser el objeto resultante al importar con la biblioteca d3.js un archivo .csv con la estructura mostrada a continuación. En ese sentido, mantienen cierta equivalencia:
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

> Cabe mencionar que el nombre de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no se tienen que llamar forzosamente como en el ejemplo. Las propiedades `variables`, `clave_categoria` y `clave_cantidad` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: Arreglo de objetos, en donde cada uno contiene información de las categorías como un `id` que debe coincidir con los identificadores o nombres que se usan en `datos` para cada rebanada. También tienen información sobre el color y un nombre que puede ser alternativo al que se usa en `datos`:

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
    > Esta propiedad tiene un validador para verificar que todos los objetos contengan las tres claves:
    >
    > - `id`: su valor debe coincidir con alguna categoría de `datos`.
    > - `nombre`: su valor es un string que da más información sobre el id y es un `String` que puede ser empleado para globos de información
    > - `color`: Es un `String` que especifica en rgb, hexadecimal u otro formato reconocido por css que indicará el color que tomará cada subcategoría

- `clave_categoria`: Indica la clave empleada para la columna categórica en `datos`, por default es `"categoria"` y con el ejemplo anterior de `datos` podría no especificarse esta propiedad, pero si `datos` emplea otra clave para las categorías, esta propiedad tendrá que especificarse y ser igual a la clave que usa `datos`.
  - Tipo: `String`
  - Valor predeterminado: `"categoria"`
  - Requerido: Sí
- `clave_cantidad`: Especifica el nombre de la clave empleada para referir la cantidad o valor asociada a cada segmento de la dona u categoría. Por default es `"cantidad"` y en el ejemplo anterior no tendría que especificarse, pero si en `datos` se usará una clave distinta para referir la cantidad, dicha clave tendrá que especificarse aquí.
  - Tipo: `String`
  - Valor predeterminado: `"cantidad"`
  - Requerido: Sí
- `radio_interno`: Es un número entre 0 y 0.5 que indica el espacio en blanco dentro de la dona. Si es 0, se obtendrá una gráfica de pastel.
  - Tipo: `Number`
  - Valor predeterminado: `0.18`
  - Requerido: No
- `radio_externo`: Es un número entre 0 y 0.5 que debe ser mayor al radio interno. Ambas propiedades en conjunto sirven para calibrar el grosor y tamaño de la dona.
  - Tipo: `Number`
  - Valor predeterminado: `0.32`
  - Requerido: No
- `variables_visibles`: Es una propiedad opcional que consiste en un arreglo los `id` que especifican las rebanadas que serán mostradas. Los que no estén incluidos en el arreglo, no se mostrarán en el gráfico
  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: No
- `color_dona_fondo`: Especifica el color de la dona de fondo que se muestra cuando hay rebanadas sin pintar. Por deault es la variable de [sisdai-css](https://codigo.conahcyt.mx/sisdai/sisdai-css) `"var(--fondo)"`, pero se puede usar cualquier formato de color admitido por CSS.
  - Tipo: `String`
  - Valor predeterminado: `"var(--fondo)"`
  - Requerido: No

## Ejemplos

<Basico/>
<<< @/.vitepress/components/dona/basico.vue

<ModificandoDatos/>
<<< @/.vitepress/components/dona/modificando-datos.vue
