<script setup>
import { ref } from 'vue'
import datos_donas from '../../assets/datos/donas_1.json'
const laDona = ref()
const variables = ref([
  { id: 'Variable A', color: '#FFCE00', nombre: 'Var A' },
  { id: 'Variable B', color: '#FA5600', nombre: 'Var B' },
  { id: 'Variable C', color: '#C7690D', nombre: 'Var C' },
  { id: 'Variable D', color: '#FF9F4D', nombre: 'Var D' },
  { id: 'Variable E', color: '#FFAC99', nombre: 'Var E' },
])

const datos = ref(datos_donas)
const variables_visibles = ref([
  'Variable A',
  'Variable B',
  'Variable C',
  'Variable E',
])
</script>
<template>
  <SisdaiGraficas
    :margenes="{ arriba: 10, abajo: 10, derecha: 10, izquierda: 10 }"
  >
    <template #globo-informacion>
      <SisdaiGraficasGloboInfo
        :ancho="200"
        v-show="variables_visibles.includes(laDona?.datos_hover?.categoria)"
      >
        <template>
          <p>
            <span
              class="globo-informacion-punto-color"
              :style="{
                background: variables.filter(
                  d => d.id === laDona?.datos_hover?.categoria
                )[0]?.color,
              }"
            ></span>
            {{ laDona?.datos_hover?.categoria }}:
            {{ laDona?.datos_hover?.cantidad }}
          </p>
        </template>
      </SisdaiGraficasGloboInfo>
    </template>
    <template #panel-encabezado-vis>
      <div>
        <p class="vis-titulo-visualizacion">Ejemplo de donas</p>
        <div>
          <span
            class="controlador-vis"
            v-for="variable in variables"
            :key="variable.id"
          >
            <input
              :id="variable.id"
              type="checkbox"
              :value="variable.id"
              v-model="variables_visibles"
            />
            <label :for="variable.id"
              ><span
                class="figura-variable muestra"
                :style="{ background: variable.color }"
              ></span>
              <span class="nombre-variable">
                {{ variable.nombre }}
              </span>
            </label>
          </span>
        </div>
      </div>
    </template>
    <SisdaiDona
      ref="laDona"
      :datos="datos"
      :variables="variables"
      :variables_visibles="variables_visibles"
    />
  </SisdaiGraficas>
</template>
