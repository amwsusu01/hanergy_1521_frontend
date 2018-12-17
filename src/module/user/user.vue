<template>
    <el-container>
        <el-header>
            <Header :title="sysTitle"></Header>
        </el-header>
        <el-container :style="{ 'height': documentClientHeight-70 + 'px'}">
            <el-scrollbar style="height: 100%;" ref="globalScrollbar">
            <div class="sidebar-container" :class="{'is-active':isCollapse}" @mouseenter="isCollapse=!isCollapse" @mouseleave="isCollapse=!isCollapse">
                <logo :isCollapse="isCollapse"></logo>
                <el-menu unique-opened default-active="53" :isCollapse="isCollapse" class="el-menu-vertical-demo" mode="vertical" :show-timeout="200" @open="handleOpen" @close="handleClose">
                    <sidebar-item :menu="menuData" :isCollapse="isCollapse"></sidebar-item>
                </el-menu>
            </div>
            <el-main>
                <router-view></router-view>               
            </el-main>
             </el-scrollbar>
        </el-container>
    </el-container>
</template>
<script>
import '../../assets/css/reset.css'
import '../../assets/css/common.css'
import { _setTitle, getQueryStringHr, sessionId, _sessionStorage, calcuMD5 } from '../../assets/js/util'
import Header from '../../components/header/header';
import SidebarItem from '../../components/sidebar/sidebarItem.vue';

export default {
    name: 'canteenHome',
    components: {
        Header,
        SidebarItem
    },
    data() {
        return {
            leftDefauleActive: '1-1', // 左侧菜单默认展开哪个
            isCollapse: true,
            sysTitle: '报表'
        };
    },
    computed: {
        menuData: {
            get() {
                return this.$store.state.common.menuData;
            },
            set(val) {
                this.$store.commit('setMenuData', val);
            }
        },
        documentClientHeight: {
            get() { return this.$store.state.common.documentClientHeight },
            set(val) { this.$store.commit('updateDocumentClientHeight', val) }
        },
    },
    mounted() {
        this.init();
        this.resetDocumentClientHeight();
    },
    watch: {
        '$route'(to, from) {
            // this.showActive(this.$route.name);
        }
    },
    methods: {
        init() {
            _setTitle('1521报表');
            this.getSidebarList();
        },
        // 重置窗口可视高度
        resetDocumentClientHeight() {
            this.documentClientHeight = document.documentElement['clientHeight']
            window.onresize = () => {
                this.documentClientHeight = document.documentElement['clientHeight']
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        getMenu(list, res) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].type != 2) {
                    if (list[i].list && list[i].list.length > 0) {
                        this.getMenu(list[i].list, res);
                    } else {
                        res[i].list = list[i];
                    }
                } else {
                    if (!res.buttons) res.buttons = [];
                    res[i].buttons.push(list[i]);
                }
            }
        },
        //调用菜单接口
        getSidebarList() {
            let param = { // corpCode=Hanergy&user=12345678901&password=123456&menuId=48
                corpCode: 'Hanergy',
                user: '12345678901', //用户名
                password: '123456', //密码
                menuId: '48',
            };
            this.$api.common.sidebar(param).then(res => {
                console.log(res, "sidebar")
                if (res.status == 0) {
                    this.sysTitle = res.data[0].menus[0].name;
                    this.menuData = res.data[0].menus[0].list; // 存储菜单
                    /*_sessionStorage('type', res.data.type); // 0管理员 1采购端 2供应商端
                    _sessionStorage('user', res.data.name);*/
                    // console.log(res.data.type)

                    /*if (res.data.type == 1) { // 1521
                        this.$router.push({
                            path: '/canteenHome',
                        })
                    } else if (res.data.type == 2) { // 系统管理
                        this.$router.push({
                            path: '/supplierHome',
                        })
                    } else {
                        this.$router.push({
                            path: '/user',
                        })
                        console.log(res.data.type)
                    }*/

                } else {
                    this.$message.error({
                        message: res.meta.message,
                        duration: 1000,
                        center: true
                    });
                }
            })

        },
    }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
    margin-bottom: 20px;
}
</style>
<style lang="less">
.sidebar-container {
    float:left;
}
</style>