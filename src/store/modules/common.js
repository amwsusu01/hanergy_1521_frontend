import { _sessionStorage, getMenuData } from "../../assets/js/util";

const common = {
    state: {
        isCollapse: false,
        curMenuID: '48',
        // 页面文档可视高度(随窗口改变大小)
        documentClientHeight: 0,
        allMenu:_sessionStorage("allMenu") ? JSON.parse(_sessionStorage("allMenu")) : [],
        menuData: _sessionStorage("menuData") ? JSON.parse(_sessionStorage("menuData")) : [],
        user: _sessionStorage("loggeduser") ? JSON.parse(_sessionStorage("loggeduser")) : {},
        breadcrumbMenu: _sessionStorage("breadcrumbMenu") ? JSON.parse(_sessionStorage("breadcrumbMenu")) : [],
        sysTitle: _sessionStorage("sysTitle") || '',
        updateTime: '',
        deptments: [],
        menuItemData: _sessionStorage("menuData") ? getMenuData(JSON.parse(_sessionStorage("menuData")), []) : [],
        dept:[],
        product: [],
        psmUser: [],
        templateId: "1000001",
        activeMenuId:_sessionStorage("activeMenuId") ? JSON.parse(_sessionStorage("activeMenuId")) : ''
    },
    actions: {},
    mutations: {
        saveTemplateId(state, templateId){
            state.templateId = templateId;
        },
        setActiveMenu(state, id) {
            state.curMenuID = id;
        },
        setMenuData(state, data) {
            let menu = [];
            let _menu = getMenuData(data, menu);
            state.menuData = data;
            state.menuItemData = _menu;
        },
        updateDocumentClientHeight(state, height) {
            state.documentClientHeight = height
        },
        setUser(state, data) {
            state.user = data;
        },
        setBreadcrumbMenu(state, data) {
            _sessionStorage("breadcrumbMenu",JSON.stringify(data));
            state.breadcrumbMenu = data;
        },
        setActiveMenuId(state, data) {
            _sessionStorage("activeMenuId",data);
            state.activeMenuId = data;
        },
        setSysTitle(state, data) {
            state.sysTitle = data;
        },
        setUpdateTime(state, data) {
            state.updateTime = data;
        },
        setDeptments(state, data) {
            state.deptments = data;
        },
        setPsmDept(state, data) {
            state.dept = data;
        },
        setPsmProduct(state, data) {
            state.product = data;
        },
        setPsmUser(state, data) {
            state.psmuser = data;
        },
        setAllMenuData(state,data) {
            state.allMenu = data;
        }
    }
}
export default common