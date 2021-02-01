import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import shelf from './modules/shelf'
import readnovel from '@/store/modules/readnovel'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    shelf,
    readnovel
  },
  getters
})

export default store
