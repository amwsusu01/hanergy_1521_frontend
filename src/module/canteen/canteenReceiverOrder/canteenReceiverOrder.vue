<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item  :to="{ path: '/canteenPurchase'}">1521报表</el-breadcrumb-item>
            <el-breadcrumb-item  :to="{ path: '/canteenReceiverOrder'}">部门热词</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="box">
            <div class="rightline">更新时间: 2018-01-01</div>
            <el-form ref="form"  :inline="true" :model="form" class="contain"  size="mini">
                <el-form-item label="部门:" label-width="50px" prop="region">
                    <el-select v-model="form.region" multiple  collapse-tags
                               placeholder="请选择部门"  size="mini" style="width: 220px">
                        <el-option
                                v-for="item in this.deptList"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="查询时间:" prop="date">
                    <el-col :span="8" style="width:150px;">
                        <el-date-picker size="mini" type="month"
                                        :placeholder=initTime
                                        value-format="yyyy-MM"
                                        v-model="form.date.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item><div style="display: inline-block; margin-left: -115px;">
                    <el-button size="mini" type="primary" class="query" @click.native.prevent="Hotword()" >查询</el-button>
                    <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
                </div></el-form-item>
            </el-form>
        </div>
        <div  v-for="(item,index) in rcdata" >
            <div class="heartPictureChart">
                <div style="text-align: left;font-size: 20px;margin-left: 91px;" >{{item.name}}</div>
                <div :id="'heartPicture'+index" style="height: 180px;"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { timeDiff} from '../../../assets/js/util'
    import testImg from '../../../assets/img/redTips.png';

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
                deptName:"",
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

        }, // 计算属性
        filters: {}, // 过滤器
        methods: {
            init() {
                //热词接口
                let params = {
                    //部门
                    dept: this.deptList.join(','),
                    beginDate: this.form.date.date1.substring(0,7),
                }
                this.$api.canteen.getHotWord(params).then(res => {
                    this.rcdata = res.rs || [];
                    this.$nextTick(() => {
                        let maxFreq = 1, minFreq = 1;
                        for (let i = 0; i < this.rcdata.length; i++) {
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

                            if(curValue.length<=0){
                                continue
                            }
                            var heartPicture = this.echarts.init(document.getElementById('heartPicture' + i));
                            let data = {
                                value: curValue,
                                image: "data:image/png;base64,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"
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
                                    sizeRange: [1, 50],
                                    rotationRange: [28, 2],
                                    //maskImage: maskImage,
                                    textStyle: {
                                        normal: {
                                            color: function (v) {
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
            Hotword(){
                //热词接口
                let params = {
                    //部门
                    dept: this.form.region,
                    beginDate: this.form.date.date1.substring(0,7),
                }
                this.$api.canteen.getHotWord(params).then(res => {
                    // let rc = JSON.parse(res);
                    this.rcdata = res.rs || [];
                    this.$nextTick(() => {
                        let maxFreq = 1, minFreq = 1;
                        for (let i = 0; i < this.rcdata.length; i++) {
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
                            if(curValue.length<=0) {
                                continue;
                            }
                            let maxRange = maxFreq > 5000?50:25;
                            console.log('max-range',maxRange);
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
                                            color: function (v) {
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
                var params = {
                    userCode: 2
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
            resetForm(){
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