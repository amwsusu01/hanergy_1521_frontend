<template>
    <div>
        <div class="box">
            <el-form ref="form" :inline="true" :model="form" class="contain" size="mini">
                <el-form-item label="部门:" size="mini" label-width="50px" prop="region">
                    <dept-select :deptList="deptList" ref="deptSelect"></dept-select>
                </el-form-item>
                <el-form-item label="职级:" size="mini" prop="rankname">
                    <rank-select ref="rankSelect" />
                </el-form-item>
                <el-form-item label="查询时间:" prop="date">
                    <el-col :span="8" style="width:120px;">
                        <el-date-picker size="mini" type="month" :placeholder=initTime value-format="yyyy-MM" v-model="form.date.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col style="width:120px;display: inline-block">
                        <el-date-picker size="mini" type="month" :placeholder=initTime value-format="yyyy-MM" :picker-options="pickerOptions" v-model="form.date.date2" style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item class="buttons">
                    <el-button size="mini" type="primary" class="query" @click="queryList()">查询</el-button>
                    <el-button size="mini" type="primary" class="reset" @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <div class="chart-box">
                <el-button v-if="buttons['64']==true" class="exp-btn" plain size="small" @click="exportExl('64')">导出</el-button>
                <div id="assemblyChart" class="relationShipChart" :style="{background:cnt.length>0?'white':'transparent'}"></div>
            </div>
            <div class="chart-box">
                <el-button v-if="buttons['65']==true" class="exp-btn" plain size="small" @click="exportExl('65')">导出</el-button>
                <div id="assemblyFiveChart" class="relationShipChart" :style="{background:cnt5.length>0?'white':'transparent'}"></div>
            </div>
            <div class="chart-box">
                <el-button v-if="buttons['66']==true" class="exp-btn" plain size="small" @click="exportExl('66')">导出</el-button>
                <div id="assemblyThreeChart" class="relationShipChart" :style="{background:cnt2.length>0?'white':'transparent'}"></div>
            </div>
            <div class="chart-box">
                <el-button v-if="buttons['67']==true" class="exp-btn" plain size="small" @click="exportExl('67')">导出</el-button>
                <div id="assemblyFourChart" class="relationShipChart" :style="{background:cnt3.length>0?'white':'transparent'}"></div>
            </div>
            <div class="chart-box">
                <el-button v-if="buttons['68']==true" class="exp-btn" plain size="small" @click="exportExl('68')">导出</el-button>
                <div id="assemblyTwoChart" class="relationShipChart" :style="{background:cnt4.length>0?'white':'transparent'}"></div>
            </div>
            <div class="chart-box">
                <el-button v-if="buttons['69']==true" class="exp-btn" plain size="small" @click="exportExl('69')">导出</el-button>
                <div id="assemblySixChart" class="relationShipChart" :style="{background:cnt6.length>0?'white':'transparent'}"></div>
            </div>
        </div>
    </div>
</template>
<script>
import { exportCsv } from '../../../utils';
import deptSelect from '../../../components/common/dept-select.vue';
import rankSelect from '../../../components/common/rank-select.vue';

