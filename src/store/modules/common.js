import {_sessionStorage} from "../../assets/js/util";
const common = {
  state: {
    isCollapse: false,
    curMenuID:'48',
    // 页面文档可视高度(随窗口改变大小)
    documentClientHeight: 0,
    menuData:_sessionStorage("menuData")!=null?JSON.parse(_sessionStorage("menuData")):[],
    user:_sessionStorage("loggeduser")?JSON.parse(_sessionStorage("loggeduser")):{},
    breadcrumbMenu:['1521日志分析报表','1521数据汇总统计'],
    sysTitle:_sessionStorage("sysTitle")||'',
    updateTime:''
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
    },
    setBreadcrumbMenu(state,data) {
      state.breadcrumbMenu = data;
    },
    setSysTitle(state,data) {
      state.sysTitle = data;
    },
    setUpdateTime(state,data) {
      state.updateTime = data;
    }
  }
}
export default common
