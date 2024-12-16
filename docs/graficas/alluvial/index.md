<script setup>
  import Basico from "../../.vitepress/components/alluvial/basico.vue";
  import AlluvialComplejo from "../../.vitepress/components/alluvial/alluvial-complejo.vue";
</script>

# SisdaiAlluvial

El componente `<SisdaiAlluvial/>`, permite generar diagramas de flujo de tipo Alluvial. Es ideal para representar flujo y/o conexiones entre diferentes datos.

Ejemplo de implementación:

```html
<SisdaiGraficas>
  <SisdaiAlluvial
    :datos="datos"
    :variables="variables"
  >
  </SisdaiAlluvial>
</SisdaiGraficas>
```

## Vista general

El siguiente ejemplo muestra el funcionamiento del componente con un conjunto de datos simples y un globo de información condicional:
<Basico/>
<<< @/.vitepress/components/alluvial/basico.vue

## API

### Propiedades

- `datos`: Conjunto de datos a visualizar. Consiste en un objeto que contiene dos claves principales: `"nodos"` cuyo valor es un arreglo de objetos que representan cada nodo con su respectivo nombre e id, y `"enlaces"`, que es un arreglo de objetos que define las conexiones entre los nodos, especificando la fuente, el objetivo y los valores asociados a cada enlace.

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
> Para este tipo de visualización no se recomienda usar archivos .csv, por lo que se sugiere importar los datos desde un archivo en formato `.json`.

- `variables`: Un arreglo de objetos que contiene la configuración gráfica para cada nodo o enlace dentro de los datos.
  - Tipo: `Array`
  - Valor predeterminado: `undefined`
  - Requerido: Sí

> Ejemplo de variables:

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
> Esta propiedad incluye un validador que asegura que cada objeto en el arreglo contenga las siguientes dos claves:

> - `id`: su valor es un `String` que debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas que contiene información numérica.

> - `color`: es un `String` que define el color de cada categoría, en formato RGB, hexadecimal u otro formato reconocido por `CSS`.

### Métodos

- `creaAlluvial`: Este método crea y actualiza el diagrama cuando detecta cambios en `datos`, `variables` o en otros elementos del componente contenedor`<SisdaiGraficas>`, como `margenes` o las dimensiones del `SVG`.

### Propiedades expuestas

- `datos_hover`: Esta propiedad expuesta se actualiza cuando el cursor se posiciona sobre uno de los rectángulos (nodos) o en algún enlace y devuelve un `Object` con los datos asociados al elemento generado por D3. Generalmente se usa esta propiedad para llenar el componente de `SisdaiGraficasGloboInfo` con información.
  - Si el cursor está sobre un enlace, devuelve un objeto con la clave `tipo: "enlace"`, junto con las claves `target`, `source` y `value` entre otros que asigna automáticamente D3.
  - Si el cursor está sobre un nodo, devuelve un objeto con la clave `tipo:"nodo"`, además de los datos `name`, `id` y `value` entre otros que asigna automáticamente D3.

## Ejemplo

Como se observa en el ejemplo anterior, cuando el cursor está dentro del gráfico en un área en blanco, el globo de información se queda sin contenido. Para evitar esto y mostrar el globo solo cuando el cursor está sobre un elemento visual, se puede usar la directiva `v-show` como se muestra en el siguiente ejemplo:
<AlluvialComplejo/>
<<< @/.vitepress/components/alluvial/alluvial-complejo.vue
