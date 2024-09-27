<script setup>
import { onMounted, ref, watch } from 'vue'
import numero_de_conglomerados from '../../assets/datos/resistencia_por_ARV_contra_tiempo_pivot.json'
const datos = ref(numero_de_conglomerados)

const miGrafica = ref(),
  rectangulo = ref(),
  serieDeTiempo = ref()
onMounted(() => {
  rectangulo.value = miGrafica.value.grupoFrente.append('rect')
})
watch(
  () => serieDeTiempo.value?.escalaLineal,
  nv => {
    if (nv.range()[0] > 0) {
      rectangulo.value
        .attr(
          'width',
          serieDeTiempo.value.escalaTemporal(
            serieDeTiempo.value.conversionTemporal('2020-07')
          ) -
            serieDeTiempo.value.escalaTemporal(
              serieDeTiempo.value.conversionTemporal('2020-03')
            )
        )
        .attr('height', miGrafica.value.grafica()._grupoVis.alto)
        .attr('y', 0)
        .attr(
          'x',
          serieDeTiempo.value.escalaTemporal(
            serieDeTiempo.value.conversionTemporal('2020-03')
          )
        )
        .style('fill', 'rgba(180,180,180,1)')
    }
  }
)
</script>
<template>
  <SisdaiGraficas
    ref="miGrafica"
    class="con-panel-encabezado-vis"
    :titulo_eje_y="'Resistencia (%)'"
    :titulo_eje_x="'Fecha'"
    :margenes="{ arriba: 30, abajo: 70, derecha: 30, izquierda: 40 }"
  >
    <template #panel-encabezado-vis> </template>
    <SisdaiSeriesTiempo
      ref="serieDeTiempo"
      :datos="datos"
      :variables="[
        { id: 'Compleja', nombre: 'Compleja', color: '#445DE1' },
        { id: 'INSTI', nombre: 'INSTI', color: '#F8C63D' },
        { id: 'NNRTI', nombre: 'NNRTI', color: '#FF2112' },
        { id: 'NRTI', nombre: 'NRTI', color: '#E98F41' },
        { id: 'PI', nombre: 'PI', color: '#A52424' },
      ]"
      :angulo_etiquetas_eje_x="-45"
      :clave_fecha="'fecha_toma'"
      :formato_temporal="'%Y-%m'"
    />
  </SisdaiGraficas>
</template>
