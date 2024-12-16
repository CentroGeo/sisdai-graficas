---
title: Inicio
---

<script setup>
  import SisdaiEnlaceExterno from "@centrogeomx/sisdai-componentes/src/componentes/enlace-externo/SisdaiEnlaceExterno.vue";
  const cdn = import.meta.env.VITE_CDN_ARCHIVOS
</script>

<main role="main" id="principal">
  <section id="introduccion" class="contenedor ancho-fijo">
    <div class="ancho-lectura">
      <h1 class="texto-centrado">sisdai-graficas</h1>
      <p>
        Esta es la documentación para personas desarrolladoras de la biblioteca de
        gráficas del Sistema de Diseño y Accesibilidad para la Investigación
        (<SisdaiEnlaceExterno texto="Sisdai" enlace="https://sisdai.conahcyt.mx/"/>).
      </p>
    </div>
    <div class="flex">
      <div class="columna-8">
        <a class="tarjeta tarjeta-hipervinculo-interno" href="/comienza/">
          <picture>
            <source :srcset="`${cdn}inicio/tarjeta-comienza.webp`" type="image/webp" />
            <img
              loading="lazy"
              class="tarjeta-imagen"
              :src="`${cdn}inicio/tarjeta-comienza.png`"
              alt=""
            />
          </picture>
          <div class="tarjeta-cuerpo">
            <p class="h4">Comienza</p>
              <p>
                Conoce, instala y comienza a usar las gráficas de Sisdai
              </p>
          </div>
        </a>
      </div>
      <div class="columna-8">
        <a class="tarjeta tarjeta-hipervinculo-interno" href="/graficas/personalizacion/">
          <picture>
            <source :srcset="`${cdn}inicio/tarjeta-sisdai-graficas.webp`" type="image/webp" />
            <img
              loading="lazy"
              class="tarjeta-imagen"
              :src="`${cdn}inicio/tarjeta-sisdai-graficas.png`"
              alt=""
            />
          </picture>
          <div class="tarjeta-cuerpo">
            <p class="h4">Gráficas</p>
              <p>
                Documentación, uso y ejemplos de gráficas y sus propiedades
              </p>
          </div>
        </a>
      </div>
    </div>
  </section>
  <section id="otras-biliotecas" class="m-y-10">
    <h2 class="texto-centrado m-b-5 m-t-9">Otras bibliotecas Sisdai</h2>
    <div class="flex">
      <div class="columna-4-esc columna-8-mov">
        <div class="tarjeta">
          <picture>
            <source :srcset="`${cdn}inicio/tarjeta-sisdai-css.webp`" type="image/webp" />
            <img
              loading="lazy"
              class="tarjeta-imagen"
              :src="`${cdn}inicio/tarjeta-sisdai-css.png`"
              alt=""
            />
          </picture>
          <div class="tarjeta-cuerpo">
            <p class="h6">sisdai-css</p>
              <p>
                Biblioteca donde se definen las hojas de estilos usados en el Sisdai. Está construida en scss con sass.
              </p>
          </div>
          <div class="tarjeta-pie flex">
              <SisdaiEnlaceExterno
                class="boton boton-primario boton-chico"
                enlace="https://sisdai-css.conahcyt.mx/"
                texto="Ir a documentación"
                aria-label="Ir a documentación de sisdai-css"/>
              <SisdaiEnlaceExterno
                class="boton boton-secundario boton-chico"
                enlace="https://codigo.conahcyt.mx/sisdai/sisdai-css"
                texto="Ir a repositorio"
                aria-label="Ir a repositorio de sisdai-css"/>
          </div>
        </div>
      </div>
      <div class="columna-4 columna-8-mov">
        <div class="tarjeta" >
          <picture>
            <source :srcset="`${cdn}inicio/tarjeta-sisdai-componentes.webp`" type="image/webp" />
            <img
              loading="lazy"
              class="tarjeta-imagen"
              :src="`${cdn}inicio/tarjeta-sisdai-componentes.png`"
              alt=""
            />
          </picture>
          <div class="tarjeta-cuerpo">
            <p class="h6">sisdai-componentes</p>
              <p>
                Biblioteca de componentes reutilizables alineada al Sistema de Diseño y Accesibilidad para la Investigación (Sisdai)
              </p>
          </div>
          <div class="tarjeta-pie flex">
              <SisdaiEnlaceExterno
                class="boton boton-primario boton-chico"
                enlace="https://sisdai-componentes.conahcyt.mx/"
                texto="Ir a documentación"
                aria-label="Ir a documentación de sisdai-componentes"/>
              <SisdaiEnlaceExterno
                class="boton boton-secundario boton-chico"
                enlace="https://codigo.conahcyt.mx/sisdai/sisdai-componentes"
                texto="Ir a repositorio"
                aria-label="Ir a repositorio de sisdai-componentes"/>
          </div>
        </div>
      </div>
      <div class="columna-4 columna-8-mov">
        <div class="tarjeta" >
          <picture>
            <source :srcset="`${cdn}inicio/tarjeta-sisdai-mapas.webp`" type="image/webp" />
            <img
              loading="lazy"
              class="tarjeta-imagen"
              :src="`${cdn}inicio/tarjeta-sisdai-mapas.png`"
              alt=""
            />
          </picture>
          <div class="tarjeta-cuerpo">
            <p class="h6">sisdai-mapas</p>
              <p>
                Biblioteca de componentes de código abierto para la construcción de mapas interactivos.
              </p>
          </div>
          <div class="tarjeta-pie flex">
              <SisdaiEnlaceExterno
                class="boton boton-primario boton-chico"
                enlace="https://sisdai-mapas.conahcyt.mx/"
                texto="Ir a documentación"
                aria-label="Ir a documentación de sisdai-mapas"/>
              <SisdaiEnlaceExterno
                class="boton boton-secundario boton-chico"
                enlace="https://codigo.conahcyt.mx/sisdai/sisdai-mapas"
                texto="Ir a repositorio"
                aria-label="Ir a repositorio de sisdai-mapas"/>
          </div>
        </div>
      </div>
      <div class="columna-4 columna-8-mov">
        <div class="tarjeta" >
          <picture>
            <source :srcset="`${cdn}inicio/tarjeta-sisdai-portal.webp`" type="image/webp" />
            <img
              loading="lazy"
              class="tarjeta-imagen"
              :src="`${cdn}inicio/tarjeta-sisdai-portal.png`"
              alt=""
            />
          </picture>
          <div class="tarjeta-cuerpo">
            <p class="h6">Portal Sisdai</p>
              <p>
                Fundamentos, elementos, componentes, visualizaciones de datos y plantillas de diseño
              </p>
          </div>
          <div class="tarjeta-pie flex">
              <SisdaiEnlaceExterno
                class="boton boton-primario boton-chico"
                enlace="https://sisdai.conahcyt.mx/"
                texto="Ir a Sisdai"
                aria-label="Ir al portal de sisdai"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
