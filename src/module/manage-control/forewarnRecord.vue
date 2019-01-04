<template>
    <div>
        <el-row>
            <el-col :span="2" class="query-time"> 查询时间:</el-col>
            <el-col :span="10"> <el-date-picker
                    size="mini"
                    v-model="startTime"
                    type="datetime"
                    placeholder="请选择时间">
            </el-date-picker>
                <span> - </span>
                <el-date-picker
                        size="mini"
                        v-model="endTime"
                        type="datetime"
                        placeholder="请选择时间">
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                <el-button @click="queryList()" type="primary" size="mini">查询</el-button>
            </el-col>
        </el-row>
        <el-table
                :data="tableData"
                style="width: 100%;margin-top: 30px;">
            <el-table-column
                    prop="beginDate"
                    label="时间"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="邮箱"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="content"
                    label="邮件标题">
            </el-table-column>
            <el-table-column
                    label="发送结果"
                    width="200">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.is_send>0" type="text" size="small">
                            <font color="#00ff00">成功</font>
                        </el-button>
                    <el-button v-else type="text" size="small">
                        <font color="#ff0000">失败</font>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination layout="total, prev, pager, next"  :page-size="page.pagesize" @current-change="currentChange" :current-page="page.currentPage" :total="page.totalNumber">
            </el-pagination>
        </div>

    </div>
</template>

<script>
    export default {
        name: "forewarning-record",
        data(){
            return {
                startTime: "",
                endTime: "",
                tableData:[],
                page: {
                    pagesize: 5, // 每页展示多少条
                    totalNumber: 0, // 总条数
                    currentPage: 1 // 当前页
                },
            }
        },
        methods:{
            queryList() {
                let params = {
                    warningLevel: "",// 预警等级（一级预警，二级预警，三级预警）
                    beginDate: this.$moment(this.startTime).format('YYYY-MM-DD HH:MM:SS'),//起始时间
                    endDate: this.$moment(this.endTime).format('YYYY-MM-DD HH:MM:SS'),//结束时间
                    page: this.page.currentPage,//当前页
                    pagesize: this.page.pagesize//每页展示多少条
                };
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