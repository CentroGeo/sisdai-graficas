<script setup>
import SisdaiIndiceDeContenido from 'sisdai-componentes/src/componentes/indice-de-contenido/SisdaiIndiceDeContenido.vue'
import SisdaiMenuAccesibilidad from 'sisdai-componentes/src/componentes/menu-accesibilidad/SisdaiMenuAccesibilidad.vue'
import SisdaiMenuLateral from 'sisdai-componentes/src/componentes/menu-lateral/SisdaiMenuLateral.vue'
import SisdaiNavegacionGobMx from 'sisdai-componentes/src/componentes/navegacion-gob-mx/SisdaiNavegacionGobMx.vue'
import SisdaiPiePaginaConahcyt from 'sisdai-componentes/src/componentes/pie-pagina-conahcyt/SisdaiPiePaginaConahcyt.vue'
import SisdaiPiePaginaGobMx from 'sisdai-componentes/src/componentes/pie-pagina-gob-mx/SisdaiPiePaginaGobMx.vue'
import { useData, useRoute } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared'
import { onMounted, ref, watch } from 'vue'
import NavegacionPrincipal from './NavegacionPrincipal.vue'

// https://vitepress.dev/reference/runtime-api#usedata
const { theme, page } = useData()
// https://router.vuejs.org/
const route = useRoute()

const lista_elementos = ref([])

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
  componenteIndice.value.lista_elementos.value = lista_elementos.value
  componenteIndice.value.seccion_visible = ''
  componenteIndice.value.autoScrollSuave()
}

if (typeof window !== 'undefined') {
  menuLateralAbierto.value = window.innerWidth < 768 ? false : true
}

function alAlternarMenuLateral(navSecundariaAbierta) {
  menuLateralAbierto.value = navSecundariaAbierta
}

function listaSidebar({ sidebar }, { relativePath }) {
  return sidebar[
    Object.keys(sidebar).find(side => isActive(relativePath, side, !!side))
  ]
}

onMounted(() => {
  setTimeout(() => actualizaContenidoIndice(), 200)
})

watch(route, () => {
  setTimeout(() => actualizaContenidoIndice(), 200)
})
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

    <div
      id="contenido-todo"
      class="flex"
    >
      <div class="columna-4-esc columna-1-mov menu-lateral-fondo">
        <SisdaiMenuLateral @alAlternarMenu="alAlternarMenuLateral">
          <template #contenido-menu-lateral>
            <ul>
              <li>
                <a
                  href="/"
                  exact
                  :tabindex="menuLateralAbierto ? undefined : -1"
                >
                  <b>SisdaiGraficas</b>
                </a>
              </li>

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
          </template>
        </SisdaiMenuLateral>
      </div>

      <div class="columna-12-esc columna-7-mov">
        <div
          id="contenido-documento"
          class="flex"
        >
          <div class="columna-4-esc columna-8-mov columna-orden-3-esc">
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
            class="columna-12-esc columna-8-mov"
            tabindex="-1"
          >
            <div class="contenedor m-y-maximo-esc">
              <div class="ancho-lectura">
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
