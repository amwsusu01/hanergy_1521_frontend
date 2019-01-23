<template>
    <div>
        <div class="box">
            <el-form ref="form" :inline="true" :model="form" class="contain" size="mini" style="margin-bottom:20px;">
                <el-row>
                    <el-col :span="2" style="font-size:14px;line-height: 28px;">查询时间:</el-col>
                    <el-col :span="8" style="width:150px;display: inline-block">
                                <el-date-picker size="mini" type="date" placeholder="无限制"  v-model="form.date.startTime" value-format="yyyy-MM-dd" style="width: 180px;">
                                </el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="8"  style="width:150px;display: inline-block">
                        <el-date-picker size="mini" type="date" placeholder="无限制" v-model="form.date.endTime" value-format="yyyy-MM-dd" style="width: 180px;">
                        </el-date-picker>
                    </el-col>

                <el-col :span="4" style="margin-left:50px;line-height: 27px;">
                    <el-form-item class="buttons">
                        <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
                    </el-form-item>
                </el-col>
                </el-row>
            </el-form>

            <div class="table">
                <el-button class="exp-btn" plain size="small" @click="exportExl('67')">导出</el-button>
                <el-table :data="loglist" border style="width: 100%">
                    <el-table-column label="用户操作日志" label-class-name="table-title">
                        <el-table-column prop="proTime" label="时间" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="userName" label="用户名" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="fullName" label="姓名" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="LoginIpAddr" label="登录ip" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="proTarget" label="操作对象" show-overflow-tooltip min-width="25%">
                        </el-table-column>
                        <el-table-column prop="proType" label="操作类型" show-overflow-tooltip min-width="15%">
                        </el-table-column>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange" :current-page="page.currentPage" :total="page.totalNumber" :page-size="page.pageShowNum" >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import { exportExl } from '../utils';
export default {
	name:'logs',
    data() {
        return {
            loglist: [],
            page: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            form: {
                date: { //时间
                    startTime: '',
                    endTime: ''
                }
            },
            pickerOptions: {
                disabledDate: (time) => {
                    return this.$moment(time).isBefore(this.form.date.startTime);
                }
            }
        }
    },
    mounted(){
	  this.getLogData();
    },
    methods:{
        queryList(){
            this.getLogData();
        },
    	CurrentChange(val) {
    		this.page.currentPage = val;
            this.getLogData();
    	},
    	getLogData() {
    	    let params ={
    	        start_date:this.form.date.startTime,
                end_date: this.form.date.endTime,
                pageNo:this.page.currentPage,
                pageSize:this.page.pageShowNum
    	    };
            this.$api.common.getLogsList(params).then(res =>{
                this.loglist = res.data ||[];
                this.page.totalNumber = res.count;
            })
    	},
      /*  exportExl() {
            let count = 0;
            count = this.page.totalNumber;
            if (count >= 10000) {
                this.$confirm('当前导出行数超过1万行， 是否继续?', '提示', {
                    confirmButtonText: '继续',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.exportExlOk();
                }).catch(() => {});
            } else {
                this.exportExlOk();
            }
        },

        exportExlOk() {
            let filename = "用户操作记录.xls";
            let params = {
                start_date: this.form.date.startTime,
                end_date: this.form.date.endTime,
             };
            this.$api.common.getlogsExport(params).then(res => {
                exportExl(res, filename);
            })
        },*/

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
                    filename = "用户操作记录.xls";
                    break;
            }
            let params = {
                start_date: this.form.date.startTime,
                end_date: this.form.date.endTime,
            };
            this.$api.common.getlogsExport(params).then(res => {
                exportExl(res, filename);
            })
        },
    }
}
</script>
<style type="text/css">
.table {
	position:relative;
}
.exp-btn {
    position: absolute;
    right: 15px;
    z-index: 1000;
    top: 10px;
}
.block {
    text-align: right;
    margin-top: 10px;
    margin-right: 100px;
    margin-bottom: 30px;
}
</style>