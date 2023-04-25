import SisdaiLineas from './SisdaiLineas.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(SisdaiLineas.name,SisdaiLineas);
}

export default plugin;


export { 
    plugin as install,
    SisdaiLineas
};