# Áreas apiladas

A continuación se describe la utilización del componente de visualización `<SisdaiAreasApiladas/>` para construir un
gráfico de áreas apiladas.

<areas-apiladas-slots-tooltip/>

## Parámetros
La siguiente es una lista de propiedades que admite el componente y que se tienen que especificar al importar el mismo.


### Obligatorios

* `areas_apiladas_id` (_String_) Identificador único del componente.
* `datos` (_Array_) Base de datos como arreglo de objetos, en donde cada elemento debe tener el valor de las variables 
numéricas (métricas) de cada franja a graficar y su correspondiente valor temporal. En el siguiente conjunto de datos 
de ejemplo se dan métricas como nombres de variables y la fecha correspondiente a cada una.

    ```json
      [
        {
          "se": "SE01-21",
          "fecha_1": "03-01-2021",
          "fecha_2": "09-01-2021",
          "cve_ent": "00",
          "ent": "Nacional",
          "Variable_1": 8,
          "Variable_2": 1,
          "Variable_3": 0,
          "Variable_4": 0,
          "Variable_5": 0,
          "Variable_6": 0,
          "Variable_7": 0,
          "Variables_restantes": 163,
        }
        {
            "se": "SE02-21",
            "fecha_1": "10-01-2021",
            "fecha_2": "16-01-2021",
            "cve_ent": "00",
            "ent": "Nacional",
            "Variable_1": 3,
            "Variable_2": 0,
            "Variable_3": 0,
            "Variable_4": 0,
            "Variable_5": 1,
            "Variable_6": 0,
            "Variable_7": 0,
            "Variables_restantes": 155,
        },
        ...
      ]
    ```

* `nombre_columna_horizontal` (_String_) Es el nombre que lleva la variable que va a usarse en el eje horizontal.
  Normalmente es temporal y en el ejemplo anterior sería `"fecha_1"` o `"fecha_2"`.
* `variables` (_Array_) Lista de diccionarios que contiene atributos de cada una de las áreas/franjas. Las claves
  obligatorias son `id` y `nombre`, y se refieren al nombre de la área/franja en la base de datos y al nombre que se quiere 
  mostrar el tooltip de cada área/franja graficada.

  ```json
  [
    {
        "id": "Variable_1",
        "nombre": "Variable_1",
        "color": "#FFCE00"
    },
    {
        "id": "Variable_2",
        "nombre": "Variable_2",
        "color": "#FA5600"
    },
    {
        "id": "Variable_3",
        "nombre": "Variable_3",
        "color": "#C7690D"
    },
    {
        "id": "Variable_4",
        "nombre": "Variable_4",
        "color": "#FF9F4D"
    },
    {
        "id": "Variable_5",
        "nombre": "Variable_5",
        "color": "#FFAC99"
    },
    {
        "id": "Variable_6",
        "nombre": "Variable_6",
        "color": "#29037B"
    },
    {
        "id": "Variable_7",
        "nombre": "Variable_7",
        "color": "#A359D9"
    },
    {
        "id": "Variables_restantes",
        "nombre": "Variables_restantes",
        "color": "#bcbcbc"
    }
  ]
  ```

### Opcionales


* `tooltip_activo` (_Boolean_) Indica si se quiere activar el tooltip. Es `true` por default.

* `ancho_tooltip` (_Number_) Número que indica el ancho del tooltip, por defecto usa 180.
* `alto_vis` (Number) Número que indica la altura del svg, tiene valor de 300 por default.
* `margen` (_Object_) Diccionario que contiene los márgenes a la derecha, izquierda, arriba y abajo. Por defecto
  es ` {arriba: 10, abajo: 70, izquierda: 20, derecha: 30}`.
* `titulo_eje_y`: (_String_) Etiqueta del eje vertical.
* `titulo_eje_x`: (_String_) Etiqueta del eje horizontal.
* `conversionTemporal`: (_Function_) Función que por default es `d3.timeParse("%d-%m-%Y")` sirve para especificar el
  formato de la variable temporal.
* `formatoEtiquetasY`: (_Function_) Función que por default es `(d) =>  d.toLocaleString("en")` sirve para especificar el
  formato del eje y.
* `textoTooltip` (_Function_) Esta función se usa para modificar el texto que aparece en los tooltips.
Los siguiente parámetros se pueden usar para modificar la visualización.


