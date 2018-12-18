<template>
    <div style="display: block;min-width: 1100px">
        <div class="box">
            <el-form ref="form" :inline="true" :model="form" class="contain" size="mini">
                <el-form-item label="部门:" label-width="50px" prop="region">
                    <el-select v-model="form.region" multiple collapse-tags placeholder="请选择部门" size="mini" style="width: 220px">
                        <el-option v-for="item in this.deptList" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="查询时间:" prop="date">
                    <el-col :span="8" style="width:150px;">
                        <el-date-picker size="mini" type="month" :placeholder=initTime value-format="yyyy-MM" v-model="form.date.date1" style="width: 100%;"></el-date-picker>
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
                <div style="text-align: left;font-size: 16px;margin-left: 91px;">{{item.name}}</div>
                <div :id="'heartPicture'+index" style="height: 180px;"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { timeDiff } from '../../../assets/js/util'
import testImg from '../../../assets/img/redTips.png';
import { getMaxFreq } from '../../../utils';

export default {
    name: "canteenReceiverOrder",
    components: {},

    data() {
        return {
            rcdata: [],
            form: {
                region: [], //部门
                date: {
                    date1: "",
                }
            },
            deptName: "",
            initTime: "2018-12-01 00:00:00", //初始化的时间
            deptList: [],
            rankOptions: ["21-24", "15-20", "10-14", "05-09", "01-04"],
        }
    },
    mounted() {
        this.form.date.date1 = this.initTime; //默认显示时间
        this.getSelectPermission(); //获取部门
    },
    computed: {
        testImg: {
            get() {
                return testImg;
            }
        },

        userCode: {
            get() {
                if (this.$store.state.common.user)
                    return this.$store.state.common.user.jobNumber;
                else return '';
            }
        }
    }, // 计算属性
    filters: {}, // 过滤器
    methods: {
        init() {
            //热词接口
            let params = {
                //部门
                dept: this.deptList.join(','),
                beginDate: this.form.date.date1.substring(0, 7),
            }
            this.$api.canteen.getHotWord(params).then(res => {
                this.rcdata = res.rs || [];
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

                        // if(curValue.length<=0){
                        //     continue
                        // }
                        var heartPicture = this.echarts.init(document.getElementById('heartPicture' + i));
                        let data = {
                            value: curValue
                        };

                        //     let maskImage = new Image();//温馨提示：image 选取有严格要求不可过大；，否则firefox不兼容  iconfont上面的图标可以
                        // maskImage.src = data.image;
                        // maskImage.onload = function(){
                        let maxRange = getMaxFreq(maxFreq);
                        heartPicture.setOption({
                            backgroundColor: '#fff',
                            tooltip: {
                                show: false
                            },
                            series: [{
                                type: 'wordCloud',
                                gridSize: 1,
                                sizeRange: [1, maxRange],
                                rotationRange: [28, 2],
                                //maskImage: maskImage,
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
                                width: '100%',
                                height: '100%',
                                right: null,
                                bottom: null,
                                width: 300,
                                height: 200,
                                top: 20,
                                data: data.value
                            }]
                        })
                    }
                    // }
                })

            })
        },
        //点击查询调用接口
        Hotword() {
            //热词接口
            let params = {
                //部门
                dept: this.form.region,
                beginDate: this.form.date.date1.substring(0, 7),
            }
            this.$api.canteen.getHotWord(params).then(res => {
                // let rc = JSON.parse(res);
                this.rcdata = res.rs || [];
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
                            backgroundColor: '#fff',
                            tooltip: {
                                show: false
                            },
                            series: [{
                                type: 'wordCloud',
                                gridSize: 1,
                                sizeRange: [1, maxRange],
                                rotationRange: [28, 2],
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
                                width: '100%',
                                height: '100%',
                                right: null,
                                bottom: null,
                                width: 300,
                                height: 200,
                                top: 20,
                                data: data.value
                            }]
                        })
                    }
                    // }
                })

            })
        },
        //部门接口
        getSelectPermission() {
            if (this.userCode == '') {
                this.$message({
                    'message': '未获取到部门，登录后重试',
                    'type': 'info'
                });
                return;
            }
            var params = {
                userCode: this.userCode
            }
            this.$api.canteen.getSelectPermission(params).then(res => {
                let user = JSON.parse(res.user) || [];
                for (let j = 0; j < user.length; j++) {
                    let dName = user[j].dept_name;
                    this.deptList.push(dName)
                }
                this.init();
            })
        },
        // 表单重置
        resetForm() {
            this.$refs.form.resetFields();
            this.form.date.date1 = this.initTime; //默认显示时间
            this.form.date.date2 = this.initTime; //默认显示时间
        },
    },

}
</script>
<style lang="less" scoped>
.heartPictureChart {
    width: 300px;
    height: 200px;
    float: left;
    margin-top: 10px;
}

.zhiji {
    margin-top: 6px;
}

.query {
    margin-left: 30px;
    cursor: pointer;
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