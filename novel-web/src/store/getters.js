const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.id,
  shelfShow: state => state.shelf.showDialog,
  shelfForm: state => state.shelf.form,
  shelfList: state => state.shelf.shelfList,
  novel: state => state.readnovel.novel,
  chapter: state => state.readnovel.chapter,
  content: state => state.readnovel.content,
  chapterList: state => state.readnovel.chapterList
}

export default getters
