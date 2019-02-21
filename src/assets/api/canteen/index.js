import Api from '../axios'

const apiURL = {
    //1521数据汇总统计查询
    getQueryList: '/report/StatisticsList',
    //部门查询
    getSelectPermission: '/userPermission/selectPermission',
    //明细统计----7个接口
    getDetailList1: '/detailcollect/cgscDetail',
    getDetailList2: '/detailcollect/tsxywDetail',
    getDetailList3: '/detailcollect/zsxywDetail',
    getDetailList4: '/detailcollect/jdzqDetail',
    getDetailList5: '/detailcollect/sedzqDetail',
    getDetailList6: '/detailcollect/cglhzDetail',
    getDetailList7: '/detailcollect/cglmxDetail',
    //热词
    getHotWord: '/report/Vocabulary',
    //问题明细
    getIssueDetail: '/detailcollect/issueDetail',
    //反省明细
    getIntrospectionDetail: '/detailcollect/introspectionDetail'
}

export default {
    getQueryList(params) {
        return Api.get(apiURL.getQueryList, params)
    },
    getSelectPermission(params) {
        return Api.get(apiURL.getSelectPermission, params)
    },
    //7个明细接口
    getDetailList1(params) {
        return Api.post(apiURL.getDetailList1, params)
    },
    getDetailList2(params) {
        return Api.post(apiURL.getDetailList2, params)
    },
    getDetailList3(params) {
        return Api.post(apiURL.getDetailList3, params)
    },
    getDetailList4(params) {
        return Api.post(apiURL.getDetailList4, params)
    },
    getDetailList5(params) {
        return Api.post(apiURL.getDetailList5, params)
    },
    getDetailList6(params) {
        return Api.post(apiURL.getDetailList6, params)
    },
    getDetailList7(params) {
        return Api.post(apiURL.getDetailList7, params)
    },
    getHotWord(params) {
        return Api.get(apiURL.getHotWord, params)
    },
    getIssueDetail(params) {
        return Api.post(apiURL.getIssueDetail, params)
    },
    getIntrospectionDetail(params) {
        return Api.post(apiURL.getIntrospectionDetail, params)
    }

}