import {
  defineStore
} from "./chunk-5HDYNCFZ.js";
import "./chunk-O3YQPVDG.js";
import "./chunk-CNGU7YNB.js";

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
