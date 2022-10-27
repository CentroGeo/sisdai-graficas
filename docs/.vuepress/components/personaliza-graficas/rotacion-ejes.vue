<template>
    <div>
      <DadsigBarras
          :barras_id="'verticales_simples'"
          :datos="[{categoria: 'Variable A', cantidad: 120},
                   {categoria: 'Variable B', cantidad: 150},
                   {categoria: 'Variable C', cantidad: 72}]"
          :nombre_barra="'categoria'"
          :nombre_color="'nombre_colores'"
          titulo_eje_x="Eje horizontal (categórico)"
          titulo_eje_y="Eje vertical (numérico)"
          :variables="[{id:'cantidad', nombre_colores:'cantidad', color: '#7fcdbb'}]"
          ref="verticales_simples"
          :margen="{
            arriba: 10,
            abajo: 60,
            derecha: 10,
            izquierda: 40
          }"
          :textoTooltip="barrasTextoTooltip"
          />
    </div>
  </template>
  
  <script>
  export default {
    name: "verticales-simples",
    data(){
      return {
        barrasTextoTooltip: ()=>{
          var txt = []
          this.$refs.verticales_simples.variables.map((d) => {
            txt.push(`<p>
              ${d[this.$refs.verticales_simples.nombre_color]} | <b>${this.$refs.verticales_simples.tooltip_data_seleccionada[d.id].toLocaleString("en")}</b> 
              </p>`)
          })

          return `<p>${this.$refs.verticales_simples.tooltip_categoria}</p>
              ${txt.reverse().join(" ")}`
        }
      }
    },
    mounted(){

      var dict_color = {
        "Variable A" :"red",
        "Variable B": "blue",
        "Variable C": "green",
      }
      this.$refs.verticales_simples.barras_individuales
        .style("fill", (d) => dict_color[d.data.categoria])
      
      
      setTimeout(()=>{
        this.$refs.verticales_simples.eje_x
          .selectAll("text")
          .attr("transform","rotate(-50)translate(-10,-5)")
          .style("text-anchor","end")
      }, 500)
      

    },
    
  };
  </script>

<style lang="scss">

</style>