<template>
    <div style="display: block;min-width: 1100px">
        <div class="box">
            <el-form ref="form" :inline="true" :model="form" class="contain" size="mini">
                <el-form-item label="部门:" label-width="50px" prop="region">
                    <dept-select :deptList="deptList" ref="deptSelect"></dept-select>
                    <!-- <el-select v-model="form.region" multiple filterable collapse-tags placeholder="无限制" size="mini" style="width: 251px;">
                        <el-option-group                          
                          v-for="group in deptGroup"
                          :key="group.label"
                          :label="group.label"
                          @click.native="checkAllOpts">
                        <el-option v-for="item in group.groups" :key="item.dept_name" :label="item.dept_name" :value="item.dept_name" style="width: 251px">
                        </el-option>
                                         </el-option-group>
                                         </el-select> -->
                </el-form-item>
                <el-form-item label="查询时间:" prop="date">
                    <el-col :span="8" style="width:150px;">
                        <el-date-picker size="mini" type="month" :placeholder="initTime" value-format="yyyy-MM" v-model="form.date.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <div style="display: inline-block; margin-left: -115px;">
                        <el-button size="mini" type="primary" class="query" @click.native.prevent="Hotword()">查询</el-button>
                        <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div v-for="(item,index) in rcdata">
            <div class="heartPictureChart">
                <div style="text-align: left;font-size: 16px;">{{item.name}}</div>
                <el-button v-if="buttons['77']==true" class="exp-btn" plain size="small" @click="exportExl(index,item.name)">导出</el-button>
                <div :id="'heartPicture'+index" :style="{height: '280px'}" :class="{isbg: item.value.length==0,heartPicture:true}"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { timeDiff } from '../../../assets/js/util'
import testImg from '../../../assets/img/no-data.png';
import { getMaxFreq, exportCsv } from '../../../utils';
import deptSelect from '../../../components/common/dept-select.vue';

