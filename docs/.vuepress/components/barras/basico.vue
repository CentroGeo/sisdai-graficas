<template>
  <div>
    <SisdaiGraficas
      :titulo_eje_y="'título del eje y'"
      :titulo_eje_x="'título del eje x'"
    >
      <SisdaiBarras
        :datos="[
          { categoria: 'aguascalientes', cantidad_1: 100, cantidad_2: 100 },
          { categoria: 'baja_cal', cantidad_1: 80, cantidad_2: 100 },
          { categoria: 'baja_cal_sur', cantidad_1: 20, cantidad_2: 100 },
          { categoria: 'zacatecas', cantidad_1: 20, cantidad_2: 100 },
        ]"
        :variables="[
          {
            id: 'cantidad_1',
            nombre_subcategoria: 'Cantidad 1',
            color: 'pink',
          },
          {
            id: 'cantidad_2',
            nombre_subcategoria: 'Cantidad 2',
            color: 'orange',
          },
        ]"
      />
    </SisdaiGraficas>
  </div>
</template>
