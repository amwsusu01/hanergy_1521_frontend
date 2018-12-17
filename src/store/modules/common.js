const common = {
  state: {
    isCollapse: false,
    curMenuID:'48',
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    menuData:[],
    user:null
  },
  actions: {
  },
  mutations: {
    setActiveMenu(state,id) {
      state.curMenuID = id;
    },
    setMenuData(state,data){
      state.menuData = data;
    },
    updateDocumentClientHeight(state, height) {
      state.documentClientHeight = height
    },
    setUser(state,data) {
      state.user = data;
    }
  }
}
export default common
