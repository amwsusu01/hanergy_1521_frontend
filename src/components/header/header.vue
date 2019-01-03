<template>
    <div class="clearfix header-box">
        <div class="header-logo fl"><img :src="logoUrl" /></div>
        <div :class="{'header-title':true, 'fl':true,'active':activeIndex==index}" v-for="(tl,index) in title" @click="switchMenu(index)" >
           <!--  <img :src="baobiao" style="margin-top: -11px; width: 40px;" class="home-icon"></img>
             <i class="iconfont icon-baobiao"></i> //可以用~~~-->
            <span class="home-title" style="display: block;" >{{tl}}</span>
        </div>
        <div class="header-subtitle fl">{{subtitle}}</div>
        <div class="header-quit fr" @click="quit()">退出</div>
        <div class="header-oblique-line fr"></div>
        <div class="header-user fr">您好，{{user.name}}</div>
        <div class="header-img fr">
            <img src="../../assets/img/userIcon.png" />
        </div>
    </div>
</template>
<script>
import logo from '../../assets/img/logo.png';
import baobiao from '../../assets/img/baobiao.png';

export default {
    name: "header",
    data() {
        return {
            subtitle: '',
            response: false,
            sidebar: {
                childValue: true,
                systemValue: false
            }
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

    .header-logo {        
        margin-right: 15px;
        & img {
            margin-top: 15px;
        }
    }

    /deep/ .header-title {
        cursor: pointer;
        font-family: FZZZHONGJW--GB1-0;
        font-size: 16px;
        color: #FFFFFF;
        padding:0 31px;
        text-align: center;

        &:hover,&.active {
            background:#de2525;
        }
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
        width: 36px;
        height: 36px;
        border-radius: 100%;
        margin-right: 20px;
        padding-top: 13px;

        img {
            border-radius: 100%;
            width: 100%;
            height: auto;

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
        background: #FFFFFF;
        height: 16px;
        width: 2px;
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