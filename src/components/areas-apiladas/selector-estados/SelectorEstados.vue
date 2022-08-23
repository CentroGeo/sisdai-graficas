<template>
  <div>
    <label for="selector-estatal">Estados</label>
    <select id="selector-estatal" v-model="estadoSeleccionado">
      <option
        v-for="estado in estados"
        :key="estado.orden"
        :value="estado.clave" >
        {{ estado.nombre }}
      </option>
    </select>
  </div>
</template>

<script>
import estadosjson from './estados.json';

export default {
  name: 'SelectorEstados',
  data() {
    return {
      estados: estadosjson,
    };
  },
  computed: {
    estadoSeleccionado: {
      get() {
        return this.$store.getters.estadoSeleccionado;
      },
      set(value) {
        this.$store.commit('seleccionarEstado', value);
      },
    },
  },
};
</script>
