import Api from '../axios'

const apiURL = {
    // 登录
    login: '/api/v1/user/getRoleListByUser',
    // 退出
    logout: '/user/logout', //无用
    //菜单
    sidebar: '/admin/api/v1/user/roles', //无用了。

    updateDate: '/return/getDate',
    exportExcel: '/return/printExcel',
    userList: '/admin/api/v1/user/getUserList',
    psmDimension: 'psm/dimension',
    psmWarning: 'psm/getWarning',
    warningDetailed: 'psm/warningDetailed',
    productDetailed: 'psm/getProductDetailed',
    selectPermission: "/userPermission/selectPermission", //获取部门
    selectDeptList: "/userPermission/selectDeptList",
    updatePermission: "/userPermission/updatePermission",
    getMailNotifierList: "/mail/mailNotifierList",
    addNotifier: "/mail/addNotifier",
    updateNotifier: "/mail/updateNotifier",
    mailRecordList: "/mail/mailRecordList",
    problemList: "/problem/problemlist",
    problemExportDetailed: "/problem/problemexcelexport",
    logsList: "/process/recodeList",
    logsExport: "/process/recodeexport",
    iframQuery: "/elasticsearch/index",
    getOrganization: '/detailcollect/allorg'
};

export default {
    prosearch(obj) {
        return Api.post(apiURL.problemList, obj);
    },
    login(obj) {
        return Api.post(`${configM.tempComUrl}${apiURL.login}`, obj);
    },
    logout(obj) {
        return Api.get(apiURL.logout, obj)
    },
    sidebar(obj) {
        return Api.get(`${configM.otherComUrl}${apiURL.sidebar}`, obj)
    },
    getUpdateData(obj) {
        return Api.get(apiURL.updateDate, obj)
    },
    exportExcel(obj) {
        return Api.exportGet(apiURL.exportExcel, obj);
    },
    getUserList(obj) {
        return Api.get(`${configM.otherComUrl}${apiURL.userList}`, obj);
    },
    getDimension(obj) {
        return Api.get(apiURL.psmDimension, obj)
    },
    getWarning(obj) {
        return Api.get(apiURL.psmWarning, obj)
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
        return Api.get(apiURL.selectPermission, obj);
    },
    getSelectDeptList() {
        return Api.get(apiURL.selectDeptList, {});
    },
    updateSelectDeptList(obj) {
        return Api.get(apiURL.updatePermission, obj);
    },
    getMailNotifierList(obj) {
        return Api.get(apiURL.getMailNotifierList, obj);
    },
    addNotifier(obj) {
        return Api.get(apiURL.addNotifier, obj);
    },
    updateNotifier(obj) {
        return Api.get(apiURL.updateNotifier, obj);
    },
    mailRecordList(obj) {
        return Api.get(apiURL.mailRecordList, obj);
    },
    getProblemExportDetailed(obj) {
        return Api.exportPost(apiURL.problemExportDetailed, obj);
    },
    getlogsExport(obj) {
        return Api.exportPost(apiURL.logsExport, obj)
    },
    getLogsList(obj) {
        return Api.post(apiURL.logsList, obj)
    },
    getIframQuery(obj) {
        return Api.post(apiURL.iframQuery, obj)
    },
    getOrganization(obj) {
        return Api.get(apiURL.getOrganization, obj)
    }
}