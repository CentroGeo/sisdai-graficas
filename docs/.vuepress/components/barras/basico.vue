<template>
  <div class="contenedor-vis borde-redondeado-8 con-panel-pie-vis">
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
    <div class="panel-pie-vis">
      <hr />
    </div>
    <div class="contenedor-vis-atribuciones">
      <a
        class="logo-conacyt"
        href="https://conahcyt.mx"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://conahcyt.mx/wp-content/uploads/2021/10/logo_conacyt_con_sintagma_azul_completo.svg"
          alt="Conahcyt"
        />
      </a>

      <a
        href="https://sisdai.conahcyt.mx/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sisdai
      </a>
    </div>
  </div>
</template>
