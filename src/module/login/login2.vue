<template>
    <div class="login-background">
        <div class="login-box">
            <el-form label-position="right" :model="formLogin" :rules="loginRules" ref="loginForm">
                <h1 class="login-title">汉能大数据分析平台
                <h5>请使用员工OA账号登录</h5>
            </h1>
                <el-form-item prop="username">
                    <el-input maxlength="50" v-model.trim="formLogin.username" placeholder="账号/邮箱前缀"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input maxlength="50" type="password" @keyup.enter.native="loginButton()" onpaste="return false" v-model.trim="formLogin.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="btn-item">
                    <el-button type="primary" @click="loginButton()">登&nbsp;&nbsp;录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="footer-container">
            <p>请使用IE浏览器11.0以上版本，360浏览器10.0以上版本，火狐浏览器，谷歌浏览器</p>
            <p>Copyright ©汉能控股集团有限公司</p>
        </div>
    </div>
</template>
<script>
import { _setTitle, getQueryStringHr, sessionId, _sessionStorage, calcuMD5 } from '../../assets/js/util';

import {compressToEncodedURIComponent} from 'lz-string';

export default {
    data() {
        var regularPwd = /^(?![0-9]+$)[0-9A-Za-z]{6,14}$/; // 密码验证规则，由字母或字母和数字组合
        var validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {

                callback();
            }
        };
        var validatePwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {

                callback();
            }
        };
        return {
            formLogin: {
                username: '', // 用户名
                password: '', // 密码
            }, // 登录form值
            loginRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: validatePwd, trigger: 'blur' }
                ],
            }, // 登录校验
        }
    },
    mounted() {
        this.init();
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
        allMenu:{
            get() {
              return this.$store.state.common.allMenu;
            },
            set(val) {
                this.$store.commit('setAllMenuData', val);
            }
        },
        sysTitle: {
            get() {
                return this.$store.state.common.sysTitle;
            },
            set(val) {
                this.$store.commit('setSysTitle', val);
            }
        }
    },
    methods: {
        init() {
            if (this.$route.name == 'login') {
                _setTitle('登录');
            }
            this.clearForm();
        },
        loginButton() {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    // console.log(this.formLogin.password, calcuMD5(this.formLogin.password));
                    this.loginAjax();
                } else {
                    return false;
                }
            });
        }, // 点击登录
        loginAjax() {
            let param = {
                jobNumber: this.formLogin.username,
                password: compressToEncodedURIComponent(this.formLogin.password),
                corpCode: 'Hanergy',
                menuId: 48
            };
            this.$api.common.login(param).then(res => {
                if (res.status == 0) {
                    this.$store.commit('setUser', res.user);
                    this.sysTitle = res.data[0].menus[0].name;
                    this.menuData = res.data[0].menus[0].list;
                    this.allMenu = res.data[0].menus;

                    _sessionStorage("loggeduser", JSON.stringify(res.user));
                    _sessionStorage("menuData", JSON.stringify(this.menuData));
                    _sessionStorage("allMenu", JSON.stringify(this.allMenu));
                    _sessionStorage("sysTitle", this.sysTitle);

                    let firstPage = 'canteenOrder',firstName='',defaultMenuId='';
                    if(this.menuData.length > 0 && this.menuData[0].list.length > 0) {
                        firstPage = this.menuData[0].list[0].url;
                        firstName = this.menuData[0].list[0].name;
                        defaultMenuId = this.menuData[0].list[0].menuId;
                    }
                    this.$store.commit('setBreadcrumbMenu', [this.menuData[0].name||'', firstName]);
                    this.$store.commit('setActiveMenuId', defaultMenuId);

                    if(firstPage.indexOf('tab')>=0) {
                        this.$router.push({
                            path: firstPage
                        });
                    } else {
                        this.$router.push({
                            name: firstPage
                        });
                    }
                    
                    this.clearForm();
                } else {
                    this.$message.error({
                        message: res.msg,
                        duration: 1000,
                        center: true
                    });
                }
            })

        }, // 登录ajax
        clearForm() {
            if (this.$refs['loginForm'])
                this.$refs['loginForm'].resetFields();
        } // 表单重置
    }
}
</script>
<style lang="less" scoped>
.login-background {
    height: 100%;
    background: url("../../assets/img/bg.jpg") repeat-x;
    background-size: 100% 100%; //只支持IE9+
    -webkit-background-size: 100% 100%; //webkit核心
    -moz-background-size: 100% 100%; //FF核心
    -o-background-size: 100% 100%; //应该是Opera核心吧，反正不是IE的，就先不管它了
    position: relative;
    overflow: auto;
    padding: 15.6% 16.3% 17.3% 20.2%;

    .login-box {
        z-index: 9;
        position: absolute;
        /*top: 169px;*/
        /*left: 387px;*/
        top: 9.6%;
        bottom: 17.3%;
        left: 60.2%;
        right: 51.4%;
        width: 440px;
        height: 480px;
        /*width: 29.6%;*/
        /*height: 67.6%;*/
        background: white;
        box-shadow: 0 12px 22px 0 rgba(26, 112, 192, 0.17);
        border-radius: 25px;
        text-align: center;
        /*padding: 125px 104px 89px;*/
        padding: 85px 84px 0px;

        .login-title {
            font-size: 30px;
            /*font-size: 5.2%;*/
            color: #232F49;
            margin-bottom: 73px;
            text-align: right;

            h5 {
                font-size: 16px;
                color: #575757;
                padding-top: 20px;
            }
        }

        .el-form-item {
            margin-bottom: 30px;

            .el-input {
                margin-left:10px;
            }
        }

        .code-input {
            width: 252px;
        }

        .code-img {
            width: 134px;
            height: 54px;
            margin-left: 10px;
        }

        .login-tips {
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #9DAFB9;
            letter-spacing: 0;

            .tips-txt {
                color: #009FFF;
            }
        }

        .foot-tips {
            font-family: PingFangSC-Regular;
            font-size: 16px;
            color: #6699FF;
            margin-top: 63px;
        }
    }

    .footer-container {
        position: absolute;
        bottom: 30px;
        text-align:center;
            width: 100%;
    left: 0;
        p {
            color:#a3b2b9;
            font-size:14px;
        }
    }
}
</style>
<style lang="less">
.login-box {
    .el-form-item__error {
        background: url("../../assets/img/redTips.png") no-repeat 2px 4px;
        background-size: 14px;
        margin-left:10px;
        padding-left: 24px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #FB6041;
        letter-spacing: 0;
    }

    .el-form-item__content {
        /*width: 360px;*/
        width: 100%;
        height: 36px;
        /*width: 18.8%;*/
    }

    .el-form-item__label {
        color: #fff;
    }

    .el-input__inner {
        width: 100%;
        height: 36px;
    }

    .code-input {}

    .btn-item {
        margin-top: 25px;
        height: 54px;

        .el-form-item__content {
            margin-left: 0 !important;
            width: 100%;
            height: 100%;

            .el-button {
                width: 100%;
                height: 100%;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #FFFFFF;
                text-align: center;
                line-height: 14px;
                background-color: #5856ba;
                border-color: #5856ba;
                margin-left:10px;

                &:hover,&:focus {
                    background-color: #7573d8;
                    border-color: #7573d8;
                }
            }
        }
    }

    .code-input {
        input {
            width: 100%;
        }
    }
}
</style>