<template>
  <!-- <div>
       <el-breadcrumb separator="/">
           <el-breadcrumb-item  :to="{ path: '/canteenPurchase'}">1521报表</el-breadcrumb-item>
           <el-breadcrumb-item  :to="{ path: '/canteenOrder'}">1521数据汇总统计</el-breadcrumb-item>
       </el-breadcrumb>
        <div class="box">
    <div class="rightline">更新时间: 2018-01-01</div>
    <el-form ref="form"  :inline="true" :model="form"  label-width="80px" class="contain" >
        <el-form-item label="部门:">
            <el-select v-model="form.region" placeholder="请选择部门" size="mini">
                <el-option label="所有" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="职级:" size="mini" class="zhiji">
            <el-input v-model="form.name"></el-input>
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
       <div>
               <div id="assemblyChart" class="relationShipChart"></div> &lt;!&ndash;<div class="download"></div>&ndash;&gt;
               <div id="assemblyTwoChart" class="relationShipChart"></div>
                <div id="assemblyThreeChart" class="relationShipChart"></div>
                <div id="assemblyFourChart" class="relationShipChart"></div>
                <div id="assemblyFiveChart" class="relationShipChart"></div>
       </div>

   </div>-->
    <div>1521报表首页</div>
</template>

<script>
    import js from "./canteenPurchase.js"
    export default js
</script>

<style scoped>
    .box{

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
    .relationShipChart {
        width: 500px;
        height: 330px;
        margin-top: 4px;
        margin-bottom: 20px;
        position: relative;
        display: inline-block;
    }
    .download{
        background: url("../../../assets/img/noSearch.png") no-repeat;
        background-size: cover;
        width: 30px;
        height: 30px;
        position: relative;
        top: -430px;
        right: -380px;
    }
</style>