## Ejemplos de uso

En esta sección se detallan tres diferentes tipos casos de uso de este componente. El componente `<SisdaiAreasApiladas/>`
requiere que los datos se encuentren en un archivo `.json` externo, que se importa por medio de un `import`en el 
apartado `<script/>`. Para los diferentes ejemplos de esta sección, ya se tienen los datos importados.

### Gráfico sin interacción

En esta ejemplo, la gráfica es estática, y se puede observar que se tienen incluídos los parámetros obligatorias que ya
se mencionaron en la sección anterior. Ya que el tooltip es una propiedad por default, para lograr esta gráfica estática
lo que se debe de hacer es agregar la propiedad de `:tooltip_activo= "false"` para lograr ocultaro en la visualización. 
El `<template>` queda entonces estructurado de la siguiente manera:


```html
<template>
  <SisdaiAreasApiladas
        areas_apiladas_id="streamgraphbasico"
        :datos="datos_grafica"
        :variables='[
          {"id":"Variable_1","nombre":"Variable_1", "color": "#C2E7D9"},
          {"id":"Variable_2","nombre":"Variable_2", "color":"#A6CFD5"},
          {"id":"Variable_3","nombre":"Variable_3","color": "#26408B"},
          {"id":"Variable_4","nombre":"Variable_4", "color": "#0F084B"},
          {"id":"Variable_5","nombre":"Variable_5", "color": "#0D0221"},
        ]'
        :alto_vis="300"
        nombre_columna_horizontal="fecha_1"
        :tooltip_activo="false"
    />
</template>
```

Siendo este el resultado,

<areas-apiladas-basico/>


### Slots y controles

Los [slots](https://vuejs.org/guide/components/slots.html) son de mucha utilidad para poder insertar encabezados y pies 
de página al agregar títulos, notas, controles, nomenclaturas, o cualquier información que nos ayude a entender más 
las gráficas. Para poder agregar el uso de los slots y el tooltip, se hará de la siguiente manera:

* Tooltip: como se puede observar, ya no es necesario agregar la propiedad de `:tooltip_activo` ya que el tooltip por 
  default ya está agregado al componente.
* Slots: se pueden agregar tanto en el título como en el pie de la gráfica. En `<template slot>` se agrega el
  `"encabezado"` y el `"pie"`, y adentro de cada uno, lo que se necesite que aparezca en cada una de estas secciones.

En este ejemplo se agregaron controles que modifican la propiedad `variables` para quitar y poner variables. También hay un botón que modifica la propiedad `datos` para intercalar entre porcentajes y valores totales.
Entonces el HTML estará estructurado de la siguiente manera:

```html
<template>
  <div>
    <SisdaiAreasApiladas
        :areas_apiladas_id="id_stream"
        :datos="datos_grafica"
        :variables="variables"
        :alto_vis="300"
        nombre_columna_horizontal="fecha_1"
        titulo_eje_x="Fecha"
        titulo_eje_y="Distribución de variables"
        :formatoEtiquetasY="formatoY"
        class="contenedor-areas-apiladas-slots-tooltip"
    >
    <template slot="encabezado">
        <div class="encabezado">
          <h3 class="titulo-visualizacion">Título de gráfica con cambio de datos</h3>
          <p class="fecha-actualizacion">Fecha: dd/mm/aaaa</p>
        </div>
      </template>

    <template slot="pie">
      <div class="slot-pie">
        <button @click="alternar_absolutos_porcentaje=='porcentaje' ? alternar_absolutos_porcentaje ='absolutos':alternar_absolutos_porcentaje = 'porcentaje'">{{alternar_absolutos_porcentaje}}</button>
        <div class="checks">
          <div v-for="(variable,i) in variables_all" :key="variable.id" class="label-1">
            <CheckboxColor v-model="lista_filtros_activos[i]" :color="variable.color">
              <span v-if="variable.nombre === 'variables_restantes'"  class="categoria-texto">Otras variables</span>
              <span v-else class="categoria-texto">{{ variable.nombre }}</span>
            </CheckboxColor>
          </div>
        </div>
      </div>
    </template>
    </SisdaiAreasApiladas>
  </div>
</template>
```
<areas-apiladas-slots-tooltip
  id_stream="streamgraph2"
/>


