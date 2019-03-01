<template>
  <div class="canteen-history-order">
    <div class="box">
      <el-form :inline="true" ref="form" class="contain" size="mini">
        <el-form-item label="负责人:" size="mini" prop="konggujitua">
            <el-select v-model="form.approverList" @change="selectChange" style="width: 251px;" multiple placeholder="无限制" collapse-tags size="mini">
              <el-option v-for="(item, idx) in approverList" :key="idx" :label=item :value=item>
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="招聘负责人:" size="mini" prop="konggujitua">
            <el-select v-model="form.recruiterList" @change="selectChange" style="width: 251px;" multiple placeholder="无限制" collapse-tags size="mini">
              <el-option v-for="(item,idx) in recruiterList" :key="idx" :label=item :value=item>
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="HRVP:" size="mini" prop="konggujitua">
            <el-select v-model="form.hrvpList" @change="selectChange" style="width: 251px;" multiple placeholder="无限制" collapse-tags size="mini">
              <el-option v-for="(item, idx) in hrvpList" :key="idx" :label=item :value=item>
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="集团:" size="mini" prop="konggujitua">
            <el-select v-model="form.buoncodeList" @change="selectChange" style="width: 251px;" multiple placeholder="无限制" collapse-tags size="mini">
              <el-option v-for="(item, idx) in buoncodeList" :key="idx" :label=item :value=item>
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="部门事业部:" size="mini" prop="konggujitua">
            <el-select v-model="form.divicodeList" @change="selectChange" style="width: 251px;" multiple placeholder="无限制" collapse-tags size="mini">
              <el-option v-for="(item, idx) in divicodeList" :key="idx" :label=item :value=item>
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="业务单元:" size="mini" prop="konggujitua">
            <el-select v-model="form.busUnitList" @change="selectChange" style="width: 251px;" multiple placeholder="无限制" collapse-tags size="mini">
              <el-option v-for="(item, idx) in busUnitList" :key="idx" :label=item :value=item>
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="职位:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写职位" v-model="form.jobTitleList"/>
        </el-form-item>
        <el-form-item label="候选人姓名:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写候选人姓名" v-model="form.candidateList"/>
        </el-form-item>
        <el-form-item label="候选人工号:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写候选人工号" v-model="form.positionNumberList"/>
        </el-form-item>
        <el-form-item label="谈薪时间:" prop="date">
          <el-col :span="8" style="width:122px;">
              <el-date-picker v-model="salaryTime.value1" value-format="yyyy-MM-d" placeholder="选择日期时间" :picker-options="pickerOptionsBeforeSalary" @change="changeTime" size="mini" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col style="width:122px;display: inline-block">
              <el-date-picker v-model="salaryTime.value2" value-format="yyyy-MM-d" placeholder="选择日期时间" :picker-options="pickerOptionsAfterSalary" @change="changeTime" size="mini" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="offer时间:" prop="date">
          <el-col :span="8" style="width:122px;">
              <el-date-picker v-model="offerTime.value1" value-format="yyyy-MM-d" placeholder="选择日期时间" :picker-options="pickerOptionsBeforeOffer" @change="changeTime" size="mini" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col style="width:122px;display: inline-block">
              <el-date-picker v-model="offerTime.value2" value-format="yyyy-MM-d" placeholder="选择日期时间" :picker-options="pickerOptionsAfterOffer" @change="changeTime" size="mini" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="入职时间:" prop="date">
          <el-col :span="8" style="width:122px;">
              <el-date-picker v-model="entryTime.value1" value-format="yyyy-MM-d" placeholder="选择日期时间" :picker-options="pickerOptionsBeforeEntry" @change="changeTime" size="mini" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col style="width:122px;display: inline-block">
              <el-date-picker v-model="entryTime.value2" value-format="yyyy-MM-d" placeholder="选择日期时间" :picker-options="pickerOptionsAfterEntry" @change="changeTime" size="mini" style="width: 100%;"></el-date-picker>
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
          </el-table-column>
          <el-table-column prop="nationalidcardmun" label="候选人身份证" width="150">
          </el-table-column>
          <el-table-column prop="jobTitle" label="应聘职位" width="120">
          </el-table-column>
          <el-table-column prop="jobLevel" label="推荐职级" width="100">
          </el-table-column>
          <el-table-column prop="buoncode" label="应聘的集团" width="150">
          </el-table-column>
          <el-table-column prop="hrvp" label="应聘部门所属HRVP" width="120">
          </el-table-column>
          <!-- 应聘部门 -->
          <el-table-column prop="divicode" label="应聘的部门/事业部" width="100"> 
          </el-table-column>
          <el-table-column prop="busUnit" label="业务单元" width="150">
          </el-table-column>
          <el-table-column prop="locationcode" label="工作地点" width="120">
          </el-table-column>
          <!-- 没有看到数据 TODOLIST -->
          <el-table-column prop="" label="是否在华为工作过" width="100">
          </el-table-column>
          <el-table-column label="在华为工作时间" width="100">
          </el-table-column>
          <!-- 没有看到数据 TODOLIST -->
          <el-table-column prop="hiringManager" label="入职后汇报领导" width="100">
          </el-table-column>
          <el-table-column prop="leaderShip" label="分管领导" width="150">
          </el-table-column>
          <el-table-column prop="resumeSource" label="简历来源" width="120">
          </el-table-column>
          <el-table-column prop="talkSalaryDate" fixed="right" label="谈薪日期" width="100">
          </el-table-column>
          <el-table-column prop="offerDate" fixed="right" label="offer日期" width="100">
          </el-table-column>
          <el-table-column prop="jobDate" fixed="right" label="入职日期" width="100">
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
        <el-pagination layout="total, prev, pager, next" :page-size="page.pageShowNum" @current-change="CurrentChange" :current-page="page.currentPage" :total="page.totalNumber">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import { exportExl } from '../../../utils';
