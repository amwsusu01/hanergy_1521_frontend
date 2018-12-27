import { _sessionStorage, getMenuData } from "../../assets/js/util";
const common = {
    state: {
        isCollapse: false,
        curMenuID: '48',
        // 页面文档可视高度(随窗口改变大小)
        documentClientHeight: 0,
        menuData: _sessionStorage("menuData") ? JSON.parse(_sessionStorage("menuData")) : [],
        user: _sessionStorage("loggeduser") ? JSON.parse(_sessionStorage("loggeduser")) : {},
        breadcrumbMenu: ['1521日志分析报表', '1521数据汇总统计'],
        sysTitle: _sessionStorage("sysTitle") || '',
        updateTime: '',
        deptments: [],
        menuItemData: _sessionStorage("menuData") ? getMenuData(JSON.parse(_sessionStorage("menuData")), []) : [],
        dept:[],
        product: [],
        psmUser: []
    },
    actions: {},
    mutations: {
        setActiveMenu(state, id) {
            state.curMenuID = id;
        },
        setMenuData(state, data) {
            // if (data && data.length > 0) {
            //     data[0].icon = "el-icon-tickets";

            //     if(data.length > 1) {
            //         data[1].icon = 'iconfont icon-gongyinglianzhineng';
            //     }
            // }

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
            state.breadcrumbMenu = data;
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
    }
}
export default common