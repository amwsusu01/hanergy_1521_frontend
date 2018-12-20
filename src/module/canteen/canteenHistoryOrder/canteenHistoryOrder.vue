<template>
    <div class="canteen-history-order">
        <div class="box">
            <el-form :inline="true" :model="form" class="contain">
                <el-form-item label="部门:" label-width="50px" prop="region">
                    <el-select v-model="form.region" multiple collapse-tags placeholder="请选择部门" size="mini" style="width: 220px;">
                        <el-option v-for="item in deptList" :key="item.dept_name" :label="item.dept_name" :value="item.dept_name" style="width: 220px">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职级:" size="mini" class="zhiji" prop="rankname">
                    <el-select v-model="form.rankname" multiple collapse-tags placeholder="请选择职级" size="mini">
                        <el-option v-for="item in this.rankOptions" :key="item" :label=item :value=item>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="查询时间:" prop="date">
                    <el-col :span="8" style="width:120px;">
                        <el-date-picker size="mini" type="month" :placeholder=initTime value-format="yyyy-MM" @change="changeTime(form.date.startTime)" v-model="form.date.startTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col style="width:120px;display: inline-block">
                        <el-date-picker size="mini" type="month" value-format="yyyy-MM" :placeholder=initTime @change="changeEndTime(form.date.endTime)" :picker-options="pickerOptions" v-model="form.date.endTime" style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item class="operate buttons">
                    <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
                    <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-contain">
            <div class="table">
                <el-button v-if="buttons['70']==true" class="exp-btn" plain size="small" @click="exportExl(3)">导出</el-button>
                <el-table :data="tableData1" border style="width: 100%">
                    <el-table-column label="超过4次(含)未请假未提报统计报表" label-class-name="table-title">
                        <el-table-column prop="month1" label="月份" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="inputtime" label="日期" min-width="20%">
                        </el-table-column>
                        <el-table-column prop="employeeID" label="员工工号" min-width="20%">
                        </el-table-column>
                        <el-table-column prop="realName" label="员工姓名" min-width="20%">
                        </el-table-column>
                        <el-table-column prop="frameName" label="部门" show-overflow-tooltip min-width="30%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange1" :current-page="page1.currentPage" :total="page1.totalNumber">
                </el-pagination>
            </div>
            <div class="table">
                <el-button class="exp-btn" plain size="small" v-if="buttons['71']==true" @click="exportExl(4)">导出</el-button>
                <el-table :data="tableData2" border style="width: 100%">
                    <el-table-column prop="date" label="提报月平均条数小于5明细表" label-class-name="table-title">
                        <el-table-column prop="in_month" label="月份" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="in_date" label="日期" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="in_datetime" label="提报时间" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="employeeID" label="员工工号" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="empname" label="员工姓名" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="departmentname" label="部门" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                        <el-table-column prop="content_new" label="提报内容" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange2" :current-page="page2.currentPage" :total="page2.totalNumber">
                </el-pagination>
            </div>
            <div class="table">
                <el-button class="exp-btn" v-if="buttons['72']==true" plain size="small" @click="exportExl(5)">导出</el-button>
                <el-table :data="tableData3" border style="width: 100%">
                    <el-table-column prop="date" label="提报月平均字数小于5明细表" label-class-name="table-title">
                        <el-table-column prop="in_month" label="月份" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="in_date" label="日期" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="in_datetime" label="提报时间" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="employeeID" label="员工工号" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="empname" label="员工姓名" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="departmentname" label="部门" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                        <el-table-column prop="content_new" label="提报内容" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange3" :current-page="page3.currentPage" :total="page3.totalNumber">
                </el-pagination>
            </div>
            <div class="table">
                <el-button class="exp-btn" plain size="small" v-if="buttons['73']==true" @click="exportExl(6)">导出</el-button>
                <el-table :data="tableData4" border style="width: 100%">
                    <el-table-column prop="date" label="9点之前提报数据明细表" label-class-name="table-title">
                        <el-table-column prop="month" label="月份" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="day" label="日期" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="inputtime" label="提报时间" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="employeeID" label="员工工号" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="emp_name" label="员工姓名" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="dept_name" label="部门" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                        <el-table-column prop="content_new" label="提报内容" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange4" :current-page="page4.currentPage" :total="page4.totalNumber">
                </el-pagination>
            </div>
            <div class="table">
                <el-button class="exp-btn" plain size="small" v-if="buttons['74']==true" @click="exportExl(7)">导出</el-button>
                <el-table :data="tableData5" border style="width: 100%">
                    <el-table-column prop="date" label="12点之前提报数据明细表" label-class-name="table-title">
                        <el-table-column prop="month" label="月份" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="day" label="日期" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="inputtime" label="提报时间" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="employeeID" label="员工工号" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="emp_name" label="员工姓名" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="dept_name" label="部门" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                        <el-table-column prop="content_new" label="提报内容" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange5" :current-page="page5.currentPage" :total="page5.totalNumber">
                </el-pagination>
            </div>
            <div class="table">
                <el-button class="exp-btn" plain v-if="buttons['75']==true" size="small" @click="exportExl(8)">导出</el-button>
                <el-table :data="tableData6" border style="width: 100%">
                    <el-table-column prop="date" label="提报内容重复超6次(含)汇总表" label-class-name="table-title">
                        <el-table-column prop="month" label="月份" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="day" label="日期" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="employeeID" label="员工工号" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="empname" label="员工姓名" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="deptname" label="部门" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                        <el-table-column prop="ts" label="重复次数" width="80" min-width="5%">
                        </el-table-column>
                        <el-table-column prop="content" label="提报内容" show-overflow-tooltip min-width="10%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange6" :current-page="page6.currentPage" :total="page6.totalNumber">
                </el-pagination>
            </div>
            <div class="table">
                <el-button class="exp-btn" plain v-if="buttons['76']==true" size="small" @click="exportExl(9)">导出</el-button>
                <el-table :data="tableData7" border style="width: 100%">
                    <el-table-column prop="month" label="提报内容重复超6次(含)明细表" label-class-name="table-title">
                        <el-table-column prop="month" label="月份" min-width="10%">
                        </el-table-column>
                        <el-table-column prop="day1" label="日期" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="employeeID" label="员工工号" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="empname" label="员工姓名" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="deptname" label="部门" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                        <el-table-column prop="content_new" label="提报内容" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange7" :current-page="page7.currentPage" :total="page7.totalNumber">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { formatChange } from '../../../assets/js/util'