export default {
    name: "canteenOrder",
    components: {
        deptSelect,
        rankSelect
    },
    computed: {
        buttons: {
            get() {
                //获取当前可导出的按钮组
                if (this.$store.state.common.menuData && this.$store.state.common.menuData.length > 0 && this.$store.state.common.menuData[0].list) {
                    let curMenu = this.$store.state.common.menuData[0].list.find((item) => item.menuId == '53') //1521问题和反省明细
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
        updateTime: {
            get() {
                return this.$store.state.common.updateTime;
            }
        },
    }, // 计算属性
    watch: {
        updateTime: function(newval, oldval) {
            if (newval && !oldval) {
                this.initTime = this.$moment(newval).format('YYYY-MM');
                this.initData();
            }

        },
        deptList: function(newval, oldval) {
            if (newval && newval.length > 0 && (!oldval || oldval.length == 0)) {
                this.initData();
            }
        }
    },
    data() {
        return {
            //图一
            chartOption: {
                title: {
                    text: '超过4次(含)未请假未提报统计报表',
                    textStyle: {
                        fontSize: 14,
                    }
                },
                legend: { //图例位置
                    data: ['提报人数', '占比'],
                    top: 30,
                    // bottom: -7
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                // grid: {
                //     left: '3%',
                //     right: '4%',
                //     bottom: '46',
                //     containLabel: true
                // },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month
                },
                yAxis: [{
                        type: 'value',
                        name: '人数',
                        // namelineStyle :{
                        //     width: 20%
                        // },
                        // nameLocation: 'center', //坐标名称位置
                        // nameGap: 42,
                        // nameRotate: -90,
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        // nameLocation: 'center',
                        // nameRotate: -90,
                        // nameGap: 35,
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3'];
                                return '#5793f3';

                                return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: '#7a70c2'
                        },
                        lineStyle: {
                            color: '#7a70c2'
                        },
                        data: this.per
                    }
                ]
            },
            assemblyChart: null,
            //图二
            chartTwoOption: {
                title: {
                    text: '提报内容一样/当天重复条数超过6条(含)/一个月累计出现超过6次(含)',
                    textStyle: {
                        fontSize: 14
                    }
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                legend: {
                    data: ['提报人数', '占比'],
                    top: 30
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    // left: '3%',
                    // right: '4%',
                    // bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month2
                },
                yAxis: [{
                        type: 'value',
                        name: '人数',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        nameLocation: 'end',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3'];
                                return '#5793f3';
                                //return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt2
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function() {
                                return '#7a70c2';
                            }
                        },
                        lineStyle: {
                            color: '#7a70c2'
                        },
                        data: this.per2,
                    }
                ]
            },
            assemblyFiveChart: null,
            //图三
            chartThreeOption: {
                title: {
                    text: '提报月平均条数小于5',
                    textStyle: {
                        fontSize: 14
                    }
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                legend: {
                    data: ['提报人数', '占比'],
                    top: 30
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    // left: '3%',
                    // right: '4%',
                    // bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month3
                },
                yAxis: [{
                        type: 'value',
                        name: '人数',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        nameLocation: 'end',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3'];
                                return '#5793f3';
                                //return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt3
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function() {
                                return '#7a70c2';
                            }
                        },
                        lineStyle: {
                            color: '#7a70c2'
                        },
                        data: this.per3,
                    }
                ]
            },
            assemblyThreeChart: null,
            //图四
            chartFourOption: {
                title: {
                    text: '提报月平均字数小于5',
                    textStyle: {
                        fontSize: 14
                    }
                },
                legend: {
                    data: ['提报人数', '占比'],
                    top: 30
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                grid: {
                    // left: '3%',
                    // right: '4%',
                    // bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month4
                },
                yAxis: [{
                        type: 'value',
                        name: '人数',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        nameLocation: 'end',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3'];
                                return '#5793f3';

                                //return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt4
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function() {
                                return '#7a70c2';
                            }
                        },
                        lineStyle: {
                            color: '#7a70c2'
                        },
                        data: this.per4,
                    }
                ]
            },
            assemblyFourChart: null,
            //图五
            chartFiveOption: {
                title: {
                    text: '9点之前提报统计报表/一个月累计出现3次(含)9点',
                    textStyle: {
                        fontSize: 14
                    }
                },
                legend: {
                    data: ['提报人数', '占比'],
                    top: 30
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                grid: {
                    // left: '3%',
                    // right: '4%',
                    // bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month5
                },
                yAxis: [{
                        type: 'value',
                        // min: 0,
                        // max: 10,
                        // interval: 1,
                        name: '人数',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        // min: 0,
                        // max: 100,
                        // interval: 10,
                        nameLocation: 'end',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3'];
                                return '#5793f3';

                                //return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt5
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function() {
                                return '#7a70c2';
                            }
                        },
                        lineStyle: {
                            color: '#7a70c2'
                        },
                        data: this.per5
                    }
                ]
            },
            assemblyTwoChart: null,
            //图六
            chartSixOption: {
                title: {
                    text: '12点之前提报统计报表/一个月累计出现3次(含)12点',
                    textStyle: {
                        fontSize: 14
                    }
                },
                legend: {
                    data: ['提报人数', '占比'],
                    top: 30
                },
                dataZoom: [{
                    id: 'dataZoomX',
                    type: 'slider',
                    xAxisIndex: [0],
                    filterMode: 'filter'
                }, ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                },
                grid: {
                    // left: '3%',
                    // right: '4%',
                    // bottom: '46',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false }, //横轴的线
                    data: this.in_month6
                },
                yAxis: [{
                        type: 'value',
                        name: '人数',
                        splitLine: { show: true }, //纵轴的线
                    },
                    {
                        type: 'value',
                        name: '(%)',
                        nameLocation: 'end',
                        splitLine: { show: false }, //纵轴的线
                    }
                ],
                series: [{
                        name: '提报人数',
                        type: 'bar',
                        stack: '人数',
                        barGap: '0%',
                        barCategoryGap: '20%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }

                        },
                        itemStyle: {
                            color: function(params) {
                                var colorList = ['#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3', '#56CEFB', '#5793f3'];
                                return '#5793f3';

                                //return colorList[params.dataIndex];
                            },
                        },
                        data: this.cnt6
                    },
                    {
                        name: '占比',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1, //右侧坐标
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        itemStyle: {
                            color: function() {
                                return '#7a70c2';
                            }
                        },
                        lineStyle: {
                            color: '#7a70c2'
                        },
                        data: this.per6,
                    }
                ]
            },
            assemblySixChart: null,

            dzq: [],
            jdzqarray: [], //九点之前
            cnt: [],
            per: [],
            in_month: [],
            cnt2: [],
            per2: [],
            in_month2: [],
            cnt3: [],
            per3: [],
            in_month3: [],
            cnt4: [],
            per4: [],
            in_month4: [],
            cnt5: [],
            per5: [],
            in_month5: [],
            cnt6: [],
            per6: [],
            in_month6: [],
            initTime: this.updateTime, //初始化的时间
            form: {
                rankname: [], //职级
                region: [], //部门
                date: {
                    date1: "2018-03",
                    date2: "2018-12"
                }
            },
            pickerOptions: {
                disabledDate: (time) => {
                    return this.$moment(time).isBefore(this.form.date.date1);
                }
            },
            response: false, // 加载完成
        }
    },
    mounted() {
        this.initTime = this.updateTime ? this.$moment(this.updateTime).format('YYYY-MM') : '';

        this.initData();
    },
    methods: {
        initData() {
            if (this.initTime && this.deptList.length > 0) {
                this.form.date.date1 = '2018-03'; //默认显示时间
                this.form.date.date2 = this.initTime; //默认显示时间
                this.form.region = this.deptList.map((a) => a.dept_name);
                if (this.$refs['deptSelect']) {
                    this.$refs['deptSelect'].values = this.form.region.concat();
                }
                this.init();
            }
        },
        init() {
            //一图
            this.assemblyChart = this.echarts.init(document.getElementById('assemblyChart'));
            let options = this.chartOption;
            this.assemblyChart.setOption(options, true);
            //二图
            this.assemblyFiveChart = this.echarts.init(document.getElementById('assemblyFiveChart'));
            let optionsFive = this.chartTwoOption;
            this.assemblyFiveChart.setOption(optionsFive, true);
            //三图
            this.assemblyThreeChart = this.echarts.init(document.getElementById('assemblyThreeChart'));
            let optionsThree = this.chartThreeOption;
            this.assemblyThreeChart.setOption(optionsThree, true);
            //四图
            this.assemblyFourChart = this.echarts.init(document.getElementById('assemblyFourChart'));
            let optionsFour = this.chartFourOption;
            this.assemblyFourChart.setOption(optionsFour, true);
            //五图
            this.assemblyTwoChart = this.echarts.init(document.getElementById('assemblyTwoChart'));
            let optionsTwo = this.chartFiveOption;
            this.assemblyTwoChart.setOption(optionsTwo, true);
            //六图
            this.assemblySixChart = this.echarts.init(document.getElementById('assemblySixChart'));
            let optionsSix = this.chartSixOption;
            this.assemblySixChart.setOption(optionsSix, true);
            this.queryList()
        },
        //点击查询调用接口
        queryList() {
            var params = {
                dept: this.getDepts(), //部门
                jobGrade: this.form.rankname.join(','), //值级
                beginDate: this.form.date.date1,
                endDate: this.form.date.date2,
            }
            this.$api.canteen.getQueryList(params).then(res => {
                var objList = res || {};
                var cgscarray = []
                var cgltarray = []
                var sedzqarray = []
                var jdzqarray = []
                var tsxywarray = []
                var jdzqarray = []

                var cgscarray = JSON.parse(objList.cgsc)
                var cgltarray = JSON.parse(objList.cglt)
                var sedzqarray = JSON.parse(objList.sedzq)
                var jdzqarray = JSON.parse(objList.jdzq)
                var tsxywarray = JSON.parse(objList.tsxyw)
                var zsxywarray = JSON.parse(objList.zsxyw)
                ////图五
                this.cnt5 = [] //人数
                this.per5 = [] //百分比
                this.in_month5 = []
                for (let i in jdzqarray) {
                    this.cnt5.push(jdzqarray[i].cnt) //人数
                    this.per5.push(jdzqarray[i].per) //百分比
                    this.in_month5.push(jdzqarray[i].in_month) //月份
                }
                var temp = this.chartFiveOption;
                temp.series[0].data = this.cnt5;
                temp.series[1].data = this.per5
                temp.xAxis.data = this.in_month5;
                this.assemblyTwoChart.setOption(temp, true);
                ///图一
                this.cnt = [] //人数
                this.per = [] //百分比
                this.in_month = []
                for (let i in cgscarray) {
                    this.cnt.push(cgscarray[i].cnt) //人数
                    this.per.push(cgscarray[i].per) //百分比
                    this.in_month.push(cgscarray[i].in_month) //月份
                }
                var tempFive = this.chartOption;
                tempFive.series[0].data = this.cnt;
                tempFive.series[1].data = this.per
                tempFive.xAxis.data = this.in_month;
                this.assemblyChart.setOption(tempFive, true);
                ///图二
                this.cnt2 = [] //人数
                this.per2 = [] //百分比
                this.in_month2 = []
                for (let i in cgltarray) {
                    this.cnt2.push(cgltarray[i].cnt) //人数
                    this.per2.push(cgltarray[i].per) //百分比
                    this.in_month2.push(cgltarray[i].in_month) //月份
                }
                var tempTwo = this.chartTwoOption;
                tempTwo.series[0].data = this.cnt2;
                tempTwo.series[1].data = this.per2
                tempTwo.xAxis.data = this.in_month2;
                this.assemblyFiveChart.setOption(tempTwo, true);

                ///图三
                this.cnt3 = [] //人数
                this.per3 = [] //百分比
                this.in_month3 = []
                for (let i in tsxywarray) {
                    this.cnt3.push(tsxywarray[i].cnt) //人数
                    this.per3.push(tsxywarray[i].per) //百分比
                    this.in_month3.push(tsxywarray[i].in_month) //月份
                }
                var tempThree = this.chartThreeOption;
                tempThree.series[0].data = this.cnt3;
                tempThree.series[1].data = this.per3
                tempThree.xAxis.data = this.in_month3;
                this.assemblyThreeChart.setOption(tempThree, true);

                ///图四
                this.cnt4 = [] //人数
                this.per4 = [] //百分比
                this.in_month4 = []
                for (let i in zsxywarray) {
                    this.cnt4.push(zsxywarray[i].cnt) //人数
                    this.per4.push(zsxywarray[i].per) //百分比
                    this.in_month4.push(zsxywarray[i].in_month) //月份
                }
                var tempFour = this.chartFourOption;
                tempFour.series[0].data = this.cnt4;
                tempFour.series[1].data = this.per4
                tempFour.xAxis.data = this.in_month4;
                this.assemblyFourChart.setOption(tempFour, true);

                ///图六
                this.cnt6 = [] //人数
                this.per6 = [] //百分比
                this.in_month6 = []
                for (let i in sedzqarray) {
                    this.cnt6.push(sedzqarray[i].cnt) //人数
                    this.per6.push(sedzqarray[i].per) //百分比
                    this.in_month6.push(sedzqarray[i].in_month) //月份
                }
                var tempSix = this.chartSixOption;
                tempSix.series[0].data = this.cnt6;
                tempSix.series[1].data = this.per6
                tempSix.xAxis.data = this.in_month6;
                this.assemblySixChart.setOption(tempSix, true);
                // this.response = true;
            })
        },
        // 表单重置
        resetForm() {
            this.$refs.form.resetFields();
            this.form.date.date1 = '2018-03'; //默认显示时间
            this.form.date.date2 = this.initTime; //默认显示时间
            if(this.$refs['deptSelect']) {
                this.$refs['deptSelect'].values = this.form.region.concat();
            }
            if(this.$refs['rankSelect']) {
                this.$refs['rankSelect'].values = this.form.rankname.concat();
            }
             this.init();
        },
        //开始时间选择改变的函数
        changeTime(startDateTime) {
            if (startDateTime) {
                let changeTimechuo = startDateTime + '-01 00:00:00';
                changeTimechuo = Date.parse(startDateTime.replace(/-/g, "/"));
                this.startTimeUnix = changeTimechuo;
            }
        },
        //结束时间选择改变的函数
        changeEndTime(startDateTime) {
            // if (startDateTime) {
            //     startDateTime += '-01 00:00:00';
            //     let enddate = startDateTime.getTime();
            //     let dateEnd = new Date(enddate);
            //     let Y = dateEnd.getFullYear() + '-';
            //     let M = (dateEnd.getMonth() + 1 < 10 ? '0' + (dateEnd.getMonth() + 1) : dateEnd.getMonth() + 1);
            //     enddate = Y + M;
            //     return enddate;
            // }
        },
        getDepts() {
            if (this.$refs['deptSelect']) {
                this.form.region = this.$refs['deptSelect'].values.concat();
            }

            if (this.$refs['rankSelect']) {
                this.form.rankname = this.$refs['rankSelect'].values.concat();
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
        exportExl(type) {
            let data = [],
                pers = [],
                title = "";
            switch (type) {
                case '64':
                    data = this.cnt;
                    pers = this.per;
                    title = "超过4次(含)未请假未提报统计报表";
                    break;
                case '65':
                    data = this.cnt5;
                    pers = this.per5;
                    title = "提报内容一样/当天重复条数超过6条(含)/一个月累计出现超过6次(含)";
                    break;
                case '66':
                    data = this.cnt2;
                    pers = this.per2;
                    title = "提报月平均条数小于5";
                    break;
                case '67':
                    data = this.cnt3;
                    pers = this.per3;
                    title = "提报月平均字数小于5";
                    break;
                case '68':
                    data = this.cnt4;
                    pers = this.per4;
                    title = "9点之前提报统计报表/一个月累计出现3次(含)";
                    break;
                case '69':
                    data = this.cnt6;
                    pers = this.per6;
                    title = "12点之前提报统计报表/一个月累计出现3次(含)";
                    break;
            }
            if (data.length <= 0 || pers.length <= 0) return;
            let resData = data.map((a, i) => {
                return {
                    name: a,
                    per: pers[i]
                }
            });

            let res = {
                title: ["提报人数", "占比"],
                titleForKey: ["name", "per"],
                data: resData
            };
            exportCsv(res, title);
        }

    }
}
</script>
<style scoped>
.box {}
.buttons{
    width: 134px;
}
.contain {
    display: inline-block;
}

.zhiji {
    display: inline-block;
}

.query {
    margin-left: 30px;
    display: inline-block;
}

.reset {
    display: inline-block;
    /*margin-left: 30px;*/
}

.chart-box {
    width: 50%;
    float: left;
    position: relative;
    background: url('../../../assets/img/no-data.png') no-repeat;
    background-position: 50% 50%;
    background-size: 30%;
}

.exp-btn {
    position: absolute;
    right: 15px;
    z-index: 1000;
    top: 0px;
}

.relationShipChart {
    width: 100%;
    height: 330px;
    display: flex;
    justify-content: center;
    padding: 10px;
    /* margin-top: 4px;
    margin-bottom: 20px;
    margin-right: 30px; */
    position: relative;
    display: inline-block;

}

/*.download {
    background: url("../../../assets/img/noSearch.png") no-repeat;
    background-size: cover;
    width: 30px;
    height: 30px;
    position: relative;
    top: -430px;
    right: -380px;
}*/
</style>