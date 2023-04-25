import SisdaiLineaTiempo from './SisdaiLineaTiempo.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(SisdaiLineaTiempo.name,SisdaiLineaTiempo);
}

export default plugin;


export {
    plugin as install,
    SisdaiLineaTiempo
};