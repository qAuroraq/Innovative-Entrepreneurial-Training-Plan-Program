import { createStore } from 'vuex'
import ModuleUser from './user';

export default createStore({
  //存放数据的地方
  state: {
  },
  //组件计算属性
  getters: {
  },
  //同步操作
  mutations: {
  },
  //异步操作
  actions: {
  },
  //多模块
  modules: {
    user: ModuleUser,
  }
});