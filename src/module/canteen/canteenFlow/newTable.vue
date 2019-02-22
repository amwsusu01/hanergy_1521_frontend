<template>
  <div class="new-container">
    <div class="box">
      <el-form :inline="true" ref="form" class="contain" size="mini">
        <el-form-item label="负责人:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="招聘负责人:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="HRVP:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="集团:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="部门事业部:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="业务单元:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="职位:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写职位"/>
        </el-form-item>
        <el-form-item label="候选人姓名:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写候选人姓名"/>
        </el-form-item>
        <el-form-item label="候选人工号:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写候选人工号"/>
        </el-form-item>
        <el-form-item label="查询时间:" prop="date">
          <el-col :span="8" style="width:120px;">
              <el-date-picker size="mini" type="month" value-format="yyyy-MM" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col style="width:120px;display: inline-block">
              <el-date-picker size="mini" type="month" value-format="yyyy-MM" style="width: 100%;">
              </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="offer时间:" prop="date">
          <el-col :span="8" style="width:120px;">
              <el-date-picker size="mini" type="month" value-format="yyyy-MM" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col style="width:120px;display: inline-block">
              <el-date-picker size="mini" type="month" value-format="yyyy-MM" style="width: 100%;">
              </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="谈薪时间:" prop="date">
          <el-col :span="8" style="width:120px;">
              <el-date-picker size="mini" type="month" value-format="yyyy-MM" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col style="width:120px;display: inline-block">
              <el-date-picker size="mini" type="month" value-format="yyyy-MM" style="width: 100%;">
              </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item class="operate buttons">
            <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
            <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
        </el-form-item>
        <div class="table">
            <el-button class="exp-btn" plain size="small">导出</el-button>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="date"
              label="负责人"
              width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              label="招聘负责人"
              width="120">
            </el-table-column>
            <el-table-column
              prop="province"
              label="候选人姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="city"
              label="候选人工号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="候选人身份证"
              width="150">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="招聘职位"
              width="120">
            </el-table-column>
            <el-table-column
              label="推荐职级"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="招聘的集团"
              width="150">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="应聘部门所属HRVP"
              width="120">
            </el-table-column>
            <el-table-column
              label="应聘的部门/事业部"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="业务单元"
              width="150">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="工作地点"
              width="120">
            </el-table-column>
            <el-table-column
              label="是否在华为工作过"
              width="100">
            </el-table-column>
            <el-table-column
              label="入职后汇报领导"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="分管领导"
              width="150">
            </el-table-column>
            <el-table-column
              prop="zip"
              label="简历来源"
              width="120">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="谈薪日期"
              width="100">
            </el-table-column>
          </el-table>
          </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import holdSelect from '../../../components/common/holding-select.vue'; // 控股集团
export default {
  data (){
    return {

    }
  },
  components: {
    holdSelect
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
</style>