import Paging from '../../../components/common/Paging'
import { exportExl } from '../../../utils';

export default {
    name: 'canteenHistoryOrder',
    components: {
        Paging
    },
    data() {
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
            initTime: this.updateTime, //初始化的时间
            startTimeUnix: 0,
            //deptList: [],
            rankOptions: ['21-24', '15-20', '10-14', '05-09', '01-04'],
            form: {
                rankname: '', //职级
                region: [], //部门
                date: { //时间
                    startTime: '',
                    endTime: ''
                }
            },
            originForm: {
                rankname: '', //职级
                region: [], //部门
                date: { //时间
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
    watch: {
        'updateTime': function(newval, oldval) {
            if (newval && !oldval) {
                this.initTime = this.$moment(newval).format('YYYY-MM');
                this.initData();
            }
        },
        'deptList': function(newval, oldval) {
            if (newval.length > 0 && oldval.length == 0) {
                this.initData();
            }
        }
    },
    mounted() {
        this.initTime = this.updateTime ? this.$moment(this.updateTime).format('YYYY-MM') : '';
        this.initData();
    },
    computed: {
        buttons: {
            get() {
                //获取当前可导出的按钮组
                if (this.$store.state.common.menuData && this.$store.state.common.menuData.length > 0 && this.$store.state.common.menuData[0].list) {
                    let curMenu = this.$store.state.common.menuData[0].list.find((item) => item.menuId == '54') //1521明细的菜单
                    if (curMenu && curMenu.list) {
                        let res = {};
                        curMenu.list.map((item) => {
                            res[item.menuId] = true;
                        })
                        return res;
                    }
                }

                return {};
            }
        },
        userCode: {
            get() {
                if (this.$store.state.common.user)
                    return this.$store.state.common.user.jobNumber;
                else return '';
            }
        },
        deptList: {
            get() {
                return this.$store.state.common.deptments;
            },
            set() {
                this.$store.commit('setDeptments', val);
            }
        },
        updateTime: {
            get() {
                return this.$store.state.common.updateTime;
            }
        },
    }, // 计算属性
    methods: {
        initData() {
            if (this.updateTime && this.deptList.length > 0) {
                this.form.date.startTime = this.initTime; //默认显示时间
                this.form.date.endTime = this.initTime //默认显示时间
                this.form.region = this.deptList.map((a) => a.dept_name);
                this.init();
            }
        },
        init() {
            this.getTabledata1()
            this.getTabledata2()
            this.getTabledata3()
            this.getTabledata4()
            this.getTabledata5()
            this.getTabledata6()
            this.getTabledata7()
        },
        //表格初始化数据---超过四次
        getTabledata1() {
            let params = {
                dept: this.form.region.join(','), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
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
                this.tableData1 = cgsc;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange1(val) {
            this.page1.currentPage = val
            this.getTabledata1()
        },
        //-----条数小于5
        getTabledata2() {
            let params = {
                dept: this.form.region.join(','), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
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
                this.tableData2 = tsxyw;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange2(val) {
            this.page2.currentPage = val
            this.getTabledata2()
        },
        //-----字数小于5
        getTabledata3() {
            let params = {
                dept: this.form.region.join(','), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
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
                this.tableData3 = zsxyw;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange3(val) {
            this.page3.currentPage = val
            this.getTabledata3()
        },
        //-----九点之前
        getTabledata4() {
            let params = {
                dept: this.form.region.join(','), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
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
                this.tableData4 = jdzq;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange4(val) {
            this.page4.currentPage = val
            this.getTabledata4()
        },
        //十二点之前
        getTabledata5() {
            let params = {
                dept: this.form.region.join(','), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
                page: this.page5.currentPage,
                pageSize: this.page5.pageShowNum
            }
            this.$api.canteen.getDetailList5(params).then(res => {
                this.page5.totalNumber = res.count
                let sedzq = JSON.parse(res.list)
                sedzq.map((item) => {
                    item.inputtime = formatChange(item.inputtime, 2)
                    return item
                })
                this.tableData5 = sedzq;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange5(val) {
            this.page5.currentPage = val
            this.getTabledata5()
        },
        //重复超过六次汇总
        getTabledata6() {
            let params = {
                dept: this.form.region.join(','), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
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
                this.tableData6 = cglhz;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange6(val) {
            this.page6.currentPage = val
            this.getTabledata6()
        },
        //重复超过六次明细
        getTabledata7() {
            let params = {
                dept: this.form.region.join(','), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
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
                this.tableData7 = cglmx;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange7(val) {
            this.page7.currentPage = val
            this.getTabledata7()
        },
        //查询数据接口
        queryList() {
            this.getTabledata1();
            this.getTabledata2();
            this.getTabledata3();
            this.getTabledata4();
            this.getTabledata5();
            this.getTabledata6();
            this.getTabledata7();
        },

        // 表单重置
        resetForm() {
            this.$refs.form.resetFields();
            this.form.region = [];
            this.form.date.startTime = this.initTime; //默认显示时间
            this.form.date.endTime = this.initTime //默认显示时间
        },
        //开始时间选择改变的函数
        changeTime(startDateTime) {
            if (startDateTime) {
                let changeTimechuo = startDateTime + '-01 00:00:00'
                changeTimechuo = Date.parse(startDateTime.replace(/-/g, '/'))
                this.startTimeUnix = changeTimechuo
            }
        },
        //结束时间选择改变的函数
        changeEndTime(startDateTime) {
            if (startDateTime) {
                let etime = startDateTime.getTime();
                let dateEnd = new Date(etime)
                let Y = dateEnd.getFullYear() + '-'
                let M = (dateEnd.getMonth() + 1 < 10 ? '0' + (dateEnd.getMonth() + 1) : dateEnd.getMonth() + 1)
                etime = Y + M
                return etime
            }
        },
        exportExl(type) {
            let count = 0;
            switch (type) {
                case 3:
                    count = this.page1.totalNumber;
                    break;
                case 4:
                    count = this.page2.totalNumber;
                    break;
                case 5:
                    count = this.page3.totalNumber;
                    break;
                case 6:
                    count = this.page4.totalNumber;
                    break;
                case 7:
                    count = this.page5.totalNumber;
                    break;
                case 8:
                    count = this.page6.totalNumber;
                    break;
                case 9:
                    count = this.page7.totalNumber;
                    break;

            }

            if (count >= 10000) {
                this.$confirm('当前导出行数超过1万行， 是否继续?', '提示', {
                    confirmButtonText: '继续',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.exportExlOk(type);
                }).catch(() => {});
            } else {
                this.exportExlOk(type);
            }
        },

        exportExlOk(type) {
            let params = {
                type: `type` + type,
                dept: this.originForm.region.join(','),
                jobGrade: this.originForm.rankname,
                beginDate: this.originForm.date.startTime,
                endDate: this.originForm.date.endTime
            }

            let filename = '';
            switch (type) {
                case 3:
                    filename = "超过4次(含)未请假未提报统计报表.xls";
                    break;
                case 4:
                    filename = "提拔月平均条数小于5明细表.xls";
                    break;
                case 5:
                    filename = "提拔月平均字数小于5明细表.xls";
                    break;
                case 6:
                    filename = "9点之前提报数据明细表.xls";
                    break;
                case 7:
                    filename = "12点之前提报数据明细表.xls";
                    break;
                case 8:
                    filename = "提报内容重复超6次(含)汇总表.xls";
                    break;
                case 9:
                    filename = "提报内容重复超6次(含)明细表.xls";
                    break;
            }

            this.$api.common.exportExcel(params).then(res => {
                exportExl(res, filename);
            })
        }

    }
}
</script>
<style scoped>
.canteen-history-order {}

.zhiji {
    margin-top: 6px;
}

.query {
    margin-left: 30px;
}

.table {
    position: relative;
}

.block {
    text-align: right;
    margin-top: 10px;
    margin-right: 100px;
    margin-bottom: 30px;
}

.exp-btn {
    position: absolute;
    right: 15px;
    z-index: 1000;
    top: 10px;
}
</style>