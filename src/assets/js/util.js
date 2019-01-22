//import Indicator from '../assets/component/loading/index';
//import ErrorPage from '../assets/component/errorPage/index'
//import Alert from '../assets/component/alert/index'
import appConfig from '../../app.config'
import md5 from 'js-md5'
import Vue from 'vue';

import {cloneDeep} from 'lodash';

/*export function deepCopy(source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key] === 'object' ? this.deepCopy(source[key]) : source[key];
    }

    return result;
}*/

/**
 * 设置页面标题
 * @wsparam name
 * @returns {null}
 */
export function _setTitle(title) {
    if (!title) return;
    document.title = title;
    try {
        setTitle(title);
    } catch (e) {

    }
}

/**
 * 获取url参数
 * @wsparam name
 * @returns {*}
 */
export function getQueryStringHr(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r === null) {
        var reg2 = /^.*[?]/;
        var r2 = window.location.hash.replace(reg2, "")
        r = r2.match(reg);
    }

    if (r != null) return decodeURI(decodeURI(r[2].replace(/%20/g, '%2B')));
    return null;
}

/**
 * 关闭toon
 */
export function closeWindow() {
    var params = {
        "functionType": 1
    };
    window.location.href = "toon://mwap/window?params=" + JSON.stringify(params);
}


/**
 * @description 设置\获取sessionId
 * @wsparam sessionId 可选。有参:设置sessionId,无参:获取sessionId
 * @returns {string}
 */
export function sessionId(sessionId) {
    if (sessionId) {
        sessionStorage.setItem("sessionId", sessionId);
    } else {
        return sessionStorage.getItem("sessionId") || '';
    }
}

export function sessionData(key, value) {
    if (value) {
        value = JSON.stringify(value);
        sessionStorage.setItem(key, value)
    } else {
        let value = sessionStorage.getItem(key);
        value = JSON.parse(value);
        // sessionStorage.removeItem(key)
        return value;
    }
}

/**
 * 限制输入字符长度
 * @param elm   元素
 * @param characterInterva  字符长度
 */
export function restrictedCharacter(elmID, characterInterva) {
    var input = document.getElementById(elmID);
    var str0 = input.value;
    //先判断浏览器是不是万恶的IE，没办法，写的东西也有IE使用者
    var bind_name = 'input';
    if (navigator.userAgent.indexOf("MSIE") != -1) {
        bind_name = 'propertychange';
    }
    $('#' + elmID).bind(bind_name, function() {
        // $('#'+elmID).text($(this).val());
        // console.log($(this).val());
        var str = input.value;
        if (str.lenB() > characterInterva) {
            input.value = str0;
        } else {
            str0 = str
        }
    })
}

/**
 * 自定义maxLength方法
 * @param elmID
 * @param characterInterva
 */
export function textareaMaxLength(elmID, characterInterva) {
    var input = document.getElementById(elmID);
    var str0 = input.value;
    //先判断浏览器是不是万恶的IE，没办法，写的东西也有IE使用者
    var bind_name = 'input';
    if (navigator.userAgent.indexOf("MSIE") != -1) {
        bind_name = 'propertychange';
    }
    $('#' + elmID).bind(bind_name, function() {
        // $('#'+elmID).text($(this).val());
        // console.log($(this).val());
        var str = input.value;
        if (str.length > characterInterva) {
            input.value = str0;
        } else {
            str0 = str
        }
    })
}

/**
 * 校验手机号码
 * @param str
 * @returns {boolean}
 */
export function checkPhoneNum(str) {
    return /(^1\d{10}$)|(^(0\d{2}(-)?)?\d{8}((-)?(\d{1,4}))?)$|(^(0\d{3}(-)?)?\d{7}((-)?(\d{1,4}))?)$|(^400(-)?(\d(-)?){6}\d$)/.test(str)
}

/**
 * 存储对象与字符串
 * @param item
 * @param value
 * @returns {string}
 */
export function _sessionStorage(item, value) {
    if (value == "") {
        sessionStorage.setItem(item, "");
    } else if (value && JSON.stringify(value) != "{}") {
        sessionStorage.setItem(item, JSON.stringify(value));
    } else {
        var val = sessionStorage.getItem(item);
        //sessionStorage.setItem(item, "");
        if (val) {
            return JSON.parse(val);
        } else {
            return '';
        }
    }
}
export function LocalStorage(item, value) {
    if (value == "") {
        localStorage.setItem(item, "");
    } else if (value && JSON.stringify(value) != "{}") {
        localStorage.setItem(item, JSON.stringify(value));
    } else {
        var val = localStorage.getItem(item);
        //sessionStorage.setItem(item, "");
        if (val) {
            return JSON.parse(val);
        } else {
            return '';
        }
    }
}

export function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}





/**
 * 判断两个对象是否相等
 * @param x
 * @param y
 * @returns {boolean}
 */
export function compareObj(x, y) {
    // If both x and y are null or undefined and exactly the same
    if (x === y) {
        return true;
    }

    // If they are not strictly equal, they both need to be Objects
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }

    //They must have the exact same prototype chain,the closest we can do is
    //test the constructor.
    if (x.constructor !== y.constructor) {
        return false;
    }

    for (var p in x) {
        //Inherited properties were tested using x.constructor === y.constructor
        if (x.hasOwnProperty(p)) {
            // Allows comparing x[ p ] and y[ p ] when set to undefined
            if (!y.hasOwnProperty(p)) {
                return false;
            }

            // If they have the same strict value or identity then they are equal
            if (x[p] === y[p]) {
                continue;
            }

            // Numbers, Strings, Functions, Booleans must be strictly equal
            if (typeof(x[p]) !== "object") {
                return false;
            }

            // Objects and Arrays must be tested recursively
            if (!this.compareObj(x[p], y[p])) {
                return false;
            }
        }
    }

    for (p in y) {
        // allows x[ p ] to be set to undefined
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
            return false;
        }
    }
    return true;
}

