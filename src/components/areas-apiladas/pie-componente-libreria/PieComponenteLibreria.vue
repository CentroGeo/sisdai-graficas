<template>
  <div class="pie-componente-libreria" >
    <div class="bloque-absoluto" v-if="absoluto"></div>
    <div class="bloque-negativo" v-if="afuera"></div>
    <a href="https://conacyt.mx/" target="_blank" class="link-conacyt" :class="{'absoluto':absoluto, 'negative':afuera}">
      <!-- <img :src="require('@/assets/img/base/logo-conacyt-azul-simple.svg')" alt="Conacyt"> -->
    </a>
  </div>
</template>

<script>
export default {
  name: 'PieComponenteLibreria',
  props: {
    absoluto: {
      type: Boolean,
      required: false,
      default: false
    },
    afuera: {
      type: Boolean,
      required: false,
      default: false
    },
  },
};
</script>

<style scoped lang="scss">
.pie-componente-libreria {
  height: 40px;
  width: 100%;
  .bloque-absoluto {
    height: 40px;
    width: 100%;
    // margin-top: 24px;
  }
  .bloque-negativo {
    height: 10px;
    margin-top: -10px;
  }
  .link-conacyt {
    background-color: #F7F7F7;
    border-radius: 0 0 10px 10px;
    display: flex;
    height: 40px;
    margin-top: 24px;
    padding: 5px 24px;
    width: 100%;
    img {
      width: 102px;
      opacity: .6;
      filter: grayscale(100%);
      margin: auto;
      transition: all .2s ease-in-out;
    }
    &.absoluto {
      position: absolute;
      bottom: 0;
    }
    &.negative {
      border: 1px solid #000;
      border-top-color: #F7F7F7;
      margin-top: -10px;
      position: relative;
      z-index: 5;
    }
    &:hover,
    &:focus {
      background-color: #F7F7F7;
      img {
        opacity: .6;
        filter: grayscale(100%);
      }
    }
    @media (min-width: 769px) {
      img {
        margin: 0;
      }
      &:hover,
      &:focus {
        background-color: #F7F7F7;
        img {
          opacity: 1;
          filter: grayscale(0%);
        }
      }
    } 
  }
}
</style>
