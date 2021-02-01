import { getNovelByNovelId } from '@/api/novel'

const state = {
  novel: {},
  chapter: {},
  content: {},
  chapterList: []
}
const mutations = {
  SET_NOVEL: (state, novel) => { state.novel = novel },
  SET_CHAPTER: (state, chapter) => { state.chapter = chapter },
  SET_CONTENT: (state, content) => { state.content = content },
  SET_CHAPTER_LIST: (state, chapterList) => { state.chapterList = chapterList }
}
const actions = {
  setNovel({ commit }, novel) {
    commit('SET_NOVEL', novel)
  },
  setNovelById({ commit }, novelId) {
    getNovelByNovelId(novelId).then((response) => {
      const novel = response.data
      commit('SET_NOVEL', novel)
    })
  },
  setChapter({ commit }, chapter) {
    commit('SET_CHAPTER', chapter)
  },
  setContent({ commit }, content) {
    commit('SET_CONTENT', content)
  },
  setChapterList({ commit }, chapterList) {
    commit('SET_CHAPTER_LIST', chapterList)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
