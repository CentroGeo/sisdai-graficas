<script setup>
import { ref } from 'vue'
const lista_estados = [
  { cve: '01', nombre: 'Aguascalientes', abr: 'AGS' },
  { cve: '02', nombre: 'Baja California', abr: 'BC' },
  { cve: '03', nombre: 'Baja California Sur', abr: 'BCS' },
  { cve: '04', nombre: 'Campeche', abr: 'CAMP' },
  { cve: '07', nombre: 'Chiapas', abr: 'CHIS' },
  { cve: '08', nombre: 'Chihuahua', abr: 'CHIH' },
  { cve: '09', nombre: 'CDMX', abr: 'CDMX' },
  { cve: '05', nombre: 'Coahuila', abr: 'COAH' },
  { cve: '06', nombre: 'Colima', abr: 'COL' },
  { cve: '10', nombre: 'Durango', abr: 'DUR' },
  { cve: '15', nombre: 'Estado de México', abr: 'EDOMEX' },
  { cve: '11', nombre: 'Guanajuato', abr: 'GTO' },
  { cve: '12', nombre: 'Guerrero', abr: 'GRRO' },
  { cve: '13', nombre: 'Hidalgo', abr: 'HGO' },
  { cve: '14', nombre: 'Jalisco', abr: 'JAL' },
  { cve: '16', nombre: 'Michoacán', abr: 'MICH' },
  { cve: '17', nombre: 'Morelos', abr: 'MOR' },
  { cve: '18', nombre: 'Nayarit', abr: 'NAY' },
  { cve: '19', nombre: 'Nuevo León', abr: 'NL' },
  { cve: '20', nombre: 'Oaxaca', abr: 'OAX' },
  { cve: '21', nombre: 'Puebla', abr: 'PUE' },
  { cve: '22', nombre: 'Querétaro', abr: 'QUE' },
  { cve: '23', nombre: 'Quintana Roo', abr: 'Q ROO' },
  { cve: '24', nombre: 'San Luis Potosí', abr: 'SLP' },
  { cve: '25', nombre: 'Sinaloa', abr: 'SIN' },
  { cve: '26', nombre: 'Sonora', abr: 'SON' },
  { cve: '27', nombre: 'Tabasco', abr: 'TAB' },
  { cve: '28', nombre: 'Tamaulipas', abr: 'TAMPS' },
  { cve: '29', nombre: 'Tlaxcala', abr: 'TAX' },
  { cve: '30', nombre: 'Veracruz', abr: 'VER' },
  { cve: '31', nombre: 'Yucatán', abr: 'YUC' },
  { cve: '32', nombre: 'Zacatecas', abr: 'ZAC' },
]
const margen = ref(30)
const datos_dinamicos = ref([
  { categoria: 'aguascalientes', cantidad_1: 100, cantidad_2: 100 },
  { categoria: 'baja_cal', cantidad_1: 80, cantidad_2: 100 },
  { categoria: 'baja_cal_sur', cantidad_1: 20, cantidad_2: 100 },
  { categoria: 'zacatecas', cantidad_1: 20, cantidad_2: 100 },
])
function modificandoDatos() {
  let cantidad_datos = 2 + parseInt(17 * Math.random())
  let datum = []
  for (var i = 0; i < cantidad_datos; i++) {
    datum.push({
      categoria: lista_estados[i].nombre,
      cantidad_1: 100 * Math.random(),
      cantidad_2: 100 * Math.random(),
    })
  }
  datos_dinamicos.value = datum
}
</script>

<template>
  <div>
    <input
      id="margenes"
      type="range"
      v-model="margen"
    />
    <label for="margenes">margen: {{ margen }}</label>
    <button @click="modificandoDatos">Modifica datos</button>
    <hr />
    <SisdaiGraficas
      :margenes="{
        arriba: Number(margen),
        abajo: Number(margen),
        derecha: Number(margen),
        izquierda: Number(margen),
      }"
    >
      <SisdaiBarras
        :datos="datos_dinamicos"
        :variables="[
          { id: 'cantidad_1', nombre_subcategoria: '$ pesos 1', color: 'red' },
          { id: 'cantidad_2', nombre_subcategoria: '$ pesos 2', color: 'blue' },
        ]"
      />
    </SisdaiGraficas>

    <hr />

    <SisdaiGraficas>
      <SisdaiBarras
        :datos="[
          { categoria: 'aguascalientes', cantidad: 100 },
          { categoria: 'baja_cal', cantidad: 80 },
          { categoria: 'baja_cal_sur', cantidad: 20 },
          { categoria: 'zacatecas', cantidad: 20 },
        ]"
        :variables="[
          { id: 'cantidad', nombre_subcategoria: '$ pesos', color: 'red' },
        ]"
      />
    </SisdaiGraficas>
  </div>
</template>
