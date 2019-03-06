<template>
<!-- 销售人员数据 -->
  <div class="canteen-history-order">
    <div class="box">
      <el-form :inline="true" ref="form" class="contain" size="mini">
        <el-form-item label="签约主体:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="事业部:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="业务部门:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="省公司:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="日期:" size="mini" prop="konggujitua">
            <el-col :span="8" style="width:120px;">
              <el-date-picker size="mini" type="month" value-format="yyyy-MM" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col style="width:120px;display: inline-block">
              <el-date-picker size="mini" type="month" value-format="yyyy-MM" style="width: 100%;">
              </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="销售人员:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写销售人员姓名"/>
        </el-form-item>
        <el-form-item label="负责人:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写负责人姓名"/>
        </el-form-item>
        <el-form-item class="operate buttons">
            <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
            <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div> 
    <div class="table">
      <el-button class="exp-btn" plain size="small">导出</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="销售人员回款明细数据" label-class-name="table-title">
          <el-table-column prop="date" label="签约主体" width="150">
          </el-table-column>
          <el-table-column prop="name" label="事业部" width="120">
          </el-table-column>
          <el-table-column prop="province" label="业务部门" width="120">
          </el-table-column>
          <el-table-column prop="city" label="省公司" width="120">
          </el-table-column>
          <el-table-column prop="address" label="负责人" width="150">
          </el-table-column>
          <el-table-column prop="zip" label="汇款销售人员" width="120">
          </el-table-column>
          <el-table-column label="销售类别" width="100">
          </el-table-column>
          <el-table-column prop="address" label="项目模式" width="150">
          </el-table-column>
          <el-table-column prop="zip" label="金额" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="日期" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="客户名称" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="合同" width="100">
          </el-table-column>
          <el-table-column prop="zip" label="商机编码" width="100">
          </el-table-column>
          <el-table-column prop="zip" label="会计凭证编码" width="110">
          </el-table-column>
        </el-table-column>
      </el-table>
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
