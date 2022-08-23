<template>
  <div>
    <label for="selector-variante">Variantes</label>
    <select id="selector-variante" v-model="varianteSeleccionada">
      <option
        v-for="variante in variantes"
        :key="variante.orden"
        :value="variante.clave"
      >
        {{ variante.nombre }}
      </option>
    </select>
  </div>
</template>

<script>
import variantesjson from "./variantes.json";

export default {
  name: "SelectorVariantes",
  computed: {
    variantes() {
      return variantesjson.filter(
        (variante) => !this.variantesConConteoOmsCero.includes(variante.clave)
      );
    },
    varianteSeleccionada: {
      get() {
        return this.$store.getters.varianteSeleccionada;
      },
      set(value) {
        this.$store.commit("seleccionarVariante", value);
      },
    },
    variantesConConteoOmsCero() {
      return this.$store.getters.variantesConConteoOmsCero;
    },
  },
};
</script>
