<template>
<!-- 离职人员报盘 -->
  <div class="canteen-history-order">
    <div class="box">
      <el-form :inline="true" ref="form" class="contain" size="mini">
        <el-form-item label="省公司/分公司:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="部门:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="职级:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="工作城市:" size="mini" prop="konggujitua">
            <hold-select  ref="holdSelect"></hold-select>
        </el-form-item>
        <el-form-item label="加入汉能时间:" size="mini" prop="konggujitua">
            <el-col :span="8" style="width:120px;">
              <el-date-picker size="mini" type="month" value-format="yyyy-MM" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col style="width:120px;display: inline-block">
              <el-date-picker size="mini" type="month" value-format="yyyy-MM" style="width: 100%;">
              </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="人员编号:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写人员编号"/>
        </el-form-item>
        <el-form-item label="人员姓名:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写人员姓名"/>
        </el-form-item>
        <el-form-item label="职位:" size="mini" prop="konggujitua">
            <el-input placeholder="请填写职位"/>
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
        <el-table-column label="人员报盘" label-class-name="table-title">
          <el-table-column prop="date" label="人员编号" width="150">
          </el-table-column>
          <el-table-column prop="name" label="人员姓名" width="120">
          </el-table-column>
          <el-table-column prop="province" label="省公司/分公司" width="120">
          </el-table-column>
          <el-table-column prop="city" label="部门" width="120">
          </el-table-column>
          <el-table-column prop="address" label="岗位名称" width="150">
          </el-table-column>
          <el-table-column prop="zip" label="职级" width="120">
          </el-table-column>
          <el-table-column label="在职状态" width="100">
          </el-table-column>
          <el-table-column prop="address" label="工作城市" width="150">
          </el-table-column>
          <el-table-column prop="zip" label="加入汉能时间" width="120">
          </el-table-column>
          <el-table-column prop="zip" label="甲方名称" width="120">
          </el-table-column>
          <el-table-column label="操作" width="100">
            <el-button type="primary" plain>查看详情</el-button>
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
