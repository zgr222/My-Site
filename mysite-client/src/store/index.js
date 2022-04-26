import Vue from 'vue';
// import Vuex from 'vuex';
import { Store, install } from 'vuex';  //使用具名导出，优化打包
import banner from './banner';
import setting from './setting';
import about from './about';
import project from './project';

if (!window.Vuex) {
  // 没有使用传统的方式引入Vuex (即开发环境需要这行代码)
  // Vue.use(Vuex);
  install(Vue); //优化打包 
}

// export default new Vuex.Store({  //优化打包
export default new Store({
  modules: {
    banner,
    setting,
    about,
    project
  },
  strict: true
})