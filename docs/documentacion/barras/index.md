---
layout: LayoutDocumentacion
sectionName: Documentación
---

# SisdaiBarras

A continuación se describe la utilización del componente de visualización `<SisdaiBarras/>` para construir un gráfico de
barras. Este componente puede ser utilizado para crear barras simples o apiladas.

## Propiedades

### Obligatorias

- `datos`: (_Array_) Base de datos a visualizar, consiste en una arreglo de objetos en dónde cada objeto corresponde a una categoría principal y contiene la información necesaria para construir una barra, una barra conformada por otros rectángulos apilados, o bien, un conjunto de barras agupadas

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
> El arreglo mostrado arriba puede ser el objeto resultante al importar con la biblioteca d3.js un archivo .csv con la estructura mostrada a continuación. En ese sentido, mantienen cierta equivalencia:
>
> <table>
> <thead>
>  <tr>
>    <th>categoria</th>
>    <th>cantidad_1</th>
>    <th>cantidad_2</th>
>  </tr>
>  </thead>
>  <tbody>
>  <tr>
>    <td>aguascalientes</td>
>    <td>100</td>
>    <td>100</td>
>  </tr>
>  <tr>
>    <td>baja_california</td>
>    <td>80</td>
>    <td>50</td>
>  </tr>
>  <tr>
>    <td>baja_california_sur</td>
>    <td>20</td>
>    <td>90</td>
>  </tr>
>  <tr>
>    <td>zacatecas</td>
>    <td>20</td>
>    <td>15</td>
>  </tr>
>  </tbody>
> </table>
>
> En este ejemplo, **categoria** indica las categorías principales, y **cantidad_1** y **cantidad_2** son un valores numérico que representa la magnitud de dichas subcategorías.
> Cabe mencionar que el nombre de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no se tienen que llamar forzosamente como en el ejemplo. Las propiedades `variables` y `clave_categorias` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: (_Array_) Arreglo de objetos, en donde cada uno contiene información de las subcategorías/colores incluidos en la base de datos. Por ejemplo:

> ```json
> [
>   {
>     "id": "cantidad_1",
>     "nombre_subcategoria": "Cantidad 1",
>     "color": "pink"
>   },
>   {
>     "id": "cantidad_2",
>     "nombre_subcategoria": "Cantidad 2",
>     "color": "orange"
>   }
> ]
> ```
>
> Esta propiedad tiene un validador para verificar que todos los objetos contengan las tres claves:
>
> - `id`: su valor debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas
> - `nombre_subcategoria`: su valor es un string que da más información sobre el id y es un _String_ que puede ser empleado para globos de información
> - `color`: Es un _String_ que especifica en rgb, hexagesimal u otro formato reconoconocido por css que indicará el color que tomará cada subcategoría

- `clave_categorias`: (_String_) Indica la clave empleada para las categorías principales, por default es `"categoria"` y con el ejemplo anterior de `datos` podría no especificarse esta propiedad, pero si `datos` emplea otra clave para la categoría principal, esta propiedad tendrá que especificarse

- `clave_categorias`: (_String_) Indica la clave empleada para las categorías principales, por default es `"categoria"` y con el ejemplo anterior de `datos` podría no especificarse esta propiedad, pero si `datos` emplea otra clave para la categoría principal, esta propiedad tendrá que especificarse

- `alineacion_eje_y`: (_String_) Esta propiedad indica de qué lado se acomodará el eje vertical, las opciones validas son `'izquierda'` o `'derecha'`, y su valor por _default_ es `'izquierda'`.

### Opcionales

-`separacion`: (_Number_) Valor numérico entre 0 y 1 que determina la separación de las barras. Por default es `0.2` y significa que el 20% de la gráfica será espacio en blanco

- `acomodo`: (_String_) Admite los valores `"apiladas"` o `"agrupadas"` y determina la forma en la que se mostrarán las barras en caso de que existan varias subcategorías. -`padding_agrupadas`: (_Number_) Valor numérico entre 0 y 1 que determina la separación de las barras agrupadas. Para ver su efecto, se debe tener la propiedad `acomodo` en `"agrupadas"`. Por default es 0.1 y significa que para un subgrupo barras el 10% será espacio en blanco.

<utils-ejemplo-doc ruta="barras/basico.vue"/>
<utils-ejemplo-doc ruta="barras/modificando-datos.vue"/>
<utils-ejemplo-doc ruta="barras/checks.vue"/>
