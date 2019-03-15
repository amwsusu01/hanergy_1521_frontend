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
                    <el-input maxlength="50" type="password" @keyup.enter.native="loginButton()" onpaste="return false"
                              v-model.trim="formLogin.password" placeholder="请输入密码"></el-input>
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
    import {
        _setTitle,
        getQueryStringHr,
        sessionId,
        _sessionStorage,
        LocalStorage,
        calcuMD5
    } from '../../assets/js/util';

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
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {validator: validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: validatePwd, trigger: 'blur'}
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
            allMenu: {
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
            },
            userObj: {
                get() {
                    var user = this.$store.state.common.user;
                    if (!user) {
                        user = _sessionStorage("loggeduser");
                    }
                    return user;
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
                    menuId: 48,
                    userId: this.userObj.userId,
                    userName: this.userObj.username,
                    fullName: this.userObj.name
                };
                this.$api.common.login(param).then(res => {
                    if (res.status == 0) {
                        this.$store.commit('setUser', res.user);
                        let data = res.data;
                        //let data={"data":[{"roleId":14,"roleName":"BigdataPlatform_1521监察部","remark":"","createUserId":1,"menuIdList":null,"createTime":"2018-12-18 16:35:33","menus":[{"menuId":49,"parentId":48,"parentName":null,"name":"管理驾驶舱","url":"https://36kr.com/","perms":"","type":0,"icon":"oss","orderNum":1,"open":null,"list":[{"menuId":52,"parentId":49,"parentName":null,"name":"1521日志分析","url":"https://36kr.com/","perms":"","type":0,"icon":"iconfont icon-jichuguanli","orderNum":1,"open":null,"list":[{"menuId":53,"parentId":52,"parentName":null,"name":"1521总览","url":"canteenOrder","perms":"","type":1,"icon":"tubiao","orderNum":0,"open":null,"list":[{"menuId":64,"parentId":53,"parentName":null,"name":"超过4次(含)未请假未提报统计报表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":65,"parentId":53,"parentName":null,"name":"提报内容一样/当天重复条数超过6条(含)/一个月累计出现超过6次(含)_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":66,"parentId":53,"parentName":null,"name":"提报月平均条数小于5_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":67,"parentId":53,"parentName":null,"name":"提报月平均字数小于5_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":68,"parentId":53,"parentName":null,"name":"9点之前提报统计报表/一个月累计出现3次(含)_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":69,"parentId":53,"parentName":null,"name":"12点之前提报统计报表/一个月累计出现3次(含)_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null},{"menuId":54,"parentId":52,"parentName":null,"name":"1521明细","url":"canteenHistoryOrder","perms":"","type":1,"icon":"tubiao","orderNum":2,"open":null,"list":[{"menuId":70,"parentId":54,"parentName":null,"name":"超过4次(含)未请假未提报统计报表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":71,"parentId":54,"parentName":null,"name":"提拔月平均条数小于5明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":72,"parentId":54,"parentName":null,"name":"提拔月平均字数小于5明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":73,"parentId":54,"parentName":null,"name":"9点之前提报数据明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":74,"parentId":54,"parentName":null,"name":"12点之前提报数据明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":75,"parentId":54,"parentName":null,"name":"提报内容重复超6次(含)汇总表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null},{"menuId":76,"parentId":54,"parentName":null,"name":"提报内容重复超6次(含)明细表_导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null},{"menuId":55,"parentId":52,"parentName":null,"name":"部门热词","url":"canteenReceiverOrder","perms":"","type":1,"icon":"oss","orderNum":3,"open":null,"list":[{"menuId":77,"parentId":55,"parentName":null,"name":"导出","url":"","perms":"","type":2,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null}],"children":null}],"children":null}]},{"roleId":22,"roleName":"BigdataPlatform_仓储管理人员","remark":"","createUserId":1,"menuIdList":null,"createTime":"2019-01-15 15:25:20","menus":[{"menuId":49,"parentId":48,"parentName":null,"name":"管理驾驶舱","url":"https://36kr.com/","perms":"","type":0,"icon":"oss","orderNum":1,"open":null,"list":[{"menuId":130,"parentId":49,"parentName":null,"name":"供应链仓储管理","url":"··","perms":"","type":0,"icon":"iconfont icon-kucunguanli","orderNum":8,"open":null,"list":[{"menuId":131,"parentId":130,"parentName":null,"name":"库存统计报表","url":"/tab?type=12","perms":"","type":1,"icon":"","orderNum":1,"open":null,"list":[],"children":null}],"children":null}],"children":null}]},{"roleId":24,"roleName":"BigdataPlatform_质量分析","remark":"","createUserId":1,"menuIdList":null,"createTime":"2019-01-18 09:48:55","menus":[{"menuId":49,"parentId":48,"parentName":null,"name":"管理驾驶舱","url":"https://36kr.com/","perms":"","type":0,"icon":"oss","orderNum":1,"open":null,"list":[{"menuId":134,"parentId":49,"parentName":null,"name":"发现问题解决问题","url":"","perms":"","type":0,"icon":"iconfont icon-faxian","orderNum":11,"open":null,"list":[{"menuId":135,"parentId":134,"parentName":null,"name":"问题提出和解决流程统计","url":"problem","perms":"","type":1,"icon":"","orderNum":0,"open":null,"list":[],"children":null}],"children":null},{"menuId":142,"parentId":49,"parentName":null,"name":"质量分析管理","url":"","perms":"","type":0,"icon":"iconfont icon-zhiliang","orderNum":12,"open":null,"list":[{"menuId":143,"parentId":142,"parentName":null,"name":"质量管理驾驶舱","url":"/tab?type=13","perms":"","type":1,"icon":"","orderNum":1,"open":null,"list":[],"children":null},{"menuId":144,"parentId":142,"parentName":null,"name":"质量成本与效率管理驾驶舱","url":"/tab?type=14","perms":"","type":1,"icon":"","orderNum":2,"open":null,"list":[],"children":null}],"children":null}],"children":null}]}]}.data;
                        let allMenus = [];
                        let sysId=[],
                            secMenuId=[],
                            thiMenuId = [];
                        let SysMenus=[],
                            secMenus=[],
                            thiMenus = [];
                        if (data.length > 0) {
                            for (var i = 0; i < data.length; i++) {
                                let menus = data[i].menus;
                                if (menus.length > 0) {
                                    if (i == 0) {
                                        allMenus = menus;
                                    } else {
                                        if (i==1){
                                            for (var j = 0; j < allMenus.length; j++) {
                                                sysId.push(allMenus[j].menuId);
                                                secMenus = allMenus[j].list;
                                                for (var k = 0; k < secMenus.length; k++) {
                                                    secMenuId.push(secMenus[k].menuId);
                                                    thiMenus = secMenus[k].list;
                                                    for (var a = 0; a < thiMenus.length; a++) {
                                                        thiMenuId.push(thiMenus[a].menuId);
                                                    }
                                                }
                                            }
                                        }

                                        for (var  b= 0; b < menus.length; b++) {
                                            if (sysId.indexOf(menus[b].menuId) == -1) {
                                                allMenus.push(menus);//添加系统菜单
                                            } else {
                                                secMenus = menus[b].list;
                                                for (var c = 0; c < allMenus.length; c++) {
                                                    for (var d = 0; d < secMenus.length; d++) {
                                                        if (secMenuId.indexOf(secMenus[d].menuId) == -1){
                                                            if (allMenus[c].menuId == secMenus[d].parentId){
                                                                allMenus[c].list.push(secMenus[d]);//添加二级菜单
                                                            }
                                                        } else {
                                                             thiMenus=secMenus[d].list;
                                                             for (var e=0;e<thiMenus.length;e++){
                                                                 if(thiMenuId.indexOf(thiMenus[e].menuId==-1)){
                                                                     for (var f=0;f<allMenus[c].list.length;f++){
                                                                         if (thiMenus[e].parentId==allMenus[c].list[f].menuId){
                                                                             allMenus[c].list[f].list.push(thiMenus[e]);
                                                                         }
                                                                     }
                                                                 }
                                                             }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        this.sysTitle = res.data[0].menus[0].name;//系统标题
                        this.menuData = res.data[0].menus[0].list;//系统二级三级菜单
                        this.allMenu = allMenus;//系统一二三级菜单
                        LocalStorage("loggeduser", JSON.stringify(res.user));
                        LocalStorage("menuData", JSON.stringify(this.menuData));
                        LocalStorage("allMenu", JSON.stringify(this.allMenu));
                        LocalStorage("sysTitle", this.sysTitle);
                        _sessionStorage("loggeduser", res.user);

                        let firstPage = 'canteenOrder', firstName = '', defaultMenuId = '';
                        if (this.menuData.length > 0 && this.menuData[0].list.length > 0) {
                            firstPage = this.menuData[0].list[0].url;
                            firstName = this.menuData[0].list[0].name;
                            defaultMenuId = this.menuData[0].list[0].menuId;
                        }
                        this.$store.commit('setBreadcrumbMenu', [this.menuData[0].name || '', firstName]);
                        this.$store.commit('setActiveMenuId', defaultMenuId);

                        if (firstPage.indexOf('tab') >= 0) {
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
        background-size: 100% 100%;
    // 只支持IE9 + -webkit-background-size: 100 % 100 %;
    // webkit核心 -moz-background-size: 100 % 100 %;
    // FF核心 -o-background-size: 100 % 100 %;
    // 应该是Opera核心吧，反正不是IE的，就先不管它了 position: relative;
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
        margin-left: 10px;
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
        text-align: center;
        width: 100%;
        left: 0;

    p {
        color: #a3b2b9;
        font-size: 14px;
    }

    }
    }
</style>
<style lang="less">
    .login-box {

    .el-form-item__error {
        background: url("../../assets/img/redTips.png") no-repeat 2px 4px;
        background-size: 14px;
        margin-left: 10px;
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

    .code-input {
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
        font-size: 16px;
        color: #FFFFFF;
        text-align: center;
        line-height: 14px;
        background-color: #5856ba;
        border-color: #5856ba;
        margin-left: 10px;

    &
    :hover,

    &
    :focus {
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