<template xmlns="">
    <div>
        <div class="canteen-history-order">
            <el-breadcrumb separator="/" class="order-breadcrumb">
                <el-breadcrumb-item :to="{ path: '/canteenPurchase'}">1521报表</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/canteenCartBig'}">1521问题和反省明细</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="box">
                <div class="rightline">更新时间: 2018-01-01</div>

                <el-form :inline="true" :model="form" ref="form" class="demo-form-inline">
                    <el-form-item label="部门:" label-width="50px" prop="region">
                        <el-select v-model="form.region" multiple collapse-tags placeholder="请选择部门" size="mini">
                            <el-option
                                    v-for="item in this.deptList"
                                    :key="item"
                                    :label="item"
                                    :value="item" style="width: 220px">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职级:" size="mini" class="zhiji" prop="rankname">
                        <el-select v-model="form.rankname" multiple collapse-tags placeholder="请选择职级" size="mini">
                            <el-option
                                    v-for="item in this.rankOptions"
                                    :key="item"
                                    :label=item
                                    :value=item>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="查询时间:" prop="date">
                        <el-col :span="8" style="width:120px;">
                            <el-date-picker size="mini" type="month"
                                            :placeholder=initTime
                                            value-format="yyyy-MM"
                                            @change="changeTime(form.date.startTime)"
                                            v-model="form.date.startTime" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col style="width:120px;display: inline-block">
                            <el-date-picker
                                    size="mini" type="month"
                                    :placeholder=initTime
                                    @change="changeEndTime(form.date.endTime)"
                                    :picker-options="pickerOptions"
                                    v-model="form.date.endTime" style="width: 100%;">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                    <el-form-item class="operate">
                        <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
                        <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>

            </div>
            <div class="table-contain">
                <div class="table">
                    <el-table
                            :data="tableDataQuestion"
                            border
                            style="width: 100%">
                        <el-table-column
                                label="部门问题明细表"
                                style="font-size: 26px;">
                            <el-table-column
                                    prop="month"
                                    label="月份"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="day"
                                    label="日期"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="employeeID"
                                    label="员工工号"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="empname"
                                    label="员工姓名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="deptname"
                                    label="部门"
                                    width="200"
                                    show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column
                                    prop="sol_pro"
                                    label="提报内容"
                                    show-overflow-tooltip>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                            layout="total, prev, pager, next"
                            @current-change="CurrentChange1"
                            :current-page="page1.currentPage"
                            :total="page1.totalNumber">
                    </el-pagination>
                </div>

                <div class="table">
                    <el-table
                            :data="tableDataIntro"
                            border
                            style="width: 100%">
                        <el-table-column
                                label="部门反省明细表"
                                style="font-size: 26px;">
                            <el-table-column
                                    prop="month"
                                    label="月份"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="day"
                                    label="日期"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="employeeID"
                                    label="员工工号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="empname"
                                    label="员工姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="deptname"
                                    label="部门"
                                    show-overflow-tooltip
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="introspect"
                                    label="提报内容"
                                    show-overflow-tooltip
                            >
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                            layout="total, prev, pager, next"
                            @current-change="CurrentChange2"
                            :current-page="page2.currentPage"
                            :total="page2.totalNumber">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'canteen-cart-big',
        data () {
            return {
                tableDataQuestion: [],//问题明细
                tableDataIntro: [],//反省明细
                page1: {
                    pageShowNum: 5, // 每页展示多少条
                    totalNumber: '', // 总条数
                    currentPage: 1 // 当前页
                },
                page2: {
                    pageShowNum: 5, // 每页展示多少条
                    totalNumber: '', // 总条数
                    currentPage: 1 // 当前页
                },
                initTime: '2018-12-01 00:00:00', //初始化的时间
                startTimeUnix: 0,
                deptList: [],
                rankOptions: ['21-24', '15-20', '10-14', '05-09', '01-04'],
                form: {
                    rankname: '', //职级
                    region: [], //部门
                    date: {//时间
                        startTime: '',
                        endTime: ''
                    }
                },
                pickerOptions: {
                    disabledDate: (time) => {
                        return new Date(time) < this.startTimeUnix
                    }
                }
            }
        },
        mounted () {
            this.form.date.startTime = this.initTime //默认显示时间
            this.form.date.endTime = this.initTime //默认显示时间
            this.init()
        },

        filters: {},
        methods: {
            init () {
                this.getIssueDetail()
                this.getIntrospectionDetail()
                this.getSelectPermission()
            },
            //初始化表格数据-----部门问题明细
            getIssueDetail () {
                let params = {
                    dept: this.form.region.join(','),//部门
                    jobGrade: this.form.rankname.join(','), //值级
                    beginDate: this.form.date.startTime.substring(0, 7),
                    endDate: this.form.date.endTime.substring(0, 7),
                    page: this.page1.currentPage,
                    pageSize: this.page1.pageShowNum
                }
                this.$api.canteen.getIssueDetail(params).then(res => {
                    this.page1.totalNumber = res.count
                    let qusetionData = JSON.parse(res.list)
                    console.log(qusetionData)
                    this.tableDataQuestion = qusetionData
                })
            },
            CurrentChange1 (val) {
                this.page1.currentPage = val
                this.getIssueDetail()
            },
            //部门反省明细
            getIntrospectionDetail () {
                let params = {
                    dept: this.form.region.join(','),//部门
                    jobGrade: this.form.rankname.join(','), //值级
                    beginDate: this.form.date.startTime.substring(0, 7),
                    endDate: this.form.date.endTime.substring(0, 7),
                    page: this.page2.currentPage,
                    pageSize: this.page2.pageShowNum
                }
                this.$api.canteen.getIntrospectionDetail(params).then(res => {
                    this.page2.totalNumber = res.count
                    let qusetionData = JSON.parse(res.list)
                    this.tableDataIntro = qusetionData
                })
            },
            CurrentChange2 (val) {
                this.page2.currentPage = val
                this.getIntrospectionDetail()
            },
            //部门接口
            getSelectPermission () {
                var params = {
                    userCode: 2
                }
                this.$api.canteen.getSelectPermission(params).then(res => {
                    let user = JSON.parse(res.user) || []
                    for (let j = 0; j < user.length; j++) {
                        let deptName = user[j].dept_name
                        this.deptList.push(deptName)
                        let dept_id = user[j].dept_id
                    }
                })
            },
            //查询数据接口
            queryList () {
                this.getIssueDetail();
                this.getIntrospectionDetail();
            },

            // 表单重置
            resetForm () {
                this.$refs.form.resetFields()
                this.form.date.startTime = this.initTime //默认显示时间
                this.form.date.endTime = this.initTime //默认显示时间
                this.getIssueDetail();
                this.getIntrospectionDetail();
            },
            //开始时间选择改变的函数
            changeTime (startDateTime) {
                if (startDateTime) {
                    let changeTimechuo = startDateTime + '-01 00:00:00'
                    changeTimechuo = Date.parse(startDateTime.replace(/-/g, '/'))
                    this.startTimeUnix = changeTimechuo
                }
            },
            //结束时间选择改变的函数
            changeEndTime (startDateTime) {
                if (startDateTime) {
                    this.form.date.endTime = startDateTime.getTime()
                    let dateEnd = new Date(this.form.date.endTime)
                    let Y = dateEnd.getFullYear() + '-'
                    let M = (dateEnd.getMonth() + 1 < 10 ? '0' + (dateEnd.getMonth() + 1) : dateEnd.getMonth() + 1)
                    this.form.date.endTime = Y + M
                    return this.form.date.endTime
                }
            }
        }
    }

</script>

<style scoped>
    .canteen-history-order {

    }

    .rightline {
        margin-top: 15px;
        margin-right: 25px;
        text-align: right;
    }

    .contain {
        margin-top: 10px;

    }

    .zhiji {
        margin-top: 6px;
    }

    .query {
        margin-left: 30px;
    }

    .table {
        margin-left: 25px;
    }

    .block {
        text-align: right;
        margin-top: 10px;
        margin-right: 100px;
        margin-bottom: 30px;
    }

    .operate {
        width: 130px;
    }
</style>
