<script setup>
import store from './../../store'
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
            href="https://codigo.conahcyt.mx/sisdai/sisdai-graficas"
            target="_blank"
            >Gitlab</a
          >
        </li>
      </ul>
    </SisdaiNavegacionPrincipal>

    <main
      role="main"
      class="contenedor m-y-maximo"
    >
      <Content />
    </main>

    <SisdaiPiePaginaConahcyt />

    <SisdaiPiePaginaGobMx />

    <SisdaiMenuAccesibilidad :objetoStore="store" />
  </div>
</template>
