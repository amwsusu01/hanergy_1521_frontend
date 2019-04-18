<template>
  <div class="container-filling">
    <el-button size="mini" type="primary" @click="editData">保存</el-button>
    <div class="table">
      <el-table
        :data="tableData"
        :span-method="objectSpanMethod"
        @header-click="headerClick"
        style="width: 100%"
        max-height="500">
        <el-table-column
          prop="date"
          label="目标时间"
          width="100">
        </el-table-column>
        <el-table-column prop="name" label="产品" width="120">
          <el-table-column prop="province" label=""  width="100"> </el-table-column>
          <el-table-column prop="type"  label="" width="100">
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
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JanData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JanData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            label="Week2"
            width="100">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JanData.weekTwo"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.JanData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="Week3"
            width="100">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JanData.weekThree"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.JanData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week4"
            width="100">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JanData.weekFour"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.JanData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week5"
            width="100">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JanData.weekFive"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.JanData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="JanSum" v-else label="Jan" width="100" key="Jan1">
          <template slot-scope="scope">
                {{Number(scope.row.JanData.weekOne)+Number(scope.row.JanData.weekTwo)+Number(scope.row.JanData.weekThree)+Number(scope.row.JanData.weekFour)+Number(scope.row.JanData.weekFive)}}
            </template>
        </el-table-column>

        <el-table-column v-if="!appear.FebAppear" label="Feb" key="Feb">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.FebData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.FebData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            label="Week2"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.FebData.weekTwo"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.FebData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="Week3"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.FebData.weekThree"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.FebData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week4"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.FebData.weekFour"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.FebData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week5"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.FebData.weekFive"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.FebData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Feb1" prop="FebSum" label="Feb">
          <template slot-scope="scope">
            {{Number(scope.row.FebData.weekOne)+Number(scope.row.FebData.weekTwo)+Number(scope.row.FebData.weekThree)+Number(scope.row.FebData.weekFour)+Number(scope.row.JanData.weekFive)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.MarAppear" label="Mar" key="Mar">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.MarData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.MarData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            label="Week2"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.MarData.weekTwo"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.MarData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="Week3"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.MarData.weekThree"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.MarData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week4"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.MarData.weekFour"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.MarData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week5"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.MarData.weekFive"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.MarData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Mar1" prop="MarSum" label="Mar">
          <template slot-scope="scope">
            {{Number(scope.row.MarData.weekOne)+Number(scope.row.MarData.weekTwo)+Number(scope.row.MarData.weekThree)+Number(scope.row.MarData.weekFour)+Number(scope.row.MarData.weekFive)}}
          </template>
        </el-table-column>


        <el-table-column v-if="!appear.AprilAppear" label="April" key="April">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.AprilData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.AprilData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.AprilData.weekTwo"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.AprilData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.AprilData.weekThree"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.AprilData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.AprilData.weekFour"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.AprilData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.AprilData.weekFive"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.AprilData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="April1" prop="AprilSum" label="April">
          <template slot-scope="scope">
            {{Number(scope.row.AprilData.weekOne)+Number(scope.row.AprilData.weekTwo)+Number(scope.row.AprilData.weekThree)+Number(scope.row.AprilData.weekFour)+Number(scope.row.AprilData.weekFive)}}
          </template>
        </el-table-column>


        <el-table-column v-if="!appear.MayAppear" label="May" key="May">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.MayData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.MayData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.MayData.weekTwo"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.MayData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.MayData.weekThree"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.MayData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.MayData.weekFour"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.MayData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.MayData.weekFive"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.MayData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="May1" prop="MaySum" label="May">
          <template slot-scope="scope">
            {{Number(scope.row.MayData.weekOne)+Number(scope.row.MayData.weekTwo)+Number(scope.row.MayData.weekThree)+Number(scope.row.MayData.weekFour)+Number(scope.row.MayData.weekFive)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.JuneAppear" label="June" key="June">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JuneData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JuneData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JuneData.weekTwo"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JuneData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JuneData.weekThree"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JuneData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JuneData.weekFour"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JuneData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JuneData.weekFive"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JuneData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="June1" prop="JuneSum" label="June">
          <template slot-scope="scope">
            {{Number(scope.row.JuneData.weekOne)+Number(scope.row.JuneData.weekTwo)+Number(scope.row.JuneData.weekThree)+Number(scope.row.JuneData.weekFour)+Number(scope.row.JuneData.weekFive)}}
          </template>
        </el-table-column>


        <el-table-column v-if="!appear.JulyAppear" label="July" key="July">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JulyData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JulyData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JulyData.weekTwo"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JulyData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JulyData.weekThree"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JulyData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JulyData.weekFour"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JulyData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JulyData.weekFive"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JulyData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="July1" prop="JulySum" label="July">
          <template slot-scope="scope">
            {{Number(scope.row.JulyData.weekOne)+Number(scope.row.JulyData.weekTwo)+Number(scope.row.JulyData.weekThree)+Number(scope.row.JulyData.weekFour)+Number(scope.row.JulyData.weekFive)}}
          </template>
        </el-table-column>


        <el-table-column v-if="!appear.AuguAppear" label="Augu" key="Augu">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.AuguData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.AuguData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.AuguData.weekTwo"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.AuguData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.AuguData.weekThree"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.AuguData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.AuguData.weekFour"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.AuguData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.AuguData.weekFive"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.AuguData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Augu1" prop="AuguSum" label="Augu">
          <template slot-scope="scope">
            {{Number(scope.row.AuguData.weekOne)+Number(scope.row.AuguData.weekTwo)+Number(scope.row.AuguData.weekThree)+Number(scope.row.AuguData.weekFour)+Number(scope.row.AuguData.weekFive)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.SeptAppear" label="Sept" key="Sept">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.SeptData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.SeptData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.SeptData.weekTwo"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.SeptData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.SeptData.weekThree"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.SeptData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.SeptData.weekFour"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.SeptData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.SeptData.weekFive"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.SeptData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Sept1" prop="SeptSum" label="Sept">
          <template slot-scope="scope">
            {{Number(scope.row.SeptData.weekOne)+Number(scope.row.SeptData.weekTwo)+Number(scope.row.SeptData.weekThree)+Number(scope.row.SeptData.weekFour)+Number(scope.row.SeptData.weekFive)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.OctAppear" label="Oct" key="Oct">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.OctData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.OctData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.OctData.weekTwo"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.OctData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.OctData.weekThree"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.OctData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.OctData.weekFour"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.OctData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.OctData.weekFive"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.OctData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Oct1" prop="OctSum" label="Oct">
          <template slot-scope="scope">
            {{Number(scope.row.OctData.weekOne)+Number(scope.row.OctData.weekTwo)+Number(scope.row.OctData.weekThree)+Number(scope.row.OctData.weekFour)+Number(scope.row.OctData.weekFive)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.NovAppear" label="Nov" key="Nov">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.NovData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.NovData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.NovData.weekTwo"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.NovData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.NovData.weekThree"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.NovData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.NovData.weekFour"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.NovData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.NovData.weekFive"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.NovData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Nov1" prop="NovSum" label="Nov">
          <template slot-scope="scope">
            {{Number(scope.row.NovData.weekOne)+Number(scope.row.NovData.weekTwo)+Number(scope.row.NovData.weekThree)+Number(scope.row.NovData.weekFour)+Number(scope.row.NovData.weekFive)}}
          </template>
        </el-table-column>

        <el-table-column v-if="!appear.DecAppear" label="Dec" key="Dec">
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.DecData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.DecData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.DecData.weekTwo"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.DecData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.DecData.weekThree"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.DecData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.DecData.weekFour"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.DecData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="Week1"
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.DecData.weekFive"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.DecData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column v-else key="Dec1" prop="DecSum" label="Dec">
          <template slot-scope="scope">
            {{Number(scope.row.DecData.weekOne)+Number(scope.row.DecData.weekTwo)+Number(scope.row.DecData.weekThree)+Number(scope.row.DecData.weekFour)+Number(scope.row.DecData.weekFive)}}
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filing',
  data() {
    return {
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
       tableData: [{
          date: '2019-04-13',
          name: '王小虎',
          province: '单玻三曲瓦',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 0,
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
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          FebData: {
            weekOne: 22222,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          MarData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          AprilData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          MayData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          JuneData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          JulyData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          AuguData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          SeptData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          OctData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          NovData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          DecData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          }
        }, {
          date: '2019-04-13',
          name: '王小虎',
          province: '发电墙',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 1,
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
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          FebData: {
            weekOne: 22222,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          MarData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          AprilData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          MayData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          JuneData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          JulyData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          AuguData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          SeptData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          OctData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          NovData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          DecData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          }
        },{
          date: '2019-04-13',
          name: '王小虎',
          province: '发电墙',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 0,
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
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          FebData: {
            weekOne: 22222,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          MarData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          AprilData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          MayData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          JuneData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          JulyData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          AuguData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          SeptData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          OctData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          NovData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          DecData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          }
        }, {
          date: '2019-04-16',
          name: '王小虎',
          province: '发电墙',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 1,
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
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          FebData: {
            weekOne: 22222,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          MarData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          AprilData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          MayData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          JuneData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          JulyData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          AuguData: {
            weekOne: 1,
            weekTwo: 1,
            weekThree: 1,
            weekFour: 1,
            weekFive:1
          },
          SeptData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          OctData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          NovData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          },
          DecData: {
            weekOne: 11,
            weekTwo: 12,
            weekThree: 13,
            weekFour: 14,
            weekFive:15
          }
        }]
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
    headerClassName() {
      return {
        background: 'red'
      }
    },
    initData(){
      let userId = {
        userId: this.userObj.userId
      };
      this.$api.canteen.getProductCost(userId).then(res=>{
        console.log('产品成本数据...', res);
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
/deep/.table{
  .el-table{
    .el-table__body{
      .el-table td, .el-table th {
        padding: 0px 0;
        min-width: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        text-overflow: ellipsis;
        vertical-align: middle;
        position: relative;
        text-align: left;
      }
    }
  }
}
</style>
