import SisdaiBarrasPrueba from './SisdaiBarrasPrueba.vue'
function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(SisdaiBarrasPrueba.name,SisdaiBarrasPrueba)
}

export default plugin;


export { 
    plugin as install,
    SisdaiBarrasPrueba
}