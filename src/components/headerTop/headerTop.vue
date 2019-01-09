<template>
    <div class="header-box">
        <div class="tags-breadcrumb"  @click="showCollapse()" style="cursor: pointer">
            <i class="iconfont icon-caidan"></i>
        </div>
        <div class="header-logo"><img :src="logoUrl" /></div>
        <div class="header-marginTitle">
            <div :class="{'header-title':true,'active':activeIndex==index}" v-for="(tl,index) in title" @click="switchMenu(index)" >
                <!--  <img :src="baobiao" style="margin-top: -11px; width: 40px;" class="home-icon"></img>
                  <i class="iconfont icon-baobiao"></i> //可以用~~~-->
                <div class="home-title">{{tl}}</div>
                <div :class="{'active-line':activeIndex==index}"></div>
            </div>
        </div>

        <div class="positionRight">
             <span class="header-img">
            <img src="../../assets/img/userIcon.png" />
        </span>
            <span class="header-user">您好，{{user.name}}</span>
            <span class="header-oblique-line">/</span>
            <span class="header-quit" @click="quit()">退出</span>
        </div>
    </div>
</template>
<script>
import logo from '../../assets/img/logo.png';
import baobiao from '../../assets/img/baobiao.png';

export default {
    name: "headerTop",
    data() {
        return {
            subtitle: '',
            response: false,
            sidebar: {
                childValue: true,
                systemValue: false
            },
        }
    },
    activated() {
        this.init();
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (!this.user.name) {
                this.$message({
                    message: '未登录，3s后返回登录页',
                    type: 'error'
                });
                let _this = this;
                setTimeout(function() {
                    _this.$store.commit('setUser', null);
                    sessionStorage.removeItem('loggeduser');
                    _this.$router.push({
                        'name': 'login',
                    });
                }, 3000);
            }
        },
        switchMenu(index) {
            this.$emit('switchMenu',index)
        },
        showCollapse(){
            this.$emit('showCollapse') //点击菜单展开收起
        },
        quit() {
            let _this = this;
            this.$confirm('确定退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                if(_this.$store)
                _this.$store.commit('setUser', null);
                sessionStorage.removeItem('loggeduser');
                _this.$router.push({
                    'name': 'login',
                });
            }).catch(() => {});
        }, // 退出
        childClick() {
            // this.sidebar.childValue = true;
            // this.sidebar.systemValue = false;
            // this.$emit('switchMenu',this.sidebar);
        },
        systemClick() {
            // this.sidebar.childValue = false;
            // this.sidebar.systemValue = true;
            // this.$emit('switchMenu',this.sidebar);
        }
    },
    computed: {
        logoUrl: {
            get() { return logo; }
        },
        user: {
            get() {
                return this.$store.state.common.user || {};
            }
        },
        baobiao: {
            get() { return baobiao; }
        }
    },
    props: {
        title: Array,
        activeIndex:Number
    }
    /* watch:{
         '$route' (to, from) {
             _sessionStorage("childValue", true)
             _sessionStorage("systemValue", false)
             console.log(this.systemValue , "tryei]qj")
         }
     },*/
}
</script>
<style lang="less" scoped>
.header-box {
    color: #ffffff;
    display: inline-block;

    .header-logo {        
        margin-right: 15px;
        display: inline-block;
        position: absolute;
        top:0;
        left: 92px;
        margin-right: 170px;
        & img {
            margin-top: 15px;
        }
    }
    .tags-breadcrumb {
        position: absolute;
        top: -3px;
        left: 0px;
        background-color: #de2525;
        text-align: center;
        width: 63px;
    }
    .tags-breadcrumb .tag-collapse_right {
        transform: rotate(90deg);
    }
    .header-marginTitle{
        margin-left: 200px;
        display: inline-block;
    }
    /deep/ .header-title {
        cursor: pointer;
        font-family: FZZZHONGJW--GB1-0;
        font-size: 16px;
        color: #FFFFFF;
        padding:0 31px;
        text-align: center;
        display: inline-block;
        &:hover,&.active {

        }
        .active-line{
            margin: -7px auto;
            width: 30px;
            border-bottom: 2px solid #ffffff;
        }
    }
    /deep/ .el-submenu__title {
        text-align: center;
        margin-left: -20px;
    }
    .positionRight{
        display: inline-block;
        position: absolute;
        top: 0;
        right: 64px;
    }
    .header-line {
        height: 20px;
        width: 2px;
        background: #ffffff;
        margin: 8px 10px;
        opacity: 0.4;
    }

    .header-subtitle {
        font-family: FZZZHONGJW--GB1-0;
        font-size: 24px;
        color: #FFFFFF;
        line-height: 60px;
    }

    .header-img {
        img {
            width: 36px;
            height: 36px;
            line-height: 36px;
            margin-right: 20px;
            position: absolute;
            top: 11px;
            right: 155px;
        }
    }

    .header-user {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;
    }

    .header-oblique-line {
        transform: rotate(36deg);
        -o-transform: rotate(36deg);
        -moz-transform: rotate(36deg);
        -webkit-transform: rotate(36deg);
        margin: 23px 14px;
        opacity: 0.4;
        line-height: 60px;
    }

    .header-quit {
        cursor: pointer;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FFFFFF;

        &:hover {
            /*color: #3a8ee6;*/
        }
    }

    .header-update {
        cursor: pointer;
        margin-right: 20px;

        &:hover {
            color: #3a8ee6;
        }
    }
}
</style>