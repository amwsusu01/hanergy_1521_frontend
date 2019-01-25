<template>
    <div>
        <el-form ref="form" label-position="left" :inline="true" :model="form" :label-width="shortLabel" class="contain" size="mini" @submit.native.prevent>
        <el-row>
            <el-col :span="8">
                <el-form-item prop="warningLevel" label="预警等级:" :label-width="shortLabel">

                    <el-select v-model="form.warningLevel"  multiple filterable collapse-tags placeholder="无限制" size="mini" style="width: 251px;">
                        <el-option-group v-for="LevelList in warningLevelGroup" :key="LevelList.label" :label="LevelList.label"  @click.native="checkAllOpts">
                            <el-option v-for="wl in LevelList.warningLevels" :key="wl.label" :label="wl.label" :value="wl.label">
                            </el-option>
                        </el-option-group>
                    </el-select>

                </el-form-item>
            </el-col>
            <el-col :span="2" class="query-time"> 查询时间:</el-col>
            <el-col :span="11">
                    <el-date-picker
                            size="mini"
                            v-model="form.beginDate"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                <span> - </span>
                <el-date-picker
                        size="mini"
                        v-model="form.endDate"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-col>
            <el-col :span="3">
                <el-button @click.native.prevent="queryList" type="primary" size="mini">查询</el-button>
            </el-col>
        </el-row>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%;margin-top: 30px;">
            <el-table-column
                    prop="beginDate"
                    label="时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="warning_level"
                    label="预警等级"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="sendEmail"
                    label="邮箱"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="title"
                    label="邮件标题">
            </el-table-column>
            <el-table-column
                    label="发送结果"
                    width="200">
                <template slot-scope="scope">
                    <span v-if="scope.row.is_send>'0'">
                            <font color="#00ff00">成功</font>
                        </span>
                    <span v-else>
                        <font color="#ff0000">失败</font>
                    </span>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination layout="total, prev, pager, next" @current-change="currentChange" :current-page="page.currentPage" :total="page.totalNumber" :page-size="page.pagesize">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: "forewarning-record",
        data(){
            return {
                shortLabel: '80px',
                form: {
                    warningLevel: [],
                    // beginDate: this.$moment(this.beginDate).format('YYYY-MM-DD'),
                    // endDate:this.$moment(this.endDate).format('YYYY-MM-DD')
                    beginDate:  this.$moment().subtract('days', 7).format('YYYY-MM-DD'),
                    endDate: this.$moment().subtract('days', 1).format('YYYY-MM-DD') ,
                 },
                checkAll: true, //选中当前所有
                tableData:[],
                page: {
                    pagesize: 5, // 每页展示多少条
                    totalNumber: 0, // 总条数
                    currentPage: 1 // 当前页
                },
            }
        },
        computed: {
            warningLevelGroup: {
                get() {
                    return [{
                        label: '全部',
                        warningLevels: [
                        {label: '一级预警', id: 1000001},
                        {label: '二级预警', id: 1000002},
                        {label: '三级预警', id: 1000003}
                        ],
                    }]
                }
            },
            userObj: {
                get(){
                    return this.$store.state.common.user;
                }
            }
        },
        methods:{
                checkAllOpts() {
                    if (this.checkAll == true) {
                        this.form.warningLevel = [];
                        this.checkAll = false;
                    } else {
                        let group = this.warningLevelGroup[0].warningLevels;
                        this.form.warningLevel = group.map((a) => a.label).concat();
                        this.checkAll = true;
                    }
                },
            queryList() {
                let params = Object.assign({},this.form,{
                    warningLevel: this.form.warningLevel.join(','),
                    page: this.page.currentPage,//当前页
                    pageSize: this.page.pagesize,//每页展示多少条
                    userId: this.userObj.userId,
                    userName: this.userObj.userName,
                    fullName: this.userObj.name,
                    systemId: "92",//系统id
                    systemName: "管理系统",
                    menuId: "109",
                    menuName: "预警记录",
                    proType: 4
                });
                this.emailList(params);
            },
            emailList(params){
                this.$api.common.mailRecordList(params).then(res => {
                    if (res && res.status == '0') {
                        this.tableData = res.list || [];
                        this.page.totalNumber = res.count;
                    }
                })
            },
            currentChange(val){
                this.page.currentPage = val;
                this.queryList();
            }
        },
        mounted(){
            if(this.warningLevelGroup.length>0){
                let group = this.warningLevelGroup[0].warningLevels;
                this.form.warningLevel = group.map((a) => a.label);
            }
            let params = Object.assign({},this.form,{
                beginDate:  this.$moment().subtract('days', 7).format('YYYY-MM-DD'),
                endDate: this.$moment().subtract('days', 1).format('YYYY-MM-DD') ,
                warningLevel: this.form.warningLevel.join(','),
                page: this.page.currentPage,//当前页
                pageSize: this.page.pagesize//每页展示多少条
            });
            this.emailList(params);
        }
    }
</script>

<style lang="less" scoped>
    .query-time{
        font-size: 14px;
        line-height: 27px;
        color: #3c3c3c
    }
    .block {
        text-align: right;
        margin-top: 10px;
        margin-right: 100px;
        margin-bottom: 30px;
    }
</style>