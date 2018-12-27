<template>
    <el-container>
        <el-header>
            <Header :title="sysTitle"></Header>
        </el-header>
        <el-container :style="{ 'height': documentClientHeight-70 + 'px'}">
            <el-scrollbar style="height: 100%;width: 100%;" ref="globalScrollbar">
                <div class="sidebar-container" :class="{'is-active':isCollapse}" @mouseenter="hanldeMouseenter(false)" @mouseleave="hanldeMouseenter(true)">
                    <el-menu :default-active="53" :collapse="isCollapse" class="el-menu-vertical-demo" mode="vertical" :show-timeout="200" @open="handleOpen" @close="handleClose">
                        <sidebar-item :menu="menuData" :isCollapse="isCollapse"></sidebar-item>
                    </el-menu>
                </div>
                <el-main :class="this.isCollapse ? 'openMenu': 'closeMenu'">
                    <el-breadcrumb separator="/" class="order-breadcrumb">
                        <el-breadcrumb-item>{{breadMenu[0]}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{breadMenu[1]}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="rightline">更新时间: {{updateTime}}</div>
                    <router-view></router-view>
                </el-main>
            </el-scrollbar>
        </el-container>
    </el-container>
</template>
<script>
import '../../assets/css/reset.css'
import '../../assets/css/common.css'
import { _sessionStorage } from '../../assets/js/util'
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
            isCollapse: false,
            //sysTitle: '报表'
        };
    },
    computed: {
        sysTitle: {
            get() {
                return this.$store.state.common.sysTitle;
            },
            set(val) {
                this.$store.commit('setSysTitle', val);
            }
        },
        menuData: {
            get() {
                let data = this.$store.state.common.menuItemData;
                return data;
            },
            set(val) {
                this.$store.commit('setMenuData', val);
            }
        },
        documentClientHeight: {
            get() { return this.$store.state.common.documentClientHeight },
            set(val) { this.$store.commit('updateDocumentClientHeight', val) }
        },
        breadMenu: {
            get() {
                return this.$store.state.common.breadcrumbMenu;
            }
        },
        updateTime: {
            get() {
                return this.$store.state.common.updateTime;
            },
            set(val) {
                this.$store.commit('setUpdateTime', val);
            }
        },
        userCode: {
            get() {
                if (this.$store.state.common.user)
                    return this.$store.state.common.user.jobNumber;
                else return '';
            }
        },
        depts: {
            get() {
                return this.$store.state.common.deptments;
            },
            set(val) {
                this.$store.commit('setDeptments', val);
            }
        },
        setPsmDept: {
            get() {
                return this.$store.state.common.dept;
            },
            set(val) {
                this.$store.commit('setPsmDept', val);
            }
        },
        setPsmProduct: {
            get() {
                return this.$store.state.common.product;
            },
            set(val) {
                this.$store.commit('setPsmProduct', val);
            }
        },
        setPsmUser: {
            get() {
                return this.$store.state.common.psmuser;
            },
            set(val) {
                this.$store.commit('setPsmUser', val);
            }
        },
    },
    mounted() {
        this.init();
        this.resetDocumentClientHeight();
        this.getDimension();
    },
    watch: {
        '$route'(to, from) {
            // this.showActive(this.$route.name);
        }
    },
    methods: {
        getDimension(){
            this.$api.common.getDimension().then(res => {
                this.setPsmDept = JSON.parse(res.dept)
                this.setPsmProduct = JSON.parse(res.product)
                this.setPsmUser = JSON.parse(res.user)
            })
        },
        isIE() {
            if (!!window.ActiveXObject || "ActiveXObject" in window)
                return true;
            else
                return false;
        },
        hanldeMouseenter(value) {
            if(!this.isIE()) {
                this.isCollapse = value;
            }
        },
        init() {
            this.$api.common.getUpdateData().then(res => {
                if (res.Date) {
                    this.updateTime = res.Date;
                } else {
                    this.updateTime = '';
                }
            })

            this.getSelectPermission();
        },

        //部门接口
        getSelectPermission() {
            if (!this.userCode || this.userCode == '') {
                this.$message({
                    'message': '未获取到部门，登录后重试',
                    'type': 'info'
                });
                return;
            }
            var params = {
                userCode: this.userCode
            }
            this.$api.canteen.getSelectPermission(params).then(res => {
                let user = JSON.parse(res.user) || [];
                this.depts = user;

                // for (let j = 0; j < user.length; j++) {
                //     let deptName = user[j].dept_name
                //     this.deptList.push(deptName)
                //     let dept_id = user[j].dept_id
                // }
            })
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
        // getMenu(list, res) {
        //     for (let i = 0; i < list.length; i++) {
        //         if (list[i].type != 2) {
        //             if (list[i].list && list[i].list.length > 0) {
        //                 this.getMenu(list[i].list, res);
        //             } else {
        //                 res[i].list = list[i];
        //             }
        //         } else {
        //             if (!res.buttons) res.buttons = [];
        //             res[i].buttons.push(list[i]);
        //         }
        //     }
        // }
    }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
    margin-bottom: 20px;
}

.el-main {
    overflow-x: hidden;
}
    .openMenu{
        margin-left: 64px;
    }
    .closeMenu{
        margin-left: 220px;
    }
</style>
<style lang="less">
.sidebar-container {
        position: fixed;
        top: 60px;
        left: 0px;
        z-index: 9999;
}
.el-container {
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }

    .el-scrollbar__bar.is-horizontal {
        display: none;
    }
}
</style>