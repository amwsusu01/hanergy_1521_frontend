<template>
    <div>
        <div class="box">
            <el-form ref="form" :inline="true" :model="form" class="contain" size="mini" @submit.native.prevent>
                <el-form-item prop="keyword">
                    <el-input v-model="form.keyword" placeholder="输入关键字查询" @keyup.enter.native.prevent="filterData"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.prevent="filterData">查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="userList" border style="width: 100%">
                <el-table-column prop="month" label="用户列表" label-class-name="table-title">
                    <el-table-column prop="jobNumber" label="员工工号" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="name" label="用户名" min-width="15%">
                    </el-table-column>
                    <!-- <el-table-column prop="department" label="部门" min-width="15%">
                    </el-table-column> -->
                    <el-table-column prop="jobNumber" label="登录名" min-width="15%">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱" show-overflow-tooltip min-width="25%">
                    </el-table-column>
                    <el-table-column prop="type" label="权限管理" min-width="15%">
                        <template slot-scope="scope">
                            <el-button type="text" @click="editorModal(scope.row)">查看</el-button>
                            <el-button type="text" @click="editorModal(scope.row)">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange" :current-page="page.currentPage" :total="page.totalNumber" :page-size="page.pagesize">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import {_sessionStorage} from "../assets/js/util";
export default {
    name: 'roles',
    data() {
        return {
            userList: [],
            data: [],
            originData: [],
            page: {
                pagesize: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            form: {
                keyword: ''
            },
            pickerOptions: {
                disabledDate: (time) => {
                    return this.$moment(time).isBefore(this.form.date.startTime);
                }
            }
        }
    },
    methods: {
        filterData() {
            let res = this.originData;
            if (this.form.keyword) {
                res = this.data.filter((a) => {
                    if(a.name == null){
                        a.name = ""
                    }
                    if (a.name.indexOf(this.form.keyword) >=0 || a.jobNumber.indexOf(this.form.keyword)>=0 || a.email.indexOf(this.form.keyword)>=0) {
                        return a;
                    }
                })
            }

            this.data = res;
            this.page.totalNumber = this.data.length;
            this.CurrentChange(1);
            return res;
        },
        CurrentChange(val) {
            this.page.currentPage = val
            this.userList = this.data.slice((this.page.currentPage - 1) * this.page.pagesize, this.page.currentPage * this.page.pagesize);
        },
        getUserList() {
            let params ={
                corpCode:'Hanergy',
                menuId:48,
                userId: this.userObj.userId,
                userName: this.userObj.userName,
                fullName: this.userObj.name,
                systemId: "92",//系统id
                systemName: "管理系统",
                menuId: "94",
                menuName: "数据权限管理",
                proType: 4
            }
            this.$api.common.getUserList(params).then(res => {
                if (res.user) {
                    //let users = JSON.parse(res.user);
                    this.data = res.user;
                    this.originData = this.data;
                    this.page.totalNumber = this.data.length;
                    this.userList = this.data.slice((this.page.currentPage - 1) * this.page.pagesize, this.page.currentPage * this.page.pagesize);
                }
            })
        },
        editorModal(obj){
            let jobNumber = obj.jobNumber;
            let name = obj.name;
            let email = obj.email;
            let sessionObj = {
                jobNumber: obj.jobNumber,
                name: obj.name,
                email:obj.email
            };
            _sessionStorage("sessionObj",sessionObj);
            this.$router.push({path: '/editorRoles',query:{jobNumber:jobNumber}})
        },
    },
    mounted() {
        this.getUserList();
    },
    computed: {
        userObj: {
            get(){
                return this.$store.state.common.user;
            }
        }
    }
}
</script>
<style lang="scss" scoped="">
.block {
    text-align: right;
    margin-top: 10px;
    margin-right: 100px;
    margin-bottom: 30px;
}
.el-table {
    .el-button {
        padding:0;
    }
}
</style>