<template>
    <div class="canteen-history-order">
        <div class="box">
            <el-form :inline="true" ref="form" class="contain" size="mini">
                <el-form-item label="负责人:" size="mini" prop="approver">
                    <el-select v-model="approverList"
                               style="width: 251px;" multiple filterable
                               collapse-tags placeholder="无限制" size="mini"
                               @visible-change="visiblechange" @change="selectChange('approver',$event)"
                               :filter-method="search" @focus="mouseover('approver')">
                        <el-option :key="approver[0].label" :label="approver[0].label" :value="approver[0].label"
                                   @click.native="checkAllOpts('approver')">
                        </el-option>
                        <el-option v-for="item in approverListbak" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="招聘负责人:" size="mini" prop="recruiter">
                    <el-select v-model="recruiter[0].recruiterArray"
                               style="width: 251px;" multiple filterable
                               collapse-tags placeholder="无限制" size="mini" @change="selectChange('recruiter',$event)"
                               @visible-change="visiblechange"
                               :filter-method="search" @focus="mouseover('recruiter')">
                        <el-option :key="recruiter[0].label" :label="recruiter[0].label" :value="recruiter[0].label"
                                   @click.native="checkAllOpts('recruiter')">
                        </el-option>
                        <el-option v-for="item in recruitervalues" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="HRVP:" size="mini" prop="konggujitua">
                    <el-select v-model="form.hrvpList" @change="selectChange" style="width: 251px;" multiple
                               placeholder="无限制" collapse-tags size="mini">
                        <el-option v-for="(item, idx) in hrvpList" :key="idx" :label=item :value=item>
                        </el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="集团:" size="mini" prop="buoncode">
                    <el-select v-model="buoncode[0].buoncodeArray"
                               style="width: 251px;" multiple
                               collapse-tags placeholder="无限制" size="mini" @change="selectChange('buoncode',$event)"
                               @visible-change="visiblechange"
                               :filter-method="search" @focus="mouseover('buoncode')">
                        <el-option :key="buoncode[0].label" :label="buoncode[0].label" :value="buoncode[0].label"
                                   @click.native="checkAllOpts('buoncode')">
                        </el-option>
                        <el-option v-for="item in buoncodevalues" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门事业部:" size="mini" prop="buoncode">
                    <el-select v-model="divicode[0].divicodeArray"
                               style="width: 251px;" multiple filterable
                               collapse-tags placeholder="无限制" size="mini" @change="selectChange('divicode',$event)"
                               @visible-change="visiblechange"
                               :filter-method="search" @focus="mouseover('divicode')">
                        <el-option :key="divicode[0].label" :label="divicode[0].label" :value="divicode[0].label"
                                   @click.native="checkAllOpts('divicode')"/>
                        <el-option v-for="item in divicodevalues" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="业务单元:" size="mini" prop="konggujitua">
                    <el-select v-model="form.busUnitList" @change="selectChange" style="width: 251px;" multiple
                               placeholder="无限制" collapse-tags size="mini">
                        <el-option v-for="(item, idx) in busUnitList" :key="idx" :label=item :value=item>
                        </el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="职位:" size="mini" prop="">
                    <el-input placeholder="请填写职位" v-model="form.jobTitle"/>
                </el-form-item>
                <el-form-item label="候选人姓名:" size="mini" prop="">
                    <el-input placeholder="请填写候选人姓名" v-model="form.candidate"/>
                </el-form-item>
                <el-form-item label="候选人工号:" size="mini" prop="">
                    <el-input placeholder="请填写候选人工号" v-model="form.positionNumber"/>
                </el-form-item>
                <el-form-item label="简历时间:" prop="date">
                    <el-col :span="8" style="width:122px;">
                        <el-date-picker v-model="salaryTime.value1" value-format="yyyy-MM-dd" placeholder="选择日期时间"
                                        :picker-options="pickerOptionsBeforeSalary" @change="changeTime" size="mini"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col style="width:122px;display: inline-block">
                        <el-date-picker v-model="salaryTime.value2" value-format="yyyy-MM-dd" placeholder="选择日期时间"
                                        :picker-options="pickerOptionsAfterSalary" @change="changeTime" size="mini"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="offer时间:" prop="date">
                    <el-col :span="8" style="width:122px;">
                        <el-date-picker v-model="offerTime.value1" value-format="yyyy-MM-dd" placeholder="选择日期时间"
                                        :picker-options="pickerOptionsBeforeOffer" @change="changeTime" size="mini"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col style="width:122px;display: inline-block">
                        <el-date-picker v-model="offerTime.value2" value-format="yyyy-MM-dd" placeholder="选择日期时间"
                                        :picker-options="pickerOptionsAfterOffer" @change="changeTime" size="mini"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="入职时间:" prop="date">
                    <el-col :span="8" style="width:122px;">
                        <el-date-picker v-model="entryTime.value1" value-format="yyyy-MM-dd" placeholder="选择日期时间"
                                        :picker-options="pickerOptionsBeforeEntry" @change="changeTime" size="mini"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col style="width:122px;display: inline-block">
                        <el-date-picker v-model="entryTime.value2" value-format="yyyy-MM-dd" placeholder="选择日期时间"
                                        :picker-options="pickerOptionsAfterEntry" @change="changeTime" size="mini"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item class="operate buttons">
                    <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
                    <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table">
            <el-button class="exp-btn" plain size="small" @click="exportExl">导出</el-button>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="人员流量明细" label-class-name="table-title">
                    <el-table-column prop="approver" label="负责人" width="150" fixed>
                    </el-table-column>
                    <el-table-column prop="recruiter" label="应聘负责人" width="120">
                    </el-table-column>
                    <el-table-column prop="candidateName" label="候选人姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="positionNumber" label="候选人工号" width="120">
                        <template slot-scope="scope">
                            <div style="text-align: center">{{scope.row.positionNumber?scope.row.positionNumber:'--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nationalidcardmun" label="候选人身份证" width="150">
                    </el-table-column>
                    <el-table-column prop="jobTitle" label="应聘职位" width="120">
                    </el-table-column>
                    <el-table-column prop="jobLevel" label="推荐职级" width="100">
                    </el-table-column>
                    <el-table-column prop="buoncode" label="应聘的集团" width="150">
                    </el-table-column>
                    <!--<el-table-column prop="hrvp" label="应聘部门所属HRVP" width="120">
                        <template slot-scope="scope">
                            <div style="text-align: center">{{scope.row.hrvp?scope.row.hrvp:'&#45;&#45;'}}</div>
                        </template>
                    </el-table-column>-->
                    <!-- 应聘部门 -->
                    <el-table-column prop="divicode" label="应聘的部门/事业部" width="100">
                    </el-table-column>
                    <!--<el-table-column prop="busUnit" label="业务单元" width="150">
                        <template slot-scope="scope">
                            <div style="text-align: center">{{scope.row.busUnit?scope.row.busUnit:'&#45;&#45;'}}</div>
                        </template>
                    </el-table-column>-->
                    <el-table-column prop="locationcode" label="工作地点" width="120">
                    </el-table-column>
                    <!-- 没有看到数据 TODOLIST -->
                    <!-- <el-table-column prop="" label="是否在华为工作过" width="100">
                     </el-table-column>
                     <el-table-column label="在华为工作时间" width="100">
                     </el-table-column>-->
                    <!-- 没有看到数据 TODOLIST -->
                    <el-table-column prop="hiringManager" label="入职后汇报领导" width="100">
                    </el-table-column>
                    <!--<el-table-column prop="leaderShip" label="分管领导" width="150">
                        <template slot-scope="scope">
                            <div style="text-align: center">{{scope.row.leaderShip?scope.row.leaderShip:'&#45;&#45;'}}</div>
                        </template>
                    </el-table-column>-->
                    <el-table-column prop="resumeSource" label="简历来源" width="120">
                        <template slot-scope="scope">
                            <div style="text-align: center">{{scope.row.resumeSource?scope.row.resumeSource:'--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="talkSalaryDate" fixed="right" label="简历日期" width="100">
                    </el-table-column>
                    <el-table-column prop="offerDate" fixed="right" label="offer日期" width="100">
                        <template slot-scope="scope">
                            <div style="text-align: center">{{scope.row.offerDate?scope.row.offerDate:'--'}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="explanJobDate" fixed="right" label="预计入职日期" width="100">
                        <template slot-scope="scope">
                            <div style="text-align: center">{{scope.row.explanJobDate?scope.row.explanJobDate:'--'}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="jobDate" fixed="right" label="入职日期" width="100">
                        <template slot-scope="scope">
                            <div style="text-align: center">{{scope.row.jobDate?scope.row.jobDate:'--'}}</div>
                        </template>
                    </el-table-column>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination layout="total, prev, pager, next" :page-size="page.pageShowNum"
                           @current-change="CurrentChange" :current-page="page.currentPage" :total="page.totalNumber">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {exportExl} from '../../../utils';
    //import holdSelect from '../../../components/common/holding-select.vue'; // 控股集团
    export default {
        name: 'newTable1',
        data() {
            return {
                type:"",
                chackAll: true,
                approverList: ["戴慧婷", "刘浩", "陈兆爽", "郭炎焱", "耿保强", "柯贤林", "刘聪", "刘玲", "王青岭", "兰丽丽", "周晏斌", "邓小旭", "朱红强", "宋佳佳", "高旭", "田敏", "郑辉", "王齐", "刘立广", "丁垒"], // 负责人
                approverListbak:["戴慧婷", "刘浩", "陈兆爽", "郭炎焱", "耿保强", "柯贤林", "刘聪", "刘玲", "王青岭", "兰丽丽", "周晏斌", "邓小旭", "朱红强", "宋佳佳", "高旭", "田敏", "郑辉", "王齐", "刘立广", "丁垒"],
                salaryTime: {
                    value1: '2018-01-31',
                    value2: '2019-01-31',
                },
                offerTime: {
                    value1: '2018-01-31',
                    value2: '2019-01-31'
                },
                entryTime: {
                    value1: '2018-01-31',
                    value2: '2019-01-31'
                },
                isNo: false,
                tableData: [],
                recruiterList: [], // 招聘负责人
                hrvpList: [], // hrvp数据
                buoncodeList: [], // 集团
                divicodeList: [], // 部门事业部
                busUnitList: [], // 业务单元
                jobTitleList: '', // 职位
                candidateList: '', // 候选人姓名
                positionNumberList: '', // 候选人工号
                form: {
                    approverList: [], // 负责人
                    recruiterList: [], // 招聘负责人
                    hrvpList: [], // hrvp数据
                    buoncodeList: [], // 集团
                    divicodeList: [], // 部门事业部
                    busUnitList: [], // 业务单元
                    jobTitle: '', // 职位
                    candidate: '', // 候选人姓名
                    positionNumber: '', // 候选人工号
                },
                approvervalues: [],//负责人
                recruitervalues: [],//招聘负责人
                hrvpvalues: [],//hrvp
                buoncodevalues: [],
                divicodevalues: [],
                busUnitvalues: [],
                approver: [{
                    label: '全部',
                    approverArray: []
                }],
                recruiter: [{
                    label: '全部',
                    recruiterArray: []
                }],
                hrvp: [{
                    label: '全部',
                    hrvpArray: []
                }],
                buoncode: [{
                    label: '全部',
                    buoncodeArray: []
                }],
                divicode: [{
                    label: '全部',
                    divicodeArray: []
                }],
                busUnit: [{
                    label: '全部',
                    busUnitArray: []
                }],
                obj: {
                    approver: "",
                    recruiter: "",
                    hrvp: "",
                    buoncode: "",
                    divicode: "",
                    busUnit: ""
                },
                pickerOptionsBeforeSalary: {
                    disabledDate: (time) => {
                        return this.$moment(time).isAfter(this.salaryTime.value2);
                    }
                },
                pickerOptionsAfterSalary: {
                    disabledDate: (time) => {
                        return this.$moment(time).isBefore(this.salaryTime.value1);
                    }
                },
                pickerOptionsBeforeOffer: {
                    disabledDate: (time) => {
                        return this.$moment(time).isAfter(this.offerTime.value2);
                    }
                },
                pickerOptionsAfterOffer: {
                    disabledDate: (time) => {
                        return this.$moment(time).isBefore(this.offerTime.value1);
                    }
                },
                pickerOptionsBeforeEntry: {
                    disabledDate: (time) => {
                        return this.$moment(time).isAfter(this.entryTime.value2);
                    }
                },
                pickerOptionsAfterEntry: {
                    disabledDate: (time) => {
                        return this.$moment(time).isBefore(this.entryTime.value1);
                    }
                },
                initTime: this.updateTime,
                page: {
                    pageShowNum: 5, // 每页展示多少条
                    totalNumber: 0, // 总条数
                    currentPage: 1 // 当前页
                },
            }
        },
        computed: {

            userObj: {
                get() {
                    return this.$store.state.common.user;
                }
            },
        },
        watch: {},
        components: {
            //holdSelect
        },
        created() {
            this.resetTime();
        },
        mounted() {
            this.isNo = false;
            this.initData();
        },
        methods: {
            mouseover(type){
                this.type=type;
            },
            search(val) {
                if (val){
                    var type=this.type;
                    if (type == "approver") {
                        this.obj.approver = this.filter(val,this.approverList);
                    } else if (type == "recruiter") {
                        this.obj.recruiter = this.filter(val,this.recruiter[0].recruiterArray);
                    } else if (type == "buoncode") {
                        this.obj.buoncode = this.filter(val,this.buoncode[0].buoncodeArray);
                    } else if (type == "divicode") {
                        this.obj.divicode = this.filter(val,this.divicode[0].divicodeArray);
                    }
                    this.chackAll == false;
                }
            },
            checkAllOpts(type) {
                if (this.chackAll == true) {
                    if (type == "approver") {
                        this.approverList = [];
                    } else if (type == "recruiter") {
                        this.recruiter[0].recruiterArray = [];
                    } else if (type == "buoncode") {
                        this.buoncode[0].buoncodeArray = [];
                    } else if (type == "divicode") {
                        this.divicode[0].divicodeArray = [];
                    }
                    this.chackAll = false;
                } else {
                    if (type == "approver") {
                        this.approverList  = this.approverListbak;
                    } else if (type == "recruiter") {
                        this.recruiter[0].recruiterArray = this.recruitervalues
                    } else if (type == "buoncode") {
                        this.buoncode[0].buoncodeArray = this.buoncodevalues
                    } else if (type == "divicode") {
                        this.divicode[0].divicodeArray = this.divicodevalues
                    }
                    this.chackAll = true;
                }
            },
            selectChange(type, val) {
                debugger;
                if (type == "approver") {
                    if (val[0] == "全部") {
                        this.obj.approver = "";
                    } else {
                        if (val.length==0){
                            this.obj.approver = "";
                        } else if (val.length+1 == this.approverListbak.length) {
                            this.obj.approver = "";
                        }else if(this.form.approverList.length==val.length==1){
                            this.obj.approver = "";
                        } else {
                            this.obj.approver = val.join(",");
                            this.form.approverList=val;
                            this.chackAll=false;
                        }
                    }
                } else if (type == "recruiter") {
                    if (val[0] == "全部") {
                        this.obj.recruiter = "";
                        this.form.recruiterList = [];
                    } else {
                        if (!val){
                            this.obj.recruiter = "";
                        } else if (val.length - 1 == this.recruitervalues.length) {
                            this.obj.recruiter = "";
                        }else if(this.recruitervalues.length==val.length){
                            this.obj.recruiter = "";
                        }else {
                            this.obj.recruiter = val.join(",");
                            this.form.recruiterList=val;
                            this.chackAll=false;
                        }
                    }
                } else if (type == "buoncode") {
                    if (val[0] == "全部") {
                        this.obj.buoncode = "";
                        this.form.buoncodeList = [];
                    } else {
                        if(!val){
                            this.obj.buoncode = "";
                        } else if (val.length - 1 == this.buoncodevalues.length) {
                            this.obj.buoncode = "";
                        } else if(this.buoncodevalues.length==val.length){
                            this.obj.buoncode = "";
                        }else {
                            this.obj.buoncode = val.join(",");
                            this.form.buoncodeList=val;
                            this.chackAll=false;
                        }
                    }
                } else if (type = "divicode") {
                    if (val[0] == "全部") {
                        this.obj.divicode = "";
                        this.form.divicodeList = [];
                    } else {
                        if (!val){
                            this.obj.divicode = "";
                        } else if (val.length - 1 == this.divicodevalues.length) {
                            this.obj.divicode = "";
                        } else if(this.divicodevalues.length==val.length==1){
                            this.obj.divicode = "";
                        }else {
                            this.obj.divicode = val.join(",");
                            this.form.divicodeList =val;
                            this.chackAll=false;
                        }
                    }
                }
            },
            visiblechange(val){
                if (!val&& !this.chackAll) {
                    if (this.obj.approver || this.obj.recruiter || this.obj.buoncode || this.obj.divicode || this.obj.hrvp || this.obj.busUnit) {
                        this.getSelectData(this.obj);
                        this.chackAll = true;
                    }
                }
            },
            resetTime() {
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var firstDate = year + seperator1 + month + seperator1 + "01";
                var lastDateOfCurrentMonth = new Date(year, month, 0);
                var lastDate = year + seperator1 + month + seperator1 + lastDateOfCurrentMonth.getDate();
                this.salaryTime.value1 = this.offerTime.value1 = this.entryTime.value1 = firstDate;
                this.salaryTime.value2 = this.offerTime.value2 = this.entryTime.value2 = lastDate;
            },
            exportExl() {
                let count = this.page.totalNumber;
                if (count > 10000) {
                    this.$confirm('当前导出行数超过1万行， 是否继续?', '提示', {
                        confirmButtonText: '继续',
                        cancelButtonText: '取消',
                        type: 'info'
                    }).then(() => {
                        this.exportExlOk();
                    }).catch(() => {
                    });
                } else {
                    this.exportExlOk();
                }
            },
            exportExlOk() {
                let params = {
                    approver: this.form.approverList.join(','), //负责人
                    recruiter: this.form.recruiterList.join(','), //招聘负责人
                    hrvp: this.form.hrvpList.join(','), //HRVP
                    buoncode: this.form.buoncodeList.join(','), //应聘的集团
                    divicode: this.form.divicodeList.join(','), //应聘的部门/事业部
                    busUnit: this.form.busUnitList.join(','), //业务单元
                    jobTitle: this.form.jobTitle, //应聘职位
                    candidateName: this.form.candidate, //候选人姓名
                    positionNumber: this.form.positionNumber, //候选人工号
                    offerStartDate: this.offerTime.value1, //offer开始日期
                    offerEndDate: this.offerTime.value2, //offer结束如期
                    jobStartDate: this.entryTime.value1, //入职开始日期
                    jobEndDate: this.entryTime.value2, //入职结束日期
                    talkStartDate: this.salaryTime.value1, //谈薪开始日期
                    talkEndDate: this.salaryTime.value2, //谈薪结束日期
                    userId: 18000031,
                    userName: "suichen",
                    fullName: "隋琛",
                    systemId: "49",
                    systemName: "管理驾驶舱",
                    menuId: "54",
                    menuName: "人员流量明细",
                    proType: 6
                }
                let filename = '人员流量明细表.xls';
                this.$api.common.exportDetailFlow(params).then(res => {
                    exportExl(res, filename);
                })
            },
            resetForm() {
                //表单重置
                this.isNo = false;
                this.obj.approver = this.approverListbak.join(",");
                this.approverList=this.approverListbak;
                this.obj.recruiter = "";
                this.obj.hrvp = "";
                this.obj.buoncode = "";
                this.obj.divicode = "";
                this.obj.busUnit = "";
                this.getSelectData(this.obj);
                this.chackAll=true;
                this.form.approverList = this.approverListbak, // 负责人
                this.form.recruiterList = [], // 招聘负责人
                this.form.hrvpList = [], // hrvp数据
                this.form.buoncodeList = [], // 集团
                this.form.divicodeList = [], // 部门事业部
                this.form.busUnitList = [] // 业务单元
                this.form.jobTitle = '';
                this.form.candidate = '';
                this.form.positionNumber = '';
                this.resetTime();
                //this.$refs.form.resetFields();
                this.page.currentPage = 1;
                this.getTableData();
            },
            getParams() {
                let params = {
                    approver: this.form.approverList.join(','), //负责人
                    recruiter: this.form.recruiterList.join(','), //招聘负责人
                    hrvp: this.form.hrvpList.join(','), //HRVP
                    buoncode: this.form.buoncodeList.join(','), //应聘的集团
                    divicode: this.form.divicodeList.join(','), //应聘的部门/事业部
                    busUnit: this.form.busUnitList.join(','), //业务单元
                    jobTitle: this.form.jobTitle, //应聘职位
                    candidateName: this.form.candidate, //候选人姓名
                    positionNumber: this.form.positionNumber, //候选人工号
                    offerStartDate: this.offerTime.value1, //offer开始日期
                    offerEndDate: this.offerTime.value2, //offer结束如期
                    jobStartDate: this.entryTime.value1, //入职开始日期
                    jobEndDate: this.entryTime.value2, //入职结束日期
                    talkStartDate: this.salaryTime.value1, //谈薪开始日期
                    talkEndDate: this.salaryTime.value2, //谈薪结束日期
                    userId: 18000031,
                    userName: "suichen",
                    fullName: "隋琛",
                    systemId: "49",
                    systemName: "管理驾驶舱",
                    menuId: "54",
                    menuName: "人员流量明细",
                    proType: 4,
                    isNo: this.isNo,
                    page: this.page.currentPage,
                    pageSize: this.page.pageShowNum
                }
                return params;
            },
            queryList() {
                this.page.currentPage = 1;
                this.getTableData();
            },
            changeTime(vm) {
            },
            initData() {
                this.init();
            },
            CurrentChange(val) {
                // 点击按钮改变当前页数
                this.page.currentPage = val
                this.isNo = true;
                this.getTableData()
            },
            getTableData() {
                let params = this.getParams();
                this.$api.canteen.getPersonnelflow(params).then(res => {
                    this.page.totalNumber = res.count;
                    this.tableData = res.data;
                })
            },
            getSelectData(obj) {
                this.$api.canteen.getPersonnelFlowSelect(obj).then(res => {
                    this.approverList = res.approverList;// 负责人
                    this.recruiter[0].recruiterArray = res.recruiterList; // 招聘负责人
                    this.recruitervalues = res.recruiterList;
                    this.hrvp[0].hrvpArray = res.hrvpList; // hrvp数据
                    this.hrvpvalues = res.hrvpList;
                    this.buoncode[0].buoncodeArray = res.buoncodeList; // 集团
                    this.buoncodevalues = res.buoncodeList
                    this.divicode[0].divicodeArray = res.divicodeList; // 部门事业部
                    this.divicodevalues = res.divicodeList;
                    this.busUnit[0].busUnitArray = res.busUnitList; // 业务单元
                    this.busUnitvalues = res.busUnitList;
                    this.obj.approver = res.approverList.join(",");
                    this.form.approverList = res.approverList;
                    this.obj.recruiter ="";
                    this.form.recruiterList = res.recruiterList;
                    this.obj.hrvp = "";
                    this.form.hrvpList = res.hrvpList;
                    this.obj.buoncode = "";
                    this.form.buoncodeList = res.buoncodeList;
                    this.obj.divicode = "";
                    this.form.divicodeList = res.divicodeList;
                    this.obj.busUnit = "";
                    this.form.busUnitList = res.busUnitList;
                })
            },
            init() {
                this.obj.approver=this.approverList.join(',');
                this.getSelectData(this.obj);
                this.form.approverList =this.approverList;
                this.getTableData();
            }
        }
    }
</script>

<style lang="scss" scoped>

    .box {
        width: 100%;

    .el-form {
        width: 100%;
        position: relative;

    .el-form-item {
        width: 33%;
        position: relative !important;

    .el-form-item__content {
        position: absolute !important;
        right: 0 !important;
        top: 0 !important;
    }

    }
    .operate {
        width: 100%;
        position: relative;
        left: 80%;
        right: 0;
    }

    }
    }
    .table {
        position: relative;

    .exp-btn {
        position: absolute;
        right: 15px;
        z-index: 1000;
        top: 10px;
    }

    }
</style>
