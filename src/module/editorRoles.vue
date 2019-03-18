<template>
    <div class="box">
        <el-row class="staff">
            <el-col :span="12">员工工号: {{jobNumber}}</el-col>
            <el-col :span="12">用户名: {{name}}</el-col>
            <!--<el-col :span="6">部门:{{department}}</el-col>-->
        </el-row>
        <el-row  class="staff">
            <el-col :span="12">登录名: {{jobNumber}}</el-col>
            <el-col :span="12">邮箱: {{email}}</el-col>
        </el-row>
       <div class="data-jurisdiction">数据权限:</div>
        <el-row>
            <el-col :span="8">
                <el-input
                    placeholder="输入关键字进行过滤"
                    v-model="filterText">
            </el-input>
            </el-col>
        </el-row>
        <el-tree
                class="filter-tree"
                :data="allDataList"
                show-checkbox
                node-key="id"
                :default-checked-keys="selectDeptIds"
                @check-change="handleCheckChange"
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree">
        </el-tree>
        <div style="margin-left:23px;margin-top:20px;">
            <el-button type="primary" size="mini" @click="modification()">修改</el-button>
            <el-button type="primary" size="mini" @click="goPrevious()">返回</el-button>
        </div>
    </div>
</template>

<script>
    import {_sessionStorage} from "../assets/js/util";
    export default {
        name: "compile-jurisdiction",
        data() {
            return {
                filterText: '',
                dataList: [],
                checkId: [],
                allDataList:[],
                jobNumber: "",
                name: "",
                email: "",
                selectDeptIds:[],
                selectNewDeptIds:[],
                checkAll: false,
                isIndeterminate: true
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        computed: {
            userObj: {
                get(){
                    return this.$store.state.common.user;
                }
            }
        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleCheckChange(data, checked) {
                if(checked == true){
                    this.selectDeptIds.push(data.id);
                }else{
                    let index = this.selectDeptIds.indexOf(data.id);
                    console.log("index",index);
                    if(index >= 0) {
                        //this.selectDeptIds.splice(data.id,2);
                        this.selectDeptIds=this.selectDeptIds.filter(function (ele) {
                            return ele != data.id
                        })
                    }
                }
            },
            //修改
            modification(){
                this.selectNewDeptIds = [...new Set(this.selectDeptIds)]
                let params = {
                    userCode: this.$route.query.jobNumber,
                    deptids: this.selectNewDeptIds.join(","),
                    userCode: this.$route.query.jobNumber,
                    userId: this.userObj.userId,
                    userName: this.userObj.username,
                    fullName: this.userObj.name,
                    proType: 2,
                    systemId: "92",//系统id
                    systemName: "管理系统",
                    menuId: "93",
                    menuName: "基础管理"
                };
                this.$api.common.updateSelectDeptList(params).then(res => {
                    this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    this.getCheckedData();
                    // this.$router.push({name: "roles"})
                })
            },
            //返回
            goPrevious(){
                this.$router.push({name: 'roles'})
            },
            //获取当前用户的权限
            getCheckedData(){
                let param = {
                    userCode: this.$route.query.jobNumber,
                    userId: this.userObj.userId,
                    userName: this.userObj.username,
                    fullName: this.userObj.name,
                    proType: 4,
                    systemId: "92",//系统id
                    systemName: "管理系统",
                    menuId: "93",
                    menuName: "基础管理"
                };
                this.$api.common.getSelectPermission(param).then(res =>{
                    let user = JSON.parse(res.user) || [];
                    this.checkId=[];
                    this.selectDeptIds= [];
                    for(var i = 0; i< user.length; i++){
                        let id = user[i].dept_id+'';
                        this.selectDeptIds.push(id);
                    }
                });
            },
            getAllCheckData(){
                //获取所有部门的权限
                this.$api.common.getSelectDeptList().then(res =>{
                    let deptList = res.deptList || [];
                    this.allDataList = [];
                    for(var i = 0; i< deptList.length; i++){
                        this.allDataList.push({id:deptList[i].dept_id+'',label:deptList[i].dept_name,children:[]})
                    }
                    this.getCheckedData();
                })
            }
        },
        activated(){
            let sessionObj = _sessionStorage("sessionObj");
            this.jobNumber = this.$route.query.jobNumber;
            this.name = sessionObj.name;
            this.email = sessionObj.email;
            this.getAllCheckData();
        },
        mounted(){
            /*this.$nextTick(() =>{
                // 在这里面去获取DOM
                this.getAllCheckData();
            })*/
        },
    }
</script>

<style lang="less" scoped>
    .box{
       .el-input__inner  {
            position: relative;
            font-size: 14px;
            display: inline-block;
            width: 28% ;
        }
    }
.staff{
    margin-top:20px;
    margin-bottom:15px;
    font-size: 14px;
    line-height: 34px;
    color: #575758;
}
.data-jurisdiction{
    margin-top:20px;
    margin-bottom:10px;
    font-size: 16px;
    line-height: 34px;
    color: #3c3c3c;
}

</style>