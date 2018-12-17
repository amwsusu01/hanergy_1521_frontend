<template>
    <div class="login-background">
        <div class="login-box">
            <el-form label-position="right" :model="formLogin" :rules="loginRules" ref="loginForm">
                <h1 class="login-title">汉能数据中心分析平台</h1>
                <el-form-item  prop="username">
                    <el-input maxlength="11" v-model.trim="formLogin.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input maxlength="14" type="password" @keyup.enter.native="loginButton()"
                              onpaste="return false" v-model.trim="formLogin.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item class="btn-item">
                    <el-button type="primary" @click="loginButton()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import {_setTitle, getQueryStringHr, sessionId, _sessionStorage, calcuMD5} from '../../assets/js/util'

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
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {validator: validatePwd, trigger: 'blur'}
                    ],
                }, // 登录校验
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                if (this.$route.name == 'login') {
                    _setTitle('1521系统');
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
                    account: this.formLogin.username,
                    password: this.formLogin.password,
                };
                this.$api.common.login(param).then(res => {
                    if (res.meta.code == 0) {
                        _sessionStorage('type', res.data.type); // 0管理员 1采购端 2供应商端
                        _sessionStorage('user', res.data.name);
                        _sessionStorage('contact', res.data.contact); // 默认收货人
                        _sessionStorage('contactPhone', res.data.contactPhone); // 默认收货人电话
                        _sessionStorage('defaultAddressName', res.data.defaultAddressName); // 小食堂地址
                        _sessionStorage('defaultCanteenName', res.data.defaultCanteenName); // 小食堂地址a区
                        _sessionStorage('userId', res.data.id);
                        _sessionStorage('sessionId',res.data.sessionId);
                        _sessionStorage('specifications',res.data.specifications + ""); // 0大食堂 1小食堂
                        // console.log(res.data.type)
                        if (res.data.type == 1) { // 采购端
                            this.$router.push({
                                path: '/canteenHome',
                            })
                        } else if (res.data.type == 2) { // 供应商端
                            this.$router.push({
                                path: '/supplierHome',
                            })
                        } else {
                            this.$router.push({
                                path: '/user',
                            })
                            console.log(res.data.type)
                        }
                        // setTimeout(()=>{
                        //     this.clearForm()
                        // },0)
                    }else {
                        this.$message.error({
                            message: res.meta.message,
                            duration: 1000,
                            center: true
                        });
                    }
                })

            }, // 登录ajax
            clearForm(){
                this.$refs['loginForm'].resetFields();
            } // 表单重置
        }
    }
</script>
<style lang="less" scoped>
    .login-background {
        height: 100%;
        background: url("../../assets/img/loginPopBg.png") repeat-x;
        background-size: cover;  //只支持IE9+
        -webkit-background-size: cover; //webkit核心
        -moz-background-size: cover; //FF核心
        -o-background-size: cover; //应该是Opera核心吧，反正不是IE的，就先不管它了
        position: relative;
        overflow: auto;
        padding: 15.6% 16.3% 17.3% 20.2%;
        .login-box ,.login-dialog {
            z-index: 9;
            position: absolute;
            /*top: 169px;*/
            /*left: 387px;*/
            top: 15.6%;
            bottom: 17.3%;
            left: 60.2%;
            right: 51.4%;
            width: 428px;
            height: 550px;
            /*width: 29.6%;*/
            /*height: 67.6%;*/
            background: #E8F1FC;
            box-shadow: 0 12px 22px 0 rgba(26,112,192,0.17);
            border-radius: 25px;
            text-align: center;
            /*padding: 125px 104px 89px;*/
            padding: 125px 84px 89px;
            .login-title {
                font-family: FZZZHONGJW--GB1-0;
                font-size: 26px;
                /*font-size: 5.2%;*/
                color: #232F49;
                margin-bottom: 73px;
            }
            .el-form-item {
                margin-bottom: 30px;
            }
            .code-input {
                /*width: 216px;*/
                width: 252px;
            }
            .code-img {
                width: 134px;
                height: 54px;
                margin-left: 10px;
            }
            .login-tips{
                font-family: PingFangSC-Regular;
                font-size: 18px;
                color: #9DAFB9;
                letter-spacing: 0;
                .tips-txt{
                    color: #009FFF;
                }
            }
            .foot-tips{
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #6699FF;
                margin-top: 63px;
            }
        }
        .login-dialog{
            .dialog-title{
                font-family: PingFangSC-Medium;
                font-size: 24px;
                color: #365474;
                letter-spacing: 0;
                text-align: center;
                line-height: 24px;
                margin-bottom: 38px;
            }
            .dialog-cont{
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #527AA0;
                letter-spacing: 0;
                line-height: 30px;
                text-align: left;
                height: 376px;
                overflow: auto;
                p{
                    text-indent: 20px;
                }
            }
            .dialog-btn{
                margin-top: 38px;
                button{
                    border: 1px solid #009FFF;
                    box-shadow: 0 5px 14px 0 rgba(50,110,255,0.20);
                    border-radius: 2px;
                    color: #009FFF;
                }
            }
        }
        .login-pop{
            background: url("../../assets/img/loginPopBg.png") repeat-x;
            background-size: cover;  //只支持IE9+
            -webkit-background-size: cover; //webkit核心
            -moz-background-size: cover; //FF核心
            -o-background-size: cover; //应该是Opera核心吧，反正不是IE的，就先不管它了
            position: absolute;
            /*top: 251px;*/
            /*left: 822px;*/
            top: 23.2%;
            bottom: 22.9%;
            left: 42.8%;
            right: 16.3%;
            width: 807px;
            height: 588px;
            /*width: 42%;*/
            /*height: 54.4%;*/
            border-radius: 25px;
        }
    }
</style>
<style lang="less">
    .login-box {
        .el-form-item__error{
            background: url("../../assets/img/redTips.png") no-repeat 2px 4px;
            background-size: 14px;
            padding-left: 24px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FB6041;
            letter-spacing: 0;
        }
        .el-form-item__content {
            /*width: 360px;*/
            width: 100%;
            height: 54px;
            /*width: 18.8%;*/
        }
        .el-form-item__label {
            color: #fff;
        }
        .el-input__inner {
            /*width: 360px;*/
            width: 100%;
            height: 54px;
        }
        .code-input{

        }
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
                    font-size: 20px;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: 14px;
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