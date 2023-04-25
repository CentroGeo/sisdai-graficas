import SisdaiDonas from './SisdaiDonas.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(SisdaiDonas.name,SisdaiDonas);
}

export default plugin;


export {
    plugin as install,
    SisdaiDonas
};