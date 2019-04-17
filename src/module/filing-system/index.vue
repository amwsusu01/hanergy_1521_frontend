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
          width="150">
        </el-table-column>
        <el-table-column prop="name" label="产品" width="120">
          <el-table-column prop="province" label=""  width="120"> </el-table-column>
          <el-table-column prop="type"  label="" width="120">
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
            width="120">
            <template slot-scope="scope">
              <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JanData.weekOne"></el-input>
              <el-input v-else class="edit-cell"  v-model="scope.row.JanData.weekOne"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            label="Week2"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JanData.weekTwo"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.JanData.weekTwo"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="Week3"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JanData.weekThree"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.JanData.weekThree"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week4"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JanData.weekFour"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.JanData.weekFour"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="zip"
            label="Week5"
            width="120">
            <template slot-scope="scope">
                <el-input v-if="scope.row.type == 0" class="edit-cell" :disabled="scope.row.type == 0" v-model="scope.row.JanData.weekFive"></el-input>
                <el-input v-else class="edit-cell"  v-model="scope.row.JanData.weekFive"></el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="JanSum" v-else label="Jan" width="120" key="Jan1">
          <template slot-scope="scope">
                {{Number(scope.row.JanData.weekOne)+Number(scope.row.JanData.weekTwo)+Number(scope.row.JanData.weekThree)+Number(scope.row.JanData.weekFour)+Number(scope.row.JanData.weekFive)}}
            </template>
        </el-table-column>

        <el-table-column v-if="appear.FebAppear" label="Feb" key="Feb">
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
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 0,
          JanSum:'',
          FebSum: '',
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
          }
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 1,
          JanSum:'',
          FebSum: '',
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
          }
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 0,
          JanSum:'',
          FebSum: '',
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
          }
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 1,
          JanSum:'',
          FebSum: '',
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
          }
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 0,
          JanSum:'',
          FebSum: '',
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
          }
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 1,
          JanSum:'',
          FebSum: '',
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
          }
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 0,
          JanSum:'',
          FebSum: '',
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
          }
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333,
          type: 1,
          JanSum:'',
          FebSum: '',
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
          }
        }]
    }
  },
  mounted(){
    // if()
    // let tableData = JSON.parse(sessionStorage.getItem('tableData'));
    this.tableData = localStorage.getItem('tableData') ? JSON.parse(localStorage.getItem('tableData')) : this.tableData;
    console.log(this.tableData);
  },
  methods:{
    // saveData(row, column, cell, event){
    //   console.log('row...', row);
    // },
    editData(){
      // console.log(this.tableData);
      this.tableData.forEach(function(value, key){
        let sum1 = 0, sum2 = 0, sum3 = 0;
        for(var i in value.JanData){
          sum1 += Number(value.JanData[i]);
        }
        value.JanSum = sum1;
        for(var j in value.FebData){
          sum2 += Number(value.FebData[j]);
        }
        value.FebSum = sum2;
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

<style lang="scss" scoped>

</style>
