<script setup>
import { useRoute } from 'vue-router/composables'
import store from './../../store'

import { onMounted, ref, watch } from 'vue'
const lista_elementos = ref([])

const route = useRoute()
const componenteIndice = ref()

onMounted(() => {
  setTimeout(() => actualizaContenidoIndice(), 200)
})

watch(route, () => {
  let elementos = []
  setTimeout(() => actualizaContenidoIndice(), 200)
})
function actualizaContenidoIndice() {
  let elementos = []
  document.querySelectorAll('div.content__default h2').forEach(el => {
    if (el.id) {
      elementos.push({
        id: el.id,
        texto: el.innerText.replace('#', ''),
      })
    }
  })
  lista_elementos.value = elementos
  /**
   * Apuramos al componente para que su lista de elementos se actualice y
   * obtenemos las rutas
   */
  componenteIndice.value._setupState.lista_elementos.value =
    lista_elementos.value
  componenteIndice.value._setupState.seccion_visible.value = ''
  componenteIndice.value._setupState.autoScrollSuave()
}
</script>

<template>
  <div
    class="theme-container"
    :class="store.getters['accesibilidad/clasesAccesibles']"
  >
    <SisdaiNavegacionGobMx />

    <SisdaiNavegacionPrincipal
      :nav-informacion="`Sección: <b>${$frontmatter.sectionName || ''}</b>`"
    >
      <ul class="nav-menu">
        <li>
          <RouterLink
            class="nav-hipervinculo"
            to="/"
            exact
            >Inicio</RouterLink
          >
        </li>
        <li>
          <RouterLink
            class="nav-hipervinculo"
            to="/documentacion/"
            >Documentación</RouterLink
          >
        </li>

        <li>
          <a
            class="nav-hipervinculo"
            href="https://github.com/salsa-community/sisdai-graficas"
            >GitHub</a
          >
        </li>
      </ul>
    </SisdaiNavegacionPrincipal>
    <div class="flex">
      <div class="columna-4 columna-1-mov menu-fondo">
        <SisdaiMenuLateral>
          <template slot="contenido-menu-lateral">
            <ul>
              <li>
                <router-link
                  class="p-x-5-esc p-x-3-mov p-y-1"
                  to="/documentacion/introduccion"
                >
                  Introducción</router-link
                >
              </li>
              <li>
                <router-link
                  class="p-x-5-esc p-x-3-mov p-y-1"
                  to="/documentacion/graficas"
                >
                  SisdaiGraficas</router-link
                >
              </li>
              <li>
                <router-link
                  class="p-x-5-esc p-x-3-mov p-y-1"
                  to="/documentacion/barras"
                >
                  SisdaiBarras</router-link
                >
              </li>
              <li>
                <router-link
                  class="p-x-5-esc p-x-3-mov p-y-1"
                  to="/documentacion/cajas-bigotes"
                >
                  SisdaiCajasBigotes</router-link
                >
              </li>
              <li>
                <router-link
                  class="p-x-5-esc p-x-3-mov p-y-1"
                  to="/documentacion/series-tiempo"
                >
                  SisdaiSeriesTiempo</router-link
                >
              </li>
              <li>
                <router-link
                  class="p-x-5-esc p-x-3-mov p-y-1"
                  to="/documentacion/areas-apiladas"
                >
                  SisdaiAreasApiladas</router-link
                >
              </li>
              <li>
                <router-link
                  class="p-x-5-esc p-x-3-mov p-y-1"
                  to="/documentacion/areas-apiladas-ordenadas"
                >
                  SisdaiAreasApiladasOrdenadas</router-link
                >
              </li>
              <li>
                <router-link
                  class="p-x-5-esc p-x-3-mov p-y-1"
                  to="/documentacion/violines"
                >
                  SisdaiViolines</router-link
                >
              </li>
              <li>
                <router-link
                  class="p-x-5-esc p-x-3-mov p-y-1"
                  to="/documentacion/opciones-avanzadas"
                >
                  Opciones avanzadas</router-link
                >
              </li>
            </ul>
          </template>
        </SisdaiMenuLateral>
      </div>
      <div class="columna-12 columna-7-mov">
        <div class="flex contenedor-indice-y-content">
          <div class="columna-12 contenedor ancho-fijo">
            <Content />
          </div>
          <div class="columna-4 columna-8-mov">
            <SisdaiIndiceDeContenido
              class="indice-contenido-documentacion"
              :id_indice="'indice-template'"
              ref="componenteIndice"
            >
              <template slot="contenido-indice-de-contenido">
                <ul>
                  <li
                    v-for="(elemento, i) in lista_elementos"
                    :key="i"
                  >
                    <a :href="'#' + elemento.id"> {{ elemento.texto }}</a>
                  </li>
                </ul>
              </template>
            </SisdaiIndiceDeContenido>
          </div>
        </div>
      </div>
    </div>

    <SisdaiPiePaginaConahcyt />

    <SisdaiPiePaginaGobMx />

    <SisdaiMenuAccesibilidad :objetoStore="store" />
  </div>
</template>

<style src="prismjs/themes/prism-tomorrow.css" />
<style>
.indice-contenido-documentacion {
  position: sticky;
  top: 50px;
  padding: 28px 0;
}
.menu-fondo {
  background: var(--menu-lateral-fondo);
}
@media (max-width: 768px) {
  .contenedor-indice-y-content {
    flex-direction: column-reverse;
  }
  .menu-fondo {
    background: transparent;
  }
}
</style>
