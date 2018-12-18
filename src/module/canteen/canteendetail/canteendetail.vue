<template>
    <div>
        <div class="canteen-history-order">
            <div class="box">
                <el-form ref="form"  :inline="true" :model="form"  label-width="80px" class="contain" >
                    <el-form-item label="部门:">
                        <el-select v-model="form.region" placeholder="请选择部门" size="mini">
                            <el-option label="所有" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        <!--   <el-select v-model="value5" multiple placeholder="请选择">
                               <el-option
                                       v-for="item in options"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value">
                               </el-option>
                           </el-select> //选择多选-->

                    </el-form-item>
                    <el-form-item label="职级:" size="mini" class="zhiji">
                        <el-select v-model="form.name" placeholder="请选择职级" size="mini">
                            <el-option label="21级-24级" value="shanghai"></el-option>
                            <el-option label="15级-20级" value="beijing"></el-option>
                            <el-option label="10级-14级" value="beijing"></el-option>
                            <el-option label="05级-09级" value="beijing"></el-option>
                            <el-option label="01级-04级" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="查询时间:">
                        <el-col :span="8">
                            <el-date-picker size="mini" type="month" placeholder="选择月份" v-model="form.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="8">
                            <el-date-picker size="mini" type="month" placeholder="选择月份" v-model="form.date2" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-button size="mini" type="primary" class="query">查询</el-button>
                    </el-form-item>

                </el-form>
            </div>
            <div class="table-contain">
                <div class="table">
                    <el-table
                            :data="tableData3"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="超过4次(含)未请假未提报明细表"
                                style="font-size: 26px;">
                            <el-table-column
                                    prop="date"
                                    label="月份"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="日期"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="staffnumber"
                                    label="员工工号"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="staffname"
                                    label="员工姓名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="部门"
                                    show-overflow-tooltip>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            layout="total, prev, pager, next"
                            :total="400">
                    </el-pagination>
                </div>
                <div class="table">
                    <el-table
                            :data="tableData3"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="提报平均条数小于5明细表"
                                style="font-size: 26px;">
                            <el-table-column
                                    prop="date"
                                    label="月份"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="日期"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="提报时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="staffnumber"
                                    label="员工工号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="staffname"
                                    label="员工姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="部门"
                                    show-overflow-tooltip
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="提报内容"
                                    show-overflow-tooltip
                            >
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            layout="total, prev, pager, next"
                            :total="400">
                    </el-pagination>
                </div>
                <div class="table">
                    <el-table
                            :data="tableData3"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="提报平均字数小于5明细表"
                                style="font-size: 26px;">
                            <el-table-column
                                    prop="date"
                                    label="月份"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="日期"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="提报时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="staffnumber"
                                    label="员工工号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="staffname"
                                    label="员工姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="部门"
                                    show-overflow-tooltip
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="提报内容"
                                    show-overflow-tooltip
                            >
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            layout="total, prev, pager, next"
                            :total="400">
                    </el-pagination>
                </div>
                <div class="table">
                    <el-table
                            :data="tableData3"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="9点之前提报数据明细表"
                                style="font-size: 26px;">
                            <el-table-column
                                    prop="date"
                                    label="月份"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="日期"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="提报时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="staffnumber"
                                    label="员工工号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="staffname"
                                    label="员工姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="部门"
                                    show-overflow-tooltip
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="提报内容"
                                    show-overflow-tooltip
                            >
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            layout="total, prev, pager, next"
                            :total="400">
                    </el-pagination>
                </div>
                <div class="table">
                    <el-table
                            :data="tableData3"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="12点之前提报数据明细表"
                                style="font-size: 26px;">
                            <el-table-column
                                    prop="date"
                                    label="月份"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="日期"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="提报时间"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="staffnumber"
                                    label="员工工号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="staffname"
                                    label="员工姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="部门"
                                    show-overflow-tooltip
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="提报内容"
                                    show-overflow-tooltip
                            >
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            layout="total, prev, pager, next"
                            :total="400">
                    </el-pagination>
                </div>
                <div class="table">
                    <el-table
                            :data="tableData3"
                            border
                            style="width: 100%">
                        <el-table-column
                                prop="date"
                                label="超过4次(含)未请假未提报内容明细表"
                                style="font-size: 26px;">
                            <el-table-column
                                    prop="date"
                                    label="月份"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="日期"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="staffnumber"
                                    label="员工工号"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="staffname"
                                    label="员工姓名"
                                    width="100">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="部门"
                                    show-overflow-tooltip
                                    width="200">
                            </el-table-column>
                            <el-table-column
                                    prop="department"
                                    label="提报内容"
                                    show-overflow-tooltip
                            >
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage4"
                            layout="total, prev, pager, next"
                            :total="400">
                    </el-pagination>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "canteendetail",
        data() {
            return {
                tableData3: [
                    {
                        date: '2016-05',
                        name: '2016-05-03',
                        address: '上海市普陀区金沙江路 1518 弄',
                        staffnumber: "133333",
                        staffname: "王小虎",
                        department: "大数据研发部大数据研发部大数据研发部大数据研发部大数据研发部大数据研发部大数据研发部大数据研发部大数据研发部大数据研发部大数据研发部"
                    },
                    {
                        date: '2016-05',
                        name: '2016-05-03',
                        address: '上海市普陀区金沙江路 1518 弄',
                        staffnumber: "133333",
                        staffname: "王小虎",
                        department: "大数据研发部"
                    },
                    {
                        date: '2016-05',
                        name: '2016-05-03',
                        address: '上海市普陀区金沙江路 1518 弄',
                        staffnumber: "133333",
                        staffname: "王小虎",
                        department: "大数据研发部"
                    },
                    {
                        date: '2016-05',
                        name: '2016-05-03',
                        address: '上海市普陀区金沙江路 1518 弄',
                        staffnumber: "133333",
                        staffname: "王小虎",
                        department: "大数据研发部"
                    },
                    {
                        date: '2016-05',
                        name: '2016-05-03',
                        address: '上海市普陀区金沙江路 1518 弄',
                        staffnumber: "133333",
                        staffname: "王小虎",
                        department: "大数据研发部"
                    },

                ],
                currentPage4: 4, //当前页码
                form: {
                    name: '', //职级
                    region: '', //部门
                    value4:"",
                    value5:"",
                },


                checked: false,
                checkedAll: false, // 列表上下的全选
                checkedList: [], // 表格里所有的全选
                multipleSelection: [],
                cartList: [],
                confirmHight: true,
                response: false, // 加载完成
                allDel: true,
            }
        },
        mounted(){
            this.init();
        },
        filters: {

        },
        methods: {
            init(){
                // this.getCanteenOrderList();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
        }
    }

</script>

<style scoped>
    .canteen-history-order {

    }
    .rightline{
        margin-top: 15px;
        margin-right: 25px;
        text-align: right;
    }
    .contain{
        margin-top: 10px;

    }
    .zhiji{
        margin-top: 6px;
    }
    .query{
        margin-left: 30px;
    }
    .table{
        margin-left: 25px;
    }
    .block{
        text-align: right;
        margin-top: 10px;
        margin-right: 100px;
        margin-bottom: 30px;
    }
</style>