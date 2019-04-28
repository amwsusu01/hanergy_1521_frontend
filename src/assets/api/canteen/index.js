import Api from '../axios'

const apiURL = {
    //1521数据汇总统计查询
    getQueryList: '/report/StatisticsList',
    //部门查询
    getSelectPermission: '/userPermission/selectPermission',
    //明细统计----7个接口
    getDetailList1: '/report/cgscDetail',
    getDetailList2: '/report/tsxywDetail',
    getDetailList3: '/report/zsxywDetail',
    getDetailList4: '/report/jdzqDetail',
    getDetailList5: '/report/sedzqDetail',
    getDetailList6: '/report/cglhzDetail',
    getDetailList7: '/report/cglmxDetail',

    getcgscDetail: '/detailcollect/cgscDetail',
    gettsxywDetail: '/detailcollect/tsxywDetail',
    getzsxywDetail: '/detailcollect/zsxywDetail',
    getjdzqDetail: '/detailcollect/jdzqDetail',
    getsedzqDetail: '/detailcollect/sedzqDetail',
    getcglhzDetail: '/detailcollect/cglhzDetail',
    getcglmxDetail: '/detailcollect/cglmxDetail',
    //热词
    getHotWord: '/report/Vocabulary',
    //问题明细
    getIssueDetail: '/report/issueDetail',
    getProblemList: '/detailcollect/issueDetail',

    //反省明细
    getIntrospectionDetail: '/report/introspectionDetail',
    getIntrospectionList: '/detailcollect/introspectionDetail',

    // 全民提报数据明细
    gettableDataSub: '/detailcollect/allreport',

    // 人员流量明细
    getPersonnelFlow: '/personnelflow/list',
    // 查询人员流量明细的下拉框数据
    getPersonnelFlowSelect: '/personnelflow/param',
    // 产品成本
    getProductCost: '/product/list',
    // 保存产品数据接口
    saveProductCost: '/product/save'
}

export default {
    getQueryList(params) {
        return Api.get(apiURL.getQueryList, params)
    },
    getSelectPermission(params) {
        return Api.get(apiURL.getSelectPermission, params)
    },
    getcgscDetail(params) {
        return Api.post(apiURL.getcgscDetail, params) // 1
    },
    gettsxywDetail(params) {
        return Api.post(apiURL.gettsxywDetail, params) // 2
    },
    getzsxywDetail(params) {
        return Api.post(apiURL.getzsxywDetail, params) // 3
    },
    getjdzqDetail(params) {
        return Api.post(apiURL.getjdzqDetail, params) // 4
    },
    getsedzqDetail(params) {
        return Api.post(apiURL.getsedzqDetail, params) // 5
    },
    getcglhzDetail(params) {
        return Api.post(apiURL.getcglhzDetail, params) //6 
    },
    getcglmxDetail(params) {
        return Api.post(apiURL.getcglmxDetail, params) // 7
    },
    //7个明细接口
    getDetailList1(params) {
        return Api.get(apiURL.getDetailList1, params)
    },
    getDetailList2(params) {
        return Api.get(apiURL.getDetailList2, params)
    },
    getDetailList3(params) {
        return Api.get(apiURL.getDetailList3, params)
    },
    getDetailList4(params) {
        return Api.get(apiURL.getDetailList4, params)
    },
    getDetailList5(params) {
        return Api.get(apiURL.getDetailList5, params)
    },
    getDetailList6(params) {
        return Api.get(apiURL.getDetailList6, params)
    },
    getDetailList7(params) {
        return Api.get(apiURL.getDetailList7, params)
    },
    getHotWord(params) {
        return Api.get(apiURL.getHotWord, params)
    },
    getIssueDetail(params) {
        return Api.get(apiURL.getIssueDetail, params)
    },
    getIntrospectionDetail(params) {
        return Api.get(apiURL.getIntrospectionDetail, params)
    },
    getProblemList(params) {
        return Api.post(apiURL.getProblemList, params)
    },
    getIntrospectionList(params) {
        return Api.post(apiURL.getIntrospectionList, params)
    },
    gettableDataSub(params) {
        return Api.post(apiURL.gettableDataSub, params)
    },
    getPersonnelflow(params) {
        return Api.post(apiURL.getPersonnelFlow, params)
    },
    getPersonnelFlowSelect(params) {
        return Api.post(apiURL.getPersonnelFlowSelect, params)
    },
    getProductCost(params) {
        return Api.post(apiURL.getProductCost, params)
    },
    saveProductCost(params) {
        return Api.post(apiURL.saveProductCost, params)
    }
}