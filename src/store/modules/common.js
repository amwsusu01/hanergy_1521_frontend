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
        isInit:"false",
        activeMenuId:LocalStorage("activeMenuId") ? JSON.parse(LocalStorage("activeMenuId")) : '',
        activeIndex: 0
    },
    actions: {},
    mutations: {
        saveActiveIndex(state,activeIndex){
            state.activeIndex = activeIndex;
        },
        saveTemplateId(state, templateId){
            state.templateId = templateId;
        },
        updateIsInit(state,isInit){
            state.isInit=isInit;
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

/*
*
* {"msg":"请求成功!","data":[
* {"roleId":19,"roleName":"BigdataPlatform_大数据测试人员","remark":"","createUserId":1,"menuIdList":null,"createTime":"2019-01-10 14:38:47","menus":[{"menuId":49,"parentId":48,"parentName":null,"name":"管理驾驶舱","url":"https://36kr.com/","perms":"","type":0,"icon":"oss","orderNum":1,"open":null,"list":[{"menuId":52,"parentId":49,"parentName":null,"name":"1521日志分析","url":"https://36kr.com/","perms":"","type":0,"icon":"iconfont icon-jichuguanli","orderNum":1,"open":null,"list":[{"menuId":53,"parentId":52,"parentName":null,"name":"1521总览","url":"canteenOrder","perms":"","type":1,"icon":"tubiao","orderNum":0,"open":null,"list":[{"menuId":64,"parentId":53,"parentName":null,"name":"超过4次(含)未请假未提报统计报表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":65,"parentId":53,"parentName":null,"name":"提报内容一样/当天重复条数超过6条(含)/一个月累计出现超过6次(含)_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":66,"parentId":53,"parentName":null,"name":"提报月平均条数小于5_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":67,"parentId":53,"parentName":null,"name":"提报月平均字数小于5_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":68,"parentId":53,"parentName":null,"name":"9点之前提报统计报表/一个月累计出现3次(含)_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":69,"parentId":53,"parentName":null,"name":"12点之前提报统计报表/一个月累计出现3次(含)_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null},{"menuId":54,"parentId":52,"parentName":null,"name":"1521明细","url":"canteenHistoryOrder","perms":"","type":1,"icon":"tubiao","orderNum":2,"open":null,"list":[{"menuId":70,"parentId":54,"parentName":null,"name":"超过4次(含)未请假未提报统计报表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":71,"parentId":54,"parentName":null,"name":"提拔月平均条数小于5明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":72,"parentId":54,"parentName":null,"name":"提拔月平均字数小于5明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":73,"parentId":54,"parentName":null,"name":"9点之前提报数据明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":74,"parentId":54,"parentName":null,"name":"12点之前提报数据明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":75,"parentId":54,"parentName":null,"name":"提报内容重复超6次(含)汇总表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":76,"parentId":54,"parentName":null,"name":"提报内容重复超6次(含)明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null},
* {"menuId":55,"parentId":52,"parentName":null,"name":"部门热词","url":"canteenReceiverOrder","perms":"","type":1,"icon":"oss","orderNum":3,"open":null,"list":[{"menuId":77,"parentId":55,"parentName":null,"name":"导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null},{"menuId":56,"parentId":52,"parentName":null,"name":"问题/反省库","url":"canteenCartBig","perms":"","type":1,"icon":"menu","orderNum":4,"open":null,"list":[{"menuId":78,"parentId":56,"parentName":null,"name":"部门问题明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":79,"parentId":56,"parentName":null,"name":"部门反省明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null}],"children":null},{"menuId":117,"parentId":49,"parentName":null,"name":"人力报表","url":"","perms":"","type":0,"icon":"iconfont icon-renlifenxi","orderNum":3,"open":null,"list":[{"menuId":118,"parentId":117,"parentName":null,"name":"在职主页","url":"/tab?type=1","perms":"","type":1,"icon":"shoucangfill","orderNum":1,"open":null,"list":[],"children":null},{"menuId":119,"parentId":117,"parentName":null,"name":"在职年龄分析","url":"/tab?type=2","perms":"","type":1,"icon":"menu","orderNum":2,"open":null,"list":[],"children":null},{"menuId":120,"parentId":117,"parentName":null,"name":"在职学历分析","url":"/tab?type=3","perms":"","type":1,"icon":"log","orderNum":3,"open":null,"list":[],"children":null},{"menuId":121,"parentId":117,"parentName":null,"name":"在职职级分析","url":"/tab?type=4","perms":"","type":1,"icon":"shezhi","orderNum":4,"open":null,"list":[],"children":null},{"menuId":122,"parentId":117,"parentName":null,"name":"在职司龄分析","url":"/tab?type=5","perms":"","type":1,"icon":"","orderNum":6,"open":null,"list":[],"children":null},{"menuId":123,"parentId":117,"parentName":null,"name":"入职主页","url":"/tab?type=6","perms":"","type":1,"icon":"","orderNum":7,"open":null,"list":[],"children":null},{"menuId":124,"parentId":117,"parentName":null,"name":"离职主页","url":"/tab?type=7","perms":"","type":1,"icon":"","orderNum":9,"open":null,"list":[],"children":null}],"children":null},{"menuId":125,"parentId":49,"parentName":null,"name":"人员考勤","url":"","perms":"","type":0,"icon":"iconfont icon-kaoqin","orderNum":6,"open":null,"list":[{"menuId":126,"parentId":125,"parentName":null,"name":"考勤分析","url":"/tab?type=8","perms":"","type":1,"icon":"","orderNum":1,"open":null,"list":[],"children":null},{"menuId":127,"parentId":125,"parentName":null,"name":"考勤分析明细","url":"/tab?type=9","perms":"","type":1,"icon":"","orderNum":2,"open":null,"list":[],"children":null},{"menuId":128,"parentId":125,"parentName":null,"name":"打卡明细分析","url":"/tab?type=10","perms":"","type":1,"icon":"","orderNum":3,"open":null,"list":[],"children":null},{"menuId":129,"parentId":125,"parentName":null,"name":"考勤综合分析","url":"/tab?type=11","perms":"","type":1,"icon":"","orderNum":4,"open":null,"list":[],"children":null}],"children":null},{"menuId":100,"parentId":49,"parentName":null,"name":"产供销一体化","url":"","perms":"","type":0,"icon":"iconfont icon--shebeigongyinglianguanli","orderNum":7,"open":null,"list":[{"menuId":102,"parentId":100,"parentName":null,"name":"产供销一体化-预警","url":"Supplychainwarning","perms":"","type":1,"icon":"log","orderNum":0,"open":null,"list":[],"children":null},{"menuId":101,"parentId":100,"parentName":null,"name":"产供销一体化明细表","url":"Supplychaindetails","perms":"","type":1,"icon":"job","orderNum":1,"open":null,"list":[],"children":null}],"children":null},{"menuId":130,"parentId":49,"parentName":null,"name":"供应链仓储管理","url":"··","perms":"","type":0,"icon":"iconfont icon-kucunguanli","orderNum":8,"open":null,"list":[{"menuId":131,"parentId":130,"parentName":null,"name":"库存统计报表","url":"/tab?type=12","perms":"","type":1,"icon":"","orderNum":1,"open":null,"list":[],"children":null}],"children":null},{"menuId":134,"parentId":49,"parentName":null,"name":"发现问题解决问题","url":"","perms":"","type":0,"icon":"iconfont icon-faxian","orderNum":11,"open":null,"list":[{"menuId":135,"parentId":134,"parentName":null,"name":"问题提出和解决流程统计","url":"problem","perms":"","type":1,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null}],"children":null},{"menuId":132,"parentId":48,"parentName":null,"name":"补录系统","url":"","perms":"","type":0,"icon":"","orderNum":3,"open":null,"list":[],"children":null},{"menuId":92,"parentId":48,"parentName":null,"name":"管理系统","url":"https://www.iyiou.com/p/76612.html","perms":"","type":0,"icon":"shezhi","orderNum":99,"open":null,"list":[{"menuId":104,"parentId":92,"parentName":null,"name":"产供销一体化管理","url":"","perms":"","type":0,"icon":"iconfont icon--shebeigongyinglianguanli","orderNum":1,"open":null,"list":[{"menuId":105,"parentId":104,"parentName":null,"name":"预警管理","url":"forewarnManage","perms":"","type":1,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":109,"parentId":104,"parentName":null,"name":"预警记录","url":"forewarnRecord","perms":"","type":1,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null},{"menuId":93,"parentId":92,"parentName":null,"name":"基础管理","url":"","perms":"","type":0,"icon":"iconfont icon-jichuguanli","orderNum":16,"open":null,"list":[{"menuId":94,"parentId":93,"parentName":null,"name":"数据权限管理","url":"roles","perms":"","type":1,"icon":"admin","orderNum":1,"open":null,"list":[{"menuId":95,"parentId":94,"parentName":null,"name":"编辑","url":"https://www.iyiou.com/p/76612.html","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":96,"parentId":94,"parentName":null,"name":"查看","url":"https://www.iyiou.com/p/76612.html","perms":"https://www.iyiou.com/p/76612.html","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null}],"children":null},{"menuId":97,"parentId":92,"parentName":null,"name":"系统安全","url":"","perms":"","type":0,"icon":"iconfont icon-OA_xitonganquanyushezhi1","orderNum":20,"open":null,"list":[{"menuId":98,"parentId":97,"parentName":null,"name":"用户操作记录","url":"logs","perms":"","type":1,"icon":"menu","orderNum":1,"open":null,"list":[{"menuId":99,"parentId":98,"parentName":null,"name":"导出","url":"https://www.iyiou.com/p/76612.html","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null}],"children":null}],"children":null}]}],"user":{"userId":18000060,"username":"lilingyu","password":null,"salt":null,"email":"LILINGYU@HANERGY.COM","mobile":"15801224244","status":1,"roleIdList":null,"createUserId":null,"createTime":null,"userType":null,"jobNumber":"10051675","sfUserId":null,"name":"李凌宇","positionId":"20053597","position":"大数据研发工程师","department":"技术研发部","departmentId":"40000314","departmentTree":"40000314,90007729,90005743,90005742,90000000","departmentTreeName":"技术研发部,全球大数据总部,汉能薄膜发电集团总部,汉能薄膜发电集团,Hanergy","workPlace":"奥森","graduateSchool":"未说明","idCard":"230904199411270741","major":"未说明","bigda":"20181108","endda":"99991231"},"status":0}
* */