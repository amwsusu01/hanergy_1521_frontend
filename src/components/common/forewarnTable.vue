<template>
    <div>
        <el-button type="primary" @click="handleAdd()" size="mini" style="margin-top:15px;">新建</el-button>
        <div>
            <el-table
                    v-if="tableData.length>0"
                    :data="tableData.slice((page.currentPage-1)*page.pagesize,page.currentPage*page.pagesize)"
                    style="width: 62%">
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="邮箱">
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.id" @click="handleEditor(scope.row,2)" type="primary" icon="el-icon-edit" circle size="small"></el-button>
                        <el-button  v-if="scope.row.id" @click="handleDelete(scope.row,1)" type="danger" icon="el-icon-delete" circle size="small"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination layout="total, prev, pager, next" @current-change="currentChange" :current-page="page.currentPage" :total="page.totalNumber" :page-size="page.pagesize">
            </el-pagination>
        </div>
        <el-dialog
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="30%">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="姓名:"  prop="name">
                    <el-input size="small" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:"  prop="email">
                    <el-input size="small"  v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button v-if="add" @click="confirmAdd('form')" size="small">提 交</el-button>
                <el-button v-if="update" @click="confirmUpdate('form')" size="small">提 交</el-button>
                <el-button type="primary" @click="dialogVisible = false"  size="small">返 回</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "forewarn-table",
        data(){
            return {
                dialogVisible: false,
                add: true,
                update: true,
                form:{
                  name: "",
                  email: "",
                },
                rules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'},
                    ],
                },
                tableData: [],
                addaddUpdateForm: {},
                page: {
                    pagesize: 5, // 每页展示多少条
                    totalNumber: 0, // 总条数
                    currentPage: 1 // 当前页
                },
            }
        },
        methods:{
            //新建
            handleAdd() {
                this.$nextTick(() => {
                    this.form.name = "";
                    this.form.email = "";
                });
                this.addUpdateForm = Object.assign(this.form,{templateId: this.templateId,
                    userId: this.userObj.userId,
                    userName: this.userObj.username,
                    fullName: this.userObj.name,
                    systemId: "92",//系统id
                    systemName: "管理系统",
                    menuId: "105",
                    menuName: "预警管理",
                    proType: 1
                });
                this.add = true;
                this.update = false;
                this.dialogVisible = true;
            },
            //编辑
            handleEditor(row,type) {
                    this.form.name = row.name;
                    this.form.email = row.email;
                     this.addUpdateForm = Object.assign(this.form,{
                         templateId: this.templateId,
                         userId: row.id,
                         type: type //2修改
                    });
                this.add = false;
                this.update = true;
                this.dialogVisible = true;
            },
            handleDelete(row,type){
                var deleteObj = {
                    name: row.name,
                    email: row.email,
                    userId: row.id,
                    type: type, //2删除
                    userId: this.userObj.userId,
                    userName: this.userObj.username,
                    fullName: this.userObj.name,
                    systemId: "92",//系统id
                    systemName: "管理系统",
                    menuId: "105",
                    menuName: "预警管理",
                    proType: 3
                };
                this.oprateNotifier(deleteObj);
            },
            //添加的提交
            confirmAdd(form){
                if(this.add){
                    //必填项验证
                    this.$refs[form].validate((valid) => {
                        if (valid) {
                            this.addNotifier(); //添加
                        } else {
                            return false;
                        }
                    });
                }
            },
            //修改的提交
            confirmUpdate(form){
                if(this.update){
                    //必填项验证
                    this.$refs[form].validate((valid) => {
                        if (valid) {
                            //修改
                            this.oprateNotifier(this.addUpdateForm);
                        } else {
                            return false;
                        }
                    });
                }
            },
            //添加关联人员
            addNotifier(){
                var _this = this;
                let form = Object.assign(_this.form,{
                    templateId: _this.templateId,
                    userId: this.userObj.userId,
                    userName: this.userObj.username,
                    fullName: this.userObj.name,
                    systemId: "92",//系统id
                    systemName: "管理系统",
                    menuId: "105",
                    menuName: "预警管理",
                    proType: 2
                });
                _this.$api.common.addNotifier(form).then(res => {
                    if(res && res.status == 0){
                        _this.$message({
                            message: res.msg,
                            type: 'success'
                        })
                        _this.getUserList();
                        _this.dialogVisible = false;
                    }
                })
            },
            //修改删除关联人员
            oprateNotifier(obj){
                this.$api.common.updateNotifier(obj).then(res => {
                    if(res && res.status == 0){
                        this.$message({
                            message: res.msg,
                            type: 'success',
                        });
                      this.getUserList();
                    }
                });
                this.dialogVisible = false;
            },
            getUserList() {
                let params = {
                    templateId: this.templateId,
                    userId: this.userObj.userId,
                    userName: this.userObj.username,
                    fullName: this.userObj.name,
                    systemId: "92",//系统id
                    systemName: "管理系统",
                    menuId: "105",
                    menuName: "预警管理",
                    proType: 4
                };
                this.$api.common.getMailNotifierList(params).then(res => {
                    if(res && res.status == '0'){
                        this.tableData = JSON.parse(res.list) || [];
                         this.page.totalNumber = this.tableData.length;
                    }
                })
            },
            currentChange(val) {
                this.page.currentPage = val;
            },
            // resetForm() {
            //     this.$refs[form].resetFields();
            // }
        },
        computed:{
            templateId: {
                get() { return this.$store.state.common.templateId },
                set(val) { this.$store.commit('saveTemplateId', val) }
            },
            userObj: {
                get(){
                    return this.$store.state.common.user;
                }
            }
        },
        mounted(){
            this.getUserList();
        },
        watch:{
            'templateId':function(newval,val) {
               if(newval != val){
                   this.getUserList();
               }
            }
        }
    }
</script>

<style lang="less" scoped>
    /deep/ .el-icon-close:before {
        content: "";
    }
</style>