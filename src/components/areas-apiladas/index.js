import SisdaiAreasApiladas from './SisdaiAreasApiladas.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(SisdaiAreasApiladas.name,SisdaiAreasApiladas);
}

export default plugin;


export { 
    plugin as install,
    SisdaiAreasApiladas
};