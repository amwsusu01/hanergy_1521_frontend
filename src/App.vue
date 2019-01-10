<template>
    <div id="app" style="height: 100%;">
        <keep-alive>
            <router-view v-if="$route.meta && $route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!($route.meta && $route.meta.keepAlive)"></router-view>
    </div>
    <!--<router-view></router-view>-->
</template>
<script>
import './assets/css/reset.css'
import './assets/css/common.css'
import "assets/js/jquery-2.0.3.min"

export default {
    name: 'app',
    data() {
        return {
            isCollapse: false
        };
    },
    methods: {}
}
</script>
<style lang="less">
@import "../static/font/iconfont.css";
#app{
    position: relative;
}
.el-message {
    min-width: 380px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: #ebeef5;
    position: fixed;
    left: 50%;
    top: 60px;
}
.el-main {
    // padding-left: 40px !important;
}
.header-title {
    cursor: pointer;
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
.el-form-item__content {
    width: 255px !important;
    position: relative;

    .line {
        text-align: center;
    }

    .el-select.el-select--mini {
        .el-input .el-input--mini .el-input--suffix {
            input {
                height: 20px !important;
            }
        }

        .el-tag.el-tag--info.el-tag--mini {
            float: left;

            &:first-child {
                margin-top: 5px;

                & .el-select__tags-text {
                    max-width: 80px !important;
                    width: 80px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: inline-block;
                }

                & .el-tag__close {
                    top: -5px !important;
                }
            }

            &:last-child {
                margin: 6px 0 2px 6px;
                display: inline-block;

                & .el-select__tags-text {}
            }
        }

        & .el-select__input.is-mini {
            max-width: 50px !important;
            width:50px;
        }
    }
}

.el-form-item.buttons {
    .el-form-item__content {
        width: 160px !important;
    }
}

.el-form--inline .el-form-item {
    margin-right: 0px !important;
}

.el-breadcrumb {
    padding-bottom: 20px;
    border-bottom: 1px solid #EFEFEF;

    .el-breadcrumb__item {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        color: #409EFF !important;
        line-height: 20px;
        font-weight: normal;

        span {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #409EFF !important;
            line-height: 20px;
            font-weight: normal;
        }
    }

    .el-breadcrumb__inner.is-link {
        color: #409EFF !important;

        span {
            color: #409EFF !important;
        }
    }
}

.clearfix:after {
    content: '';
    display: block;
    clear: both;
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.flex-box {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
}

.flex-1 {
    -webkit-flex: 1;
    -moz-flex: 1;
    -ms-flex: 1;
    -o-flex: 1;
    -khtml-flex: 1;
    flex: 1;
}

.limit-one {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
}

.limit-line(@line) {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: @line;
    overflow: hidden;
    text-overflow: ellipsis;
}

// 公共头部
.el-header {
    background: #cf5246;
    height: 60px !important;
    line-height: 60px;
        /*position: relative;*/
        /*z-index: 100;*/
}

.el-container {
    width: 100%;
    height: 100%;
}

// 左侧菜单
.el-aside {
    background: #F2F8FE;
    color: #333;
    position: relative;
    overflow: visible;
    padding-top: 26px;
    height: 100%;
    width: auto !important;

    .el-menu {
        background: #F2F8FE;
        border: none;
    }

    .el-submenu__title {
        text-align: center;
        margin-left: -20px;
        img {
            width: 22px;
            height: 22px;
            margin-right: 14px;
        }
    }

    .el-menu-item.is-active {
        background: #409EFF;
        border-radius: 1px;
        color: #FFFFFF;
    }

    .el-submenu__icon-arrow {
        margin-top: -1px;
    }
}

.el-main {
    background: #FFFFFF;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
}

.menu-wrapper .el-submenu__title>i {
    color: #909399;
    margin-left: 4px;
}
.el-submenu.is-active .el-submenu__title {
    color: #409EFF;
    border-bottom-color: #409EFF;
    i{
        color: #409EFF;
    }
}
// 暂无数据
.no-list {
    text-align: center;
    margin-top: 78px;
    padding-bottom: 30px;
    border-bottom: 1px solid #EAEDF1;

    .nolist-img {
        width: 120px;
        height: 120px;
        margin-bottom: 30px;
    }

    .nolist-txt {
        font-family: PingFangSC-Regular;
        font-size: 15px;
        color: #4A4A4A;
        letter-spacing: 0;
        text-align: center;
    }
}

// 分页
.page-box {
    text-align: right;
    margin-top: 30px;
    margin-bottom: 40px;
}

.cursor-pointer {
    cursor: pointer;
}

input[type=number] {
    -moz-appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.table-title {
    // font-size: 16px !important;
    color: #515e65;
}

.title-th {
    background: #6f8cf5 !important;
    color:white !important;
}

.contain.el-form {
    position: relative;
    .el-form-item {
        margin-bottom: 10px;
    }
}

.rightline {
    margin: 0px 25px 10px;
    font-size: 14px;
    text-align: right;
    margin-top: -59px;
    margin-bottom: 33px;
}
</style>