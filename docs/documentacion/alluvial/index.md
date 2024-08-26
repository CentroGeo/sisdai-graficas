<script setup>
    import Basico from "../../.vitepress/components/alluvial/basico.vue";
      import AlluvialComplejo from "../../.vitepress/components/alluvial/alluvial-complejo.vue";

</script>

# SisdaiAlluvial

En este apartado se describe el uso del componente `<SisdaiAlluvial/>`, el cual consiste en un diagrama de Alluvial, cuyo uso más común se da para representar diagramas de flujo y/o de conexiones.

Uso:

```html
<SisdaiGraficas>
  <SisdaiAlluvial
    :datos="datos"
    :variables="variables"
  >
  </SisdaiAlluvial>
</SisdaiGraficas>
```

## API

### Propiedades

- `datos`: Base de datos a visualizar, consiste en un objeto con la clave `"nodos"` y cuyo valor es un arreglo de objetos que contienen el nombre y el id de cada nodo y otra clave `"enlaces"` cuyo valor es un arreglo de enlaces con la fuente, el objetivo y los valores de dicho enlace.
  - Tipo: `Object`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> Ejemplo de `datos`:
>
> ```json
> {
>   "nodos": [
>     { "name": "Nodo 0", "id": "nodo0" },
>     { "name": "Nodo 1", "id": "nodo1" },
>     { "name": "Nodo 2", "id": "nodo2" },
>     { "name": "Nodo 3", "id": "nodo3" }
>   ],
>   "enlaces": [
>     { "source": "Nodo 0", "target": "Nodo 2", "value": "1" },
>     { "source": "Nodo 1", "target": "Nodo 2", "value": "1" }
>     { "source": "Nodo 2", "target": "Nodo 3", "value": "2" }
>   ]
> }
> ```
>
> Para este tipo de visualización un archivo .csv no sería el formato más adecuado, por lo que se sugiere importar el objeto desde un archivo en formato .json

- `variables`: Arreglo de objetos, en donde cada uno contiene información de cada elemento gráfico, nodo o enlace, incluidos en la base de datos.
  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> Por ejemplo:

> ```json
> [
>   {
>     "id": "nodo0",
>     "color": "pink"
>   },
>   {
>     "id": "nodo1",
>     "color": "orange"
>   },
>   {
>     "id": "enlaces",
>     "color": "#2c7fb8"
>   }
> ]
> ```
>
> Esta propiedad tiene un validador para verificar que todos los objetos contengan las siguientes dos claves:

> - `id`: `String` cuyo valor debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas que contiene información numérica
> - `color`: `String` que especifica en rgb, hexadecimal u otro formato reconocido por `CSS` el color que tomará cada elemento.

### Métodos

- `creaAlluvial`: Este método crea y actualiza el diagrama cuando se detectan cambios en `datos` y `variables`, así como en otros elementos del componente contenedor `<SisdaiGraficas>` como lo son `margenes` y los tamaños del `SVG`.

### Propiedades expuestas

- `datos_hover`: Esta propiedad expuesta se modifica cuando el cursor se posiciona en uno de los rectángulos (nodos) o en los algún enlace y devuelve un `Object` con los datos asociados al elemento generado por D3. Generalmente se usa esta propiedad para llenar el componente de `SisdaiGraficasGloboInfo` con información.
  - Si el cursor está encima de un enlace, devuelve un objeto con la clave `tipo: "enlace"`, además de los datos `target`, `source` y `value` entre otros que asigna automáticamente D3.
  - Si el cursor está sobre un nodo, devuelve un objeto con la clave `tipo:"nodo"`, además de los datos `name`, `id` y `value` entre otros que asigna automáticamente D3.

## Ejemplos

El siguiente ejemplo muestra el funcionamiento del componente con una base de datos muy sencilla y un globo de información condicional.
<Basico/>
<<< @/.vitepress/components/alluvial/basico.vue

Cómo se puede notar en el ejemplo anterior, cuando el cursor se posiciona dentro del gráfico en un espacio en blanco, el globo de información se queda sin contenido. Si se quiere condicionar a que sólo se muestre si el cursor se posiciona sobre un elemento visual, se puede usar la directiva `v-show` como se muestra en el siguiente ejemplo.
<AlluvialComplejo/>
<<< @/.vitepress/components/alluvial/alluvial-complejo.vue
