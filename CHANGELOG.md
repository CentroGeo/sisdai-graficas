# Changelog

Todos los cambios más importantes de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.1.0)
y este proyecto se adhiere al [Versionamiento semántico](https://semver.org/spec/v2.0.0.html).

\*Nota: Este Changelog se comenzó el 2024-10-28. Se documentaron hacia atrás los cambios más relevantes
de la biblioteca. Por lo tanto no se listan aquí todos los tags existentes.

Al principio de cada entrada se lista la versión de la biblioteca de sisdai-css y
sisdai-componentes con la que la versión indicada de sisdai-graficas es
compatible y tiene instalada.

## [6.8.1] - 2025-09-01

### Arreglado (Fixed)

- Agregamos una condición en series de tiempo y en barras para que se grafique en un rango de 0-1 cuando todos los datos tienen el valor 0

## [6.8.0] - 2025-08-14

### Agregado (Added)

- Agregamos nuevas propiedades a las gráficas como `numero_etiquetas_x`, `numero_etiquetas_y`, y `formato_eje_temporal`,

## [6.7.1] - 2025-07-31

### Arreglado (Fixed)

- Especificamos el color de anotaciones en barras para que funcione bien en vista oscura, y ajustamos las cifras que se muestran en barras agrupadas.

## [6.7.0] - 2025-07-23

### Agregado (Added)

- Agregamos una nueva funcionalidad a la gráfica de barras para que acepte anotaciones, es decir, las cífras sobre las barras.

## [6.6.0] - 2025-05-28

### Cambiado (Changed)

- Se actualizaron las versiones y archivos de configuración de las bibliotecas requeridas tanto para el proyecto como para la documentación y pruebas.

### Cambiado (Changed)

- Se actualizaron las versiones y archivos de configuración de las bibliotecas requeridas tanto para el proyecto como para la documentación y pruebas.
-

## [6.5.0] - 2025-03-27

### Cambiado (Changed)

- Se actualizaron las versiones y archivos de configuración de las bibliotecas requeridas tanto para el proyecto como para la documentación y pruebas.

## [6.4.6] - 2024-12-20

### Arreglado (Fixed)

Ajustamos el componente SisdaiDona para resolver un bug al usar la narrativa.

## [6.4.5] - 2024-12-17

### Arreglado (Fixed)

Arreglamos que las etiquetas meta y el favicon aparecieran. Se tuvo que instalar una nueva dependencia

## [6.4.4] - 2024-12-17

### Cambiado (Changed)

Se cambiaron los títulos de algunas secciones de la documentación para ser consistentes con el menú lateral y que se mostraran en la pestaña.

## [6.4.0] - 2024-12-12

### Agregado (Added)

Se agregó la biblioteca @centrogeomx/sisdai-css. Se agregó el scss api modern en la configuracion del vite. Se ajustaron algunos erroes de estilo.

## [6.3.0] - 2024-12-12

### Agregado (Added)

Se creó la página de error de página no encontrada. Se agregaron metadatos de información para compartir la página de documentación.

## [6.2.1] - 2024-12-12

### Cambiado (Changed)

Se cambiaron imágenes, se agregó favicon y se corrigieron rutas.

## [6.2.0] - 2024-12-11

sisdai-css v1.6.1<br>sisdai-componentes v4.1.5

### Cambiado (Changed)

- Modificamos la estructura de navegación de la documentación y también el orden de algunos elementos en la sección de gráficas.

## [6.1.5] - 2024-12-09

sisdai-css v1.6.1<br>sisdai-componentes v4.1.5

### Agregado (Added)

- Se agregó un pequeño texto en la documentación de las gráficas para resaltar la importancia de incluir la propiedad `tabla_caption` de manera adecuada

## [6.1.4] - 2024-12-06

sisdai-css v1.6.1<br>sisdai-componentes v4.1.5

### Cambiado (Changed)

- Agregamos a los componentes de gráficas de ejemplo en la documentación la propiedad `tabla_caption` de manera personalizada.
- Se actualizó la version de `sisdai-css` a la v1.6.1

## [6.1.3] - 2024-11-29

sisdai-css v1.4.2<br>sisdai-componentes v4.1.5

### Cambiado (Changed)

- Cambiamos algunas partes de la documentacion para especificar que la importacion debe ser de `@centrogeomx/sisdai-graficas` en lugar de `sisdai-graficas`.
- Se actualizó la version de `sisdai-css` a la v1.4.2

## [6.1.2] - 2024-11-21

### Cambiado (Changed)

- El nombre del proyecto en el `package.json` pasa a ser @centrogeomx/sisdai-graficas para su publicación en el repositorio de npm
- Se ajusta documentación de acuerdo a lo anterior

## [6.1.1] - 2024-11-19

### Eliminado (Removed)

- Componente de información de despliegue

## [6.1.0] - 2024-11-06

### Agregado (Added)

- vue-matomo para seguir analíticas

## [6.0.3] - 2024-11-06

sisdai-css v1.3.3<br>sisdai-componentes v4.1.5

### Agregado (Added)

- Enlace externo de _IR A SISDAI_ en la navegación principa, que va al portal del Sisdai

### Cambiado (Changed)

- Se quita aviso de documentación en construcción ya que no es relevante para las personas desarrolladoras usuarias de esta biblioteca

## [6.0.2] - 2024-11-05

sisdai-css v1.3.3<br>sisdai-componentes v4.1.5

### Agregado (Added)

- Se agregó al README información sobre las pruebas unitarias (_testing_)

### Arreglado (Fixed)

- Se corrigieron versiones de node y npm que se mencionan en el README

## [6.0.1] - 2024-11-04

sisdai-css v1.3.3<br>sisdai-componentes v4.1.5

### Agregado (Added)

- Se agrega aviso de que la documentación se encuentra en construcción para poderla desplegar en una versión "beta"

### Arreglado (Fixed)

- La pestaña del navegador decía SISDAI-COMPONENTES. Se corrige a sisdai-graficas

## [6.0.0] - 2024-10-31

sisdai-css v1.3.3<br>sisdai-componentes v4.1.5

### Cambiado (Changed)

- Actualización de bibliotecas sisdai-componentes y sisdai-css

### Agregado (Added)

- Características de accesibilildad a la tabla como scope, id, headers y `<caption>`

## [5.0.2] - 2024-10-07

sisdai-css v1.2.6<br>sisdai-componentes v4.0.0

### Cambiado (Changed)

- Actualización de bibliotecas sisdai-componentes y sisdai-css

## [5.0.0] - 2024-09-26 - Release

sisdai-css v1.2.4<br>sisdai-componentes v4.0.0-beta.11

### Cambiado (Changed)

- Refactorización a Vue 3
- Actualización de dependencias
- Edición de documentación
- Actualización de ESLint
- Refactorización de gráfica de donas

### Agregado (Added)

- Testing

## [4.0.0] - 2024-06-10 - Release

sisdai-css v1.0.7<br>sisdai-componentes v3.0.0

### Cambiado (Changed)

- Actualización de dependencias
- Refactorización de documentación con nuevas dependencias

### Agregado (Added)

- Creación de globo de información generalizado

## [3.0.0] - 2024-03-22 - Release

sisdai-css v0.46.8<br>sisdai-componentes v2.4.2

### Cambiado (Changed)

- Refactorización en base a sisdai-css y sisdai-componentes
- Actualización de gráfica de líneas
- Actualización de ejemplos

### Agregado (Added)

- sisdai-css v0.46.9
- sidai-componentes v2.4.2
- Opción de barras agrupadas
- Estilos del `contenedor-vis`
- Componente de check y nomenclatura
- Rotación de etiquetas
- Componente de barras apiladas ordenadas
- Componente de donas

## [2.0.0] - 2023-12-16 - Release

### Cambiado (Changed)

- Refactorización areas apiladas
- Refactorización de documentación en vuepress

## [1.0.0] - 2022-06-28 - Release

Publicación de la primera vesión de la biblioteca de gráficas
[6.8.1]: https://github.com/CentroGeo/sisdai-graficas/compare/v6.8.1...6.8.0
[6.8.0]: https://github.com/CentroGeo/sisdai-graficas/compare/v6.8.0...6.7.1
[6.7.1]: https://github.com/CentroGeo/sisdai-graficas/compare/v6.7.1...v6.7.0
[6.7.0]: https://github.com/CentroGeo/sisdai-graficas/compare/v6.7.0...v6.6.0
[6.6.0]: https://github.com/CentroGeo/sisdai-graficas/compare/v6.6.0...v6.5.0
[6.5.0]: https://github.com/CentroGeo/sisdai-graficas/compare/v6.5.0...v6.4.6
[6.4.6]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.4.6...v6.4.5
[6.4.5]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.4.5...v6.4.4
[6.4.4]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.4.4...v6.4.3
[6.4.0]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.4.0...v6.3.0
[6.3.0]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.3.0...v6.2.1
[6.2.1]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.2.1...v6.2.0
[6.2.0]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.2.0...v6.1.5
[6.1.5]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.1.5...v6.1.4
[6.1.4]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.1.4...v6.1.3
[6.1.3]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.1.3...v6.1.2
[6.1.2]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.1.2...v6.1.1
[6.1.1]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.1.1...v6.1.0
[6.1.0]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.1.0...v6.0.3
[6.0.3]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.0.3...v6.0.2
[6.0.2]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.0.2...v6.0.1
[6.0.1]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.0.1...v6.0.0
[6.0.0]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v6.0.0...v5.0.2
[5.0.2]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v5.0.2...v5.0.0
[5.0.0]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v5.0.0...v4.0.0
[4.0.0]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v4.0.0...v5.0.0
[3.0.0]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v3.0.0...v2.0.0
[2.0.0]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/compare/v2.0.0...v1.0.0
[1.0.0]: https://codigo.conahcyt.mx/sisdai/sisdai-graficas/-/releases/v1.0.0
