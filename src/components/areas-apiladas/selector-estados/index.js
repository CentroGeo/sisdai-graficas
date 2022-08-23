import SelectorEstados from './SelectorEstados.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(SelectorEstados.name,SelectorEstados);
}

export default plugin;

export { 
    plugin as install,
    SelectorEstados
};