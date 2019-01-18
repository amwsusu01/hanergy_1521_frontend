<template>
    <div>
        <div class="box">
            <el-form ref="form" label-position="left" :inline="true" :model="form" label-width="shortLabel" class="contain" size="mini" @submit.native.prevent>
                <el-row>
                    <el-col :span="2" class="title"> 申请日期:</el-col>
                    <el-col :span="8">
                            <el-date-picker
                                    size="mini"
                                    v-model="form.date2"
                                    type="date"
                                    placeholder="选择日期"
                                    style="width:150px;display: inline-block">
                            </el-date-picker>

                        <span> - </span>
                        <el-date-picker
                                size="mini"
                                v-model="form.date3"
                                type="date"
                                placeholder="选择日期"
                                style="width:150px;">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="2"  class="title"> 完成日期:</el-col>
                    <el-col :span="8">
                        <el-date-picker
                                size="mini"
                                v-model="form.date4"
                                type="date"
                                placeholder="选择日期"
                                style="width:150px;display: inline-block">
                        </el-date-picker>
                        <span> - </span>
                        <el-date-picker
                                size="mini"
                                v-model="form.date5"
                                type="date"
                                placeholder="选择日期"
                                style="width:150px;">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="primary" size="mini" @click.prevent="querySelect()">查询</el-button>
                        <el-button type="primary" size="mini" @click.prevent="resetForm()">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <div style="width:100%;max-width: 1200px;position: relative;" class="table-container">
                <el-button class="exp-btn" plain size="small" @click="exportExl('67')">导出</el-button>
                <el-table :data="dataList" border style="width: 100%" height="355" max-height="700">
                        <el-table-column label='' label-class-name="title-th">
                            <el-table-column prop="tichubumen" label-class-name="title-th" label="提出部门" show-overflow-tooltip width="150">
                            </el-table-column>
                            <el-table-column prop="tichuren" label-class-name="title-th" label="提出人" width="80">
                            </el-table-column>
                            <el-table-column prop="tichubumenfuzeren" label-class-name="title-th" label="提出部门负责人" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="shenqingriqi" label-class-name="title-th" label="提出时间" width="100">
                            </el-table-column>
                            <el-table-column prop="wentileixing" label-class-name="title-th" label="问题类型" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="chengbanrenquerenwentizhuan" label-class-name="title-th" label="问题状态" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="wentimiaoshu" label-class-name="title-th" label="问题描述" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="jianyi" label-class-name="title-th"  label="建议" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="chengbanbumen" label-class-name="title-th"  label="承办部门" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="chengbanbumenfuzeren" label-class-name="title-th"  label="承办部门负责人" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="chengbanren" label-class-name="title-th"  label="承办人" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="wanchengshijian" label-class-name="title-th"  label="承办完成时间" show-overflow-tooltip width="100">
                            </el-table-column>
                            <el-table-column prop="cuoshijishuoming" label-class-name="title-th"  label="实施措施及结果说明" show-overflow-tooltip width="100">
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
    import { exportExl } from '../../utils';
    export default {
        name: 'person-problem',
    data() {
        return {
            dataList: [],
            page: {
                pagesize: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            form: {
                date2: this.$moment().year(this.$moment().year()).startOf('year').valueOf(),
                date3: this.$moment().subtract(1, 'days').format('YYYY-MM-DD'),
                date4: this.$moment().year(this.$moment().year()).startOf('year').valueOf(),
                date5: this.$moment().subtract(1, 'days').format('YYYY-MM-DD'),
            },
            shortLabel: "90",
        }
    },
    computed: {

        submitterList: {
            get() {
                return this.$store.state.common.psmuser || [];
            },
            set(val) {
                this.$store.commit('setPsmUser', val);
            }
        },
    },
    methods: {
        filterData() {
            return res;
        },
        CurrentChange(val) {
            this.page.currentPage = val;
            this.getProductDetailed();
        },
        //问题提出和解决流程统计 接口
        getProductDetailed() {
            let params = {
                applyStartDate: this.$moment(this.form.date2).format('YYYY-MM-DD'),
                applyEndDate: this.form.date3,
                finishStartDate: this.$moment(this.form.date4).format('YYYY-MM-DD'),
                finishEndDate: this.form.date5,
                pageNo: this.page.currentPage,
                pageSize: this.page.pagesize,
        };
            this.$api.common.prosearch(params).then(res => {
                this.page.totalNumber = res.count;
                    this.dataList = res.data || [];
                    for(let i in this.dataList){
                        this.dataList[i].index = Number(i)+1
                    }
            })

        },
        //查询
        querySelect(){
            this.getProductDetailed();
        },
        //重置
        resetForm(){
                this.form.date2= "";
                this.form.date3= "";
                this.form.date4= "";
                this.form.date5= "";
               //调用接口
                this.getProductDetailed();
        },
        exportExl(type) {
            let count = 0;
            switch (type) {
                case '67':
                    count = this.page.totalNumber;
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
            let filename = '';
            switch (type) {
                case '67':
                    filename = "问题提出和解决流程统计.xls";
                    break;
            }
            let params = {
                applyStartDate: this.$moment(this.form.date2).format('YYYY-MM-DD'),
                applyEndDate: this.form.date3,
                finishStartDate: this.$moment(this.form.date4).format('YYYY-MM-DD'),
                finishEndDate: this.form.date5,
                pageNo: this.page.currentPage,
                pageSize: this.page.pagesize,
                isExprot: '1'
            };
            this.$api.common.getProblemExportDetailed(params).then(res => {
                exportExl(res, filename);
            })
        },
    },
    mounted() {
        this.$nextTick(() => {
                this.getProductDetailed();
        });
    }
}
</script>
<style type="text/css" scoped>
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
        top: 19px;
    }

    .table-container {
        padding-top: 60px;
    }

    .title {
        font-size: 14px;
        color: #5c5c5c;
    }
</style>