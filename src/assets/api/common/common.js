import Api from '../axios'

const apiURL = {
    // 登录
    login: '/api/v1/user/getRoleListByUser',
    // 退出
    logout: '/user/logout',
    //菜单
    sidebar: '/admin/api/v1/user/roles', //无用了。

    updateDate:'/return/getDate',
    exportExcel:'/return/printExcel',
    userList:'/admin/api/v1/user/getUserList',
    psmDimension:'psm/dimension',
    psmWarning: 'psm/getWarning',
    warningDetailed: 'psm/warningDetailed',
    productDetailed: 'psm/getProductDetailed',
    selectPermission:"/userPermission/selectPermission",
    selectDeptList:"/userPermission/selectDeptList",
    updatePermission:"/userPermission/updatePermission"
};

export default {
    login(obj) {
        return Api.post(`${configM.tempComUrl}${apiURL.login}`, obj);
    },
    logout(obj) {
        return Api.get(apiURL.logout, obj)
    },
    sidebar(obj) {
        return Api.get(`${configM.otherComUrl}${apiURL.sidebar}`, obj)
    },
    getUpdateData() {
        return Api.get(apiURL.updateDate,{})
    },
    exportExcel(obj) {
        return Api.exportGet(apiURL.exportExcel,obj);
    },
    getUserList() {
        return Api.get(`${configM.otherComUrl}${apiURL.userList}`,{corpCode:'Hanergy','menuId':48});
    },
    getDimension(){
        return Api.get(apiURL.psmDimension,{})
    },
    getWarning(obj){
        return Api.get(apiURL.psmWarning,obj)
    },
    warningDetailed(obj) {
        return Api.post(apiURL.warningDetailed, obj);
    },
    warningExportGet(obj) {
        return Api.exportPost(apiURL.warningDetailed, obj);
    },
    getProductDetailed(obj) {
        return Api.post(apiURL.productDetailed, obj);
    },
    getProductExportDetailed(obj) {
        return Api.exportPost(apiURL.productDetailed, obj);
    },
    getSelectPermission(obj) {
        return Api.get(apiURL.selectPermission,obj);
    },
    getSelectDeptList() {
        return Api.get(apiURL.selectDeptList,{});
    },
    updateSelectDeptList(obj) {
        return Api.get(apiURL.updatePermission,obj);
    },
}