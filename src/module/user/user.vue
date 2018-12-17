<template>
    <el-container>
        <el-header>
            <Header></Header>
        </el-header>
        <el-container>
            <!--<el-aside>
                <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                    <el-radio-button :label="false">展开</el-radio-button>
                    <el-radio-button :label="true">收起</el-radio-button>
                </el-radio-group>
                <el-menu :default-active="leftDefauleActive" class="el-menu-vertical-demo" @open="openMenu" unique-opened="true" :collapse="isCollapse">
                    <el-submenu index="1" v-if="childValue==true">
                        <template slot="title">
                            <img src="../../assets/img/orderIcon.png">
                            <span slot="title">1521报表</span>
                        </template>
                        <el-menu-item index="1-1" @click="goPage('1521数据汇总统计')"> 1521数据汇总统计</el-menu-item>
                        <el-menu-item index="1-2" @click="goPage('1521明细统计')"> 1521明细统计</el-menu-item>
                        <el-menu-item index="1-3" @click="goPage('部门热词')"> 部门热词</el-menu-item>
                        <el-menu-item index="1-4" @click="goPage('1521问题和反省明细')"> 1521问题和反省明细</el-menu-item>
                        <el-menu-item index="1-5" @click="goPage('离职人员汇总统计')"> 离职人员汇总统计</el-menu-item>
                        <el-menu-item index="1-6" @click="goPage('离职人员明细统计')"> 离职人员明细统计</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2" v-if="systemValue==true">
                        <template slot="title">
                            <img src="../../assets/img/orderIcon.png">
                            <span slot="title">系统管理</span>
                        </template>
                        <el-menu index="2-1" @click="goPage2('系统管理')">
                            <template slot="title">系统管理</template>
                            <el-menu-item index="2-1-1">用户管理</el-menu-item>
                            </el-menu>
                        <el-menu index="2-2" @click="goPage2('系统安全')">
                            <template slot="title">系统安全</template>
                            <el-menu-item index="2-2-1">用户操作记录</el-menu-item>用户操作记录</el-menu>
                    </el-submenu>
                </el-menu>
            </el-aside>-->
            <div class="sidebar-container" :class="{'is-active':isCollapse}">
                <logo :isCollapse="isCollapse"></logo>
                <el-menu unique-opened :default-active="nowTagValue" class="el-menu-vertical-demo" mode="vertical" :show-timeout="200" background-color="#00142a" text-color="hsla(0,0%,100%,.65)" active-text-color="#409eff" :collapse="isCollapse">
                    <sidebar-item :menu="menu" :isCollapse="isCollapse"></sidebar-item>
                </el-menu>
            </div>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
    import '../../assets/css/reset.css'
    import '../../assets/css/common.css'
    import {_setTitle, getQueryStringHr, sessionId, _sessionStorage, calcuMD5} from '../../assets/js/util'
    import Header from '../../components/header/header'

    export default {
        name: 'canteenHome',
        components: {
            Header
        },
        data() {
            return {
                leftDefauleActive: '1-1', // 左侧菜单默认展开哪个
                isCollapse: true,
            };
        },
        computed:{

        },
            mounted() {
            this.init();
        },
        watch:{
            '$route' (to, from) {
                // this.showActive(this.$route.name);
            }
        },
        methods: {
            init() {
                _setTitle('1521报表');
                this.getSidebarList();
            },
        //调用菜单接口
        getSidebarList() {
        let param = {    // corpCode=Hanergy&user=12345678901&password=123456&menuId=48
            corpCode: 'Hanergy',
            user: '',//用户名
            password: '',//密码
            menuId: '48',
        };
        this.$api.common.sidebar(param).then(res => {
            console.log(res,"sidebar")
            if (res.status == 0) {
                _sessionStorage('type', res.data.type); // 0管理员 1采购端 2供应商端
                _sessionStorage('user', res.data.name);
                // console.log(res.data.type)
                if (res.data.type == 1) { // 1521
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
                }
            }else {
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

</style>