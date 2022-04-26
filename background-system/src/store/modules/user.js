import * as userApi from '@/api/user'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    user: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_USER: (state, payload) => {
    state.user = payload;
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    // userInfo 是用户提交的信息
    return new Promise((resolve, reject) => {
      userApi.login(userInfo).then(res => {
        const { data } = res;
        if (data) {
          commit('SET_USER', data);
          resolve();
        } else {
          reject(res);
        }
      }).catch(error => {
        reject(error);
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // 发送请求
      userApi.getInfo().then(res => {
        if (typeof res === 'string') {
          // token 错误或已过期
          res = JSON.parse(res);
          if (res.code === '401') {
            reject(res.msg);
          }
        } else {
          // token 是有效的, 将用户信息放到本地仓库
          commit('SET_USER', res.data);
          resolve();
        }
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken();
      resetRouter();
      commit('RESET_STATE');
      resolve();
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

