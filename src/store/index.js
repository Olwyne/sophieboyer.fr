import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // // activeProject: {
    // //   name: null,
    // //   description: null,
    // //   date: null,
    // //   type: null,
    // //   link: null,
    // //   images: [],
    // //   software: null,
    // //   language: null,
    // //   job: null
    // // }
    // activeProject: null
  },
  mutations: {
    // SET_ACTIVE_PROJECT (state, props) {
    //   state.activeProject = props
    // }
  },
  actions: {
    // setActiveProject: (store, props) => {
    //   store.commit('SET_ACTIVE_PROJECT', props)
    // }
  },
  getters: {
    // getActiveProject (state) {
    //   return state.activeProject
    // }
  }
})
