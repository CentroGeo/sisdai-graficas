<template>
  <div>
    <SisdaiBarrasPrueba
        :barras_id="'verticales_simples'"
        :datos="[{categoria: 'Variable A', h: 120, m: 120},
                 {categoria: 'Variable B', h: 150, m: 30},
                 {categoria: 'Variable C', h: 72, m: 180}]"
        :nombre_barra="'categoria'"
        :nombre_color="'nombre_colores'"
        titulo_eje_x="Eje horizontal (categórico)"
        titulo_eje_y="Eje vertical (numérico)"
        :variables="[{id:'h', nombre_colores:'Hombres', color: '#7fcdbb'},
          {id:'m', nombre_colores:'Mujeres', color: '#7fcd01'}
      ]"/>
  </div>
</template>

<script>
export default {
  name: "verticales-simples",
};
</script>