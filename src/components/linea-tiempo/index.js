import DadsigLineaTiempo from './DadsigLineaTiempo.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DadsigLineaTiempo.name,DadsigLineaTiempo);
}

export default plugin;


export {
    plugin as install,
    DadsigLineaTiempo
};