export default {
    name: "canteenReceiverOrder",
    components: {
        deptSelect
    },

    data() {
        return {
            rcdata: [],
            form: {
                region: [], //部门
                date: {
                    date1: "",
                }
            },
            checkAll: true, //选中当前所有的部门
            deptName: "",
            initTime: this.updateTime, //初始化的时间
            //deptList: [],
            rankOptions: ["21-24", "15-20", "10-14", "05-09", "01-04"],
        }
    },
    watch: {
        'updateTime': function(newval, oldval) {
            if (newval && !oldval) {
                this.initTime = this.$moment(newval).format('YYYY-MM');
                this.initHotword();
            }

        },
        'deptList': function(newval, oldval) {
            if (newval.length > 0 && oldval.length == 0) {
                this.initHotword();
            }
        }
    },
    mounted() {
        this.initTime = this.updateTime ? this.$moment(this.updateTime).format('YYYY-MM') : '';
        this.initHotword();
    },
    computed: {
        testImg: {
            get() {
                return testImg;
            }
        },
        buttons: {
            get() {
                //获取当前可导出的按钮组
                if (this.$store.state.common.menuData && this.$store.state.common.menuData.length > 0 && this.$store.state.common.menuData[0].list) {
                    let curMenu = this.$store.state.common.menuData[0].list.find((item) => item.menuId == '55') //部门热词
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
        deptList: {
            get() {
                return this.$store.state.common.deptments;
            },
            set() {
                this.$store.commit('setDeptments', val);
            }
        },
        deptGroup: {
            get() {
                return [{
                    label: '全部',
                    groups: this.deptList
                }]
            }
        },
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
    filters: {}, // 过滤器
    methods: {
        initHotword() {
            if (this.initTime && this.deptList.length > 0) {
                this.form.date.date1 = this.initTime; //默认显示时间
                this.form.region = this.deptList.map((a) => a.dept_name);
                if(this.$refs['deptSelect']) {
                    this.$refs['deptSelect'].values = this.form.region.concat();
                }
                this.Hotword();
            }
        },
        getDepts() {
            if (this.$refs['deptSelect']) {
                this.form.region = this.$refs['deptSelect'].values.concat();
            }

            let resDepts = '';
            if (this.form.region.length > 0) {
                resDepts = this.form.region.join(',');
            } else {
                let deptNames = this.deptList.map((a) => {
                    return a.dept_name;
                })

                resDepts = deptNames.join(',');
            }
            return resDepts;
        },
        Hotword() {          

            //热词接口
            let params = {
                //部门
                dept: this.getDepts(),
                beginDate: this.form.date.date1,
                userId: this.userObj.userId,
                userName: this.userObj.username,
                fullName: this.userObj.name,
                systemId: "49",//系统id
                systemName: "管理驾驶舱",
                menuId: "55",
                menuName: "部门热词",
                proType: 4
            }
            this.$api.canteen.getHotWord(params).then(res => {
                // let rc = JSON.parse(res);
                /* let hasData = [],
                     nodata = [];
                 for (let i = 0; i < res.rs.length; i++) {
                     if (res.rs[i].value.length > 0) {
                         hasData.push(res.rs[i]);
                     } else {
                         nodata.push(res.rs[i])
                     }
                 }

                 this.rcdata = hasData.concat(nodata);*/

                this.rcdata = res.rs;

                this.$nextTick(() => {

                    for (let i = 0; i < this.rcdata.length; i++) {
                        let maxFreq = 1,
                            minFreq = 1;
                        let curData = this.rcdata[i];
                        let curDataList = curData.value
                        let curValue = curDataList.map((item) => {
                            if (maxFreq < item.freq) maxFreq = item.freq;
                            if (minFreq > item.freq) minFreq = item.freq;
                            return {
                                name: item.name,
                                value: item.freq
                            }
                        })
                        // if(curValue.length<=0) {
                        //     continue;
                        // }
                        let maxRange = getMaxFreq(maxFreq);
                        var heartPicture = this.echarts.init(document.getElementById('heartPicture' + i));
                        let data = {
                            value: curValue
                        };

                        //     let maskImage = new Image();//温馨提示：image 选取有严格要求不可过大；，否则firefox不兼容  iconfont上面的图标可以
                        // maskImage.src = data.image;
                        // maskImage.onload = function(){
                        heartPicture.setOption({
                            //backgroundColor: 'transparent',
                            tooltip: {
                                show: true
                            },
                            series: [{
                                type: 'wordCloud',
                                shape: 'circle',
                                autoSize: {
                                    enable: true,
                                    minSize: 8
                                },
                                size: ['100%', '100%'],
                                // rotationRange: [-90, 90],
                                // rotationStep: 45,
                                // textPadding: 0,
                                // gridSize: 8,
                                // gridSize: 1,
                                // sizeRange: [1, maxRange],
                                //rotationRange: [28, 2],
                                textStyle: {
                                    normal: {
                                        color: function(v) {
                                            let color = ['#27D38A', '#FFCA1C', '#5DD1FA', '#F88E25', '#47A0FF', '#FD6565']
                                            let num = Math.floor(Math.random() * (5 + 1));
                                            return color[num];
                                        },
                                    },
                                },
                                left: 'center',
                                top: 'center',
                                width: '80%',
                                height: '80%',
                                right: null,
                                bottom: null,
                                //maskImage: this.testImg,
                                top: 20,
                                data: data.value
                            }]
                        })
                    }
                    // }
                })

            })
        },
        // 表单重置
        resetForm() {
            this.$refs.form.resetFields();
            if(this.$refs['deptSelect']) {
                this.$refs['deptSelect'].values = this.form.region.concat();
            }
            this.form.date.date1 = this.initTime; //默认显示时间
            this.Hotword();
        },
        exportExl(type, name) {
            if (!this.rcdata[type]) return;
            let data = this.rcdata[type].value;
            if (data.length <= 0) return;

            let res = {
                title: ["热词", "频率"],
                titleForKey: ["name", "freq"],
                data: data
            };
            exportCsv(res, name + '—热词.csv');
        }
    },

}
</script>
<style lang="less" scoped>
.heartPictureChart {
    width: 30%;
    height: 330px;
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    position: relative;
}

.heartPicture {
    &.isbg {
        background: url('../../../assets/img/no-data.png') no-repeat;
        background-position: 50% 50%;
        background-size: 30%;
    }
}

.zhiji {
    margin-top: 6px;
}

.query {
    margin-left: 30px;
    cursor: pointer;
}

.exp-btn {
    position: absolute;
    right: 0;
    z-index: 1000;
    top: -3px;
}

.relationShipChart {
    width: 500px;
    height: 330px;
    margin-top: 4px;
    margin-bottom: 20px;
    margin-right: 80px;
    position: relative;
    display: inline-block;
}
</style>