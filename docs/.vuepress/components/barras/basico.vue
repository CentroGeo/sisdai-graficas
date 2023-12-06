<template>
  <SisdaiGraficas
    :titulo_eje_y="'título del eje y'"
    :titulo_eje_x="'título del eje x'"
  >
    <SisdaiBarras
      :datos="[
        { categoria: 'categoría 1', cantidad_1: 100, cantidad_2: 100 },
        { categoria: 'categoría 2', cantidad_1: 80, cantidad_2: 100 },
        { categoria: 'categoría 3', cantidad_1: 20, cantidad_2: 100 },
        { categoria: 'categoría 4', cantidad_1: 20, cantidad_2: 100 },
      ]"
      :variables="[
        {
          id: 'cantidad_1',
          nombre: 'Cantidad 1',
          color: 'pink',
        },
        {
          id: 'cantidad_2',
          nombre: 'Cantidad 2',
          color: 'orange',
        },
      ]"
    />
  </SisdaiGraficas>
</template>
