import util from './assets/js/util';

export default [
    // 登录
    {
        path: '/',
        name: 'login',
        component: function (resolve) {
            require(['./module/login/login2.vue'], resolve)
        }
    },
    {
        path: '/user',
        name: 'user',
        component: function (resolve) {
            require(['./module/user/user.vue'], resolve)
        },
        meta: {keepAlive: false},
        children: [
                    // 报表 首页
                    {
                        path: '/canteenPurchase',
                        name: 'canteenPurchase',
                        component: function (resolve) {
                            require(['./module/canteen/canteenPurchase/canteenPurchase.vue'], resolve)
                        },
                        meta: {keepAlive: true}
                    }, // 1521数据汇总统计
                    {
                        path: '/canteenOrder',
                        name: 'canteenOrder',
                        component: function (resolve) {
                            require(['./module/canteen/canteenOrder/canteenOrder.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    }, // 1521明细统计
                    {
                        path: '/canteenHistoryOrder',
                        name: 'canteenHistoryOrder',
                        component: function (resolve) {
                            require(['./module/canteen/canteenHistoryOrder/canteenHistoryOrder.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    },//部门热词
                    {
                        path: '/canteenReceiverOrder',
                        name: 'canteenReceiverOrder',
                        component: function (resolve) {
                            require(['./module/canteen/canteenReceiverOrder/canteenReceiverOrder.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    }, // 1521问题和反省明细
                    {
                        path: '/canteenCartBig',
                        name: 'canteenCartBig',
                        component: function (resolve) {
                            require(['./module/canteen/canteenCartBig/canteenCartBig.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    },// 离职人员汇总统计
                    {
                        path: '/canteenConfirmOrder',
                        name: 'canteenConfirmOrder',
                        component: function (resolve) {
                            require(['./module/canteen/canteenConfirmOrder/canteenConfirmOrder.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    }, // 离职人员明细统计
            {
                path: '/canteendetail',
                name: 'canteendetail',
                component: function (resolve) {
                    require(['./module/canteen/canteendetail/canteendetail.vue'], resolve)
                },
                meta: {keepAlive: false}
            },
     //////////////////////////// 第二个系统  ////////////////////////////
                {  // 系统管理 首页
                        path: '/supplierOrder',
                        name: 'supplierOrder',
                        component: function (resolve) {
                            require(['./module/supplier/supplierOrder/supplierOrder.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    },// 权限管理
                    {
                        path: '/supplierHistoryOrder',
                        name: 'supplierHistoryOrder',
                        component: function (resolve) {
                            require(['./module/supplier/supplierHistoryOrder/supplierHistoryOrder.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    },// 系统安全
                    {
                        path: '/supplierHistoryOrderDetail',
                        name: 'supplierHistoryOrderDetail',
                        component: function (resolve) {
                            require(['./module/supplier/supplierHistoryOrderDetail/supplierHistoryOrderDetail.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    }, // 用户操作记录
                    {
                        path: '/supplierReceiverOrder',
                        name: 'supplierReceiverOrder',
                        component: function (resolve) {
                            require(['./module/supplier/supplierReceiverOrder/supplierReceiverOrder.vue'], resolve)
                        },
                        meta: {keepAlive: false}
                    },
                ]
            },

        ]