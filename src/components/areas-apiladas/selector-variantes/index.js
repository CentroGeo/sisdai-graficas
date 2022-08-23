import SelectorVariantes from './SelectorVariantes.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(SelectorVariantes.name,SelectorVariantes);
}

export default plugin;

export { 
    plugin as install,
    SelectorVariantes
};