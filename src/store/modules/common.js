import { _sessionStorage, LocalStorage,getMenuData } from "../../assets/js/util";

const common = {
    state: {
        isCollapse: false,
        curMenuID: '48',
        // 页面文档可视高度(随窗口改变大小)
        documentClientHeight: 0,
        allMenu:LocalStorage("allMenu") ? JSON.parse(LocalStorage("allMenu")) : [],
        menuData: LocalStorage("menuData") ? JSON.parse(LocalStorage("menuData")) : [],
        user: LocalStorage("loggeduser") ? JSON.parse(LocalStorage("loggeduser")) : {},
        breadcrumbMenu: LocalStorage("breadcrumbMenu") ? JSON.parse(LocalStorage("breadcrumbMenu")) : [],
        sysTitle: LocalStorage("sysTitle") || '',
        updateTime: '',
        deptments: [],
        menuItemData: LocalStorage("menuData") ? getMenuData(JSON.parse(LocalStorage("menuData")), []) : [],
        dept:[],
        product: [],
        psmUser: [],
        templateId: "1000001",
        activeMenuId:LocalStorage("activeMenuId") ? JSON.parse(LocalStorage("activeMenuId")) : ''
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
            LocalStorage("breadcrumbMenu",JSON.stringify(data));
            state.breadcrumbMenu = data;
        },
        setActiveMenuId(state, data) {
            LocalStorage("activeMenuId",data);
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