import holdSelect from '../../../components/common/holding-select.vue'; // 控股集团
export default {
  data (){
    return {
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
      tableData: [],
      approverList: [], // 负责人
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
          jobTitleList: '', // 职位
          candidateList: '', // 候选人姓名
          positionNumberList: '', // 候选人工号
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
        get(){
            return this.$store.state.common.user;
        }
    },
  },
  watch: {
    
  },
  components: {
    holdSelect
  },
  created() {
    let now = new Date(),
     nowYear = now.getFullYear(),
     nowMonth = now.getMonth(),
     nowDate = now.getDate();
    let nowTime = nowYear + '-0' + nowMonth + '-' + nowDate;
    //this.salaryTime.value1 = this.salaryTime.value2 = this.offerTime.value1 = this.offerTime.value2 = this.entryTime.value1 = this.entryTime.value2 = nowTime;
    // console.log('当前年份。。。。', nowYear);
    // console.log('当前月份。。。。', nowMonth);
    // console.log('当前时间日子。。。。', nowDate);
    // console.log('当前时间。。。。',now);
  },
  mounted (){
    // console.log('用户信息。。。', this.userObj);
    this.initData();
  },
  methods: {
    selectChange() {

    },
    exportExl() {
      let count = this.page.totalNumber;
      if(count > 10000){
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
      let params = {
        approver: this.form.approverList.join(','), //负责人
        recruiter: this.form.recruiterList.join(','), //招聘负责人
        hrvp: this.form.hrvpList.join(','), //HRVP
        buoncode: this.form.buoncodeList.join(','), //应聘的集团
        divicode: this.form.divicodeList.join(','), //应聘的部门/事业部
        busUnit: this.form.busUnitList.join(','), //业务单元
        jobTitle: this.form.jobTitleList, //应聘职位
        candidateName: this.form.candidateList, //候选人姓名
        positionNumber: this.form.positionNumberList, //候选人工号
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
      // 表单重置
      this.$refs.form.resetFields();
      this.form.approverList = [];
      this.form.recruiterList = [];
      this.form.hrvpList = [];
      this.form.buoncodeList = [];
      this.form.divicodeList = [];
      this.form.busUnitList = [];
      this.form.jobTitleList = '';
      this.form.candidateList = '';
      this.form.positionNumberList = '';
    },
    getParams() {
      let params = {
        approver: this.form.approverList.join(','), //负责人
        recruiter: this.form.recruiterList.join(','), //招聘负责人
        hrvp: this.form.hrvpList.join(','), //HRVP
        buoncode: this.form.buoncodeList.join(','), //应聘的集团
        divicode: this.form.divicodeList.join(','), //应聘的部门/事业部
        busUnit: this.form.busUnitList.join(','), //业务单元
        jobTitle: this.form.jobTitleList, //应聘职位
        candidateName: this.form.candidateList, //候选人姓名
        positionNumber: this.form.positionNumberList, //候选人工号
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
        page: this.page.currentPage,
        pageSize: this.page.pageShowNum
      }
      return params;
    },
    queryList() {
      this.getTableData();
    },
    changeTime(vm) {
      console.log('选中的事件。。。。。', vm)
    },
    initData() {
      this.init();
    },
    CurrentChange(val) {
      // 点击按钮改变当前页数
      this.page.currentPage = val
      this.getTableData()
    },
    getTableData() {
      let params = this.getParams();
      this.$api.canteen.getPersonnelflow(params).then(res => {
        this.page.totalNumber = res.count;
        this.tableData = res.data;
      })
    },
    getSelectData() {
      let obj = {
        approver: "",
        recruiter: "",
        hrvp: "",
        buoncode: "",
        divicode: "",
        busUnit: "",
        jobTitle: "",
        candidateName: "",
        positionNumber: ""
      }
      this.$api.canteen.getPersonnelFlowSelect(obj).then(res => {
        console.log('获取人员信息下拉框。。。。', res);

        this.approverList = res.approverList, // 负责人
        this.recruiterList = res.recruiterList, // 招聘负责人
        this.hrvpList = res.hrvpList, // hrvp数据
        this.buoncodeList= res.buoncodeList, // 集团
        this.divicodeList = res.divicodeList, // 部门事业部
        this.busUnitList = res.busUnitList, // 业务单元
        this.jobTitleList = res.jobTitleList, // 职位
        this.candidateList = res.candidateList, // 候选人姓名
        this.positionNumberList = res.positionNumberList // 候选人工号
      })
    },
    init() {
      this.getSelectData();
      this.getTableData();
    }
  }
}
</script>

<style lang="scss" scoped>

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
