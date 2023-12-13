// This file is part of sisdai-graficas.
//
//   sisdai-graficas is free software: you can redistribute it and/or modify
//   it under the terms of the GNU Lesser General Public License as published by the
//   Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.
//
//   sisdai-graficas is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General
//   Public License for more details.
//
//   You should have received a copy of the GNU Lesser General Public License along
//   with sisdai-graficas. If not, see <https://www.gnu.org/licenses/>.

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