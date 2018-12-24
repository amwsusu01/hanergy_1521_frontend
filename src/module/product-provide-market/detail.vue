<template>
    <div>
        <div class="box">
            <el-form ref="form" label-position="left" :inline="true" :model="form" label-width="130px" class="contain" size="mini" @submit.native.prevent>
                <el-row>
                    <el-col :span="24">
                        <el-form-item prop="date" label="统计日期">
                            <el-date-picker type="date" placeholder="统计日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <el-form-item class="contain-form-item" prop="xilie" label="产品系列" :label-width="shortLabel">
                            <el-select v-model="form.xilie" placeholder="无限制" style="width: 100%">
                                <el-option v-for="item in options.options1" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item class="contain-form-item" prop="caigoushenqing" label="采购申请" :label-width="shortLabel">
                            <el-select v-model="form.caigoushenqing" placeholder="无限制">
                                <el-option v-for="item in options.options1" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item class="contain-form-item" prop="shiyebu" label="事业部" :label-width="shortLabel">
                            <el-select v-model="form.shiyebu" placeholder="无限制">
                                <el-option v-for="item in options.options1" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item class="contain-form-item" prop="wuliaomiaoshu" label="物料描述" :label-width="shortLabel">
                            <el-select v-model="form.wuliaomiaoshu" placeholder="无限制">
                                <el-option v-for="item in options.options1" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item class="contain-form-item" prop="tijiaoren" label="提交人" :label-width="shortLabel">
                            <el-select v-model="form.tijiaoren" placeholder="无限制">
                                <el-option v-for="item in options.options1" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="PR计划区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date2" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="PR实际区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date3" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date4" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="采购合同计划区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date2" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="采购合同实际区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date3" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date4" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="预付款计划区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date5" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date6" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预付款实际区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date7" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date8" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="生产计划区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date41" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date42" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="生产实际区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date43" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date44" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="提货款计划区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date51" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date52" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="提货款实际区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date53" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date54" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="交付计划区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date51" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date52" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="交付实际区间" class="contain-time-form-item">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date53" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="无限制" v-model="form.date54" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item>
                    <el-button type="primary" @click.prevent="filterData">查询</el-button>
                </el-form-item>
            </el-form>
            <div style="width:100%;max-width: 1200px;position: relative;" class="table-container">
                <el-button class="exp-btn" plain size="small" @click="exportExl('67')">导出</el-button>
                <el-table :data="data" border style="width: 100%">
                    <el-table-column label="明细表" fixed  label-class-name="table-title title-th">
                        <el-table-column label='' fixed label-class-name="title-th" width="800">
                            <el-table-column prop="jobNumber" label-class-name="title-th" label="序号" width="50">
                            </el-table-column>
                            <el-table-column prop="username" label-class-name="title-th" label="产品系列" width="150">
                            </el-table-column>
                            <el-table-column prop="department" label-class-name="title-th" label="采购申请号" width="100">
                            </el-table-column>
                            <el-table-column prop="jobNumber" label-class-name="title-th" label="事业部" width="100">
                            </el-table-column>
                            <el-table-column prop="email" label-class-name="title-th" label="物料号" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label-class-name="title-th" label="物料描述" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label-class-name="title-th" label="提交人" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label-class-name="title-th"  label="预警" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='PR' label-class-name="title-th">
                            <el-table-column prop="email" label="计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='采购合同' label-class-name="title-th">
                            <el-table-column prop="email" label="签署计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="签署变更" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="签署实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='预付款' label-class-name="title-th">
                            <el-table-column prop="email" label="计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="变更" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='生产' label-class-name="title-th">
                            <el-table-column prop="email" label="计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="变更"  label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='提货款' label-class-name="title-th">
                            <el-table-column prop="email" label="计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="变更"  label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column label='交付' label-class-name="title-th">
                            <el-table-column prop="email" label="计划" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="变更" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="email" label="实际" label-class-name="title-th" show-overflow-tooltip width="100">
                            </el-table-column>
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange" :current-page="page.currentPage" :total="page.totalNumber" :page-size="page.pagesize">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    name: 'detail',
    data() {
        return {
            data: [],
            page: {
                pagesize: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            form: {
                keyword: ''
            },
            shortLabel: 70,
            pickerOptions: {
                disabledDate: (time) => {
                    return this.$moment(time).isBefore(this.form.date.startTime);
                }
            },
            options: {
                options1: [{
                    label: '全部',
                    value: 1
                }, {
                    label: '全部',
                    value: 2
                }, {
                    label: '全部',
                    value: 3
                }],
                options2: [{
                    label: '全部',
                    value: 1
                }, {
                    label: '全部',
                    value: 2
                }, {
                    label: '全部',
                    value: 3
                }],
                options3: [{
                    label: '全部',
                    value: 1
                }, {
                    label: '全部',
                    value: 2
                }, {
                    label: '全部',
                    value: 3
                }],

            }
        }
    },
    methods: {
        filterData() {
            return res;
        },
        CurrentChange(val) {
            this.page.currentPage = val

        },
        getData() {

        }
    },
    mounted() {
        this.getData();
    }
}
</script>
<style lang="less">
.contain-form-item .el-form-item__content {
    width: 125px !important
}

.contain-time-form-item .el-form-item__content {
    width: 377px !important
}
</style>
<style type="text/css" scoped>
.block {
    text-align: right;
    margin-top: 10px;
    margin-right: 100px;
    margin-bottom: 30px;
}

.table-title {
    color:white;
}

.exp-btn {
    position: absolute;
    right: 15px;
    z-index: 1000;
    top: 8px;
}
</style>