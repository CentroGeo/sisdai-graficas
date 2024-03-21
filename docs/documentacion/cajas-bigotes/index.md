---
layout: LayoutDocumentacion
sectionName: Documentación
---

# SisdaiCajasBigotes

En esta sección se describe el uso del componente de visualización `<SisdaiCajasBigotes/>` para construir un diagrama de cajas y bigotes. Este gráfico es útil para visualizar distribuciones.

## Propiedades

### Obligatorias

- `datos`: (_Array_) Base de datos a visualizar, consiste en una arreglo de objetos en dónde cada objeto corresponde a un elemento de la distribución, el cual debe incluir una categoría y un valor numérico.

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
> El arreglo mostrado arriba puede ser el objeto resultante al importar con la biblioteca d3.js un archivo .csv con la estructura mostrada a continuación. En ese sentido, mantienen cierta equivalencia:
>
> <table>
> <thead>
>  <tr>
>    <th>nombre_empresa</th>
>    <th>acciones_vendidas</th>
>  </tr>
>  </thead>
>  <tbody>
>  <tr>
>    <td>Empresa A</td>
>    <td>180</td>
>  </tr>
>  <tr>
>    <td>Empresa B</td>
>    <td>178</td>
>  </tr>
>  <tr>
>    <td>Empresa C</td>
>    <td>467</td>
>  </tr>
>  <tr>
>    <td>Empresa A</td>
>    <td>264</td>
>  </tr>
> <tr>
>    <td>...</td>
>    <td>...</td>
>  </tr>
>
>  </tbody>
> </table>
>
> En este ejemplo, **nombre_empresa** indica las categorías con las que se agruparán los datos, y **acciones_vendidas** la variable númerica que se usará para calcular las los cuartiles y otros elementos de cada subconjunto de los datos.
> Cabe mencionar que el nombre de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no se tienen que llamar forzosamente como en el ejemplo. Las propiedades `variables` y `clave_categorias` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: (_Object_) Objeto que contiene información sobre el color y el nombre de la clave asociada a la variable numérica en `datos`. Consideran el caso anterior de `datos`, un ejemplo de `variables` es:

> ```json
>   {
>     "id": "acciones_vendidas",
>     "nombre": "Acciones vendidas",
>     "color": "#2c7fb8"
>   },
> ```
>
> Esta propiedad tiene un validador para verificar que el objeto contenga las tres claves
>
> - `id`: su valor debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas
> - `nombre`: su valor es un string que da más información sobre el id y es un _String_ que puede ser empleado para globos de información
> - `color`: Es un _String_ que especifica en rgb, hexagesimal u otro formato reconoconocido por css que indicará el color que tomarán los diagramas

- `clave_categorias`: (_String_) Indica la clave empleada para las categorías que se usarán para agrupar al conjunto de datos, por default es `"categoria"` y con el ejemplo anterior de `datos` tendría que especificarse como `"nombre_empresa"`

### Opcionales

- `alineacion_eje_y`: (_String_) Esta propiedad indica de qué lado se acomodará el eje vertical, las opciones validas son `'izquierda'` o `'derecha'`, y su valor por _default_ es `'izquierda'`.
- `angulo_etiquetas_eje_y`: (_Number_) Es un valor numerico que indica el ángulo de rotación del eje vertical
- `angulo_etiquetas_eje_x`: (_Number_) Es un valor numerico que indica el ángulo de rotación del eje horizontal

## Ejemplos

### Ejemplo básico de componente

En este ejemplo se muestra como se escribe el componente `<SisdaiCajasBigotes>` dentro del componente `<SisdaiGraficas>` y se especifican algunas de sus propiedades.
<utils-ejemplo-doc ruta="cajas-bigotes/basico.vue"/>

### Ejemplo con propiedades dinámicas

En este ejemplo se agrega una funcionalidad de un botón que alterna la base de `datos` que lee el componente. También se actualiza el valor de las propiedades `variables` y `clave_categorias`
<utils-ejemplo-doc ruta="cajas-bigotes/modificando-datos.vue"/>
