<script setup>
import cajasbigotesejemplos from './cajas_bigotes_ejemplo_1.json'

import { ref } from 'vue'
const datos_dinamicos = ref(cajasbigotesejemplos)
const variables_dinamicas = ref({
  id: 'acciones_vendidas',
  nombre_subcategoria: 'Acciones vendidas',
  color: '#2c7fb8',
})
</script>

<template>
  <div class="contenedor-vis borde-redondeado-8 con-panel-pie-vis">
    <SisdaiGraficas
      :titulo_eje_y="'título del eje y'"
      :titulo_eje_x="'título del eje x'"
      :margenes="{ arriba: 30, abajo: 20, derecha: 30, izquierda: 40 }"
    >
      <SisdaiBarras
        :datos="[
          { categoria: 'Empresa A', cantidad_1: 100, cantidad_2: 100 },
          { categoria: 'Empresa B', cantidad_1: 80, cantidad_2: 100 },
          { categoria: 'EmpresaC', cantidad_1: 20, cantidad_2: 100 },
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
        :separacion="0.6"
        :alineacion_eje_y="'derecha'"
      />
      <SisdaiCajasBigotes
        :datos="datos_dinamicos"
        :variables="variables_dinamicas"
        :clave_categorias="'nombre_empresa'"
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
