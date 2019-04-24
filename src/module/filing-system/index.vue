<template>
  <div class="container-filling">
    <div class="buttonBox">
      <el-button size="mini" type="primary" @click="editData">保存</el-button>
      <el-button size="mini" type="primary" @click="newlyBuild">新建</el-button>
      <el-button size="mini" type="primary" @click="edit">编辑</el-button>
    </div>
    
    <div class="table" style="background:#ccc">
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        @header-click="headerClick"
        :header-cell-style="headerCellStyle"
        style="width: 100%"
        max-height="500">
        <el-table-column
          prop="targetDate"
          label="目标时间"
          width="100">
          <template slot-scope="scope">
            <el-input v-if="createFlag" v-model="scope.row.targetDate"></el-input>
            <span v-else>{{scope.row.targetDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="产品" width="160" style="font-size: 34px;position:relaltive; left: 100px;">
          <el-table-column prop="proName" label=""  width="100">
            <template slot-scope="scope">
              <el-input v-if="createFlag" v-model="scope.row.proName"></el-input>
              <span v-else>{{scope.row.proName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="type"  label="" width="60">
              <template slot-scope="scope">
                <span v-if="scope.row.type == 0">预计</span>
                <span v-else>实际</span>
              </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="Jan" v-if="!appear.JanAppear" key="Jan">
          <el-table-column
            prop="province"
            label="Week1"
            width="100">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JanData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JanData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            label="Week2"
            width="100">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JanData.weekTwo"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag"  v-model="scope.row.JanData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="Week3"
            width="100">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JanData.weekThree"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag"  v-model="scope.row.JanData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week4"
            width="100">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JanData.weekFour"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag"  v-model="scope.row.JanData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week5"
            width="100">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JanData.weekFive"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JanData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="JanSum" v-else label="Jan" width="70" key="Jan1">
          <template slot-scope="scope">
                {{(Number(scope.row.JanData.weekOne)+Number(scope.row.JanData.weekTwo)+Number(scope.row.JanData.weekThree)+Number(scope.row.JanData.weekFour)+Number(scope.row.JanData.weekFive)).toFixed(2)}}
            </template>
        </el-table-column>

        <el-table-column v-if="!appear.FebAppear" label="Feb" key="Feb">
          <el-table-column
            prop="province"
            label="Week6"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.FebData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.FebData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            label="Week7"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.FebData.weekTwo"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.FebData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="Week8"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.FebData.weekThree"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.FebData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week9"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.FebData.weekFour"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag"  v-model="scope.row.FebData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week10"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.FebData.weekFive"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag"  v-model="scope.row.FebData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Feb1" width="70" prop="FebSum" label="Feb">
          <template slot-scope="scope">
            {{(Number(scope.row.FebData.weekOne)+Number(scope.row.FebData.weekTwo)+Number(scope.row.FebData.weekThree)+Number(scope.row.FebData.weekFour)+Number(scope.row.JanData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.MarAppear" label="Mar" key="Mar">
          <el-table-column
            prop="province"
            label="Week11"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.MarData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  :disabled="createFlag" v-model="scope.row.MarData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            label="Week12"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.MarData.weekTwo"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag"  v-model="scope.row.MarData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="Week13"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.MarData.weekThree"></el-input>
                <el-input v-else class="edit-cell"  :disabled="createFlag" v-model="scope.row.MarData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week14"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.MarData.weekFour"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.MarData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week15"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.MarData.weekFive"></el-input>
                <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.MarData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Mar1" width="70" prop="MarSum" label="Mar">
          <template slot-scope="scope">
            {{(Number(scope.row.MarData.weekOne)+Number(scope.row.MarData.weekTwo)+Number(scope.row.MarData.weekThree)+Number(scope.row.MarData.weekFour)+Number(scope.row.MarData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>


        <el-table-column v-if="!appear.AprilAppear" label="April" key="April">
          <el-table-column
            prop="province"
            label="Week16"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.AprilData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag"  v-model="scope.row.AprilData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week17"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.AprilData.weekTwo"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.AprilData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week18"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.AprilData.weekThree"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag"  v-model="scope.row.AprilData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week19"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.AprilData.weekFour"></el-input>
              <el-input v-else class="edit-cell"  :disabled="createFlag" v-model="scope.row.AprilData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week20"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.AprilData.weekFive"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.AprilData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="April1" width="70" prop="AprilSum" label="April">
          <template slot-scope="scope">
            {{(Number(scope.row.AprilData.weekOne)+Number(scope.row.AprilData.weekTwo)+Number(scope.row.AprilData.weekThree)+Number(scope.row.AprilData.weekFour)+Number(scope.row.AprilData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>


        <el-table-column v-if="!appear.MayAppear" label="May" key="May">
          <el-table-column
            prop="province"
            label="Week21"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.MayData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.MayData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week22"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.MayData.weekTwo"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag"  v-model="scope.row.MayData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week23"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.MayData.weekThree"></el-input>
              <el-input v-else class="edit-cell"  :disabled="createFlag" v-model="scope.row.MayData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week24"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.MayData.weekFour"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.MayData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week25"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.MayData.weekFive"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.MayData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="May1" width="70" prop="MaySum" label="May">
          <template slot-scope="scope">
            {{(Number(scope.row.MayData.weekOne)+Number(scope.row.MayData.weekTwo)+Number(scope.row.MayData.weekThree)+Number(scope.row.MayData.weekFour)+Number(scope.row.MayData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.JuneAppear" label="June" key="June">
          <el-table-column
            prop="province"
            label="Week26"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JuneData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JuneData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week27"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JuneData.weekTwo"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JuneData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week28"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JuneData.weekThree"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JuneData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week29"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JuneData.weekFour"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JuneData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week30"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JuneData.weekFive"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JuneData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="June1" width="70" prop="JuneSum" label="June">
          <template slot-scope="scope">
            {{(Number(scope.row.JuneData.weekOne)+Number(scope.row.JuneData.weekTwo)+Number(scope.row.JuneData.weekThree)+Number(scope.row.JuneData.weekFour)+Number(scope.row.JuneData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>


        <el-table-column v-if="!appear.JulyAppear" label="July" key="July">
          <el-table-column
            prop="province"
            label="Week31"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JulyData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JulyData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week32"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JulyData.weekTwo"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JulyData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week33"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JulyData.weekThree"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JulyData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week34"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JulyData.weekFour"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JulyData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week35"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.JulyData.weekFive"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.JulyData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="July1" width="70" prop="JulySum" label="July">
          <template slot-scope="scope">
            {{(Number(scope.row.JulyData.weekOne)+Number(scope.row.JulyData.weekTwo)+Number(scope.row.JulyData.weekThree)+Number(scope.row.JulyData.weekFour)+Number(scope.row.JulyData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>


        <el-table-column v-if="!appear.AuguAppear" label="Augu" key="Augu">
          <el-table-column
            prop="province"
            label="Week36"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.AuguData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.AuguData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week37"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.AuguData.weekTwo"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.AuguData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week38"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.AuguData.weekThree"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.AuguData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week39"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.AuguData.weekFour"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.AuguData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week40"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.AuguData.weekFive"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.AuguData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Augu1" width="70" prop="AuguSum" label="Augu">
          <template slot-scope="scope">
            {{(Number(scope.row.AuguData.weekOne)+Number(scope.row.AuguData.weekTwo)+Number(scope.row.AuguData.weekThree)+Number(scope.row.AuguData.weekFour)+Number(scope.row.AuguData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.SeptAppear" label="Sept" key="Sept">
          <el-table-column
            prop="province"
            label="Week41"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.SeptData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.SeptData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week42"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.SeptData.weekTwo"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.SeptData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week43"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.SeptData.weekThree"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.SeptData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week44"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.SeptData.weekFour"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.SeptData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week45"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.SeptData.weekFive"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.SeptData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Sept1" width="70" prop="SeptSum" label="Sept">
          <template slot-scope="scope">
            {{(Number(scope.row.SeptData.weekOne)+Number(scope.row.SeptData.weekTwo)+Number(scope.row.SeptData.weekThree)+Number(scope.row.SeptData.weekFour)+Number(scope.row.SeptData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.OctAppear" label="Oct" key="Oct">
          <el-table-column
            prop="province"
            label="Week46"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.OctData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.OctData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week47"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.OctData.weekTwo"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.OctData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week48"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.OctData.weekThree"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.OctData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week49"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.OctData.weekFour"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.OctData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week50"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.OctData.weekFive"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.OctData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Oct1" width="70" prop="OctSum" label="Oct">
          <template slot-scope="scope">
            {{(Number(scope.row.OctData.weekOne)+Number(scope.row.OctData.weekTwo)+Number(scope.row.OctData.weekThree)+Number(scope.row.OctData.weekFour)+Number(scope.row.OctData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.NovAppear" label="Nov" key="Nov">
          <el-table-column
            prop="province"
            label="Week51"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.NovData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.NovData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week52"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.NovData.weekTwo"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.NovData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week53"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.NovData.weekThree"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.NovData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week54"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.NovData.weekFour"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.NovData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week55"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.NovData.weekFive"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.NovData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Nov1" width="70" prop="NovSum" label="Nov">
          <template slot-scope="scope">
            {{(Number(scope.row.NovData.weekOne)+Number(scope.row.NovData.weekTwo)+Number(scope.row.NovData.weekThree)+Number(scope.row.NovData.weekFour)+Number(scope.row.NovData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.DecAppear" label="Dec" key="Dec">
          <el-table-column
            prop="province"
            label="Week56"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.DecData.weekOne"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.DecData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week57"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.DecData.weekTwo"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.DecData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week58"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.DecData.weekThree"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.DecData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week59"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.DecData.weekFour"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.DecData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week60"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="!createFlag && scope.row.disType == 0" v-model="scope.row.DecData.weekFive"></el-input>
              <el-input v-else class="edit-cell" :disabled="createFlag" v-model="scope.row.DecData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Dec1" width="70" prop="DecSum" label="Dec">
          <template slot-scope="scope">
            {{(Number(scope.row.DecData.weekOne)+Number(scope.row.DecData.weekTwo)+Number(scope.row.DecData.weekThree)+Number(scope.row.DecData.weekFour)+Number(scope.row.DecData.weekFive)).toFixed(2)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { setInterval } from 'timers';
export default {
  name: 'filing',
  data() {
    return {
      createFlag: false,
      appear:{
        JanAppear: true,
        FebAppear: true,
        MarAppear: true,
        AprilAppear: true,
        MayAppear: true,
        JuneAppear: true,
        JulyAppear: true,
        AuguAppear: true,
        SeptAppear: true,
        OctAppear: true,
        NovAppear: true,
        DecAppear: true
      },
      monthId:{
        Jan: 1,
      },
      tableData: []
    }
  },
  computed:{
    userObj: {
      get() {
          return this.$store.state.common.user;
      }
    },
  },
  mounted(){
    // if()
    // let tableData = JSON.parse(sessionStorage.getItem('tableData'));
    this.tableData = localStorage.getItem('tableData') ? JSON.parse(localStorage.getItem('tableData')) : this.tableData;
    
    this.initData();
  },
  methods:{
    // saveData(row, column, cell, event){
    //   console.log('row...', row);
    // },
    newlyBuild(){
      // 新建 创建两遍对象，因为是表格合并，只有类型不一样
      this.createFlag = true;
      for(var i = 0;i < 2; i++){
          this.tableData.push({
            monId: "",
            proName: "",
            targetDate: "",
            type: i,
            JanSum:'',
              FebSum: '',
              MarSum: '',
              AprilSum: '',
              MaySum: '',
              JuneSum: '',
              JulySum: '',
              AuguSum: '',
              SeptSum: '',
              OctSum: '',
              NovSum: '',
              DecSum: '',
              JanData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              FebData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              MarData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              AprilData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              MayData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              JuneData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              JulyData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              AuguData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              SeptData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              OctData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              NovData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              },
              DecData: {
                weekOne: '',
                weekTwo: '',
                weekThree: '',
                weekFour: '',
                weekFive:''
              }
          })
      }
    },
    edit(){
      // 编辑表格
      this.createFlag = false;
    },
    headerCellStyle({row, column, rowIndex, columnIndex}){
      if(rowIndex == 0 && columnIndex == 1){
        return {
          'background-color': '#ccc',
          'color': '#000',
          'border-bottom': 'none',
          'text-align': 'center',
          'z-index': '99',
          'position': 'relative',
          'padding-top': '40px',
          'padding-bottom': '0px',
          'height': '40px',
          'box-sizing': 'border-box',
        }
      } else if(rowIndex == 1 && columnIndex == 0) {
        return {
          'background-color': '#ccc',
          'color': '#000',
          'border-right': 'none'
        }
      } else {
        return {
          'background-color': '#ccc',
          'color': '#000',
        }
      }
    },
    headerClassName() {
      return {
        background: 'red'
      }
    },
    initData(){
      let userId = {
        userId: this.userObj.userId
      };
      let arr = [];
      this.$api.canteen.getProductCost(userId).then(res=>{
        console.log('产品成本数据...', res.data);
        res.data.forEach((item, index)=>{
          let proObj = {};
          proObj['proName'] = item.proName; // 产品名
          proObj['targetDate'] = item.targetDate; // 目标时间
          proObj['proid'] = item.proid;
          let newArr = [];
          // 存在一月份的数据
          item.Jan.forEach((value, key)=>{
            let Jan = {};
            Jan.JanSum = value.monData; // 月总量
            Jan.monId = value.monDataId; // 月份ID
            Jan.type = value.monDataType; // 月份数据的类型()
            Jan.disType = value.monDataType; // 禁用或不禁用的属性判断
            let JanData = {}; // 一月份的四周数据对象
            JanData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            JanData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            JanData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            JanData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            JanData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            Jan.JanData = JanData; // 一月份的四周数据
            newArr.push(Jan); 
          })
          
          // 存在二月份的数据
          item.Feb.forEach((value, key)=>{
            let Feb = {};
            Feb.FebSum = value.monData; // 月总量
            Feb.monId = value.monDataId; // 月份ID
            Feb.type = value.monDataType; // 月份数据的类型
            Feb.disType = value.monDataType; // 禁用或不禁用的属性判断
            let FebData = {}; // 一月份的四周数据对象
            FebData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            FebData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            FebData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            FebData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            FebData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            Feb.FebData = FebData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(Feb.type == 0){
              for(var i in Feb){
                newArr[0][i] = Feb[i];
              }
            } else {
              for(var i in Feb){
                newArr[1][i] = Feb[i];
              }
            }
          })

          // 存在三月份的数据
          item.Mar.forEach((value, key)=>{
            let Mar = {};
            Mar.MarSum = value.monData; // 月总量
            Mar.monId = value.monDataId; // 月份ID
            Mar.type = value.monDataType; // 月份数据的类型
            Mar.disType = value.monDataType; // 禁用或不禁用的属性判断
            let MarData = {}; // 一月份的四周数据对象
            MarData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            MarData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            MarData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            MarData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            MarData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            Mar.MarData = MarData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(Mar.type == 0){
              for(var i in Mar){
                newArr[0][i] = Mar[i];
              }
            } else {
              for(var i in Mar){
                newArr[1][i] = Mar[i];
              }
            }
          })

          // 存在四月份的数据
          item.Apr.forEach((value, key)=>{
            let April = {};
            April.AprilSum = value.monData; // 月总量
            April.monId = value.monDataId; // 月份ID
            April.type = value.monDataType; // 月份数据的类型
            April.disType = value.monDataType; // 禁用或不禁用的属性判断
            let AprilData = {}; // 一月份的四周数据对象
            AprilData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            AprilData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            AprilData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            AprilData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            AprilData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            April.AprilData = AprilData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(April.type == 0){
              for(var i in April){
                newArr[0][i] = April[i];
              }
            } else {
              for(var i in April){
                newArr[1][i] = April[i];
              }
            }
          })

          // 存在五月份的数据
          item.May.forEach((value, key)=>{
            let May = {};
            May.MaySum = value.monData; // 月总量
            May.monId = value.monDataId; // 月份ID
            May.type = value.monDataType; // 月份数据的类型
            May.disType = value.monDataType; // 禁用或不禁用的属性判断
            let MayData = {}; // 一月份的四周数据对象
            MayData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            MayData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            MayData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            MayData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            MayData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            May.MayData = MayData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(May.type == 0){
              for(var i in May){
                newArr[0][i] = May[i];
              }
            } else {
              for(var i in May){
                newArr[1][i] = May[i];
              }
            }
          })

          // 存在六月份的数据
          item.Jun.forEach((value, key)=>{
            let June = {};
            June.JuneSum = value.monData; // 月总量
            June.monId = value.monDataId; // 月份ID
            June.type = value.monDataType; // 月份数据的类型
            June.disType = value.monDataType; // 禁用或不禁用的属性判断
            let JuneData = {}; // 一月份的四周数据对象
            JuneData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            JuneData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            JuneData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            JuneData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            JuneData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            June.JuneData = JuneData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(June.type == 0){
              for(var i in June){
                newArr[0][i] = June[i];
              }
            } else {
              for(var i in June){
                newArr[1][i] = June[i];
              }
            }
          })

          // 存在七月份的数据
          item.Jul.forEach((value, key)=>{
            let July = {};
            July.JulySum = value.monData; // 月总量
            July.monId = value.monDataId; // 月份ID
            July.type = value.monDataType; // 月份数据的类型
            July.disType = value.monDataType; // 禁用或不禁用的属性判断
            let JulyData = {}; // 一月份的四周数据对象
            JulyData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            JulyData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            JulyData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            JulyData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            JulyData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            July.JulyData = JulyData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(July.type == 0){
              for(var i in July){
                newArr[0][i] = July[i];
              }
            } else {
              for(var i in July){
                newArr[1][i] = July[i];
              }
            }
          })

          // 存在八月份的数据
          item.Aug.forEach((value, key)=>{
            let Augu = {};
            Augu.AuguSum = value.monData; // 月总量
            Augu.monId = value.monDataId; // 月份ID
            Augu.type = value.monDataType; // 月份数据的类型
            Augu.disType = value.monDataType; // 禁用或不禁用的属性判断
            let AuguData = {}; // 一月份的四周数据对象
            AuguData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            AuguData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            AuguData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            AuguData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            AuguData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            Augu.AuguData = AuguData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(Augu.type == 0){
              for(var i in Augu){
                newArr[0][i] = Augu[i];
              }
            } else {
              for(var i in Augu){
                newArr[1][i] = Augu[i];
              }
            }
          })

          // 存在九月份的数据
          item.Sep.forEach((value, key)=>{
            let Sept = {};
            Sept.SeptSum = value.monData; // 月总量
            Sept.monId = value.monDataId; // 月份ID
            Sept.type = value.monDataType; // 月份数据的类型
            Sept.disType = value.monDataType; // 禁用或不禁用的属性判断
            let SeptData = {}; // 一月份的四周数据对象
            SeptData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            SeptData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            SeptData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            SeptData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            SeptData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            Sept.SeptData = SeptData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(Sept.type == 0){
              for(var i in Sept){
                newArr[0][i] = Sept[i];
              }
            } else {
              for(var i in Sept){
                newArr[1][i] = Sept[i];
              }
            }
          })

          // 存在十月份的数据
          item.Oct.forEach((value, key)=>{
            let Oct = {};
            Oct.OctSum = value.monData; // 月总量
            Oct.monId = value.monDataId; // 月份ID
            Oct.type = value.monDataType; // 月份数据的类型
            Oct.disType = value.monDataType; // 禁用或不禁用的属性判断
            let OctData = {}; // 一月份的四周数据对象
            OctData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            OctData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            OctData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            OctData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            OctData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            Oct.OctData = OctData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(Oct.type == 0){
              for(var i in Oct){
                newArr[0][i] = Oct[i];
              }
            } else {
              for(var i in Oct){
                newArr[1][i] = Oct[i];
              }
            }
          })

          // 存在十一月份的数据
          item.Nov.forEach((value, key)=>{
            let Nov = {};
            Nov.NovSum = value.monData; // 月总量
            Nov.monId = value.monDataId; // 月份ID
            Nov.type = value.monDataType; // 月份数据的类型
            Nov.disType = value.monDataType; // 禁用或不禁用的属性判断
            let NovData = {}; // 一月份的四周数据对象
            NovData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            NovData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            NovData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            NovData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            NovData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            Nov.NovData = NovData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(Nov.type == 0){
              for(var i in Nov){
                newArr[0][i] = Nov[i];
              }
            } else {
              for(var i in Nov){
                newArr[1][i] = Nov[i];
              }
            }
          })
          
          // 存在十二月份的数据
          item.Dec.forEach((value, key)=>{
            let Dec = {};
            Dec.DecSum = value.monData; // 月总量
            Dec.monId = value.monDataId; // 月份ID
            Dec.type = value.monDataType; // 月份数据的类型
            Dec.disType = value.monDataType; // 禁用或不禁用的属性判断
            let DecData = {}; // 一月份的四周数据对象
            DecData['weekOne'] = value.wekList[0] ? value.wekList[0].wekData : '';
            DecData['weekTwo'] = value.wekList[1] ? value.wekList[1].wekData : '';
            DecData['weekThree'] = value.wekList[2] ? value.wekList[2].wekData : '';
            DecData['weekFour'] = value.wekList[3] ? value.wekList[3].wekData : '';
            DecData['weekFive'] = value.wekList[4] ? value.wekList[4].wekData : '';
            Dec.DecData = DecData; // 一月份的四周数据
            // newArr.push(Feb); 
            if(Dec.type == 0){
              for(var i in Dec){
                newArr[0][i] = Dec[i];
              }
            } else {
              for(var i in Dec){
                newArr[1][i] = Dec[i];
              }
            }
          })

          newArr.map((value, key)=>{
            value['proName'] = proObj.proName;
            value['targetDate'] = proObj.targetDate;
            value['proid'] = proObj.proid;
          })
          newArr.forEach(function(values, keys){
            arr.push(values);
          })
        })
        this.tableData = arr;
        console.log('arr...', arr)
      })
    },
    editData(){
      // console.log(this.tableData);
      this.tableData.forEach(function(value, key){
        let sum1 = 0, sum2 = 0, sum3 = 0,sum4 =0, sum5 = 0, sum6 = 0, sum7 = 0, sum8 = 0, sum9 = 0, sum10 = 0, sum11 = 0, sum12 = 0;
        for(var i in value.JanData){
          sum1 += Number(value.JanData[i]);
        }
        value.JanSum = sum1;
        for(var j in value.FebData){
          sum2 += Number(value.FebData[j]);
        }
        value.FebSum = sum2;
        for(var j in value.MarData){
          sum3 += Number(value.MarData[j]);
        }
        value.MarSum = sum3;
        for(var j in value.AprilData){
          sum4 += Number(value.AprilData[j]);
        }
        value.AprilSum = sum4;
        for(var j in value.MayData){
          sum5 += Number(value.MayData[j]);
        }
        value.MaySum = sum5;
        for(var j in value.JuneData){
          sum6 += Number(value.JuneData[j]);
        }
        value.JuneSum = sum6;
        for(var j in value.JulyData){
          sum7 += Number(value.JulyData[j]);
        }
        value.JulySum = sum7;
        for(var j in value.AuguData){
          sum8 += Number(value.AuguData[j]);
        }
        value.AuguSum = sum8;
        for(var j in value.SeptData){
          sum9 += Number(value.SeptData[j]);
        }
        value.SeptSum = sum9;
        for(var j in value.OctData){
          sum10 += Number(value.OctData[j]);
        }
        value.OctSum = sum10;
        for(var j in value.NovData){
          sum11 += Number(value.NovData[j]);
        }
        value.NovSum = sum11;
        for(var j in value.DecData){
          sum11 += Number(value.DecData[j]);
        }
        value.DecSum = sum12;
      });
      localStorage.setItem('tableData', JSON.stringify(this.tableData));
      this.tableData = JSON.parse(localStorage.getItem('tableData'));
      console.log('this.tableData....', this.tableData);
    },
    headerClick(column, event){
      console.log('column....', column);
      console.log('event...', event);
      switch(column.label){
        case 'Jan':
          // this.$set(this.appear, )
          this.appear.JanAppear = !this.appear.JanAppear;
          break;
        case 'Feb': 
          this.appear.FebAppear = !this.appear.FebAppear;
          break;
        case 'Mar':
          this.appear.MarAppear = !this.appear.MarAppear;
          break;
        case 'April':
          this.appear.AprilAppear = !this.appear.AprilAppear;
          break;
        case 'May':
          this.appear.MayAppear = !this.appear.MayAppear;
          break;
        case 'June':
          this.appear.JuneAppear = !this.appear.JuneAppear;
          break;
        case 'July':
          this.appear.JulyAppear = !this.appear.JulyAppear;
          break;
        case 'Augu':
          this.appear.AuguAppear = !this.appear.AuguAppear;
          break;
        case 'Sept':
          this.appear.SeptAppear = !this.appear.SeptAppear;
          break;
        case 'Oct':
          this.appear.OctAppear = !this.appear.OctAppear;
          break;
        case 'Nov':
          this.appear.NovAppear = !this.appear.NovAppear;
          break;
        case 'Dec':
          this.appear.DecAppear = !this.appear.DecAppear;
          break;
      }
      console.log('this.appear....', this.appear);
      // if(column.label == 'Jan'){
      //   this.JanAppear = !this.JanAppear;
      // }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }else if(columnIndex === 1){
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
      }
    }
  }
}
</script>

<style lang="scss">
.container-filling{
  .buttonBox{
    margin-bottom: 10px;
  }
}
</style>
