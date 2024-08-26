<script setup>
    import Basico from "../../.vitepress/components/cajas-bigotes/basico.vue";
    import ModificandoDatos from "../../.vitepress/components/cajas-bigotes/modificando-datos.vue";
</script>

# SisdaiCajasBigotes

Los diagragmas de cajas y bigotes se utilizan para visualizar distribuciones. Esta biblioteca cuenta con el componente `<SisdaiCajasBigotes/>` para generar dicho diagrama. A continuación se explica su uso.

Uso:

```html
<SisdaiGraficas>
  <SisdaiCajasBigotes
    :datos="datos"
    :variables="variables"
    :clave_categorias="'nombre_empresa'"
  >
  </SisdaiCajasBigotes>
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
> En este ejemplo, **nombre_empresa** indica las categorías con las que se agruparán los datos, y **acciones_vendidas** la variable numérica que se usará para calcular las los cuartiles y otros elementos de cada subconjunto de los datos.
> Cabe mencionar que el nombre de las claves en los diccionarios (o de las columnas desde el punto de vista de la tabla) no se tienen que llamar forzosamente como en el ejemplo. Las propiedades `variables` y `clave_categorias` descritas a continuación nos permiten especificar el nombre de las claves (o columnas).

- `variables`: Objeto que contiene información sobre el color y el nombre de la clave asociada a la variable numérica en `datos`. Si consideramos el caso anterior de `datos`, un ejemplo de `variables` es:

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
    > Esta propiedad tiene un validador para verificar que el objeto contenga las tres claves
    >
    > - `id`: su valor debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas
    > - `nombre`: su valor es un string que da más información sobre el id y es un `String` que puede ser empleado para globos de información
    > - `color`: Es un `String` que especifica en rgb, hexadecimal u otro formato reconocido por css que indicará el color que tomarán los diagramas

- `clave_categorias`: Indica la clave empleada para las categorías que se usarán para agrupar al conjunto de datos, por default es `"categoria"` y con el ejemplo anterior de `datos` tendría que especificarse como `"nombre_empresa"`
  - Tipo: `String`
  - Valor predeterminado: `"categoria"`
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

### Métodos

- `calcularEscalas`: Este método se ejecuta al montar el componente y cuando se detectan cambios en `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` y calcula escalas para graficar.
- `creaCajasBigotes`: Este método se ejecuta al montar el componente y cuando se detectan cambios en `datos`, `variables` o en las dimensiones del componente contenedor `<SisdaiGraficas>` y crea y actualiza el gráfico.

### Propiedades expuestas

- `datos_hover`: Esta propiedad expuesta se modifica según la posición del cursor cuando se usa el slot `globo-informacion`, y devuelve un `Object` con los datos del diagrama asociado la categoría más cercana indicada por el cursor. Los valores que devuelve el objeto corresponden a la categoría `"categoria"`, el bigote superior `"max"`,el tercer cuartil `"q3"`, el promedio `"promedio"`, la mediana `"mediana"`, el primer cuartil `"q1"` y el bigote inferior `"min"`. Generalmente se usa esta propiedad expuesta para llenar el componente de `SisdaiGraficasGloboInfo` con información.

- `escalaBanda`: Es la función de D3 `d3.scaleBand` que se emplea en el eje horizontal. Es útil cuando se desean agregar elementos al gráfico a través de dicha escala.

- `escalaLineal`: Es la función de D3 `d3.scaleLinear` que se emplea en el eje vertical. Es útil cuando se desean agregar elementos al gráfico a través de dicha escala.

## Ejemplos

<Basico/>
<<< @/.vitepress/components/cajas-bigotes/basico.vue

<ModificandoDatos/>
<<< @/.vitepress/components/cajas-bigotes/modificando-datos.vue
