<template xmlns="">
    <div>
        <div class="canteen-history-order">
            <div class="box">
                <el-form :inline="true" :model="form" ref="form" class="contain">
                    <el-form-item label="部门:" label-width="50px" prop="region">
                        <el-select v-model="form.region" style="width: 220px;" multiple collapse-tags placeholder="请选择部门" size="mini">
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
                    <el-form-item class="operate">
                        <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
                        <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="table-contain">
                <div class="table">
                    <el-button v-if="buttons['78']==true" class="exp-btn" plain size="small" @click="exportExl(1)">导出</el-button>
                    <el-table :data="tableDataQuestion" border style="width: 100%">
                        <el-table-column label="部门问题明细表" label-class-name="table-title">
                            <el-table-column prop="month" label="月份" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="day" label="日期" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="employeeID" label="员工工号" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="empname" label="员工姓名" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="deptname" label="部门" min-width="15%"show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="sol_pro" label="提报内容" min-width="30%" show-overflow-tooltip>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange1" :current-page="page1.currentPage" :total="page1.totalNumber">
                    </el-pagination>
                </div>
                <div class="table">
                    <el-button v-if="buttons['79']==true" class="exp-btn" plain size="small" @click="exportExl(2)">导出</el-button>
                    <el-table :data="tableDataIntro" border style="width: 100%">
                        <el-table-column label="部门反省明细表" label-class-name="table-title">
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
                            <el-table-column prop="introspect" label="提报内容" show-overflow-tooltip min-width="30%">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange2" :current-page="page2.currentPage" :total="page2.totalNumber">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { exportExl } from '../../../utils';
export default {
    name: 'canteen-cart-big',
    data() {
        return {
            tableDataQuestion: [], //问题明细
            tableDataIntro: [], //反省明细
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
            initTime: this.updateTime, //初始化的时间
            startTimeUnix: 0,
            //deptList: [],
            rankOptions: ['21-24', '15-20', '10-14', '05-09', '01-04'],
            originForm: {
                rankname: '', //职级
                region: [], //部门
                date: { //时间
                    startTime: '',
                    endTime: ''
                }
            },
            form: {
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
    mounted() {
         this.initTime = this.updateTime? this.$moment(this.updateTime).format('YYYY-MM'):'';
         this.initData();
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
    computed: {
        buttons: {
            get() {
                //获取当前可导出的按钮组
                if (this.$store.state.common.menuData && this.$store.state.common.menuData.length > 0 && this.$store.state.common.menuData[0].list) {
                    let curMenu = this.$store.state.common.menuData[0].list.find((item) => item.menuId == '56') //1521问题和反省明细
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
            if (this.initTime && this.deptList.length > 0) {
                this.form.date.startTime = this.initTime //默认显示时间
                this.form.date.endTime = this.initTime //默认显示时间
                this.form.region = this.deptList.map((a) => a.dept_name);
                this.init()
            }
        },
        init() {
            this.getIssueDetail();
            this.getIntrospectionDetail();
        },
        exportExl(type) {
            let count = 0;
            switch (type) {
                case 1:
                    count = this.page1.totalNumber;
                    break;
                case 2:
                    count = this.page2.totalNumber;
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
            if (type == 1) {
                filename = "部门问题明细表.xls"
            } else {
                filename = "部门反省明细表.xls";
            }

            this.$api.common.exportExcel(params).then(res => {
                exportExl(res, filename);
            })

        },
        //初始化表格数据-----部门问题明细
        getIssueDetail() {
            let params = {
                dept: this.form.region.join(','), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
                page: this.page1.currentPage,
                pageSize: this.page1.pageShowNum
            }
            this.$api.canteen.getIssueDetail(params).then(res => {
                this.page1.totalNumber = res.count
                let qusetionData = JSON.parse(res.list)
                console.log(qusetionData)
                this.tableDataQuestion = qusetionData;

                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange1(val) {
            this.page1.currentPage = val
            this.getIssueDetail()
        },
        //部门反省明细
        getIntrospectionDetail() {
            let params = {
                dept: this.form.region.join(','), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
                page: this.page2.currentPage,
                pageSize: this.page2.pageShowNum
            }
            this.$api.canteen.getIntrospectionDetail(params).then(res => {
                this.page2.totalNumber = res.count
                let qusetionData = JSON.parse(res.list)
                this.tableDataIntro = qusetionData;

                this.originForm = Object.assign({}, this.form); //保存上一次的值
            })
        },
        CurrentChange2(val) {
            this.page2.currentPage = val
            this.getIntrospectionDetail()
        },
        //查询数据接口
        queryList() {
            this.getIssueDetail();
            this.getIntrospectionDetail();
        },

        // 表单重置
        resetForm() {
            this.$refs.form.resetFields()
            this.form.date.startTime = this.initTime //默认显示时间
            this.form.date.endTime = this.initTime //默认显示时间
            this.getIssueDetail();
            this.getIntrospectionDetail();
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
        }
    }
}
</script>
<style scoped>
.canteen-history-order {}

.exp-btn {
    position: absolute;
    right: 15px;
    z-index: 1000;
    top: 10px;
}

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

.operate {
    width: 134px;
}
</style>