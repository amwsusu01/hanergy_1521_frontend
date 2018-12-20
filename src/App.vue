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
.el-main {
    // padding-left: 40px !important;
}

.el-form-item__content {
    width: 255px !important;

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
                    max-width: 110px !important;
                    width: 110px;
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
        color: #76A4C9 !important;
        line-height: 20px;
        font-weight: normal;

        span {
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #76A4C9 !important;
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
    padding: 13px 40px 13px 30px !important;
    background: #cf5246;
    height: 60px !important;
    line-height: 36px;
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

    .el-menu-item,
    .el-submenu__title {
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #7FA3C6;
        padding: 0 20px;

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

.contain.el-form {
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