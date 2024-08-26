<script setup>
    import Basico from "../../.vitepress/components/violines/basico.vue";
    import ModificandoDatos from "../../.vitepress/components/violines/modificando-datos.vue";

</script>

# SisdaiViolines

En esta sección se describe el uso del componente de visualización `<SisdaiViolines/>` para construir un diagrama de violines. Este gráfico es útil para visualizar distribuciones.

Uso:

```html
<SisdaiGraficas>
  <SisdaiViolines
    :datos="datos"
    :variables="variables"
  >
  </SisdaiViolines>
</SisdaiGraficas>
```

## API

### Propiedades

- `datos`: Base de datos a visualizar, consiste en una arreglo de objetos en dónde cada objeto corresponde a un elemento de la distribución, el cual debe incluir una categoría y un valor numérico.
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
> El arreglo mostrado arriba puede ser el objeto resultante al importar con la biblioteca d3.js un archivo .csv con la estructura mostrada a continuación. En ese sentido, mantienen cierta equivalencia:
>
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
> En este ejemplo, **seguridad_social** indica las categorías con las que se agruparán los datos, y **edad** la variable númerica que se usará para calcular las los cuartiles y otros elementos de cada subconjunto de los datos.
> Cabe mencionar que el nombre de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no se tienen que llamar forzosamente como en el ejemplo. Las propiedades `variables` y `clave_categorias` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: Objeto que contiene información sobre el color y el nombre de la clave asociada a la variable numérica en `datos`. Si consideramos el caso anterior de `datos`, un ejemplo de `variables` es:
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
> Esta propiedad tiene un validador para verificar que el objeto contenga las tres claves
>
> - `id`: su valor debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas
> - `nombre`: su valor es un string que da más información sobre el id y es un `String` que puede ser empleado para globos de información
> - `color`: Es un `String` que especifica en rgb, hexagesimal u otro formato reconoconocido por css que indicará el color que tomarán los diagramas

- `clave_categorias`: Indica la clave empleada para las categorías que se usarán para agrupar al conjunto de datos, por default es `"categoria"` y con el ejemplo anterior de `datos` tendría que especificarse como `"seguridad_social"`
  - Tipo: `String`
  - Valor predeterminado: `"categoria"`
  - Requerido: Sí
- `numero_divisiones`: Este número sirve para indicar en cuantas partes se dividirá la distribución obtenida en el histograma.
  - Tipo: `Number`
  - Valor predeterminado: `10`
  - Requerido: No
- `alineacion_eje_y`: Esta propiedad indica de qué lado se acomodará el eje vertical, las opciones validas son `'izquierda'` o `'derecha'`.
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

### Métodos

- `calcularEscalas`: Este método se ejecuta al montar el componente y cuando se detectan cambios en `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` y calcula escalas para graficar.
- `creaViolines`: Este método se ejecuta al montar el componente y cuando se detectan cambios en `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` y crea y actualiza el gráfico.

### Propiedades expuestas

- `datos_hover`: Esta propiedad expuesta se modifica según la posición del cursor cuando se usa el slot `globo-informacion`, y devuelve un `Object` con los datos del diagrama asociado la categoría y corte más cercano indicada por el cursor. Los valores que devuelve el objeto corresponden a:

  - `"categoria"`: Categoría del violín
  - `"datos_segmento"`: Es un `Array` que tiene la lista de datos asociados a la categoría y corte.
  - `"x0"`: El valor mínimo del corte
  - `"x1"`: Es el valor máximo del corte
  - `"cantidad_muestras_segmento"`: Es el número de muestras de dicha categoría y corte. En otras palabras, es la longitud de `"datos_segmento"`.
  - `"cantidad_muestras_violin"`: Es el número de muestras de dicha categoría tomando en cuenta el violín completo.

- `escalaBanda`: Es la función de D3 `d3.scaleBand` que se emplea en el eje horizontal. Es útil cuando se desean agregar elementos al gráfico a través de dicha escala.

- `escalaLineal`: Es la función de D3 `d3.scaleLinear` que se emplea en el eje vertical. Es útil cuando se desean agregar elementos al gráfico a través de dicha escala.

## Ejemplos

<Basico/>
<<< @/.vitepress/components/violines/basico.vue
<ModificandoDatos/>
<<< @/.vitepress/components/violines/modificando-datos.vue
