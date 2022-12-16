# Visualizaciones

## Guía de visualización

Para elegir la visualización adecuada para representar datos y por consiguiente elegir el componente adecuado de esta 
biblioteca, es primordial preguntarse _¿qué se quiere representar?_ De manera general la representación de datos se 
puede dividir en seis categorías: 

**Cambios temporales**, **Distribución de los datos**, **Comparaciones**, 
**Composiciones o parte de un todo**, **Relaciones entre variables** y **Datos geográficos**. 

De esta manera se puede elegir la visualización adecuada. Cabe mencionar que distintos tipos de representaciones pueden 
funcionar para distintas visualizaciones y viceversa.

En la siguiente tabla se relacionan los componentes de visualización de esta biblioteca con los tipos de representación 
de datos y las visualizaciones.

<html>

<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

thead {
  background-color: #c7e9b4;
  font-weight: bold;
}

.componente {
  font-family: "Lucida Console", "Courier New", monospace;
}

</style>

<table>
    <thead>
        <tr>
            <th>Representación</th>
            <th>Visualización</th>
            <th>Componente de visualización</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cambios temporales</td>
            <td>Gráfica de líneas</td>
            <td class="componente">&ltSisdaiLineas/&gt</td>
        </tr>
        <tr>
            <td rowspan=2>Distribución</td>
            <td>Diagrama de cajas y bigotes</td>
            <td class="componente">&ltSisdaiCajasBigotes/&gt</td>
        </tr>
        <tr>
            <td>Barras (horizontales o verticales)</td>
            <td class="componente" rowspan=2>&ltSisdaiBarras/&gt</td>
        </tr>
        <tr>
            <td>Comparación</td>
            <td>Barras apiladas (horizontales o verticales)</td>
        </tr>
            <td>Composición (parte de un todo)</td>
            <td>Donas</td>
            <td class="componente">&ltSisdaiDonas/&gt</td>
        </tr>
        <tr>
            <td>Datos geográficos</td>
            <td>Mapas coropléticos</td>
            <td class="componente">&ltSisdaiMapas/&gt</td>
        </tr>
    </tbody>
</table>
</html>

Los componentes de visualización se pueden hallar en la carpeta `src/components/` de esta biblioteca.

Para conocer más acerca de como elegir la mejor visualización para representar datos se pueden consultar las 
siguientes fuentes:

* [How to Choose the Right Data Visualization](https://chartio.com/learn/charts/how-to-choose-data-visualization/)
* [Chart Chooser](https://www.storytellingwithdata.com/blog/2013/04/chart-chooser)
* [Choosing a good chart](https://extremepresentation.typepad.com/blog/2006/09/choosing_a_good.html) de A. Abela
* [Essential Chart Types for Data Visualization](https://chartio.com/learn/charts/essential-chart-types-for-data-visualization/)
* [The Data Visualization Catalogue](https://datavizcatalogue.com/index.html)

## Parámetro opcional con logo

El botón que redirecciona a la página web de [Conacyt](https://conacyt.mx/) que se encuentra al pie de todas los 
componentes de visualización es un parámetro que por defecto es verdadero, por lo tanto se puede desactivar para 
ocultar dicho botón. 

**Botón activado**

En este caso no es necesario modificar el parámetro y se mostrará como sigue,

<lineas-basico/>

**Botón desactivado**

Para desactivar el botón en el template del componente de visualización se agrega el parámetro y 
se especifica su valor como `false`,

```vue
<template>
  <div>
    <SisdaiLineas
        ref="lineas_sin_boton"
        :conversionTemporal="conversionTemporal"
        :datos="datos"
        :linea_id="'lineas_sin_boton'"
        :margen="{arriba: 10, abajo: 20, izquierda: 30, derecha: 30}"
        :nombre_columna_horizontal="'fecha'"
        :titulo_eje_x="'Eje horizontal (temporal)'"
        :titulo_eje_y="'Eje vertical (numérico)'"
        :tooltip_activo="false"
        :variables="edos_seleccionados"
        :logo_conacyt="false"
    />
  </div>
</template>
```

<lineas-sin-boton/>
