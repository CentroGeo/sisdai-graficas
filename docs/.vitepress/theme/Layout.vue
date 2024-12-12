<script setup>
import SisdaiIndiceDeContenido from 'sisdai-componentes/src/componentes/indice-de-contenido/SisdaiIndiceDeContenido.vue'
import SisdaiMenuAccesibilidad from 'sisdai-componentes/src/componentes/menu-accesibilidad/SisdaiMenuAccesibilidad.vue'
import SisdaiMenuLateral from 'sisdai-componentes/src/componentes/menu-lateral/SisdaiMenuLateral.vue'
import SisdaiNavegacionGobMx from 'sisdai-componentes/src/componentes/navegacion-gob-mx/SisdaiNavegacionGobMx.vue'
import SisdaiPiePaginaConahcyt from 'sisdai-componentes/src/componentes/pie-pagina-conahcyt/SisdaiPiePaginaConahcyt.vue'
import SisdaiPiePaginaGobMx from 'sisdai-componentes/src/componentes/pie-pagina-gob-mx/SisdaiPiePaginaGobMx.vue'
import SisdaiColapsableNavegacion from 'sisdai-componentes/src/componentes/colapsable-navegacion/SisdaiColapsableNavegacion.vue'

import { useData, useRoute } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared'
import { onMounted, ref, watch, computed } from 'vue'
import NavegacionPrincipal from './NavegacionPrincipal.vue'
import PaginaError404 from './PaginaError404.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { theme, page } = useData()
// https://router.vuejs.org/
const route = useRoute()
const esInicio = computed(() => route.path === '/')
console.log(route.path)
const lista_elementos = ref({})

const componenteIndice = ref(null)
const menuLateralAbierto = ref()

function actualizaContenidoIndice() {
  let elementos = []
  document.querySelectorAll('div h2').forEach(el => {
    if (el.id) {
      console.log(el.id)
      elementos.push({
        id: el.id,
        texto: el.innerText,
      })
    }
  })
  lista_elementos.value = elementos
  /**
   * Apuramos al componente para que su lista de elementos se actualice y
   * obtenemos las rutas
   */
  if (!esInicio.value) {
    componenteIndice.value.lista_elementos.value = lista_elementos.value
    componenteIndice.value.seccion_visible = ''
    componenteIndice.value.autoScrollSuave()
  }
}

if (typeof window !== 'undefined') {
  menuLateralAbierto.value = window.innerWidth < 768 ? false : true
}

function alAlternarMenuLateral(navSecundariaAbierta) {
  menuLateralAbierto.value = navSecundariaAbierta
}

function listaSidebar({ sidebar }, { relativePath }) {
  let ruta_inicial = `/${relativePath.split('/')[0]}/`
  ruta_inicial = ruta_inicial || '/'
  return sidebar[ruta_inicial]
}

onMounted(() => {
  setTimeout(() => actualizaContenidoIndice(), 200)
})

watch(route, () => {
  setTimeout(() => actualizaContenidoIndice(), 200)
})
const opciones_avanzadas = [
  {
    text: 'Casillas de verificación',
    link: `/graficas/opciones-avanzadas/casilla-verificacion/`,
  },
  {
    text: 'Combinación de gráficas',
    link: `/graficas/opciones-avanzadas/combinacion-graficas/`,
  },
  {
    text: 'Elementos de fondo y frente',
    link: `/graficas/opciones-avanzadas/elementos-fondo-frente/`,
  },
  {
    text: 'Globo de información',
    link: `/graficas/opciones-avanzadas/globo-informacion/`,
  },
  {
    text: 'Narrativa con scroll',
    link: `/graficas/opciones-avanzadas/narrativa/`,
  },
  {
    text: 'Nomenclatura',
    link: `/graficas/opciones-avanzadas/nomenclatura/`,
  },
]
</script>

