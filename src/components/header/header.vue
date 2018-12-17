<template>
    <div class="clearfix header-box" v-if="response">
        <div class="header-logo fl"><img :src="logoUrl"></img></div>
        <div class="header-title fl" @click="childClick">{{title}}</div>
        <div class="header-subtitle fl">{{subtitle}}</div>
        <div class="header-quit fr" @click="quit()">退出</div>
        <div class="header-oblique-line fr"></div>
        <div class="header-user fr">您好，{{user.name}}</div>
        <div class="header-img fr">
            <img src="../../assets/img/userIcon.png">
        </div>
        </div>
</template>
<script>
import { _sessionStorage } from '../../assets/js/util';
import logo from '../../assets/img/logo.png';

export default {
    name: "header",
    data() {
        return {
            subtitle: '',
            response: false,
            //user: 'admin',
            sidebar: {
                childValue: true,
                systemValue: false
            }
        }
    },
    activated() {
        this.init()
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let type = _sessionStorage('type'); // 0管理员 1采购端 2供应商端
            this.subtitle = type == 1 ? '采购端' : type == 2 ? '供应商端' : '';
            this.user = _sessionStorage('user');
            this.response = true;
            this.$forceUpdate();
            this.sidebar = _sessionStorage('sidebar');
        },
        quit() {
            this.$confirm('确定退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.commit('setUser', null);
                this.$router.push({
                    'name': 'login',
                });
                // let param={
                //     id :  _sessionStorage('userId')
                // }
                // this.$api.common.logout(param).then(res => {
                //     if (res.data.code == 0) {

                //     } else {
                //         this.$message.error({
                //             message: res.data.message,
                //             duration: 1000,
                //             center: true
                //         });
                //         this.$router.push({
                //             'name': 'login',
                //         });
                //     }
                // })
            }).catch(() => {
                // this.$message({
                //     type: 'info',
                //     message: '已取消退出'
                // });
            });
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
        }
    },
    props: {
        title: String
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
        margin-top: 7px;
        margin-right: 15px;
    }

    .header-title {
        cursor: pointer;
        font-family: FZZZHONGJW--GB1-0;
        font-size: 18px;
        color: #FFFFFF;
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
    }

    .header-img {
        width: 36px;
        height: 36px;
        border-radius: 100%;
        margin-right: 20px;

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
        margin: 10px 14px;
        opacity: 0.4;
        background: #FFFFFF;
        height: 16px;
        width: 2px;
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