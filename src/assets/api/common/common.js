import Api from '../axios'

const apiURL = {
    // 登录
    login: '/user/login',
    // 退出
    logout: '/user/logout',
    //菜单
    sidebar: '/admin/api/v1/user/roles',
}

export default {
    login(obj) {
        return Api.get(apiURL.login, obj)
    },
    logout(obj) {
        return Api.get(apiURL.logout, obj)
    },
    sidebar(obj) {
        return Api.get2(apiURL.sidebar, obj)
    },

}
