import Api from '../axios'

const apiURL = {
    //1521数据汇总统计查询
    getQueryList: '/report/StatisticsList',
    //部门查询
    getSelectPermission: '/userPermission/selectPermission',
    //明细统计----7个接口
    getDetailList1: '/detailcollect/cgscDetail',
    getDetailList2: '/report/tsxywDetail',
    getDetailList3: '/report/zsxywDetail',
    getDetailList4: '/report/jdzqDetail',
    getDetailList5: '/report/sedzqDetail',
    getDetailList6: '/report/cglhzDetail',
    getDetailList7: '/report/cglmxDetail',
    //热词
    getHotWord: '/report/Vocabulary',
    //问题明细
    getIssueDetail: '/report/issueDetail',
    //反省明细
    getIntrospectionDetail: '/report/introspectionDetail'
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
    }

}