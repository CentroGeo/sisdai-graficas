<template>
  <div class="contenedor-vis borde-redondeado-8 con-panel-pie-vis">
    <SisdaiGraficas
      :titulo_eje_y="'título del eje y'"
      :titulo_eje_x="'título del eje x'"
      :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
    >
      <SisdaiSeriesTiempo
        :datos="[
          { categoria: '01-01-2015', cantidad_1: 100, cantidad_2: 10 },
          { categoria: '01-01-2016', cantidad_1: 80, cantidad_2: 20 },
          { categoria: '01-01-2017', cantidad_1: 50, cantidad_2: 30 },
          { categoria: '01-01-2018', cantidad_1: 100, cantidad_2: 40 },
          { categoria: '01-01-2019', cantidad_1: 80, cantidad_2: 35 },
          { categoria: '01-01-2020', cantidad_1: 40, cantidad_2: 24 },
          { categoria: '01-01-2021', cantidad_1: 70, cantidad_2: 50 },
        ]"
        :variables="[
          {
            id: 'cantidad_1',
            nombre_subcategoria: 'Cantidad 1',
            color: 'blue',
          },
        ]"
        :angulo_etiquetas_eje_x="-45"
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