/***
 * 计算md5
 * @param pwd
 * @returns {*}
 */
export function calcuMD5(pwd) {
    pwd = pwd.toUpperCase();
    pwd = md5(pwd);
    return pwd;
}

/**
 * 计算时间差
 * @param publishTimeStamp 时间戳（格式：13位数字）
 * @param nowTimeStamp 当前时间戳（传空使用当前时间）
 */
export function timeDiff(publishTimeStamp, nowTimeStamp) {

    if (!publishTimeStamp) {
        return '';
    }
    if (nowTimeStamp === undefined) {
        nowTimeStamp = new Date().getTime();
    }

    if (publishTimeStamp > nowTimeStamp) {
        let t = publishTimeStamp - nowTimeStamp;
        let d = zeroFill(Math.floor(t / 1000 / 60 / 60 / 24));
        let hour = zeroFill(Math.floor(t / 1000 / 60 / 60 % 24));
        let min = zeroFill(Math.floor(t / 1000 / 60 % 60));
        let sec = zeroFill(Math.floor(t / 1000 % 60));
        return `${hour}:${min}:${sec}`;
    } else {
        return `00:00:00`
    }
}

// 时间戳解析
export function analyseDate(timestamp, needFillZero) {

    let timeObj = {};
    if (!timestamp) {
        return timeObj;
    }

    if (timestamp.toString().length < 13) {
        timestamp *= 1000;
    }

    let time = new Date(timestamp);
    timeObj.year = time.getFullYear(); // 年
    timeObj.month = needFillZero ? zeroFill(time.getMonth() + 1) : time.getMonth() + 1; // 月
    timeObj.date = needFillZero ? zeroFill(time.getDate()) : time.getDate(); // 日
    timeObj.hour = needFillZero ? zeroFill(time.getHours()) : time.getHours(); // 小时
    timeObj.minute = needFillZero ? zeroFill(time.getMinutes()) : time.getMinutes(); // 分
    timeObj.second = needFillZero ? zeroFill(time.getSeconds()) : time.getSeconds(); // 秒

    return timeObj;
}


//时间戳转换函数
export function formatChange(timestamp, flag) {
    let date = new Date(timestamp),
        Y = date.getFullYear() + '-',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1),
        D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ',
        h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':',
        m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':',
        s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    if (flag === 1) {
        return Y + M;
    } else if (flag === 2) {
        return Y + M + '-' + D;
    } else if (flag === 3) {
        return Y + M + '-' + D + h + m + s;
    }
}

/**
 * 时间格式化
 * @param timestamp 时间戳（格式：13位数字）
 * @param formatType 格式
 * @param isShort 是否是短的
 */
Vue.filter('analyseTime', function(timestamp, formatType, isShort) {
    if (timestamp == '' || timestamp == undefined || timestamp == 'undefined' || timestamp == null) {
        return '';
    }
    if (typeof timestamp === 'object') { //传入日期格式
        timestamp = timestamp.getTime();
        onlineType = true;
    }

    var dateTime = new Date(parseInt(timestamp));
    if (isShort) {
        dateTime = new Date(parseInt(timestamp * 1000))
    }
    var backTime = "";
    var year = dateTime.getFullYear(); // 获取年
    var month = dateTime.getMonth() + 1; // 获取月
    var date = dateTime.getDate(); // 获取日
    var day = dateTime.getDay(); // 获取星期几
    var hour = dateTime.getHours(); // 获取时
    var minute = dateTime.getMinutes(); // 获取分
    var second = dateTime.getSeconds(); // 获取秒

    switch (formatType) {
        case '1':
            backTime = year + "年" + zeroFill(month) + "月" + zeroFill(date) + "日";
            break;
        case '2':
            backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date) + " " + zeroFill(hour) + ":" + zeroFill(minute) + ":" + zeroFill(second);
            break;
        case '3':
            backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date);
            break;
        case '4':
            backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date) + " " + zeroFill(hour) + ":" + zeroFill(minute);
            break;
        case '5':
            backTime = year + "-" + zeroFill(month) + "-" + zeroFill(date) + " " + zeroFill(day);
            break;
        case '6':
            backTime = year + "/" + zeroFill(month) + "/" + zeroFill(date) + " " + zeroFill(hour) + ":" + zeroFill(minute);
            break;
        default:
            backTime = year + "-" + month + "-" + date;
            break;
    }
    return backTime;
});

/***
 * 补0
 * @param num
 * @returns {*}
 */
function zeroFill(num) {
    if (num > 0 && num < 10 || num.toString().length == 1 && num == 0) {
        return '0' + num;
    }
    return num;
}

export function scroll2Top() {
    setTimeout(() => {
        window.scroll(0, 0)
    }, 0)
}

export function getMenuData(data, menu) {
    let obj = {};
    for (let i = 0; i < data.length; i++) {

        //如果是叶子家电
        if (data[i].type == 2) {
        } else {
            let _menu = cloneDeep(data[i]);
            _menu.list = [];
            menu.push(_menu);

            if(data[i].list.length == 0) {
                continue;
            } else {
                getMenuData(data[i].list, menu[menu.length-1].list);
            }
        };
    }

    return menu;
}

/*let testmenu = JSON.parse(_sessionStorage("menuData"));
let testdata = getMenuData(testmenu,[]);
console.log('aa',testdata);*/