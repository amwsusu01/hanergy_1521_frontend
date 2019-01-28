<template>
    <el-container class="container">
        <el-header>
            <HeaderTop :title="titles" :isCollapse="isCollapse" @switchMenu="switchMenu" @showCollapse="showCollapse" :activeIndex="activeIndex"></HeaderTop>
        </el-header>
        <el-container :style="{ 'height': documentClientHeight-70 + 'px'}">
            <!--<el-scrollbar style="height: 100%;width: 100%;" ref="globalScrollbar">-->
            <div  :class="this.isCollapse ? 'sidebar-container siderbarClose' :'sidebar-container siderbarnew'" :style="'width:'+ num +'%;'">
                <!--  :class="{'is-active':isCollapse}" @mouseenter="hanldeMouseenter(false)" @mouseleave="hanldeMouseenter(true)"-->
                <el-menu :default-active="activeFirstMenuID" :collapse="isCollapse" class="el-menu-vertical-demo" mode="vertical" :show-timeout="200" @open="handleOpen" @close="handleClose">
                    <sidebar-item :menu="menuData" :isCollapse="isCollapse"></sidebar-item>
                </el-menu>
                <div class="scrollbar"></div>
            </div>
                <el-main :class="this.isCollapse ? 'openMenu': 'closeMenu'" id="mainContainer">
                    <el-breadcrumb separator="/" class="order-breadcrumb">
                        <el-breadcrumb-item>{{breadMenu[0]}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{breadMenu[1]}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="rightline" v-show="is1521Sys==true">更新时间: {{updateTime}}</div>
                        <keep-alive>
                            <router-view></router-view>
                        </keep-alive>
                </el-main>
            <!--</el-scrollbar>-->
        </el-container>
    </el-container>
</template>
<script>
import '../../assets/css/reset.css'
import '../../assets/css/common.css'
import { _sessionStorage } from '../../assets/js/util'
import HeaderTop from '../../components/headerTop/headerTop';
import SidebarItem from '../../components/sidebar/sidebarItem.vue';

export default {
    name: 'canteenHome',
    components: {
        HeaderTop,
        SidebarItem,
    },
    data() {
        return {
            isCollapse: false,
            num: 16,
            activeIndex: _sessionStorage("activeIndex") || 0
            //sysTitle: '报表'
        };
    },
    computed: {
        userObj: {
            get(){
                return this.$store.state.common.user;
            }
        },
        is1521Sys: {
            get() {
                if (this.$route.name == 'canteenCartBig' || this.$route.name == 'canteenOrder' || this.$route.name == 'canteenHistoryOrder' || this.$route.name == 'canteenReceiverOrder' || this.$router.name == '') {
                    return true;
                } else return false;
            }
        },
        activeFirstMenuID: {
            get() {
                return this.$store.state.common.activeMenuId + ''
            }
        },
        sysTitle: {
            get() {
                return this.$store.state.common.sysTitle;
            },
            set(val) {
                this.$store.commit('setSysTitle', val);
            }
        },
        titles: {
            get() {
                return this.allMenu.map((a) => a.name);
            }
        },
        allMenu: {
            get() {
                return this.$store.state.common.allMenu;
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
            this.init();
        }
    },
    methods: {
        switchMenu(index){
            this.$nextTick(() =>{
                this.activeIndex = index;
                _sessionStorage("activeIndex", this.activeIndex);
                this.menuData = this.allMenu[index].list;
                _sessionStorage("menuData", JSON.stringify(this.menuData));
                let firstPage = 'canteenOrder',
                    firstName = '',
                    defaultMenuId = '';
                if (this.menuData.length > 0 && this.menuData[0].list.length > 0) {
                    firstPage = this.menuData[0].list[0].url;
                    firstName = this.menuData[0].list[0].name;
                    defaultMenuId = this.menuData[0].list[0].menuId;
                }
                this.$store.commit('setBreadcrumbMenu', [this.menuData[0].name || '', firstName]);
                this.$store.commit('setActiveMenuId', defaultMenuId);

                this.$router.push({
                    name: firstPage
                });
            })

        },
        showCollapse() {
            this.isCollapse = !this.isCollapse;
            if( this.isCollapse){
               this.num = 5
            }else{
                this.num = 16
            }
        },
        getDimension() {
            let params = {
                userId: this.userObj.userId,
                userName: this.userObj.username,
                fullName: this.userObj.name,
                systemId: "49",//系统id
                systemName: "管理驾驶舱",
                menuId: "53",
                menuName: "1521总览",
                proType: 4
            }
            this.$api.common.getDimension(params).then(res => {
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
            if (!this.isIE()) {
                this.isCollapse = value;
            }
        },
        init() {
            if (!this.is1521Sys) return;
            //只在1521系统时请求
            let params = {
                userId: this.userObj.userId,
                userName: this.userObj.username,
                fullName: this.userObj.name,
                // systemId: "49",//系统id
                // systemName: "管理驾驶舱",
                // menuId: "53",
                // menuName: "1521总览",
                proType: 4
            }
            this.$api.common.getUpdateData(params).then(res => {
                if (res.Date) {
                    this.updateTime = res.Date;
                } else {
                    this.updateTime = '';
                }

                this.getSelectPermission();

            })
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
                userCode: this.userCode,
                userId: this.userObj.userId,
                userName: this.userObj.username,
                fullName: this.userObj.name,
                systemId: "49",//系统id
                systemName: "管理驾驶舱",
                menuId: "53",
                menuName: "1521总览",
                proType: 4
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
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
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
.container {
    position: relative;

    & .el-header {
        position: relative;
        top: 0;
        left: 0;
        z-index: 3000
    }
}

.el-breadcrumb {
    margin-bottom: 20px;
}

.el-main {
    overflow-x: hidden;
}

.openMenu {
    margin-left: 64px;
    position: relative;
}

.closeMenu {
    margin-left: 220px;
    position: relative;
}
</style>
<style lang="less">
.sidebar-container {
    position: fixed;
    top: 60px;
    left: 0px;
    z-index: 11;
    overflow: auto;
    height: 100%;
}
/*左侧菜单的滚动条*/
.siderbarnew::-webkit-scrollbar {/*滚动条整体样式*/
    width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.siderbarnew::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
    background: #dcedfa;
}
.siderbarnew::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
    background: #EDEDED;
}
/*左侧菜单的滚动条*/
.siderbarClose::-webkit-scrollbar {/*滚动条整体样式*/
    width: 7px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
}
.siderbarClose::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
    background: #dcedfa;
}
.siderbarClose::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
    border-radius: 10px;
    background: #EDEDED;
}
.scrollbar{
    width: 90%;
    height: 50%;
    margin: 0 auto;
}
.el-container {
    .el-scrollbar__wrap {
        overflow-x: hidden;
        overflow-y: auto;
    }

    .el-scrollbar__bar.is-horizontal {
        display: none;
    }
}
</style>