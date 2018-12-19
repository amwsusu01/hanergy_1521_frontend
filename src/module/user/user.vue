<template>
    <el-container>
        <el-header>
            <Header :title="sysTitle"></Header>
        </el-header>
        <el-container :style="{ 'height': documentClientHeight-70 + 'px'}">
            <el-scrollbar style="height: 100%;width: 100%;" ref="globalScrollbar">
                <div class="sidebar-container" :class="{'is-active':isCollapse}" @mouseenter="isCollapse=false" @mouseleave="isCollapse=true">
                    <el-menu unique-opened :default-active="53" :collapse="isCollapse" class="el-menu-vertical-demo" mode="vertical" :show-timeout="200" @open="handleOpen" @close="handleClose">
                        <sidebar-item :menu="menuData" :isCollapse="isCollapse"></sidebar-item>
                    </el-menu>
                </div>
                <el-main>
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
        breadMenu: {
            get() {
                return this.$store.state.common.breadcrumbMenu;
            }
        },
        updateTime:{
             get() {
                return this.$store.state.common.updateTime;
            },
            set(val){
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
        depts:{
            get(){
                return this.$store.state.common.deptments;
            },
            set(val){
                this.$store.commit('setDeptments', val);
            }
        }
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
            this.$api.common.getUpdateData().then(res=>{
                if(res.Date) {
                    this.updateTime = res.Date;
                } else {
                    this.updateTime = '';
                }
            })

            this.getSelectPermission();
        },

        //部门接口
        getSelectPermission() {
            if(!this.userCode || this.userCode == '') {
                this.$message({
                    'message':'未获取到部门，登录后重试',
                    'type':'info'
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
                if (res.status == 0) {
                    this.sysTitle = res.data[0].menus[0].name;
                    this.menuData = res.data[0].menus[0].list; // 存储菜单
                } else {
                    this.$message.error({
                        message: res.message,
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

.el-main {
    overflow-x: hidden;
}
</style>
<style lang="less">
.sidebar-container {
    float: left;
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