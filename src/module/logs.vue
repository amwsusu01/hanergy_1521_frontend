<template>
    <div>
        <div class="box">
            <el-form ref="form" :inline="true" :model="form" class="contain" size="mini">
                <el-form-item label="查询时间:" prop="date">
                    <el-col :span="8" style="width:120px;">
                        <el-date-picker size="mini" type="month" :placeholder=initTime value-format="yyyy-MM" v-model="form.date.startTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col style="width:120px;display: inline-block">
                        <el-date-picker size="mini" type="month" :placeholder=initTime value-format="yyyy-MM" :picker-options="pickerOptions" v-model="form.date.endTime" style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item class="buttons">
                    <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="table">
                <el-button class="exp-btn" plain size="small" @click="exportExl(9)">导出</el-button>
                <el-table :data="loglist" border style="width: 100%">
                    <el-table-column prop="month" label="用户操作日志" label-class-name="table-title">
                        <el-table-column prop="month" label="时间" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="name" label="用户名" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="username" label="姓名" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="ip" label="登录ip" min-width="15%">
                        </el-table-column>
                        <el-table-column prop="operate" label="操作对象" show-overflow-tooltip min-width="25%">
                        </el-table-column>
                        <el-table-column prop="type" label="操作类型" show-overflow-tooltip min-width="15%">
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
export default {
	name:'logs',
    data() {
        return {
            loglist: [{
            	month:'2018-09-18',
            	name:'chen wen ji',
            	username:'chen',
            	ip:'10.90.3.19',
            	operate:'测试',
            	type:'测试'
            }],
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
    methods:{
    	CurrentChange(val) {
    		this.page.currentPage = val
            this.getLogData();
    	},
    	getLogData() {

    	}
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