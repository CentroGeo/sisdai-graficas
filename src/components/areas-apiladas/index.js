import DadsigAreasApiladas from './DadsigAreasApiladas.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DadsigAreasApiladas.name,DadsigAreasApiladas);
}

export default plugin;


export { 
    plugin as install,
    DadsigAreasApiladas
};