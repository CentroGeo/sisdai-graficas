import {
  defineStore
} from "./chunk-T3YPJTGW.js";
import "./chunk-O3YQPVDG.js";
import "./chunk-5K23BRP6.js";

// node_modules/sisdai-componentes/src/stores/accesibilidad.js
var useAccesibilidadStore = defineStore("accesibilidad", {
  state: () => ({ clasesAccesibles: [] }),
  // state: () => {
  //   return { clasesAccesibles: [] }
  // },
  actions: {
    modificarClasesAccesibles(valor) {
      this.clasesAccesibles = valor;
    },
    restablecer() {
      this.clasesAccesibles = [];
    }
  }
});
export {
  useAccesibilidadStore
};
//# sourceMappingURL=sisdai-componentes_src_stores.js.map
