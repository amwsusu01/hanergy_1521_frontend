<template>
    <div class="canteen-history-order">
        <div class="box">
            <el-form :inline="true" :model="form" ref="form" class="contain" size="mini">
                <el-form-item label="控股集团:" size="mini" prop="konggujitua">
                    <hold-select :holdList="holdList"  ref="holdSelect" @updataOrgData="updateOrgData"></hold-select>
                </el-form-item>
                <el-form-item label="事业群:" size="mini" prop="rankname">
                    <career-select :careerList="careerList" ref="careerSelect" @updataOrgData="updateOrgData"></career-select>
                </el-form-item>
                <el-form-item label="事业部/公司:" size="mini" prop="rankname">
                    <business-unit :businessList="businessList" ref="businessUnit" @updataOrgData="updateOrgData"></business-unit>
                </el-form-item>
                <el-form-item label="省公司/分公司:" size="mini" prop="rankname">
                    <branch-office :branchList="branchList" ref="branchOffice" @updataOrgData="updateOrgData"></branch-office>
                </el-form-item>
                <el-form-item label="部门:" label-width="50px" prop="region">
                    <department-list :deptList="deptList" ref="deptSelect" @updataOrgData="updateOrgData"></department-list>
                    <!-- <el-select v-model="form.region" multiple filterable collapse-tags placeholder="请选择部门" size="mini" style="width: 251px;">
                        <el-option v-for="item in deptList" :key="item.dept_name" :label="item.dept_name" :value="item.dept_name" style="width: 251px;">
                        </el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label="职级:" size="mini" prop="rankname">
                    <rank-select ref="rankSelect" />
                </el-form-item>
                <el-form-item label="查询时间:" prop="date">
                    <el-col :span="8" style="width:120px;">
                        <el-date-picker size="mini" type="month" :placeholder=initTime value-format="yyyy-MM" v-model="form.date.startTime" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col style="width:120px;display: inline-block">
                        <el-date-picker size="mini" type="month" value-format="yyyy-MM" :placeholder=initTime :picker-options="pickerOptions" v-model="form.date.endTime" style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="员工姓名:" >
                    <el-input v-model="form.empname" placeholder="请填写姓名"/>
                </el-form-item>
                <el-form-item label="员工工号:">
                    <el-input v-model="form.empid" placeholder="请填写工号"/>
                </el-form-item>
                <el-form-item class="operate buttons">
                    <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
                    <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="超过4次(含)未请假未提报统计报表" name="first">
                <div class="table">
                        <el-button v-if="buttons['70']==true" class="exp-btn" plain size="small" @click="exportExl(3)">导出</el-button>
                        <el-table :data="tableData1" border style="width: 100%">
                            <el-table-column label="超过4次(含)未请假未提报统计报表" label-class-name="table-title">
                                <el-table-column prop="month1" label="月份" min-width="10%">
                                </el-table-column>
                                <el-table-column prop="inputtime" label="未提报日期" min-width="20%">
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
                    <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange1" :current-page="page1.currentPage" :total="page1.totalNumber" :page-size="page1.pageShowNum">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="提报月平均条数小于5明细表" name="second">
                <div class="table">
                    <el-button class="exp-btn" plain size="small" v-if="buttons['71']==true" @click="exportExl(4)">导出</el-button>
                    <el-table :data="tableData2" border style="width: 100%">
                        <el-table-column prop="date" label="提报月平均条数小于5明细表" label-class-name="table-title">
                            <el-table-column prop="in_month" label="月份" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="in_date" label="日期" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="in_datetime" label="提报时间" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="employeeID" label="员工工号" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="empname" label="员工姓名" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="departmentname" label="部门" show-overflow-tooltip min-width="15%">
                            </el-table-column>
                            <el-table-column prop="content_new" label="提报内容" show-overflow-tooltip min-width="30%">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <!--<el-pagination layout="total, prev, pager, next" @current-change="CurrentChange2" :current-page="page2.currentPage" :total="page2.totalNumber"></el-pagination>-->
                    <el-pagination layout="total, prev, pager, next" :total="page2.totalNumber" @size-change="handleSizeChange" @current-change="CurrentChange2"  :current-page="page2.currentPage" :page-size="page2.pageShowNum"></el-pagination>

                </div>
            </el-tab-pane>
            <el-tab-pane label="提报月平均字数小于5明细表" name="third">
                <div class="table">
                    <el-button class="exp-btn" v-if="buttons['72']==true" plain size="small" @click="exportExl(5)">导出</el-button>
                    <el-table :data="tableData3" border style="width: 100%">
                        <el-table-column prop="date" label="提报月平均字数小于5明细表" label-class-name="table-title">
                            <el-table-column prop="in_month" label="月份" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="in_date" label="日期" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="in_datetime" label="提报时间" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="employeeID" label="员工工号" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="empname" label="员工姓名" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="departmentname" label="部门" show-overflow-tooltip min-width="15%">
                            </el-table-column>
                            <el-table-column prop="content_new" label="提报内容" show-overflow-tooltip min-width="30%">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination layout="total, prev, pager, next" :page-size="page3.pageShowNum" @current-change="CurrentChange3" :current-page="page3.currentPage" :total="page3.totalNumber">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="9点之前提报数据明细表" name="fourth">
                <div class="table">
                    <el-button class="exp-btn" plain size="small" v-if="buttons['73']==true" @click="exportExl(6)">导出</el-button>
                    <el-table :data="tableData4" border style="width: 100%">
                        <el-table-column prop="date" label="9点之前提报数据明细表" label-class-name="table-title">
                            <el-table-column prop="MONTH" label="月份" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="DAY" label="日期" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="inputtime" label="提报时间" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="employeeID" label="员工工号" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="emp_name" label="员工姓名" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="dept_name" label="部门" show-overflow-tooltip min-width="15%">
                            </el-table-column>
                            <el-table-column prop="content_new" label="提报内容" show-overflow-tooltip min-width="30%">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination layout="total, prev, pager, next" :page-size="page4.pageShowNum" @current-change="CurrentChange4" :current-page="page4.currentPage" :total="page4.totalNumber">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="12点之前提报数据明细表" name="fifth">
                <div class="table">
                    <el-button class="exp-btn" plain size="small" v-if="buttons['74']==true" @click="exportExl(7)">导出</el-button>
                    <el-table :data="tableData5" border style="width: 100%">
                        <el-table-column prop="date" label="12点之前提报数据明细表" label-class-name="table-title">
                            <el-table-column prop="month" label="月份" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="day" label="日期" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="inputtime" label="提报时间" min-width="15%">
                            </el-table-column>
                            <el-table-column prop="employeeID" label="员工工号" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="emp_name" label="员工姓名" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="dept_name" label="部门" show-overflow-tooltip min-width="10%">
                            </el-table-column>
                            <el-table-column prop="content_new" label="提报内容" show-overflow-tooltip min-width="30%">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination layout="total, prev, pager, next" :page-size="page5.pageShowNum" @current-change="CurrentChange5" :current-page="page5.currentPage" :total="page5.totalNumber">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="提报内容重复超6次(含)汇总表" name="sixth">
                <div class="table">
                    <el-button class="exp-btn" plain v-if="buttons['75']==true" size="small" @click="exportExl(8)">导出</el-button>
                    <el-table :data="tableData6" border style="width: 100%">
                        <el-table-column prop="date" label="提报内容重复超6次(含)汇总表" label-class-name="table-title">
                            <el-table-column prop="month" label="月份" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="day" label="日期" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="employeeID" label="员工工号" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="empname" label="员工姓名" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="deptname" label="部门" show-overflow-tooltip min-width="10%">
                            </el-table-column>
                            <el-table-column prop="ts" label="重复次数" width="80" min-width="5%">
                            </el-table-column>
                            <el-table-column prop="content" label="提报内容" show-overflow-tooltip min-width="35%">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination layout="total, prev, pager, next" :page-size="page6.pageShowNum" @current-change="CurrentChange6" :current-page="page6.currentPage" :total="page6.totalNumber">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="提报内容重复超6次(含)明细表" name="seventh">
                <div class="table">
                    <el-button class="exp-btn" plain v-if="buttons['76']==true" size="small" @click="exportExl(9)">导出</el-button>
                    <el-table :data="tableData7" border style="width: 100%">
                        <el-table-column prop="month" label="提报内容重复超6次(含)明细表" label-class-name="table-title">
                            <el-table-column prop="MONTH" label="月份" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="day1" label="日期" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="employeeID" label="员工工号" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="empname" label="员工姓名" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="deptname" label="部门" show-overflow-tooltip min-width="15%">
                            </el-table-column>
                            <el-table-column prop="content_new" label="提报内容" show-overflow-tooltip min-width="35%">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination layout="total, prev, pager, next" @current-change="CurrentChange7" :current-page="page7.currentPage" :total="page7.totalNumber" :page-size="page7.pageShowNum"></el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="部门问题明细表" name="eighth">
                <div class="table">
                    <el-button v-if="buttons1['78']==true" class="exp-btn" plain size="small" @click="exportExl(1)">导出</el-button>
                    <el-table :data="tableDataQuestion" border style="width: 100%">
                        <el-table-column label="部门问题明细表" label-class-name="table-title">
                            <el-table-column prop="month" label="月份" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="day" label="日期" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="employeeID" label="员工工号" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="empname" label="员工姓名" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="deptname" label="部门" min-width="15%" show-overflow-tooltip>
                            </el-table-column>
                            <el-table-column prop="content" label="提报内容" min-width="45%" show-overflow-tooltip>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination layout="total, prev, pager, next"   :page-size="page8.pageShowNum"  @current-change="CurrentChange8" :current-page="page8.currentPage" :total="page8.totalNumber">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="部门反省明细表" name="ninth">
                <div class="table">
                    <el-button v-if="buttons1['79']==true" class="exp-btn" plain size="small" @click="exportExl(2)">导出</el-button>
                    <el-table :data="tableDataIntro" border style="width: 100%">
                        <el-table-column label="部门反省明细表" label-class-name="table-title">
                            <el-table-column prop="month" label="月份" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="day" label="日期" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="employeeID" label="员工工号" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="empname" label="员工姓名" min-width="10%">
                            </el-table-column>
                            <el-table-column prop="deptname" label="部门" show-overflow-tooltip min-width="15%">
                            </el-table-column>
                            <el-table-column prop="content" label="提报内容" show-overflow-tooltip min-width="45%">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination layout="total, prev, pager, next"  :page-size="page9.pageShowNum" @current-change="CurrentChange9" :current-page="page9.currentPage" :total="page9.totalNumber">
                    </el-pagination>
                </div>
            </el-tab-pane>

            <el-tab-pane label="全员提报数据明细" name="tenth">
                <div class="table">
                    <el-button v-if="buttons1['79']==true" class="exp-btn" plain size="small" @click="exportExl(2)">导出</el-button>
                    <el-table :data="tableDataSub" border style="width: 100%">
                        <el-table-column label="部门反省明细表" label-class-name="table-title">
                            <el-table-column prop="in_month" label="月份" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="in_date" label="日期" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="inputtime" label="提报时间" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="employeeID" label="员工工号" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="type" label="职级" show-overflow-tooltip min-width="45%" width="150">
                            </el-table-column>
                            <el-table-column prop="empname" label="员工姓名" show-overflow-tooltip min-width="15%" width="150">
                            </el-table-column>
                            <el-table-column prop="dept_name" label="部门" show-overflow-tooltip min-width="45%" width="150">
                            </el-table-column>
                            <el-table-column prop="konggujituan" label="控股集团" show-overflow-tooltip min-width="15%" width="150">
                            </el-table-column>
                            <el-table-column prop="shiyequn" label="事业群" show-overflow-tooltip min-width="45%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_1" label="1-发现并解决问题" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_2" label="2-工作" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_3" label=" 3-工作" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_4" label="4-工作" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_5" label="5-工作" show-overflow-tooltip min-width="45%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_6" label=" 6-发现并解决问题" show-overflow-tooltip min-width="15%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_7" label="7-客户" show-overflow-tooltip min-width="45%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_8" label="8-工作" show-overflow-tooltip min-width="15%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_9" label=" 9-工作" show-overflow-tooltip min-width="45%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_10" label="10-工作" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_11" label="11-工作" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_12" label="12-工作" min-width="10%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_13" label="13-工作" show-overflow-tooltip min-width="45%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_14" label="14-工作" show-overflow-tooltip min-width="15%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_15" label="15-工作" show-overflow-tooltip min-width="45%" width="150">
                            </el-table-column>
                            <el-table-column prop="1521_16" label="16-反省" show-overflow-tooltip min-width="15%" width="150">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="block">
                    <el-pagination layout="total, prev, pager, next"  :page-size="page10.pageShowNum" @current-change="CurrentChange10" :current-page="page10.currentPage" :total="page10.totalNumber">
                    </el-pagination>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="table-contain">
            
        </div>
    </div>
