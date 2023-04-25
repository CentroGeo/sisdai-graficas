import SisdaiDiagramaProcesos from './SisdaiDiagramaProcesos.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(SisdaiDiagramaProcesos.name,SisdaiDiagramaProcesos);
}

export default plugin;


export { 
    plugin as install,
    SisdaiDiagramaProcesos
};