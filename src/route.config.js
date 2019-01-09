import util from './assets/js/util';

var Routers = [
    // 登录
    {
        path: '/',
        name: 'login',
        component: function(resolve) {
            require(['./module/login/login2.vue'], resolve)
        },
        meta: { title: '登录' }
    },
    {
        path: '/user',
        name: 'user',
        component: function(resolve) {
            require(['./module/user/user.vue'], resolve)
        },
        meta: {
            keepAlive: false
        },
        children: [
            // 报表 首页
            // 1521数据汇总统计
            {
                path: '/Logsummarystatistics',
                name: 'canteenOrder',
                component: function(resolve) {
                    require(['./module/canteen/canteenOrder/canteenOrder.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '1521数据汇总统计'
                }
            }, // 1521明细统计
            {
                path: '/Logdetailstatistics',
                name: 'canteenHistoryOrder',
                component: function(resolve) {
                    require(['./module/canteen/canteenHistoryOrder/canteenHistoryOrder.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '1521明细'
                }
            }, //部门热词
            {
                path: '/Departmentofhotword',
                name: 'canteenReceiverOrder',
                component: function(resolve) {
                    require(['./module/canteen/canteenReceiverOrder/canteenReceiverOrder.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '部门热词'
                }
            }, // 1521问题和反省明细
            {
                path: '/Theproblemtoreflect',
                name: 'canteenCartBig',
                component: function(resolve) {
                    require(['./module/canteen/canteenCartBig/canteenCartBig.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '问题/反省库'
                }
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
            //系统日志
            {
                path: '/logs',
                name: 'logs',
                component: function(resolve) {
                    require(['./module/logs.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '用户操作日志'
                }
            },
            //系统日志
            {
                path: '/roles',
                name: 'roles',
                component: function(resolve) {
                    require(['./module/roles.vue'], resolve)
                },
                meta: { keepAlive: false,
                    title: '数据权限' }
            },
            //系统日志-编辑
            {
                path: '/editorRoles',
                name: 'editorRoles',
                component: function(resolve) {
                    require(['./module/editorRoles.vue'], resolve)
                },
                meta: { keepAlive: false,title: '数据权限-编辑' }
            },
            //产供销一体化明细
            {
                path: '/Supplychaindetails',
                name: 'Supplychaindetails',
                component: function(resolve) {
                    require(['./module/product-provide-market/detail.vue'], resolve)
                },
                meta: { keepAlive: false,title: '产供销一体化明细表'  }
            },
            //产供销一体化图标
            {
                path: '/Supplychainwarning',
                name: 'Supplychainwarning',
                component: function(resolve) {
                    require(['./module/product-provide-market/early-warning.vue'], resolve)
                },
                meta: { keepAlive: false,title: '产供销一体化-预警' }
            },
            //管理控制台-供应链一体化-预警管理
            {
                path: '/forewarnManage',
                name: 'forewarnManage',
                component: function(resolve) {
                    require(['./module/manage-control/forewarnManage.vue'], resolve)
                },
                meta: { keepAlive: false ,title: '预警管理'}
            },
            //管理控制台-供应链一体化-预警记录
            {
                path: '/forewarnRecord',
                name: 'forewarnRecord',
                component: function(resolve) {
                    require(['./module/manage-control/forewarnRecord.vue'], resolve)
                },
                meta: { keepAlive: false }
            }
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