</template>
<script>
import { formatChange } from '../../../assets/js/util'
import Paging from '../../../components/common/Paging'
import { exportExl } from '../../../utils';
import departmentList from '../../../components/common/department-list.vue';
import rankSelect from '../../../components/common/rank-select.vue';
import holdSelect from '../../../components/common/holding-select.vue'; // 控股集团
import careerSelect from '../../../components/common/career-select.vue'; // 事业群
import businessUnit from '../../../components/common/business-unit.vue'; // 事业群
import branchOffice from '../../../components/common/branch-office.vue'; // 事业群

export default {
    name: 'canteenHistoryOrder',
    components: {
        Paging,
        departmentList,
        rankSelect,
        holdSelect,
        careerSelect,
        businessUnit,
        branchOffice
    },
    data() {
        return {
            activeName2: 'first',
            isInit:false, //第一次打开初始false,记录日志，否则不记录
            tableData1: [],
            tableData2: [],
            tableData3: [],
            tableData4: [],
            tableData5: [],
            tableData6: [],
            tableData7: [],
            page1: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            page2: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            page3: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            page4: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            page5: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            page6: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            page7: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            page8: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            page9: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            page10: {
                pageShowNum: 5, // 每页展示多少条
                totalNumber: 0, // 总条数
                currentPage: 1 // 当前页
            },
            initTime: this.updateTime, //初始化的时间
            startTimeUnix: 0,
            deptList: [],
            holdList: [], // 控股集团列表
            careerList: [], // 事业群列表
            businessList: [], // 事业部列表
            branchList: [], // 省公司/分公司
            rankOptions: [{
                    name: '21-24',
                    disabled: false
                }, {
                    name: '15-20',
                    disabled: false
                }, {
                    name: '10-14',
                    disabled: true
                }, {
                    name: '05-09',
                    disabled: true
                },
                {
                    name: '01-04',
                    disabled: true
                }
            ],
            form: {
                rankname: [], //职级
                region: [], //部门
                date: { //时间
                    startTime: '',
                    endTime: ''
                },
                empname:"",
                empid:""
            },
            originForm: {
                rankname: '', //职级
                region: [], //部门
                date: { //时间
                    startTime: '',
                    endTime: ''
                },
                empname:"",
                empid:""
            },
            pickerOptions: {
                disabledDate: (time) => {
                    return this.$moment(time).isBefore(this.form.date.startTime);
                }
            },
            tableDataQuestion: [], //问题明细
            tableDataIntro: [], //反省明细
            tableDataSub: [], // 全员提报数据明细
            allOrganization: {
                konggujituan: [],
                shiyequn: [],
                shiyebu: [],
                shenggongsi: []
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
        this.isInit  = false;
        this.initData();

        this.getOrganization();
    },
    computed: {
        buttons: {
            get() {
                //获取当前可导出的按钮组
                if (this.$store.state.common.menuData && this.$store.state.common.menuData.length > 0 && this.$store.state.common.menuData[0].list) {
                    let curMenu = this.$store.state.common.menuData[0].list.find((item) => item.menuId == '54'); //1521明细的菜单
                    //1521问题和反省明细
                    if (curMenu && curMenu.list) {
                        // console.log('处理成功1.。。。。。。。。。。')
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
        buttons1: {
            get() {
                //获取当前可导出的按钮组
                if (this.$store.state.common.menuData && this.$store.state.common.menuData.length > 0 && this.$store.state.common.menuData[0].list) {
                    let curMenu = this.$store.state.common.menuData[0].list.find((item) => item.menuId == '56'); //1521问题和反省明细
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
        // deptList: {
        //     get() {
        //         return this.$store.state.common.deptments;
        //     },
        //     set() {
        //         this.$store.commit('setDeptments', val);
        //     }
        // },
        updateTime: {
            get() {
                return this.$store.state.common.updateTime;
            }
        },
        userObj: {
            get(){
                return this.$store.state.common.user;
            }
        }
    }, // 计算属性
    methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        initData() {
            if (this.updateTime && this.deptList.length > 0) {
                this.form.date.startTime = this.initTime; //默认显示时间
                this.form.date.endTime = this.initTime //默认显示时间
                // this.form.region = this.deptList.map((a) => a.dept_name);
                this.form.region = this.deptList.map((a) => a);
                if (this.$refs['deptSelect']) {
                    this.$refs['deptSelect'].values = this.form.region.concat();
                }
                this.init();
            }
        },
        init() {
            this.getTabledata1()
            this.getTabledata2()
            this.getTabledata3() // TODO List
            this.getTabledata4()
            this.getTabledata5()
            this.getTabledata6()
            this.getTabledata7()
            this.getIssueDetail()
            this.getIntrospectionDetail()
            this.gettableDataSub()
        },
        getParams(page) {
            let params = {
                dept: this.getDepts(), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
                employeeName:this.form.empname,
                employeeID:this.form.empid,
                page: page.currentPage,
                pageSize: page.pageShowNum,
                userId: this.userObj.userId,
                userName: this.userObj.username,
                fullName: this.userObj.name,
                systemId: "49",//系统id
                systemName: "管理驾驶舱",
                menuId: "56",
                menuName: "问题/反省库",
                proType: 4,
                isNo:this.isInit,
                jituanList: this.allOrganization.konggujituan.join(','),
                shiyequnList: this.allOrganization.shiyequn.join(','),
                shiyebuList: this.allOrganization.shiyebu.join(','),
                shenggongsiList: this.allOrganization.shenggongsi.join(',')
            }

            return params;
        },
        updateOrgData(obj) { // 下拉框联动效果
            
            if ( obj.type == 'konggu') {
                this.allOrganization.konggujituan = obj.val.length> 0 ? obj.val : [];
            } else if(obj.type == 'shiyequn') {
                this.allOrganization.shiyequn = obj.val.length> 0 ? obj.val : [];
            } else if(obj.type == 'shiyebu') {
                this.allOrganization.shiyebu = obj.val.length > 0 ? obj.val : [];
            } else if (obj.type == 'shenggongsi'){
                this.allOrganization.shenggongsi = obj.val.length > 0 ? obj.val : [];
            } 
            this.$api.common.getOrganization(this.allOrganization).then(res => {
                console.log('更新集团下拉框数据。。。。', res);
                this.holdList = res.jituanList; // 控股集团下拉框
                this.careerList = res.shiyequnList; // 事业群下拉框
                this.businessList = res.shiyebuList; // 事业部下拉框
                this.branchList = res.shenggongsiList; // 省公司下拉框
                console.log('this.deptList....', res.deptList);
                this.deptList = res.deptList;
                // this.form.region = res.deptList;
                this.$refs['deptSelect'].values = res.deptList;
            })
        },
        // 获取所有控股集团以及集团下的所有事业群，事业部，省公司，以及部门
        getOrganization() {
            let params = {
                konggujituan: '',
                shiyequn: '',
                shiyebu: '',
                shenggongsi: ''
            }
            this.$api.common.getOrganization(params).then(res => {
                this.holdList = res.jituanList; // 控股集团
                this.careerList = res.shiyequnList; // 事业群
                this.businessList = res.shiyebuList; // 事业部
                this.branchList = res.shenggongsiList; // 省公司/ 分公司
                this.deptList = res.deptList; // 部门
            })
        },
        //初始化表格数据-----部门问题明细
        getIssueDetail() {
            let params = this.getParams1(this.page8);

            this.$api.canteen.getProblemList(params).then(res => {
                this.page8.totalNumber = res.count
                let qusetionData = res.data;
                console.log(qusetionData)
                this.tableDataQuestion = qusetionData;

                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange8(val) {
            this.isInit  = true;
            this.page8.currentPage = val
            this.getIssueDetail()
        },
        //部门反省明细
        getIntrospectionDetail() {
            let params = this.getParams1(this.page9);
            this.$api.canteen.getIntrospectionList(params).then(res => {
                this.page9.totalNumber = res.count
                let qusetionData = res.data;
                this.tableDataIntro = qusetionData;

                this.originForm = Object.assign({}, this.form); //保存上一次的值
            })
        },
        CurrentChange9(val) {
            this.isInit  = true;
            this.page9.currentPage = val
            this.getIntrospectionDetail()
        },
        // 全员提报数据明细
        gettableDataSub(){
            let params = this.getParams1(this.page10);
            this.$api.canteen.gettableDataSub(params).then(res => {
                console.log('全员提报数据明细。。。。', res);
                this.page10.totalNumber = res.count
                let qusetionData = res.data;
                this.tableDataSub = qusetionData;

                this.originForm = Object.assign({}, this.form); //保存上一次的值
            })
        },
        CurrentChange10(val){
            this.isInit  = true;
            this.page10.currentPage = val
            this.gettableDataSub()
        },
        getDepts() {
            if (this.$refs['deptSelect']) {
                this.form.region = this.$refs['deptSelect'].values.concat();
            }
            if (this.$refs['rankSelect']) {
                this.form.rankname = this.$refs['rankSelect'].values.concat();
            }
            // if (this.$refs['holdSelect']) {
            //     this.allOrganization.konggujitua = this.$refs['holdSelect'].values.concat();
            // }
            // if (this.$refs['careerSelect']) {
            //     this.allOrganization.shiyequn = this.$refs['careerSelect'].values.concat();
            // }
            // if (this.$refs['businessUnit']) {
            //     this.allOrganization.shiyebu = this.$refs['businessUnit'].values.concat();
            // }
            // if (this.$refs['branchOffice']) {
            //     this.allOrganization.shenggongsi = this.$refs['branchOffice'].values.concat();
            // }
            let resDepts = '';
            if (this.form.region.length > 0) {
                resDepts = this.form.region.join(',');
            } else {
                let deptNames = this.deptList.map((a) => {
                    // return a.dept_name;
                    return a;
                })

                resDepts = deptNames.join(',');
            }
            return resDepts;
        },
        getParams1(page) {
            console.log(page);
            let params = {
                dept: this.getDepts(), //部门
                jobGrade: this.form.rankname.join(','), //值级
                employeeName:this.form.empname,
                employeeID:this.form.empid,
                beginDate: this.form.date.startTime,
                endDate: this.form.date.endTime,
                page: page.currentPage,
                pageSize: page.pageShowNum,
                userId: this.userObj.userId,
                userName: this.userObj.username,
                fullName: this.userObj.name,
                systemId: "49",//系统id
                systemName: "管理驾驶舱",
                menuId: "54",
                menuName: "1521明细",
                proType: 4,
                isNo:this.isInit,
                jituanList: this.allOrganization.konggujituan.join(','),
                shiyequnList: this.allOrganization.shiyequn.join(','),
                shiyebuList: this.allOrganization.shiyebu.join(','),
                shenggongsiList: this.allOrganization.shenggongsi.join(',')
            }
            return params;
        },
        //表格初始化数据---超过四次
        getTabledata1() {
            let params = this.getParams(this.page1);
            this.$api.canteen.getcgscDetail(params).then(res => {
                this.page1.totalNumber = res.count;
                let cgsc = res.data;
                //不要屏蔽,这个转时间
                cgsc.map((item) => {
                    item.inputtime = formatChange(item.inputtime, 2)
                    return item
                })
                this.tableData1 = cgsc;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange1(val) {
            this.isInit  = true;
            this.page1.currentPage = val
            this.getTabledata1()
        },
        //-----条数小于5
        getTabledata2() {
            let params = this.getParams(this.page2);
            this.$api.canteen.gettsxywDetail(params).then(res => {
                this.page2.totalNumber = res.count
                let tsxyw = res.data;
                tsxyw.map((item) => {
                    item.in_date = formatChange(item.in_date, 2)
                    return item
                })
                this.tableData2 = tsxyw;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange2(val) {
            this.isInit  = true;
            this.page2.currentPage = val
            this.getTabledata2()
        },
        handleSizeChange(val) {
            this.page2.pageShowNum = val;
            // console.log(`每页 ${val} 条`);
            this.getTabledata2();
        },
        //-----字数小于5
        getTabledata3() {
            let params = this.getParams(this.page3);
            this.$api.canteen.getzsxywDetail(params).then(res => {
                this.page3.totalNumber = res.count
                let zsxyw = res.data
                zsxyw.map((item) => {
                    item.in_date = formatChange(item.in_date, 2)
                    return item
                })
                this.tableData3 = zsxyw;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange3(val) {
            this.isInit  = true;
            this.page3.currentPage = val
            this.getTabledata3()
        },
        //-----九点之前
        getTabledata4() {
            let params = this.getParams(this.page4);
            this.$api.canteen.getjdzqDetail(params).then(res => {
                this.page4.totalNumber = res.count
                let jdzq = res.data
                // jdzq.map((item) => {
                //     item.inputtime = formatChange(item.inputtime, 2)
                //     return item
                // })
                this.tableData4 = jdzq;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange4(val) {
            this.isInit  = true;
            this.page4.currentPage = val
            this.getTabledata4()
        },
        //十二点之前
        getTabledata5() {
            let params = this.getParams(this.page5);
            this.$api.canteen.getsedzqDetail(params).then(res => {
                this.page5.totalNumber = res.count
                let sedzq = res.data
                // sedzq.map((item) => {
                //     item.inputtime = formatChange(item.inputtime, 2)
                //     return item
                // })
                this.tableData5 = sedzq;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange5(val) {
            this.isInit  = true;
            this.page5.currentPage = val
            this.getTabledata5()
        },
        //重复超过六次汇总
        getTabledata6() {
            let params = this.getParams(this.page6);
            this.$api.canteen.getcglhzDetail(params).then(res => {
                this.page6.totalNumber = res.count
                let cglhz = res.data;
                cglhz.map((item) => {
                    item.day = formatChange(item.day, 2)
                    return item
                })
                this.tableData6 = cglhz;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange6(val) {
            this.isInit  = true;
            this.page6.currentPage = val
            this.getTabledata6()
        },
        //重复超过六次明细
        getTabledata7() {
            let params = this.getParams(this.page7);
            this.$api.canteen.getcglmxDetail(params).then(res => {
                this.page7.totalNumber = res.count
                let cglmx = res.data;
                cglmx.map((item) => {
                    item.day1 = formatChange(item.day1, 2)
                    return item
                })
                this.tableData7 = cglmx;
                this.originForm = Object.assign({}, this.form);
            })
        },
        CurrentChange7(val) {
            this.isInit  = true;
            this.page7.currentPage = val
            this.getTabledata7()
        },
        //查询数据接口
        queryList() {
            this.isInit  = false;
            this.getTabledata1();
            this.getTabledata2();
            this.getTabledata3();
            this.getTabledata4();
            this.getTabledata5();
            this.getTabledata6();
            this.getTabledata7();
            this.getIssueDetail();
            this.getIntrospectionDetail();
            this.gettableDataSub();
        },

        // 表单重置
        resetForm() {
            this.$refs.form.resetFields();
            this.form.region = [];
            this.form.date.startTime = this.initTime; //默认显示时间
            this.form.date.endTime = this.initTime ;//默认显示时间
            this.form.empname="";
            this.form.empid="";
            
            this.allOrganization.konggujitua = [];

            //this.holdList = []; // 控股集团列表
            // this.careerList = ""; // 事业群列表
            // this.businessList = ""; // 事业部列表
            // this.branchList = ""; // 省公司/分公司
            
            //  holdSelect,rankname,businessUnit,branchOffice
            

            if(this.$refs['holdSelect']) {
                this.$refs['holdSelect'].values = [];
            }
            if(this.$refs['careerSelect']) {
                this.$refs['careerSelect'].values = [];
            }
            if(this.$refs['businessUnit']) {
                this.$refs['businessUnit'].values = [];
            }
            if(this.$refs['branchOffice']) {
                this.$refs['branchOffice'].values = [];
            }
            if(this.$refs['deptSelect']) {
                this.$refs['deptSelect'].values = this.form.region.concat();
            }
            if(this.$refs['rankSelect']) {
                this.$refs['rankSelect'].values = this.form.rankname.concat();
            }
             this.init();
             this.getOrganization();
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
                case 1:
                    count = this.page8.totalNumber;
                    break;
                case 2:
                    count = this.page9.totalNumber;
                    break;
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
                // type: `type` + type,
                type: type,
                dept: this.getDepts(),
                jobGrade: this.originForm.rankname.join(','),
                employeeName:this.originForm.empname,
                employeeID:this.originForm.empid,
                beginDate: this.originForm.date.startTime,
                endDate: this.originForm.date.endTime,
                userId: this.userObj.userId,
                userName: this.userObj.username,
                fullName: this.userObj.name,
                systemId: "49",//系统id
                systemName: "管理驾驶舱",
                menuId: "54",
                menuName: "1521明细",
                proType: 6
            }

            let filename = '';
            switch (type) {
                case 1:
                    filename = "部门问题明细表.xls";
                    break;
                case 2:
                    filename = "部门反省明细表.xls";
                    break;
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
            
            this.$api.common.export(params).then(res => {
                console.log('打印表格。。。。。。。', res);
                exportExl(res, filename);
            })
        }

    }
}
</script>
<style lang="scss" scoped>
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

.box{
    width:100%;
    .el-form{
        width:100%;
        position: relative;
        .el-form-item{
            width:33%;
            position: relative !important;
            .el-form-item__content{
                position: absolute !important;
                right:0 !important;
                top:0 !important;
            }
        }
        .operate{
            width:100%;
            position: relative;
            left:80%;
            right:0;
        }
    }
}
</style>