<template>
  <div>
    <a
      href="#principal"
      class="ir-contenido-principal"
    >
      Ir a contenido principal
    </a>

    <SisdaiNavegacionGobMx />
    <NavegacionPrincipal />

    <SisdaiMenuAccesibilidad />

    <PaginaError404 v-if="page.isNotFound" />

    <div
      v-else
      id="contenido-todo"
      class="flex"
    >
      <div
        class="columna-4-esc columna-1-mov menu-lateral-fondo"
        v-if="!esInicio"
      >
        <SisdaiMenuLateral @alAlternarMenu="alAlternarMenuLateral">
          <template #contenido-menu-lateral>
            <ul v-if="!route.path.includes('/graficas')">
              <li
                v-for="item in listaSidebar(theme, page)"
                :key="item.text"
              >
                <a
                  :href="item.link"
                  :class="{
                    'router-link-exact-active router-link-active': isActive(
                      page.relativePath,
                      item.link
                    ),
                  }"
                  :tabindex="menuLateralAbierto ? undefined : -1"
                >
                  {{ item.text }}
                  <span
                    v-if="item.pre"
                    class="etiqueta"
                    >pre</span
                  >
                </a>
              </li>
            </ul>
            <div v-else>
              <SisdaiColapsableNavegacion :colapsado="true">
                <template #encabezado>
                  <span>Gráficas</span>
                </template>
                <template #contenido>
                  <ul>
                    <li
                      v-for="item in listaSidebar(theme, page)"
                      :key="item.text"
                    >
                      <a
                        :href="item.link"
                        :class="{
                          'router-link-exact-active router-link-active':
                            isActive(page.relativePath, item.link),
                        }"
                        :tabindex="menuLateralAbierto ? undefined : -1"
                      >
                        {{ item.text }}
                        <span
                          v-if="item.pre"
                          class="etiqueta"
                          >pre</span
                        >
                      </a>
                    </li>
                  </ul>
                </template>
              </SisdaiColapsableNavegacion>
              <SisdaiColapsableNavegacion>
                <template #encabezado>
                  <span>Opciones avanzadas</span>
                </template>
                <template #contenido>
                  <ul>
                    <li
                      v-for="item in opciones_avanzadas"
                      :key="item.text"
                    >
                      <a
                        :href="item.link"
                        :class="{
                          'router-link-exact-active router-link-active':
                            isActive(page.relativePath, item.link),
                        }"
                        :tabindex="menuLateralAbierto ? undefined : -1"
                      >
                        {{ item.text }}
                        <span
                          v-if="item.pre"
                          class="etiqueta"
                          >pre</span
                        >
                      </a>
                    </li>
                  </ul>
                </template>
              </SisdaiColapsableNavegacion>
            </div>
          </template>
        </SisdaiMenuLateral>
      </div>

      <div
        :class="{
          'columna-12-esc columna-7-mov': !esInicio,
          'columna-16-esc': esInicio,
        }"
      >
        <div
          id="contenido-documento"
          class="flex"
        >
          <div
            class="columna-4-esc columna-8-mov columna-orden-3-esc"
            v-if="!esInicio"
          >
            <SisdaiIndiceDeContenido
              :id_indice="'indice-template'"
              class="m-l-3-mov"
              ref="componenteIndice"
            >
              <template #contenido-indice-contenido>
                <ul>
                  <li
                    v-for="elemento in lista_elementos"
                    :key="elemento.id"
                  >
                    <a :href="'#' + elemento.id"> {{ elemento.texto }}</a>
                  </li>
                </ul>
              </template>
            </SisdaiIndiceDeContenido>
          </div>

          <div
            :class="{
              'columna-12-esc columna-8-mov': !esInicio,
              'columna-16-esc': esInicio,
            }"
            tabindex="-1"
          >
            <div class="contenedor m-y-maximo-esc">
              <div
                :class="{ 'ancho-lectura': !esInicio, 'ancho-fijo': esInicio }"
              >
                <main
                  role="main"
                  id="principal"
                >
                  <Content />
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SisdaiPiePaginaConahcyt />
    <SisdaiPiePaginaGobMx />
  </div>
</template>
