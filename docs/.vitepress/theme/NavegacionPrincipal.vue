<script setup>
import SisdaiNavegacionPrincipal from '@centrogeomx/sisdai-componentes/src/componentes/navegacion-principal/SisdaiNavegacionPrincipal.vue'
import { useData } from 'vitepress'
import { ref } from 'vue'
import pkg from '../../../package.json'

// https://vitepress.dev/reference/runtime-api#usedata
const { theme, page } = useData()
const navegacionPrincipal = ref(null)
</script>

<template>
  <SisdaiNavegacionPrincipal
    :nav-informacion="`Sección: <b>${page.title}</b>`"
    ref="navegacionPrincipal"
  >
    <template #complementario>
      <div class="nav-menu-contenedor">
        <a
          class="nav-hipervinculo"
          href="https://sisdai.conahcyt.mx"
          target="_blank"
          rel="noopener noreferrer"
        >
          <b>IR A SISDAI</b>
        </a>
        <a
          class="nav-hipervinculo"
          :href="pkg.repository.url"
          :aria-label="`Repositorio de código sisdai-graficas versión ${pkg.version}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            class="pictograma-social-github m-r-1"
            aria-hidden="true"
          ></span>
          <b> {{ `v${pkg.version}` }} </b>
        </a>
      </div>
    </template>
    <ul class="nav-menu">
      <li
        v-for="nav in theme.nav"
        :key="nav.text"
      >
        <a
          class="nav-hipervinculo"
          :class="{
            'router-link-exact-active router-link-active':
              nav.activeMatch ==
              page.relativePath.replace('index.md', '').split('/')[0],
          }"
          :href="nav.link"
          :target="nav.target"
          :rel="nav.rel"
        >
          <img
            v-if="nav.img"
            class="nav-logo"
            :src="nav.img"
            alt=""
          />
          {{ nav.text }}
        </a>
      </li>
    </ul>
  </SisdaiNavegacionPrincipal>
</template>
