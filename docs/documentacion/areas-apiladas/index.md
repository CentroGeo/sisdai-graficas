---
layout: LayoutDocumentacion
sectionName: Documentación
---

# SisdaiAreasApiladas

A continuación se describe la utilización del componente de visualización `<SisdaiAreasApiladas/>` para construir un gráfico de
series de tiempo.

## Propiedades

### Obligatorias

- `datos`: (_Array_) Base de datos a visualizar, consiste en una arreglo de objetos en dónde cada objeto corresponde a una fecha y contiene una clave con dicho dato y otras claves con los valores de las variables en dicha temporalidad

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
> El arreglo mostrado arriba puede ser el objeto resultante al importar con la biblioteca d3.js un archivo .csv con la estructura mostrada a continuación. En ese sentido, mantienen cierta equivalencia:
>
> <table>
> <thead>
>  <tr>
>    <th>fecha</th>
>    <th>ags</th>
>    <th>bc</th>
>  </tr>
>  </thead>
>  <tbody>
>  <tr>
>    <td>01-01-2021</td>
>    <td>100</td>
>    <td>100</td>
>  </tr>
>  <tr>
>    <td>01-02-2021</td>
>    <td>80</td>
>    <td>50</td>
>  </tr>
>  <tr>
>    <td>01-03-2021</td>
>    <td>20</td>
>    <td>90</td>
>  </tr>
>  <tr>
>    <td>01-04-2021</td>
>    <td>20</td>
>    <td>15</td>
>  </tr>
>  </tbody>
> </table>

> Cabe mencionar que el nombre de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no se tienen que llamar forzosamente como en el ejemplo. Las propiedades `variables` y `clave_fecha` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: (_Array_) Arreglo de objetos, en donde cada uno contiene información de las variables o series de tiempo incluidas en la base de datos. Por ejemplo:

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
> - `id`: su valor debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas que contiene información numérica
> - `nombre`: su valor es un string que da más información sobre el id y es un _String_ que puede ser empleado para globos de información
> - `color`: Es un _String_ que especifica en rgb, hexagesimal u otro formato reconoconocido por css que indicará el color que tomará cada subcategoría

- `clave_fecha`: (_String_) Indica la clave empleada para la columna temporal, por default es `"fecha"` y con el ejemplo anterior de `datos` podría no especificarse esta propiedad, pero si `datos` emplea otra clave para la temporalidad, esta propiedad tendrá que especificarse.
- `formato_temporal`: (_String_) Especifica el formato temporal que tiene la variable de tiempo. Es un parámetro que se introduce a la función de d3 `d3.timeParse` y que sirve para transformar un formato de texto a un formato temporal dentro del contexto de javascript. En esta [documentación](https://d3-wiki.readthedocs.io/zh-cn/master/Time-Formatting/) se explica como espeficiar formatos para d3.

### Opcionales

- `alineacion_eje_y`: (_String_) Esta propiedad indica de qué lado se acomodará el eje vertical, las opciones validas son `'izquierda'` o `'derecha'`, y su valor por _default_ es `'izquierda'`.
- `angulo_etiquetas_eje_y`: (_Number_) Es un valor numerico que indica el ángulo de rotación del eje vertical
- `angulo_etiquetas_eje_x`: (_Number_) Es un valor numerico que indica el ángulo de rotación del eje horizontal

## Ejemplos

<utils-ejemplo-doc ruta="areas-apiladas/basico.vue"/>
<utils-ejemplo-doc ruta="areas-apiladas/modificando-datos.vue"/>
