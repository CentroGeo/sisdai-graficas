<template>
  <div>
    <SisdaiLineaTiempo
      :id_linea_tiempo="'linea_tiempo_basica'"
      :eventos="eventos"
      :opciones="opciones"
    />
  </div>
</template>
<script>
export default {
  name: "basico",
  data() {
    return {
      eventos: [
        {
          id: "fase-0",
          content: "FASE 0. Periodo interpandémico",
          start: "2019-12-01",
          end: "2020-03-11",
          type: "background",
          className: "fase-0",
          style: "z-index: -1;",
        },
        {
          id: "fase-1",
          content: "FASE 1. Inicio de pandemia",
          start: "2020-03-11",
          end: "2020-08-30",
          type: "background",
          className: "fase-1",
          style: "z-index: -1;",
        },
        {
          id: 0,
          content:"<b> 31 dic 2019.</b>  China alerta a la OMS de casos de neumonía",
          style: "max-width: 200px",
          start: "2019-11-30",
        },
        {
          id: 1,
          content: "<b>01 ene 2020.</b>  Cierre del mercado Huanan en Wuhan",
          style: "max-width: 200px;",
          start: "2020-01-01",
        },
        {
          id: 2,
          content: `<b>03 ene 2020.</b> China reporta 44 pacientes sospechosos</div>`,
          style: "max-width: 200px;",
          start: "2020-01-03",
        },
        {
          id: 3,
          content: "<b>07 ene 2020.</b> China identifica el nuevo coronavirus",
          style: "max-width: 200px;",
          start: "2020-01-07",
        },
        {
          id: 4,
          content: `<img src=${require("./imagenes/virus.png")}/> <div><b>12 ene 2020</b>. China comparte la secuencia genómica del coronavirus</div>`,
          style: "max-width: 250px;",
          start: "2020-01-12",
          className:"imagen-texto"
        },
        {
          id: 5,
          content:
            "<b>10 feb 2020.</b> 10 pasajeros de un crucero dan positivo",
          style: "max-width: 200px;",
          start: "2020-02-10",
        },
        {
          id: 6,
          content:
            "<b>11 marzo 2020</b>. La OMS caracteriza al COVID-19 como pandemia",
          style: "max-width: 200px;",
          start: "2020-03-11",
        },
        {
          id: 7,
          content: "<b>06 abril 2020.</b> Cierre de escuelas",
          style: "max-width: 200px;",
          start: "2020-04-06",
        },
        {
          id: 8,
          content:
            "<b>08 abril 2020.</b> China levanta el confinamiento en Wuhan",
          style: "max-width: 200px;",
          start: "2020-04-08",
        },
        {
          id: 9,
          content:
            "<b>11 abril 2020.</b> E.U.A registra 2,000 muertes en un día",
          style: "max-width: 200px;",
          start: "2020-04-11",
        },
        {
          id: 10,
          content:
            "<b>05 junio 2020.</b> La OMS recomienda el uso de mascarilla como medida sanitaria",
          style: "max-width: 200px;",
          start: "2020-06-05",
        },
        {
          id: 11,
          content: "<b>Mayo-julio 2020.</b>Primera ola COVID-19",
          start: "2020-05-01",
          end: "2020-07-30",
        },
      ],
      opciones: {
        minHeight: "550px",
        orientation: "top",

        maxHeight: "550px",
        min: new Date(2019, 9, 1), // lower limit of visible range
        max: new Date(2020, 9, 1), // upper limit of visible range
        zoomMin: 1000 * 60 * 60 * 24 * 7, // one day in milliseconds
        //zoomMax: 1000 * 60 * 60 * 24 * 31 * 20,
      },
    };
  },
};
</script>
<style lang="scss">

div.linea-de-tiempo {
  .vis-background {
    color: #ffffff;
    font-size: 16px;
  }
  div.vis-item.vis-box.imagen-texto{
    .vis-item-content{
        display: flex;
        flex-wrap: nowrap;
        gap: 10px;
        img{
          height: 100%;
        }
      }
  }
  .vis-item.vis-background{
    background-color: transparent;
    .vis-item-overflow{
      .vis-item-content{
        width: 100%;
        padding: 20px 10px;
      }
    }
  }
  
  .fase-0 {
    .vis-item-overflow{
      background: #4d2a43;

      .vis-item-content{
        bottom:0;
        background: #4d2a43;
      }
    }
  }
  .fase-1 {
    .vis-item-overflow{
      background: #27484e;

      .vis-item-content{
        bottom:0;

        background: #27484e;

      }
    }
    
  }
}
#linea_tiempo_basica{
    svg g.contenedor-objetos{
      rect.fase-0 {
        fill: #4d2a43;
      }
      rect.fase-1 {
        fill: #27484e;
      }
    }
    g.brush{
      rect.selection{
        fill: #fff;
      }
    }
  }
</style>