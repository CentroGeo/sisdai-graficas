<template>
  <SisdaiGraficas :id="'id-grafica-basica'">
    <SisdaiBarras
      :datos="[
        { categoria: 'aguascalientes', cantidad: 100 },
        { categoria: 'baja_cal', cantidad: 80 },
        { categoria: 'baja_cal_sur', cantidad: 20 },
      ]"
      :variables="[
        { id: 'cantidad', nombre_subcategoria: '$ pesos', color: 'red' },
      ]"
    ></SisdaiBarras>
    <SisdaiBarras
      :datos="[
        { categoria: 'aguascalientes', cantidad: 100 },
        { categoria: 'baja_cal', cantidad: 80 },
        { categoria: 'baja_cal_sur', cantidad: 20 },
      ]"
      :variables="[
        { id: 'cantidad', nombre_subcategoria: '$ pesos', color: 'red' },
      ]"
    ></SisdaiBarras>
  </SisdaiGraficas>
</template>
