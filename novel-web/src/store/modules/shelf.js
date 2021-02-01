import { getNovelShelf } from '@/api/novelshelf'

const state = {
  form: { },
  showDialog: false,
  shelfList: []
}
const mutations = {
  SHOW_FORM: (state, novelId) => {
    state.showDialog = true
    state.form.novelId = novelId
  },
  INIT_SHELF_LIST: (state, shelfList) => {
    state.shelfList = shelfList
  },
  CLOSE_FORM: (state) => {
    state.form = {}
    state.showDialog = false
  }
}
const actions = {
  show({ commit }, novelId) {
    commit('SHOW_FORM', novelId)
  },
  close({ commit }) {
    commit('CLOSE_FORM')
  },
  initShelfList({ commit }) {
    getNovelShelf().then(response => {
      const { data } = response
      commit('INIT_SHELF_LIST', data)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

