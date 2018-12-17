<template>
    <div class="canteen-history-order">
        <el-breadcrumb separator="/" class="order-breadcrumb">
            <el-breadcrumb-item :to="{ path: '/canteenPurchase'}">1521报表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/canteenHistoryOrder'}">1521明细统计</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="box">
            <div class="rightline">更新时间: 2018-01-01</div>

            <el-form :inline="true" :model="form" class="demo-form-inline">
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
                        :data="tableData1"
                        border
                        style="width: 100%">
                    <el-table-column
                            label="超过4次(含)未请假未提报统计报表"
                            style="font-size: 26px;">
                        <el-table-column
                                prop="month1"
                                label="月份"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="inputtime"
                                label="日期"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="employeeID"
                                label="员工工号"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="realName"
                                label="员工姓名"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="frameName"
                                label="部门"
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
                        :data="tableData2"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="提报月平均条数小于5明细表"
                            style="font-size: 26px;">
                        <el-table-column
                                prop="in_month"
                                label="月份"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="in_date"
                                label="日期"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="in_datetime"
                                label="提报时间"
                                width="180">
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
                                prop="departmentname"
                                label="部门"
                                show-overflow-tooltip
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="content_new"
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

            <div class="table">
                <el-table
                        :data="tableData3"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="提报月平均字数小于5明细表"
                            style="font-size: 26px;">
                        <el-table-column
                                prop="in_month"
                                label="月份"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="in_date"
                                label="日期"
                                width="150">
                        </el-table-column>
                        <el-table-column
                                prop="in_datetime"
                                label="提报时间"
                                width="180">
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
                                prop="departmentname"
                                label="部门"
                                show-overflow-tooltip
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="content_new"
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
                        @current-change="CurrentChange3"
                        :current-page="page3.currentPage"
                        :total="page3.totalNumber">
                </el-pagination>
            </div>

            <div class="table">
                <el-table
                        :data="tableData4"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="9点之前提报数据明细表"
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
                                prop="inputtime"
                                label="提报时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="employeeID"
                                label="员工工号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="emp_name"
                                label="员工姓名"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="dept_name"
                                label="部门"
                                show-overflow-tooltip
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="content_new"
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
                        @current-change="CurrentChange4"
                        :current-page="page4.currentPage"
                        :total="page4.totalNumber">
                </el-pagination>
            </div>

            <div class="table">
                <el-table
                        :data="tableData5"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="12点之前提报数据明细表"
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
                                prop="inputtime"
                                label="提报时间"
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="employeeID"
                                label="员工工号"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="emp_name"
                                label="员工姓名"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="dept_name"
                                label="部门"
                                show-overflow-tooltip
                                width="180">
                        </el-table-column>
                        <el-table-column
                                prop="content_new"
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
                        @current-change="CurrentChange5"
                        :current-page="page5.currentPage"
                        :total="page5.totalNumber">
                </el-pagination>
            </div>

            <div class="table">
                <el-table
                        :data="tableData6"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="提报内容重复超6次(含)汇总表"
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
                                prop="ts"
                                label="重复次数"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="content"
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
                        @current-change="CurrentChange6"
                        :current-page="page6.currentPage"
                        :total="page6.totalNumber">
                </el-pagination>
            </div>

            <div class="table">
                <el-table
                        :data="tableData7"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="month"
                            label="提报内容重复超6次(含)明细表"
                            style="font-size: 26px;">
                        <el-table-column
                                prop="month"
                                label="月份"
                                width="100">
                        </el-table-column>
                        <el-table-column
                                prop="day1"
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
                                prop="content_new"
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
                        @current-change="CurrentChange7"
                        :current-page="page7.currentPage"
                        :total="page7.totalNumber">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatChange} from '../../../assets/js/util'
    import Paging from '../../../components/common/Paging'

    export default {
        name: 'canteenHistoryOrder',
        components: {
            Paging
        },
        data () {
            return {
                tableData1: [],
                tableData2: [],
                tableData3: [],
                tableData4: [],
                tableData5: [],
                tableData6: [],
                tableData7: [],
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
                page3: {
                    pageShowNum: 5, // 每页展示多少条
                    totalNumber: '', // 总条数
                    currentPage: 1 // 当前页
                },
                page4: {
                    pageShowNum: 5, // 每页展示多少条
                    totalNumber: '', // 总条数
                    currentPage: 1 // 当前页
                },
                page5: {
                    pageShowNum: 5, // 每页展示多少条
                    totalNumber: '', // 总条数
                    currentPage: 1 // 当前页
                },
                page6: {
                    pageShowNum: 5, // 每页展示多少条
                    totalNumber: '', // 总条数
                    currentPage: 1 // 当前页
                },
                page7: {
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
        computed: {}, // 计算属性
        methods: {
            init () {
                this.getTabledata1()
                this.getTabledata2()
                this.getTabledata3()
                this.getTabledata4()
                this.getTabledata5()
                this.getTabledata6()
                this.getTabledata7()
                this.getSelectPermission()
            },
            //表格初始化数据---超过四次
            getTabledata1 () {
                let params = {
                    dept: this.form.region.join(','),//部门
                    jobGrade: this.form.rankname.join(','), //值级
                    beginDate: this.form.date.startTime.substring(0, 7),
                    endDate: this.form.date.endTime.substring(0, 7),
                    page: this.page1.currentPage,
                    pageSize: this.page1.pageShowNum
                }
                this.$api.canteen.getDetailList1(params).then(res => {
                    this.page1.totalNumber = res.count
                    let cgsc = JSON.parse(res.list)
                    cgsc.map((item) => {
                        item.inputtime = formatChange(item.inputtime, 2)
                        return item
                    })
                    this.tableData1 = cgsc
                })
            },
            CurrentChange1 (val) {
                this.page1.currentPage = val
                this.getTabledata1()
            },
            //-----条数小于5
            getTabledata2 () {
                let params = {
                    dept: this.form.region.join(','),//部门
                    jobGrade: this.form.rankname.join(','), //值级
                    beginDate: this.form.date.startTime.substring(0, 7),
                    endDate: this.form.date.endTime.substring(0, 7),
                    page: this.page2.currentPage,
                    pageSize: this.page2.pageShowNum
                }
                this.$api.canteen.getDetailList2(params).then(res => {
                    this.page2.totalNumber = res.count
                    let tsxyw = JSON.parse(res.list)
                    tsxyw.map((item) => {
                        item.in_date = formatChange(item.in_date, 2)
                        return item
                    })
                    this.tableData2 = tsxyw
                })
            },
            CurrentChange2 (val) {
                this.page2.currentPage = val
                this.getTabledata2()
            },
            //-----字数小于5
            getTabledata3 () {
                let params = {
                    dept: this.form.region.join(','),//部门
                    jobGrade: this.form.rankname.join(','), //值级
                    beginDate: this.form.date.startTime.substring(0, 7),
                    endDate: this.form.date.endTime.substring(0, 7),
                    page: this.page3.currentPage,
                    pageSize: this.page3.pageShowNum
                }
                this.$api.canteen.getDetailList3(params).then(res => {
                    this.page3.totalNumber = res.count
                    let zsxyw = JSON.parse(res.list)
                    zsxyw.map((item) => {
                        item.in_date = formatChange(item.in_date, 2)
                        return item
                    })
                    this.tableData3 = zsxyw
                })
            },
            CurrentChange3 (val) {
                this.page3.currentPage = val
                this.getTabledata3()
            },
            //-----九点之前
            getTabledata4 () {
                let params = {
                    dept: this.form.region.join(','),//部门
                    jobGrade: this.form.rankname.join(','), //值级
                    beginDate: this.form.date.startTime.substring(0, 7),
                    endDate: this.form.date.endTime.substring(0, 7),
                    page: this.page4.currentPage,
                    pageSize: this.page4.pageShowNum
                }
                this.$api.canteen.getDetailList4(params).then(res => {
                    this.page4.totalNumber = res.count
                    let jdzq = JSON.parse(res.list)
                    jdzq.map((item) => {
                        item.inputtime = formatChange(item.inputtime, 2)
                        return item
                    })
                    this.tableData4 = jdzq
                })
            },
            CurrentChange4 (val) {
                this.page4.currentPage = val
                this.getTabledata4()
            },
            //十二点之前
            getTabledata5 () {
                let params = {
                    dept: this.form.region.join(','),//部门
                    jobGrade: this.form.rankname.join(','), //值级
                    beginDate: this.form.date.startTime.substring(0, 7),
                    endDate: this.form.date.endTime.substring(0, 7),
                    page: this.page4.currentPage,
                    pageSize: this.page4.pageShowNum
                }
                this.$api.canteen.getDetailList5(params).then(res => {
                    this.page5.totalNumber = res.count
                    let sedzq = JSON.parse(res.list)
                    sedzq.map((item) => {
                        item.inputtime = formatChange(item.inputtime, 2)
                        return item
                    })
                    this.tableData5 = sedzq
                })
            },
            CurrentChange5 (val) {
                this.page5.currentPage = val
                this.getTabledata5()
            },
            //重复超过六次汇总
            getTabledata6 () {
                let params = {
                    dept: this.form.region.join(','),//部门
                    jobGrade: this.form.rankname.join(','), //值级
                    beginDate: this.form.date.startTime.substring(0, 7),
                    endDate: this.form.date.endTime.substring(0, 7),
                    page: this.page6.currentPage,
                    pageSize: this.page6.pageShowNum
                }
                this.$api.canteen.getDetailList6(params).then(res => {
                    this.page6.totalNumber = res.count
                    let cglhz = JSON.parse(res.list)
                    cglhz.map((item) => {
                        item.day = formatChange(item.day, 2)
                        return item
                    })
                    this.tableData6 = cglhz
                })
            },
            CurrentChange6 (val) {
                this.page6.currentPage = val
                this.getTabledata6()
            },
            //重复超过六次明细
            getTabledata7 () {
                let params = {
                    dept: this.form.region.join(','),//部门
                    jobGrade: this.form.rankname.join(','), //值级
                    beginDate: this.form.date.startTime.substring(0, 7),
                    endDate: this.form.date.endTime.substring(0, 7),
                    page: this.page7.currentPage,
                    pageSize: this.page7.pageShowNum
                }
                this.$api.canteen.getDetailList7(params).then(res => {
                    this.page7.totalNumber = res.count
                    let cglmx = JSON.parse(res.list)
                    cglmx.map((item) => {
                        item.day1 = formatChange(item.day1, 2)
                        return item
                    })
                    this.tableData7 = cglmx
                })
            },
            CurrentChange7 (val) {
                this.page7.currentPage = val
                this.getTabledata7()
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
                this.getTabledata1();
                this.getTabledata2();
                this.getTabledata3();
                this.getTabledata4();
                this.getTabledata5();
                this.getTabledata6();
                this.getTabledata7();
            },

            // 表单重置
            resetForm () {
                this.$refs.form.resetFields()
                this.form.date.startTime = this.initTime //默认显示时间
                this.form.date.endTime = this.initTime //默认显示时间
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
</style>
