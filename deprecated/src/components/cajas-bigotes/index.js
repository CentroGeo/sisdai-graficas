import SisdaiCajasBigotes from './SisdaiCajasBigotes.vue'

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(SisdaiCajasBigotes.name,SisdaiCajasBigotes);
}

export default plugin;


export { 
    plugin as install,
    SisdaiCajasBigotes
};