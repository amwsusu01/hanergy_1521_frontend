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
                    title: '1521总览'
                }
            }, // 1521明细汇总
            {
                path: '/Logdetailsummarystatistics',
                name: 'canteenSummary',
                component: function(resolve) {
                    require(['./module/canteen/canteenSummary/canteenHistoryOrder2.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '全员日志质量分析'
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
            //////////////////////////// 第二个系统  //////////////////////////// 
            {
                path: '/filing',
                name: 'filing',
                component: function(resolve) {
                    require(['./module/filing-system/index.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '补录系统'
                }
            },
            //系统日志
            {
                path: '/logs',
                name: 'logs',
                component: function(resolve) {
                    require(['./module/logs.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '用户操作记录'
                }
            },
            //系统日志
            {
                path: '/roles',
                name: 'roles',
                component: function(resolve) {
                    require(['./module/roles.vue'], resolve)
                },
                meta: {
                    keepAlive: true,
                    title: '数据权限管理'
                }
            },
            //系统日志-编辑
            {
                path: '/editorRoles',
                name: 'editorRoles',
                component: function(resolve) {
                    require(['./module/editorRoles.vue'], resolve)
                },
                meta: { keepAlive: false, title: '数据权限-编辑' }
            },
            //产供销一体化明细
            {
                path: '/Supplychaindetails',
                name: 'Supplychaindetails',
                component: function(resolve) {
                    require(['./module/product-provide-market/detail.vue'], resolve)
                },
                meta: { keepAlive: false, title: '产供销一体化明细表' }
            },
            //产供销一体化图标
            {
                path: '/Supplychainwarning',
                name: 'Supplychainwarning',
                component: function(resolve) {
                    require(['./module/product-provide-market/early-warning.vue'], resolve)
                },
                meta: { keepAlive: false, title: '产供销一体化-预警' }
            },
            {
                path: '/problem',
                name: 'problem',
                component: function(resolve) {
                    require(['./module/problem/problem.vue'], resolve)
                },
                meta: { keepAlive: false, title: '问题提出和解决流程统计' }
            },
            //管理控制台-供应链一体化-预警管理
            {
                path: '/forewarnManage',
                name: 'forewarnManage',
                component: function(resolve) {
                    require(['./module/manage-control/forewarnManage.vue'], resolve)
                },
                meta: { keepAlive: false, title: '预警管理' }
            },
            //管理控制台-供应链一体化-预警记录
            {
                path: '/forewarnRecord',
                name: 'forewarnRecord',
                component: function(resolve) {
                    require(['./module/manage-control/forewarnRecord.vue'], resolve)
                },
                meta: { keepAlive: false }
            },
            {
                path: '/tab',
                name: 'tab',
                component: function(resolve) {
                    require(['./module/entry.vue'], resolve)
                },
                meta: { keepAlive: false, title: '' }
            },
            // 国内销售总部人员数据分析
            {
                path: '/detailedPersonnelFlow',
                name: 'newTable',
                component: function(resolve) {
                    require(['./module/canteen/canteenFlow/newTable.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '全员人员流量明细'
                }
            }, // 人员流量明细
            {
                path: '/detailedPersonnelFlow1',
                name: 'newTable1',
                component: function(resolve) {
                    require(['./module/canteen/canteenFlow/newTable1.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '人员流量明细'
                }
            },
            {
                path: '/offerOfRetiredPersonnel',
                name: 'offerOfRetiredPersonnel',
                component: function(resolve) {
                    require(['./module/canteen/canteenFlow/offerOfRetiredPersonnel.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '离职人员报盘'
                }
            }, // 离职人员报盘 
            {
                path: '/onTheJobOffer',
                name: 'onTheJobOffer',
                component: function(resolve) {
                    require(['./module/canteen/canteenFlow/onTheJobOffer.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '在职人员报盘'
                }
            }, // 在职人员报盘 
            {
                path: '/salesPersonnerData',
                name: 'salesPersonnerData',
                component: function(resolve) {
                    require(['./module/canteen/canteenFlow/salesPersonnelData.vue'], resolve)
                },
                meta: {
                    keepAlive: false,
                    title: '销售回款明细'
                }
            }, // 销售回款明细
        ]
    },
]

import Router from 'vue-router'

// 并且配置路由规则
console.log('BASE_URL', BASE_URL);
const router = new Router({
    mode: 'history',
    base: BASE_URL, //生产环境下需要配置
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