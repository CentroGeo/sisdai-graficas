import SisdaiBarras from './SisdaiBarras.vue'
function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(SisdaiBarras.name,SisdaiBarras)
}

export default plugin;


export { 
    plugin as install,
    SisdaiBarras
}