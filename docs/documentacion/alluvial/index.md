---
layout: Layout
sectionName: Documentación
---

# SisdaiAlluvial

A continuación se describe la utilización del componente de visualización `<SisdaiAlluvial/>` para construir un gráfico de
tipo alluvial.

## Propiedades

### Obligatorias

- `datos`: (_Object_) Base de datos a visualizar, consiste en un objeto con dos propiedades que corresponden a un arreglo de nodos que contiene el nombre y el id de dicho nodo y otro arreglo de enlaces con la fuente, el objetivo y los valores de dicho enlace.

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

- `variables`: (_Array_) Arreglo de objetos, en donde cada uno contiene información de las variables, nodos o enlaces incluidas en la base de datos. Por ejemplo:

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
> Esta propiedad tiene un validador para verificar que todos los objetos contengan las dos claves:
>
> - `id`: su valor debe coincidir con alguna subcategoría de `datos`, equivalente a uno de los nombres de las columnas que contiene información numérica
> - `color`: Es un _String_ que especifica en rgb, hexagesimal u otro formato reconoconocido por css que indicará el color que tomará cada subcategoría

## Ejemplos

<utils-ejemplo-doc ruta="alluvial/basico.vue"/>
<utils-ejemplo-doc ruta="alluvial/complejo.vue"/>
