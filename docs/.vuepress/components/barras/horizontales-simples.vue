<template>
  <div>
    <SisdaiBarras
        :barras_id="'horizontales_simples'"
        :datos="[{categoria: 'Variable A', cantidad: 120},
                 {categoria: 'Variable B', cantidad: 150},
                 {categoria: 'Variable C', cantidad: 72}]"
        :nombre_barra="'categoria'"
        :nombre_color="'nombre_colores'"
        titulo_eje_x="Eje horizontal (numérico)"
        titulo_eje_y="Eje vertical (categórico)"
        :variables="[{id:'cantidad', nombre_colores:'cantidad', color: '#7fcdbb'}]"
        :orientacion="'horizontal'"/>
  </div>
</template>

<script>
export default {
  name: "horizontales-simples",
};
</script>