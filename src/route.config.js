import util from './assets/js/util';

var Routers= [
    // 登录
    {
        path: '/',
        name: 'login',
        component: function(resolve) {
            require(['./module/login/login2.vue'], resolve)
        },
        meta:{ title:'登录' }
    },
    {
        path: '/user',
        name: 'user',
        component: function(resolve) {
            require(['./module/user/user.vue'], resolve)
        },
        meta: { keepAlive: false },
        children: [
            // 报表 首页
            {
                path: '/homehh',
                name: 'canteenPurchase',
                component: function(resolve) {
                    require(['./module/canteen/canteenPurchase/canteenPurchase.vue'], resolve)
                },
                meta: { keepAlive: true }
            }, // 1521数据汇总统计
            {
                path: '/Logsummarystatistics',
                name: 'canteenOrder',
                component: function(resolve) {
                    require(['./module/canteen/canteenOrder/canteenOrder.vue'], resolve)
                },
                meta: { keepAlive: false}
            }, // 1521明细统计
            {
                path: '/Logdetailstatistics',
                name: 'canteenHistoryOrder',
                component: function(resolve) {
                    require(['./module/canteen/canteenHistoryOrder/canteenHistoryOrder.vue'], resolve)
                },
                meta: { keepAlive: false}
            }, //部门热词
            {
                path: '/Departmentofhotword',
                name: 'canteenReceiverOrder',
                component: function(resolve) {
                    require(['./module/canteen/canteenReceiverOrder/canteenReceiverOrder.vue'], resolve)
                },
                meta: { keepAlive: false}
            }, // 1521问题和反省明细
            {
                path: '/Theproblemtoreflect',
                name: 'canteenCartBig',
                component: function(resolve) {
                    require(['./module/canteen/canteenCartBig/canteenCartBig.vue'], resolve)
                },
                meta: { keepAlive: false}
            },
            // // 离职人员汇总统计
            // {
            //     path: '/canteenConfirmOrder',
            //     name: 'canteenConfirmOrder',
            //     component: function (resolve) {
            //         require(['./module/canteen/canteenConfirmOrder/canteenConfirmOrder.vue'], resolve)
            //     },
            //     meta: {keepAlive: false}
            // }, // 离职人员明细统计
            // {
            //     path: '/canteendetail',
            //     name: 'canteendetail',
            //     component: function (resolve) {
            //         require(['./module/canteen/canteendetail/canteendetail.vue'], resolve)
            //     },
            //     meta: {keepAlive: false}
            // },
            //////////////////////////// 第二个系统  ////////////////////////////
            { // 系统管理 首页
                path: '/supplierOrder',
                name: 'supplierOrder',
                component: function(resolve) {
                    require(['./module/supplier/supplierOrder/supplierOrder.vue'], resolve)
                },
                meta: { keepAlive: false }
            }, // 权限管理
            {
                path: '/supplierHistoryOrder',
                name: 'supplierHistoryOrder',
                component: function(resolve) {
                    require(['./module/supplier/supplierHistoryOrder/supplierHistoryOrder.vue'], resolve)
                },
                meta: { keepAlive: false }
            }, // 系统安全
            {
                path: '/supplierHistoryOrderDetail',
                name: 'supplierHistoryOrderDetail',
                component: function(resolve) {
                    require(['./module/supplier/supplierHistoryOrderDetail/supplierHistoryOrderDetail.vue'], resolve)
                },
                meta: { keepAlive: false }
            }, // 用户操作记录
            {
                path: '/supplierReceiverOrder',
                name: 'supplierReceiverOrder',
                component: function(resolve) {
                    require(['./module/supplier/supplierReceiverOrder/supplierReceiverOrder.vue'], resolve)
                },
                meta: { keepAlive: false }
            },
            //系统日志
            {
                path: '/logs',
                name: 'logs',
                component: function(resolve) {
                    require(['./module/logs.vue'], resolve)
                },
                meta: { keepAlive: false }
            },
            //系统日志
            {
                path: '/roles',
                name: 'roles',
                component: function(resolve) {
                    require(['./module/roles.vue'], resolve)
                },
                meta: { keepAlive: false }
            },
            //产供销一体化明细
            {
                path: '/Supplychaindetails',
                name: 'Supplychaindetails',
                component: function(resolve) {
                    require(['./module/product-provide-market/detail.vue'], resolve)
                },
                meta: { keepAlive: false}
            },
            //产供销一体化图标
            {
                path: '/Supplychainwarning',
                name: 'Supplychainwarning',
                component: function(resolve) {
                    require(['./module/product-provide-market/early-warning.vue'], resolve)
                },
                meta: { keepAlive: false}
            },

        ]
    },
]

import Router from 'vue-router'

// 并且配置路由规则
const router = new Router({
  mode: 'history',
  // base:'/BigdataPlatform/', //生产环境下需要配置
  routes: Routers
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
